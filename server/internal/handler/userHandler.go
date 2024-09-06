package userHandler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	userRepo "github.com/nothiaki/crump/internal/repo"
	"github.com/nothiaki/crump/model"
)

func Create(c *gin.Context) {
	var user model.User

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "The provided data is invalid."})
		return
	}
  //shoul implement more handlin

	if err := userRepo.Insert(user); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": err})
		return
	}

	c.JSON(http.StatusCreated, gin.H{})
}
