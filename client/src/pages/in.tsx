import { Input } from "../components/ui/input/input"
import { Submit } from "../components/ui/input/submit"
import { LogoTitle } from "../components/ui/logo/logo-title"

export function In() {
  return (
    <>
      <div className="h-screen flex items-center justify-center bg-prim-900 text-text-100">
        <main className="flex flex-col gap-4 md:w-1/4">
          <LogoTitle />
          <h2 className="text-xl font-bold">Enter your account!</h2>

          <form className="flex flex-col gap-4">
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

            <Submit val="Enter" />
          </form>

          <p className="text-prim-400">
            Don't have an account yet?
            <a href="up" target="_self" className="text-text-100 font-semibold"> Signup</a>
          </p>
        </main>
      </div>
    </>
  )
}
