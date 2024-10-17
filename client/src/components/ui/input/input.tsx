type Props = {
  type: string,
  label?: string,
  name: string,
  ph: string
}

export function Input({ type, label, name, ph }: Props) {
  return (
    <>
      <div className="flex flex-col gap-1">
        <label htmlFor={name} className="text-sm">{label}</label>
          <input type={type} placeholder={ph} id={name}
          className="p-2 bg-prim-700 text-sm rounded-md border border-input-border
          outline-none placeholder-text-100 placeholder-opacity-60"
        />
      </div>
    </>
  )
}