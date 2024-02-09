import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import Title from './Title'

test('Title renders with the correct text', () => {
  render(<Title />)

  const wildText = screen.getByText('Wild')
  const transfertText = screen.getByText('Transfert')

  expect(wildText).toBeInTheDocument()
  expect(transfertText).toBeInTheDocument()
})

test('Title has the correct styling', () => {
  render(<Title />)

  const titleElement = screen.getByRole('heading', { level: 1 })
  expect(titleElement).toHaveClass('font-bold text-[34px] leading-8')

  const wildText = screen.getByText('Wild')
  expect(wildText).toHaveClass('text-[#66625D]')

  const transfertText = screen.getByText('Transfert')
  expect(transfertText).toHaveClass('text-[#6A2AFE]')
})
