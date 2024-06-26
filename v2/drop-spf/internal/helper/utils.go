package helper

import (
	"encoding/json"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"time"

	jwt "github.com/golang-jwt/jwt/v5"
)

type APIError struct {
	Status  int `json:"status"`
	Message any `json:"message"`
}

func (e APIError) Error() string {
	return fmt.Sprintf("status: %d, message: %s", e.Status, e.Message)

}

func WriteJSON(w http.ResponseWriter, statusCode int, data interface{}) error {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	return json.NewEncoder(w).Encode(data)
}

func NewAPIError(statusCode int, err error) APIError {
	return APIError{
		Status:  statusCode,
		Message: err.Error(),
	}
}

func InvalidRequestData(errors map[string]string) APIError {
	return APIError{
		Status:  http.StatusUnprocessableEntity,
		Message: errors,
	}
}

func InvalidJSON() APIError {
	return NewAPIError(http.StatusBadRequest, fmt.Errorf("invalid JSON request body"))
}

type APIFunc func(w http.ResponseWriter, r *http.Request) error

func MakeHTTPHandler(h APIFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if err := h(w, r); err != nil {
			if apiErr, ok := err.(APIError); ok {
				WriteJSON(w, apiErr.Status, apiErr)
			} else {
				errResp := map[string]any{
					"statusCode": http.StatusInternalServerError,
					"message":    "Internal Server Error",
				}
				WriteJSON(w, http.StatusInternalServerError, errResp)

			}
			slog.Error("Error occurred: %+v", "at", err.Error(), "path", r.URL.Path)
		}

	}
}

// FIXME:Add a validation library to validate the request body
func (u UserAccountReq) Validate() map[string]string {
	errors := make(map[string]string)

	if u.Username == "" {
		errors["username"] = "Username is required"
	}

	if u.Email == "" {
		errors["email"] = "Email is required"
	}

	if u.Password == "" {
		errors["password"] = "Password is required"
	}

	return errors
}

func (u LaundryCompanyReq) Validate() map[string]string {
	errors := make(map[string]string)

	if u.Name == "" {
		errors["name"] = "Name is required"
	}

	if u.Email == "" {
		errors["email"] = "Email is required"
	}

	if u.Password == "" {
		errors["password"] = "Password is required"
	}

	return errors
}
func (u LoginLaundryCompanyAccountReq) Validate() map[string]string {
	errors := make(map[string]string)

	if u.Email == "" {
		errors["email"] = "Email is required"
	}

	if u.Password == "" {
		errors["password"] = "Password is required"
	}

	return errors
}

func (u LoginUserAccountReq) Validate() map[string]string {
	errors := make(map[string]string)

	if u.Email == "" {
		errors["email"] = "Email is required"
	}

	if u.Password == "" {
		errors["password"] = "Password is required"
	}

	return errors
}

func (u DeleteUserAccountReq) Validate() map[string]string {
	errors := make(map[string]string)

	if u.Email == "" {
		errors["email"] = "Email is required"
	}

	return errors
}

func (u DeleteLaundryCompanyReq) Validate() map[string]string {
	errors := make(map[string]string)

	if u.Email == "" {
		errors["email"] = "Email is required"
	}

	return errors
}

func (u UpdateLaundryCompanyReq) Validate() map[string]string {
	errors := make(map[string]string)

	if u.Email == "" {
		errors["email"] = "Email is required"
	}

	if u.Name == "" {
		errors["name"] = "Name is required"
	}

	return errors

}

func CreateJWTToken(ac *UserAccount) (string, error) {

	claims := &jwt.MapClaims{
		"Audience":   "user",
		"ExpiresAt":  time.Now().Add(time.Hour * 24).Unix(),
		"Id":         ac.Id,
		"Username":   ac.Username,
		"AuthStatus": "authenticated",
	}

	secretJWT := os.Getenv("JWT_SECRET")

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return token.SignedString([]byte(secretJWT))
}

func CreateCmpJWTToken(ac *LaundryCompany) (string, error) {

	claims := &jwt.MapClaims{
		"Audience":   "user",
		"ExpiresAt":  time.Now().Add(time.Hour * 24).Unix(),
		"Id":         ac.Id,
		"Username":   ac.Name,
		"AuthStatus": "authenticated",
	}

	secretJWT := os.Getenv("JWT_SECRET")

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return token.SignedString([]byte(secretJWT))
}
