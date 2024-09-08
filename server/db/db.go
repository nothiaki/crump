package db

import (
	"database/sql"

	_ "github.com/lib/pq"
)

var conn *sql.DB

func MustOpenConn() error {
  var err error
  conn, err = sql.Open("postgres", "user=postgres dbname=crump sslmode=disable")
	if err != nil {
		panic(err)
	}

  return nil
}

func GetConn() *sql.DB {
  return conn
}
