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

	r.Get("/api/v1/create-account", helper.MakeHTTPHandler(s.CreateNewUserAccount))

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
		return err
	}

	return helper.WriteJSON(w, http.StatusOK, dataStore)

}
