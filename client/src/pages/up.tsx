import { LogoTitle } from "../components/ui/logo/logo-title"

export function Up() {
  return (
    <>
      <div className="h-screen flex items-center justify-center bg-prim-900 text-text-100">
        <main className="flex flex-col gap-4 md:w-1/4">
          <LogoTitle />
          <h2 className="text-xl font-bold">Create your account!</h2>

          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-sm">Name</label>
              <input type="text" placeholder="Create a name" id="name"
                className="p-2 bg-prim-700 text-sm rounded-md border border-input-border
                  outline-none placeholder-text-100 placeholder-opacity-60"
              />
            </div>

            <input type="submit" value="Create"
              className="p-2 bg-success-400 rounded-md text-prim-900 font-semibold"
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
