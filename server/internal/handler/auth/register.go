package authHandler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/nothiaki/crump/internal/helper"
	userRepo "github.com/nothiaki/crump/internal/repo/user"
)

//todo
//[] colocar hash na senha
//[] insert no banco
//[] IMPLEMENTAR IDEMPOTENCIA DE ALGUMA FORMA -> verifico mas retorno erro? errado -> deveria verificar e retornar algo consiso

type userDto struct {
  name     string
  email    string
  password string
  salt     string
}

func Register(c *gin.Context) {
  var body userDto;

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "The provided data is invalid."})
		return
	}

  if !helper.Alphanumeric(body.name) || !helper.Email(body.email) || !helper.PasswordLen(body.password) {
    c.JSON(http.StatusBadRequest, gin.H{"message": "err"})
    return
  }

	exists, err := userRepo.ExistsByNameOrEmail(body.name, body.email)
  if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": err})
		return
	}

  if exists {
    c.JSON(http.StatusBadRequest, gin.H{"message": "User already exists."})
    return
  }

  //create user and send to db
  //hash pass

	if err := userRepo.Insert(body); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": err})
		return
	}

	c.JSON(http.StatusCreated, gin.H{})
}
