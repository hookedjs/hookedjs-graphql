import { render } from '@testing-library/react'
import React from 'react'

test('renders div', () => {
  const tree = render(<div />)
  // const linkElement = tree.getByText(/Welcome/i)
  // expect(linkElement).toBeInTheDocument()
  expect(/div/.test(tree.container.innerHTML)).toBeTruthy()
})
