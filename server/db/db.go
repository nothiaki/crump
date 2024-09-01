package db

import (
	"database/sql"
	"log"

  _ "github.com/lib/pq"
)

var Conn *sql.DB

func NewPgStore() (*sql.DB, error) {
  Coon, err := sql.Open("postgres", "user= dbname=crump sslmode=disable")
	if err != nil {
		log.Fatal(err)
	}

  return Coon, nil
}
