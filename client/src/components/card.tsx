type Props = {
  user: string,
  user_img: string,
}

export function Card({ user, user_img }: Props) {
  return (
    <>
      <div
        className="text-text-100 bg-prim-800 border border-input-border rounded-md p-10 flex flex-col items-center gap-6"
      >
        <img src={user_img}
          className="h-48 rounded-full"
        />
        <h2 className="text-xl font-bold">/{user}</h2>
      </div>
    </>
  )
}

