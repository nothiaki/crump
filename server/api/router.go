package api

import (
	"github.com/gin-gonic/gin"
	authHandler "github.com/nothiaki/crump/internal/handler/auth"
	userHandler "github.com/nothiaki/crump/internal/handler/user"
)

func InitRouter(router *gin.Engine) {
	v1 := router.Group("/v1")
  {
    v1.GET("/users/:id", userHandler.One)
		v1.POST("/users", authHandler.Register)
	}
}
