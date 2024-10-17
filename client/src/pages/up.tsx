import { Input } from "../components/ui/input/input"
import { LogoTitle } from "../components/ui/logo/logo-title"

export function Up() {
  return (
    <>
      <div className="h-screen flex items-center justify-center bg-prim-900 text-text-100">
        <main className="flex flex-col gap-4 md:w-1/4">
          <LogoTitle />
          <h2 className="text-xl font-bold">Create your account!</h2>

          <form className="flex flex-col gap-4">
            <Input
              type="text"
              name="name"
              ph="Create your name"
            />

            <Input
              type="email"
              name="email"
              ph="Enter your email"
            />

            <Input
              type="password"
              name="password"
              ph="Enter your password"
            />

            <Input
              type="password"
              name="confirm-password"
              ph="Confirm your passowrd"
            />

            <input type="submit" value="Create"
              className="p-2 bg-success-400 rounded-md text-prim-900 font-semibold cursor-pointer"
            />
          </form>

          <p className="text-prim-400">
            Already have an account?
            <a href="#" target="_self" className="text-text-100 font-semibold"> Signin</a>
          </p>
        </main>
      </div>
    </>
  )
}
