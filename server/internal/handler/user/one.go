package userHandler

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	userRepo "github.com/nothiaki/crump/internal/repo/user"
)

func One(c *gin.Context) {
  id := c.Param("id")

  if id == "" {
    c.JSON(http.StatusBadRequest, gin.H{"message": "You should provide field id in params."})
    return
  }

  user, err := userRepo.SelectById(id)
  if err != nil {
    fmt.Println(err)
  }

  c.JSON(http.StatusOK, gin.H{"user": user})
}
