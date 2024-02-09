import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import Link from './Link'

test('Renders a link with the correct text and href', () => {
  const linkText = 'Click me'
  const linkHref = '/some-page'
  render(<Link to={linkHref}>{linkText}</Link>)

  const linkElement = screen.getByText(linkText)
  expect(linkElement).toBeInTheDocument()
  expect(linkElement).toHaveAttribute('href', linkHref)
})

test('Link renders with the correct custom class', () => {
  const linkText = 'Click me'
  const customClassName = 'custom-class'
  render(
    <Link to="/" className={customClassName}>
      {linkText}
    </Link>,
  )

  const linkElement = screen.getByText(linkText)
  expect(linkElement).toHaveClass(customClassName)
})
