package model

type User struct {
  Id        string `json:"id"`
  Email     string `json:"email"`
  Name      string `json:"name"`
  CreatedAt string `json:"created_at"`
}
