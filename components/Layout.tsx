import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white mx-auto w-full">
      <Header />
      <main className="container mx-auto prose lg:prose-xl prose-invert">
        {children}
      </main>
      <Footer />
    </div>
  )
}
