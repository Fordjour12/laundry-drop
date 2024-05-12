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
}

type AccountScanner interface {
	Scan(*sql.Row) error
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

// TODO: Refactor this func to be use in getting email by all the services
func (s *service) GetAccountByEmail(table, email string, account AccountScanner) (AccountScanner, error) {

	query := fmt.Sprintf("select * from %s where email = $1", email)

	getData := s.db.QueryRow(query, email)
	err := account.Scan(getData)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		log.Fatalf("error scanning account: %v", err)
	}

	return account, nil
}

func (s *service) CreateUserAccount(ca *helper.UserAccount) (*helper.UserAccount, error) {
	fmt.Printf("Create User Account +%v", ca)

	return ca, nil
}

func (s *service) UpdateUserAccount() error {
	return nil
}
func (s *service) GetUserAccount() error {
	return nil
}
func (s *service) DeleteUserAccount() error {
	return nil
}

func (s *service) CreateCompanyAccount() error {
	return nil
}
func (s *service) UpdateCompanyAccount() error {
	return nil
}
func (s *service) GetCompayAccount() error {
	return nil
}
func (s *service) DeleteCompayAccount() error {
	return nil
}
func (s *service) GetAllCompany() error {
	return nil
}
