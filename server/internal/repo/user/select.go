package userRepo

import (
	"github.com/nothiaki/crump/db"
	"github.com/nothiaki/crump/model"
)

func SelectAll() (*[]model.User, error){
  pg := db.GetConn()

  var users []model.User

  rows, err := pg.Query("SELECT * FROM users")
  if err != nil {
    return nil, err
  }
  defer rows.Close()

  for rows.Next() {
    var user model.User

    if err := rows.Scan(
      &user.Id,
      &user.Email,
      &user.Name,
      &user.CreatedAt,
    ); err != nil {
      return &users, err
    }

    users = append(users, user)
  }

  return &users, nil
}

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
