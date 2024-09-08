package userRepo

import (
	"github.com/nothiaki/crump/db"
	"github.com/nothiaki/crump/model"
)

func Insert(user model.User) (int64, error) {
  pg := db.GetConn()

  result, err := pg.Exec("INSERT INTO users (email, name) VALUES ($1, $2)", user.Email , user.Name)
  if err != nil {
    return 0, err
  }

  rows, err := result.LastInsertId()
  if err != nil {
    return 0, err
  }

	return rows, nil
}
