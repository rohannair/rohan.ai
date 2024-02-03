import { Link } from '@remix-run/react'

export function Header() {
  return (
    <div className="w-full">
      <div className="m-auto flex w-2/3 flex-row items-center pb-2 pt-10 text-lg">
        <Link to="/">
          <h2 className="m-0 p-0 text-2xl">Rohan Nair</h2>
        </Link>
        <nav className="ml-auto flex flex-row space-x-4"></nav>
      </div>
    </div>
  )
}
