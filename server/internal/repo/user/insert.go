package userRepo

import (
	"github.com/nothiaki/crump/db"
	"github.com/nothiaki/crump/model"
)

func Insert(user model.User) (int64, error) {
  pg := db.GetConn()

  result, err := pg.Exec("INSERT INTO users (email, name, password, salt) VALUES ($1, $2, $3, $4)",
    user.Email,
    user.Name,
    user.Password,
    user.Salt)
  if err != nil {
    return 0, err
  }

  rows, err := result.LastInsertId()
  if err != nil {
    return 0, err
  }

	return rows, nil
}
