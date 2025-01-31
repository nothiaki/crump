import logo from "../../assets/logo.svg"

export function LogoTitle() {
  return (
    <>
      <div className="text-text-100 flex items-center gap-4">
        <img src={logo} alt="crump-logo" className="h-10" />
        <h1 className="text-3xl font-bold">Crump</h1>
      </div>
    </>
  )
}
