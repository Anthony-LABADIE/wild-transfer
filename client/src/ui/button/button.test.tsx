import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import Button from './Button'

test('Renders the main page', () => {
  render(<Button>Clik me</Button>)
  expect(screen.getByText('Clik me')).toBeInTheDocument()
})

test('Button renders with the correct text', () => {
  const buttonText = 'Click me'
  render(<Button>{buttonText}</Button>)

  // Use the getByText query to find the button element by its text
  const buttonElement = screen.getByText(buttonText)

  // Assert that the button element is in the document
  expect(buttonElement).toBeInTheDocument()
})

test('Button has the correct default size class', () => {
  const buttonText = 'Click me'
  render(<Button>{buttonText}</Button>)

  // Use the getByText query to find the button element by its text
  const buttonElement = screen.getByText(buttonText)

  // Assert that the button element has the default size class
  expect(buttonElement).toHaveClass('w-[314px] h-[48px]')
})

test('Button has the correct custom class', () => {
  const buttonText = 'Click me'
  const customClassName = 'custom-class'
  render(<Button className={customClassName}>{buttonText}</Button>)

  // Use the getByText query to find the button element by its text
  const buttonElement = screen.getByText(buttonText)

  // Assert that the button element has the custom class
  expect(buttonElement).toHaveClass(customClassName)
})
