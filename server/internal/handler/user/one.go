package userHandler

import (
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
    c.JSON(http.StatusBadRequest, gin.H{"message": "There is no user with the provided id."})
    return
  }

  c.JSON(http.StatusOK, gin.H{"user": user})
}
