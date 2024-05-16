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

	r.Delete("/api/v1/delete-account", helper.AuthMiddleware(helper.MakeHTTPHandler(s.DeleteUserAccount)))
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
