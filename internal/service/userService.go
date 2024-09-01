package userService

import (
	userRepository "github.com/nothiaki/crump/internal/repository"
	"github.com/nothiaki/crump/model"
)

//change the return later
func Create(user model.User) error {
  return userRepository.Insert(user)
}
