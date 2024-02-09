import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import ButtonConnection from './ButtonConnection'

test('ButtonConnection renders with the correct text', () => {
  const buttonText = 'Connect with Apple'
  render(<ButtonConnection>{buttonText}</ButtonConnection>)

  const buttonElement = screen.getByText(buttonText)
  expect(buttonElement).toBeInTheDocument()
})

test('ButtonConnection has the correct default size class', () => {
  const buttonText = 'Connect with Google'
  render(<ButtonConnection>{buttonText}</ButtonConnection>)

  const buttonElement = screen.getByText(buttonText)
  expect(buttonElement).toHaveClass('w-[268px] h-[53px]')
})

test('ButtonConnection has the correct custom size class', () => {
  const buttonText = 'Connect with GitHub'
  render(<ButtonConnection size="small">{buttonText}</ButtonConnection>)

  const buttonElement = screen.getByText(buttonText)
  expect(buttonElement).toHaveClass('w-[200px] h-[48px]')
})

test('ButtonConnection uses the correct variant image', () => {
  const buttonText = 'Connect with GitHub'
  render(<ButtonConnection variant="github">{buttonText}</ButtonConnection>)

  const imgElement = screen.getByAltText('imgLogo')
  expect(imgElement).toHaveAttribute('src', '/github.svg')
})
