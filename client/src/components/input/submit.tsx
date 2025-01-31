export function Submit({ val }: { val: string }) {
  return (
    <button type="submit"
      className="p-2 bg-success-400 rounded-md text-prim-900 font-semibold cursor-pointer"
    >{val}</button>
  )
}
