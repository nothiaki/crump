package userRepository

import (
	"github.com/nothiaki/crump/db"
	"github.com/nothiaki/crump/model"
)

func Insert(user model.User) error {
  query := `INSERT INTO users (name) VALUES (?)`
  _, err := db.Conn.Exec(query, user.Name)

	return err
}
