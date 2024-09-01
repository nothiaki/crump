package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/nothiaki/crump/api"
	"github.com/nothiaki/crump/db"
)

func main() {
  _, err := db.NewPgStore()
  if err != nil {
    log.Fatal(err)
  }

  server := gin.Default()
  api.InitRouter(server)

  server.Run()
}
