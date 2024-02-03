export const colophon = () => {
  return new Date().getFullYear() === 2021 ? '2021' : '2021 - present'
}

export const now = () => new Date(Date.now())
