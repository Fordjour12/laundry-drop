package helper

import "time"

type UserAccount struct {
	Id         int       `json:"id"`
	Username   string    `json:"username"`
	Email      string    `json:"email"`
	Password   string    `json:"password"`
	Created_at time.Time `json:"created_at"`
	Updated_at time.Time `json:"updated_at"`
}

type LaundryCompany struct {
	Id         int       `json:"id"`
	Name       string    `json:"name"`
	Email      string    `json:"email"`
	Password   string    `json:"password"`
	Privilege  string    `json:"privilege"`
	Created_at time.Time `json:"created_at"`
	Updated_at time.Time `json:"updated_at"`
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
