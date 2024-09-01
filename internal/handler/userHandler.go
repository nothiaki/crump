package userHandler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	userService "github.com/nothiaki/crump/internal/service"
	"github.com/nothiaki/crump/model"
)

func Create(c *gin.Context) {
	var user model.User

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "The provided data is invalid."})
		return
	}

	if err := userService.Create(user); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Show error"})
		return
	}

	c.JSON(http.StatusCreated, nil)
}
