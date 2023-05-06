import { colophon } from '~/lib/date'

export const Footer = () => {
  return (
    <div className="w-full mt-auto">
      <div className="py-6 text-sm font-semibold tracking-wider text-center text-gray-700">
        &copy; {colophon()} Rohan Nair
      </div>
    </div>
  )
}
