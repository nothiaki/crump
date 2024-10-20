export function Submit({ val }: { val: string }) {
  return (
    <>
      <input type="submit" value={val}
        className="p-2 bg-success-400 rounded-md text-prim-900 font-semibold cursor-pointer"
      />
    </>
  )
}
