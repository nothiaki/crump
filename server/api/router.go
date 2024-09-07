package api

import (
	"github.com/gin-gonic/gin"
	authHandler "github.com/nothiaki/crump/internal/handler/auth"
)

func InitRouter(router *gin.Engine) {
	v1 := router.Group("/v1")
  {
		v1.POST("/user", authHandler.Register)
	}
}
