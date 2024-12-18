type Props = {
  user: string,
  user_img: string,
  date: string,
  title: string,
  content: string
}

export function Crump({ user, user_img, date, title, content }: Props) {
  //calc date to display this times: "less tha an hour" or "x hours ago" or "dd month"
  return (
    <>
      <div className="text-text-100 bg-prim-800 border border-input-border rounded-md p-6">
        <div className="flex gap-4 items-center">
          <img src={user_img}
            className="h-12 rounded-full"
          />
          <div>
            <p className="text-base">{user}</p>
            <p className="text-prim-400 text-sm">{date}</p>
          </div>
        </div>
        <h2 className="text-lg font-semibold py-2 text-text-100">{title}</h2>
        <p className="text-sm">{content}</p>
      </div>
    </>
  )
}

