import { Crump } from "../components/ui/crump";

export function Home() {
  return (
    <>
      <div className="h-screen flex items-center justify-center bg-prim-900 text-text-100">
        <main className="flex flex-col gap-4 md:w-1/4">
          <Crump />
        </main>
      </div>
    </>
  )
}
