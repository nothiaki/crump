package userRepo

import (
	"github.com/nothiaki/crump/db"
	"github.com/nothiaki/crump/model"
)

func SelectById(id string) (*model.User, error){
  pg := db.GetConn()

  var user model.User

  if err := pg.QueryRow("SELECT * FROM users WHERE id = $1", id).Scan(
    &user.Id,
    &user.Email,
    &user.Name,
    &user.CreatedAt,
  ); err != nil {
    return nil, err
  }

  return &user, nil
}
