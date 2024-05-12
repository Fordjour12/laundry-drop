package helper

import (
	"encoding/json"
	"fmt"
	"log/slog"
	"net/http"
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
