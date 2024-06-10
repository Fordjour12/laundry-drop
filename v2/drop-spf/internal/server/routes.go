package server

import (
	"drop-spf/internal/helper"

	"encoding/json"
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
)

func (s *Server) RegisterRoutes() http.Handler {
	r := chi.NewRouter()
	r.Use(middleware.Logger)

	r.Use(
		cors.Handler(cors.Options{
			// AllowedOrigins:   []string{"https://foo.com"}, // Use this to allow specific origin hosts
			AllowedOrigins: []string{"https://*", "http://*"},
			// AllowOriginFunc:  func(r *http.Request, origin string) bool { return true },
			AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
			AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
			ExposedHeaders:   []string{"Link"},
			AllowCredentials: false,
			MaxAge:           300, // Maximum value not ignored by any of major browsers
		}),
	)

	r.Get("/", s.HelloWorldHandler)
	r.Get("/health", s.healthHandler)

	r.Post("/api/v1/create-account", helper.MakeHTTPHandler(s.CreateNewUserAccount))
	r.Post("/api/v1/login-account", helper.MakeHTTPHandler(s.LoginUserAccount))
	// FIXME: by this time the use will be logged in and the token will be available
	// so we can delete the account by and id (/api/v1/delete-account/:id) <- this is the best way to do it
	r.Delete("/api/v1/delete-account", helper.AuthMiddleware(helper.MakeHTTPHandler(s.DeleteUserAccount)))

	// User location api's
	r.Post("/api/v1/create-location/{userId}", helper.MakeHTTPHandler(s.CreateUserLocation))
	r.Get("/api/v1/get-location-add/{userId}", helper.MakeHTTPHandler(s.GetUserLocations))

	// Company api's
	r.Post("/api/v1/create-company", helper.MakeHTTPHandler(s.CreateNewCompanyAccount))
	r.Post("/api/v1/login-company", helper.MakeHTTPHandler(s.LoginCompanyAccount))
	// FIXME: auth middleware should be added here
	r.Put("/api/v1/update-company", helper.MakeHTTPHandler(s.UpdateCompanyAccount))
	r.Delete("/api/v1/delete-company/{email}", helper.MakeHTTPHandler(s.DeleteCompanyAccount))
	// r.Delete("/api/v1/delete-company", helper.MakeHTTPHandler(s.DeleteCompanyAccount))
	r.Get("/api/v1/get-company", helper.MakeHTTPHandler(s.GetAllCompany))
	r.Post("/api/v1/create-new-service", helper.MakeHTTPHandler(s.CreateNewService))

	return r

}

func (s *Server) HelloWorldHandler(w http.ResponseWriter, r *http.Request) {
	resp := make(map[string]string)
	resp["message"] = "Hello World"

	jsonResp, err := json.Marshal(resp)
	if err != nil {
		log.Fatalf("error handling JSON marshal. Err: %v", err)
	}

	_, _ = w.Write(jsonResp)
}

func (s *Server) healthHandler(w http.ResponseWriter, r *http.Request) {
	jsonResp, _ := json.Marshal(s.db.Health())
	_, _ = w.Write(jsonResp)
}

func (s *Server) CreateNewUserAccount(w http.ResponseWriter, r *http.Request) error {
	var createUserReq helper.UserAccountReq
	if err := json.NewDecoder(r.Body).Decode(&createUserReq); err != nil {
		return helper.InvalidJSON()
	}
	defer r.Body.Close()

	if errors := createUserReq.Validate(); len(errors) > 0 {
		return helper.InvalidRequestData(errors)
	}

	userAccount, err := helper.NewUserAccountRequest(createUserReq.Username, createUserReq.Email, createUserReq.Password)
	if err != nil {
		return err
	}

	dataStore, err := s.db.CreateUserAccount(userAccount)
	if err != nil {
		return helper.NewAPIError(http.StatusBadRequest, err)
	}

	token, err := helper.CreateJWTToken(dataStore)
	if err != nil {
		return err
	}

	log.Printf("token information here %+v", token)

	return helper.WriteJSON(w, http.StatusCreated, map[string]any{
		"token": token,
		"user":  dataStore,
	})

}

func (s *Server) LoginUserAccount(w http.ResponseWriter, r *http.Request) error {
	var loginUserReq helper.LoginUserAccountReq
	if err := json.NewDecoder(r.Body).Decode(&loginUserReq); err != nil {
		return helper.InvalidJSON()
	}
	defer r.Body.Close()

	if errors := loginUserReq.Validate(); len(errors) > 0 {
		return helper.InvalidRequestData(errors)
	}

	acc, err := helper.LoginUserAccountRequest(loginUserReq.Email, loginUserReq.Password)
	if err != nil {
		return helper.NewAPIError(http.StatusBadRequest, err)
	}

	user, err := s.db.GetUserAccountByEmail(acc.Email)
	if err != nil {
		return helper.NewAPIError(http.StatusNotFound, err)
	}

	if err := helper.ValidateUserPassword(loginUserReq.Password, user.Password); err != nil {
		return helper.NewAPIError(http.StatusUnauthorized, err)
	}

	token, err := helper.CreateJWTToken(user)
	if err != nil {
		// return helper.NewAPIError(http.StatusInternalServerError, err)
		return err
	}

	return helper.WriteJSON(w, http.StatusOK, map[string]any{
		"token": token,
		"user":  user,
	})

}

func (s *Server) DeleteUserAccount(w http.ResponseWriter, r *http.Request) error {

	var deleteUserReq helper.DeleteUserAccountReq
	if err := json.NewDecoder(r.Body).Decode(&deleteUserReq); err != nil {
		return helper.InvalidJSON()
	}

	defer r.Body.Close()

	if errors := deleteUserReq.Validate(); len(errors) > 0 {
		return helper.InvalidRequestData(errors)
	}

	acc, err := helper.DeleteUserAccountRequest(deleteUserReq.Email)
	if err != nil {
		return helper.NewAPIError(http.StatusBadRequest, err)
	}

	if err := s.db.DeleteUserAccount(acc.Email); err != nil {
		return helper.NewAPIError(http.StatusBadRequest, err)
	}

	return helper.WriteJSON(w, http.StatusOK, map[string]string{"message": "User account deleted successfully"})
}

func (s *Server) CreateUserLocation(w http.ResponseWriter, r *http.Request) error {
	var userId = chi.URLParam(r, "userId")
	var createLocationReq helper.UserLocationReq

	if err := json.NewDecoder(r.Body).Decode(&createLocationReq); err != nil {
		return helper.InvalidJSON()
	}
	defer r.Body.Close()

	if errors := createLocationReq.Validate(); len(errors) > 0 {
		return helper.InvalidRequestData(errors)
	}

	location, err := helper.NewUserLocationRequest(
		createLocationReq.Address,
		userId,
		createLocationReq.Default,
	)
	if err != nil {
		return err
	}

	locationData, err := s.db.AddUserLocation(userId, location)
	if err != nil {
		return helper.NewAPIError(http.StatusBadRequest, err)
	}

	return helper.WriteJSON(w, http.StatusCreated, locationData)
}

func (s *Server) GetUserLocations(w http.ResponseWriter, r *http.Request) error {
	userId := chi.URLParam(r, "userId")

	locations, err := s.db.GetUserLocations(userId)
	if err != nil {
		return helper.NewAPIError(http.StatusBadRequest, err)
	}

	return helper.WriteJSON(w, http.StatusOK, locations)
}

/*
*	@params: Company api's
 */

func (s *Server) CreateNewCompanyAccount(w http.ResponseWriter, r *http.Request) error {
	var createCompanyReq helper.LaundryCompanyReq
	if err := json.NewDecoder(r.Body).Decode(&createCompanyReq); err != nil {
		return helper.InvalidJSON()
	}
	defer r.Body.Close()

	if errors := createCompanyReq.Validate(); len(errors) > 0 {
		return helper.InvalidRequestData(errors)
	}

	company, err := helper.NewLaundryCompanyRequest(createCompanyReq.Name, createCompanyReq.Email, createCompanyReq.Password)
	if err != nil {
		return err
	}

	cmpData, err := s.db.CreateCompanyAccount(company)
	if err != nil {
		return helper.NewAPIError(http.StatusBadRequest, err)
	}

	return helper.WriteJSON(w, http.StatusCreated, cmpData)

}

func (s *Server) LoginCompanyAccount(w http.ResponseWriter, r *http.Request) error {
	var loginCompanyReq helper.LoginLaundryCompanyAccountReq
	if err := json.NewDecoder(r.Body).Decode(&loginCompanyReq); err != nil {
		return helper.InvalidJSON()
	}
	defer r.Body.Close()

	if errors := loginCompanyReq.Validate(); len(errors) > 0 {
		return helper.InvalidRequestData(errors)
	}

	company, err := helper.LoginLaundryCompanyRequest(loginCompanyReq.Email, loginCompanyReq.Password)
	if err != nil {
		return helper.NewAPIError(http.StatusBadRequest, err)
	}

	cmpData, err := s.db.GetCompanyAccountByEmail(company.Email)
	if err != nil {
		return helper.NewAPIError(http.StatusNotFound, err)
	}

	if err := helper.ValidateCompanyPassword(loginCompanyReq.Password, cmpData.Password); err != nil {
		return helper.NewAPIError(http.StatusUnauthorized, err)
	}

	token, err := helper.CreateCmpJWTToken(cmpData)
	if err != nil {
		// return helper.NewAPIError(http.StatusInternalServerError, err)
		return err
	}

	return helper.WriteJSON(w, http.StatusOK, map[string]any{
		"token": token,
		"user":  cmpData,
	})

}

// FIXME: This function should be refactored and all the logic should be moved
func (s *Server) UpdateCompanyAccount(w http.ResponseWriter, r *http.Request) error {
	var updateCompanyReq helper.UpdateLaundryCompanyReq
	if err := json.NewDecoder(r.Body).Decode(&updateCompanyReq); err != nil {
		return helper.InvalidJSON()
	}
	defer r.Body.Close()

	if errors := updateCompanyReq.Validate(); len(errors) > 0 {
		return helper.InvalidRequestData(errors)
	}

	company, err := helper.UpdateLaundryCompanyRequest(updateCompanyReq.Email, updateCompanyReq.Name)
	if err != nil {
		return helper.NewAPIError(http.StatusBadRequest, err)
	}

	updatedCmp, err := s.db.UpdateCompanyAccount(company.Email, company.Name)
	if err != nil {
		return helper.NewAPIError(http.StatusBadRequest, err)
	}

	return helper.WriteJSON(w, http.StatusOK, updatedCmp)

}

func (s *Server) DeleteCompanyAccount(w http.ResponseWriter, r *http.Request) error {
	email := chi.URLParam(r, "email")

	if err := s.db.DeleteCompanyAccount(email); err != nil {
		return helper.NewAPIError(http.StatusBadRequest, err)
	}

	return helper.WriteJSON(w, http.StatusOK, map[string]string{"message": "Company account deleted successfully"})

}

func (s *Server) GetAllCompany(w http.ResponseWriter, r *http.Request) error {
	companies, err := s.db.GetAllCompany()
	if err != nil {
		return helper.NewAPIError(http.StatusBadRequest, err)
	}

	return helper.WriteJSON(w, http.StatusOK, companies)
}

func (s *Server) CreateNewService(w http.ResponseWriter, r *http.Request) error {
	companyId := chi.URLParam(r, "companyId")
	var createServiceReq helper.LaundryService
	if err := json.NewDecoder(r.Body).Decode(&createServiceReq); err != nil {
		return helper.InvalidJSON()
	}
	defer r.Body.Close()

	if errors := createServiceReq.Validate(); len(errors) > 0 {
		return helper.InvalidRequestData(errors)
	}

	service, err := helper.NewLaundryServiceRequest(
		createServiceReq.Name,
		createServiceReq.Description,
		createServiceReq.Image,
		companyId,
		createServiceReq.Price,
	)
	if err != nil {
		return err
	}

	serviceData, err := s.db.CreateLaundryService(service)
	if err != nil {
		return helper.NewAPIError(http.StatusBadRequest, err)
	}

	return helper.WriteJSON(w, http.StatusCreated, serviceData)

}

// it can be refactored to use the helper function
// func (s *Server) DeleteCompanyAccount(w http.ResponseWriter, r *http.Request) error {
//  var deleteCompanyReq helper.DeleteLaundryCompanyReq
// 	if err := json.NewDecoder(r.Body).Decode(&deleteCompanyReq); err != nil {
// 		return helper.InvalidJSON()
// 	}
// 	defer r.Body.Close()

// 	if errors := deleteCompanyReq.Validate(); len(errors) > -1 {
// 		return helper.InvalidRequestData(errors)
// 	}

// 	company, err := helper.DeleteLaundryCompanyRequest(deleteCompanyReq.Email)
// 	if err != nil {
// 		return helper.NewAPIError(http.StatusBadRequest, err)
// 	}
