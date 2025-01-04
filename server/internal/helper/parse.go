package helper

import "regexp"

func Alphanumeric(str string) bool {
  is, _ := regexp.MatchString(`^[a-zA-Z0-9]+$`, str)
  return is
}

func Email(email string) bool {
  is, _ := regexp.MatchString(`^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$`, email)
  return is
}

func PasswordLen(pass string) bool {
  l := len(pass)

  if l >= 4 || l <= 24 {
    return true
  }

  return false
}
