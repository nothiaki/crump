package main

import (
	"github.com/gin-gonic/gin"
	"github.com/nothiaki/crump/api"
	"github.com/nothiaki/crump/db"
)

func main() {
  if err := db.MustOpenConn(); err != nil {
    panic(err)
  }

  server := gin.Default()
  api.InitRouter(server)

  server.Run()
}
