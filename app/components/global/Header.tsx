import { Link } from '@remix-run/react'

export function Header() {
  return (
    <div className="w-full">
      <div className="flex flex-row items-center w-2/3 pt-10 pb-2 m-auto text-lg">
        <Link to="/">
          <h2 className="p-0 m-0 text-2xl">Rohan Nair</h2>
        </Link>
        <nav className="flex flex-row ml-auto space-x-4">
          <Link to="/articles">Articles</Link>
        </nav>
      </div>
    </div>
  )
}
