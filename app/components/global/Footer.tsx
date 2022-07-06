import { colophon } from '~/lib/date'

export const Footer = () => {
  return (
    <div className="mt-auto w-full">
      <div className="text-center py-6 text-gray-700 text-sm tracking-wider font-semibold">
        &copy; {colophon()} Rohan Nair
      </div>
    </div>
  )
}
