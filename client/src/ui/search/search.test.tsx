import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

import Search from './Search'

test('Search renders with the correct label', () => {
  const labelText = 'Search'
  render(<Search size="medium">{labelText}</Search>)

  const labelElement = screen.getByText(labelText)
  expect(labelElement).toBeInTheDocument()
})

test('Search input responds to user input', () => {
  render(<Search size="medium">Search</Search>)

  const inputElement = screen.getByLabelText('Search')
  fireEvent.change(inputElement, { target: { value: 'test' } })

  expect(inputElement).toHaveValue('test')
})
