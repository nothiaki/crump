import { useEffect, useState } from "react"
import { Input } from "../components/input/input"
import { Submit } from "../components/input/submit"
import { LogoTitle } from "../components/logo/logo-title"
import { createUser } from "../api/users"

export function Up() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Changing:", e.target.name, "to", e.target.value)
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (validateForm()) {
      const { confirmPassword, ...data } = formData
      try {        
        createUser(data)
        alert('Account created successfully!')
      } catch (error) {
        console.error(error)
        alert('An error occurred creating your account :(')
      }
    }
  }

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return false
    }
    return true
  }

  return (
    <>
      <div className="h-screen flex items-center justify-center bg-prim-900 text-text-100">
        <main className="flex flex-col gap-4 md:w-1/4">
          <LogoTitle />
          <h2 className="text-xl font-bold">Create your account!</h2>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
              type="text"
              name="name"
              ph="Create your name"
              value={formData.name}
              onChange={handleChange}
            />

            <Input
              type="email"
              name="email"
              ph="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />

            <Input
              type="password"
              name="password"
              ph="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />

            <Input
              type="password"
              name="confirmPassword"
              ph="Confirm your passowrd"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <Submit val="Create"/>
          </form>

          <p className="text-prim-400">
            Already have an account?
            <a href="in" target="_self" className="text-text-100 font-semibold"> Sign in</a>
          </p>
        </main>
      </div>
    </>
  )
}
