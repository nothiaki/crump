package userRepo

import (
	"fmt"

	"github.com/nothiaki/crump/db"
	"github.com/nothiaki/crump/model"
)

func Insert(user model.User) error {
  //verify if user isnt repet
  pg := db.GetConn()

  //pass it to an .sql script
  _, err := pg.Exec("CREATE TABLE IF NOT EXISTS users ( name varchar(255), crumps int )")
  if err != nil {
    fmt.Println(err)
  }

  r, err := pg.Exec("INSERT INTO users (name, crumps) VALUES ($1, $2)", user.Name, user.Crumps)
  if err != nil {
    fmt.Println(err)
  }

  fmt.Println("retorno da query: ", r)

	return err
}
