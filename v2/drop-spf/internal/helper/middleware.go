package helper

import (
	"net/http"
	"os"
	"strings"

	"github.com/golang-jwt/jwt/v5"
)

func AuthMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Get the JWT token from the header
		token := r.Header.Get("Authorization")
		// If the token is missing, return an unauthorized status
		if token == "" {
			// writejson
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		// FIXME: Validate the token
		// If the token is invalid, return an unauthorized status
		// if !m.ValidateToken(token) {
		// 	w.WriteHeader(http.StatusUnauthorized)
		// 	return
		// }
		// custom err
		if !strings.HasPrefix(token, "Bearer ") {
			http.Error(w, "Invalid token format", http.StatusUnauthorized)
			return
		} // // If the token is valid, call the next handler

		_, err := validateToken(token)
		if err != nil {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}

		// next.ServeHTTP(w, r)
		next(w, r)
	}
}

func validateToken(token string) (*jwt.Token, error) {

	secretKey := os.Getenv("JWT_SECRET")

	// Validate the token
	return jwt.Parse(token, func(vToken *jwt.Token) (interface{}, error) {
		if _, ok := vToken.Method.(*jwt.SigningMethodHMAC); !ok {
			// return nil, fmt.Errorf("Unexpected signing method: %v", vToken.Header["alg"]) can be returned
			return nil, jwt.ErrSignatureInvalid
		}
		return []byte(secretKey), nil
	})

}
