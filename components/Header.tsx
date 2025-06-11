import Link from 'next/link'

export default function Header() {
  return (
    <header className="flex w-full items-center justify-between py-6 px-4 md:px-6 bg-gray-900 flex-grow-0">
      <div className="container mx-auto flex flex-row justify-between items-baseline">
        <h1>
          <Link href="/" className="text-xl font-bold">Rohan Nair</Link>
        </h1>
        <nav className="flex items-center gap-4 md:gap-6">
          <Link href="/posts" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors md:text-base">Posts</Link>
          <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors md:text-base">Contact</Link>
        </nav>
      </div>
    </header>
  )
}
