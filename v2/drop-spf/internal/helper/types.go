package helper

import (
	"time"

	"golang.org/x/crypto/bcrypt"
)

type UserAccount struct {
	Id         int        `json:"id"`
	Username   string     `json:"username"`
	Email      string     `json:"email"`
	Password   string     `json:"-"`
	Created_at time.Time  `json:"created_at"`
	Updated_at time.Time  `json:"updated_at"`
	Deleted_at *time.Time `json:"deleted_at"`
}

// FIXME:  some of the fields are the same as the user account struct so we can create a generic struct for both

type UserAccountReq struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginUserAccountReq struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type DeleteUserAccountReq struct {
	Email string `json:"email"`
}

type LaundryCompany struct {
	Id         int        `json:"id"`
	Name       string     `json:"name"`
	Email      string     `json:"email"`
	Password   string     `json:"password"`
	Privilege  string     `json:"privilege"`
	Created_at time.Time  `json:"created_at"`
	Updated_at time.Time  `json:"updated_at"`
	Deleted_at *time.Time `json:"deleted_at"`
}

type LoginLaundryCompanyAccountReq struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LaundryCompanyReq struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type DeleteLaundryCompanyReq struct {
	Email string `json:"email"`
}

type Employee struct {
	Id         int       `json:"id"`
	Name       string    `json:"name"`
	Email      string    `json:"email"`
	Password   string    `json:"password"`
	Role       string    `json:"role"`
	Created_at time.Time `json:"created_at"`
	Updated_at time.Time `json:"updated_at"`
}

func ValidateUserPassword(password, hash string) error {
	return bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
}

func ValidateCompanyPassword(password, hash string) error {
	return bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
}

func NewUserAccountRequest(username, email, password string) (*UserAccount, error) {
	passHash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	return &UserAccount{
		Username: username,
		Email:    email,
		Password: string(passHash),
	}, nil
}

func NewLaundryCompanyRequest(name, email, password string) (*LaundryCompany, error) {
	passHash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	return &LaundryCompany{
		Name:     name,
		Email:    email,
		Password: string(passHash),
	}, nil
}

func LoginUserAccountRequest(email, password string) (*UserAccount, error) {
	return &UserAccount{
		Email:    email,
		Password: password,
	}, nil
}

func LoginLaundryCompanyRequest(email, password string) (*LaundryCompany, error) {
	return &LaundryCompany{
		Email:    email,
		Password: password,
	}, nil
}

func DeleteUserAccountRequest(email string) (*UserAccount, error) {
	return &UserAccount{
		Email: email,
	}, nil
}

func DeleteLaundryCompanyRequest(email string) (*LaundryCompany, error) {
	return &LaundryCompany{
		Email: email,
	}, nil
}
