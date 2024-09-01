package api

import (
	"github.com/gin-gonic/gin"
	userHandler "github.com/nothiaki/crump/internal/handler"
)

func InitRouter(router *gin.Engine) {
	v1 := router.Group("/v1")
  {
		v1.POST("/user", userHandler.Create)
	}
}
