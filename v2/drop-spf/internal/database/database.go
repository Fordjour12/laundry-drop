package database

import (
	"context"
	"database/sql"
	"drop-spf/internal/helper"
	"fmt"
	"log"
	"os"
	"time"

	_ "github.com/jackc/pgx/v5/stdlib"
	_ "github.com/joho/godotenv/autoload"
)

type Service interface {
	Health() map[string]string
	CreateUserAccount(ca *helper.UserAccount) (*helper.UserAccount, error)
	GetUserAccountByEmail(email string) (*helper.UserAccount, error)
	DeleteUserAccount(email string) error

	CreateCompanyAccount(lnc *helper.LaundryCompany) (*helper.LaundryCompany, error)
	GetCompanyAccount(email string) (*helper.LaundryCompany, error)
	DeleteCompanyAccount(email string) error

	GetAccountByEmail(table, email string) (AccountType, error)
}

type service struct {
	db *sql.DB
}

var (
	database = os.Getenv("DB_DATABASE")
	password = os.Getenv("DB_PASSWORD")
	username = os.Getenv("DB_USERNAME")
	port     = os.Getenv("DB_PORT")
	host     = os.Getenv("DB_HOST")
)

func New() Service {
	connStr := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable", username, password, host, port, database)
	db, err := sql.Open("pgx", connStr)
	if err != nil {
		log.Fatal(err)
	}
	s := &service{db: db}
	return s
}

func (s *service) Health() map[string]string {
	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
	defer cancel()

	err := s.db.PingContext(ctx)
	if err != nil {
		log.Fatalf(fmt.Sprintf("db down: %v", err))
	}

	return map[string]string{
		"message": "It's healthy",
	}
}

/*
	TODO:
	- [] Create a function to get account by email
	- [] CRUD for company account
*/


type AccountType interface{}

func (s *service) GetAccountByEmail(table, email string) (AccountType, error) {
	query := fmt.Sprintf("select * from %s where email = $1 and deleted_at is null", table)
	var account AccountType
	err := s.db.QueryRow(query, email).Scan(&account)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return account, nil
}

// func (s *service) GetCompanyAccount(email string) (*helper.LaundryCompany, error) {
// 	query := `select * from lndy_comp where email = $1 and deleted_at is null`

// 	var lnc helper.LaundryCompany

// 	err := s.db.QueryRow(
// 		query,
// 		email,
// 	).Scan(
// 		&lnc.Id,
// 		&lnc.Name,
// 		&lnc.Email,
// 		&lnc.Password,
// 		&lnc.Created_at,
// 		&lnc.Updated_at,
// 		&lnc.Deleted_at,
// 	)
// 	if err != nil {
// 		return nil, err
// 	}

// 	return &lnc, nil
// }

func (s *service) CreateUserAccount(ca *helper.UserAccount) (*helper.UserAccount, error) {
	query := `insert into user_account (username, email, password) 
				values ($1, $2, $3) 
				returning id, username, email, password, created_at, updated_at
				`

	err := s.db.QueryRow(query,
		ca.Username,
		ca.Email,
		ca.Password,
	).Scan(
		&ca.Id,
		&ca.Username,
		&ca.Email,
		&ca.Password,
		&ca.Created_at,
		&ca.Updated_at,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	return ca, nil
}

func (s *service) GetUserAccountByEmail(email string) (*helper.UserAccount, error) {
	query := `select * from user_account where email = $1 and deleted_at is null`

	var ua helper.UserAccount
	if err := s.db.QueryRow(query, email).Scan(
		&ua.Id,
		&ua.Username,
		&ua.Email,
		&ua.Password,
		&ua.Created_at,
		&ua.Updated_at,
		&ua.Deleted_at,
	); err != nil {
		return nil, err
	}

	return &ua, nil
}

func (s *service) UpdateUserAccount() error {
	return nil
}
func (s *service) GetUserAccount() error {
	return nil
}
func (s *service) DeleteUserAccount(email string) error {
	// query := `delete from user_account where email = $1`
	query := `update user_account set deleted_at = now() where email = $1`
	_, err := s.db.Exec(query, email)
	if err != nil {
		return err
	}

	return nil
}

func (s *service) CreateCompanyAccount(lnc *helper.LaundryCompany) (*helper.LaundryCompany, error) {
	query := `insert into lndy_comp (name, email, password) 
	values ($1, $2, $3) 
	returning id, name,email,password, created_at,updated_at`

	err := s.db.QueryRow(
		query,
		lnc.Name,
		lnc.Email,
		lnc.Password,
	).Scan(
		&lnc.Id,
		&lnc.Name,
		&lnc.Email,
		&lnc.Password,
		&lnc.Created_at,
		&lnc.Updated_at,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	return lnc, nil
}

func (s *service) UpdateCompanyAccount() error {
	return nil
}

func (s *service) GetCompanyAccount(email string) (*helper.LaundryCompany, error) {
	query := `select * from lndy_comp where email = $1 and deleted_at is null`

	var lnc helper.LaundryCompany

	err := s.db.QueryRow(
		query,
		email,
	).Scan(
		&lnc.Id,
		&lnc.Name,
		&lnc.Email,
		&lnc.Password,
		&lnc.Created_at,
		&lnc.Updated_at,
		&lnc.Deleted_at,
	)
	if err != nil {
		return nil, err
	}

	return &lnc, nil
}

func (s *service) DeleteCompanyAccount(email string) error {
	query := ` update lndy_comp set deleted_at = now() where email = $1`
	_, err := s.db.Exec(query, email)
	if err != nil {
		return nil
	}

	return nil
}

func (s *service) GetAllCompany() error {

	return nil
}
