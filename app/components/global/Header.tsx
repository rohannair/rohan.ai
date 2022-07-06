import { Link } from '@remix-run/react'

export function Header() {
  return (
    <div className="w-full">
      <div className="w-2/3 m-auto pt-10 pb-2 flex flex-row items-center text-lg">
        <Link to="/">
          <h2 className="text-2xl m-0 p-0">Rohan Nair</h2>
        </Link>
        <nav className="flex flex-row ml-auto space-x-4">
          <Link to="/articles">Articles</Link>
        </nav>
      </div>
    </div>
  )
}
