package userHandler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	userRepo "github.com/nothiaki/crump/internal/repo/user"
)

func Many(c *gin.Context) {
  users, err := userRepo.SelectAll()
  if err != nil {
    c.JSON(http.StatusBadRequest, gin.H{"message": "Server error."})
    return
  }

  c.JSON(http.StatusOK, gin.H{"users": users})
}
