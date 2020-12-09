import { render } from '@testing-library/react'
import React from 'react'

import App from './App'

test('renders app', () => {
  const tree = render(<App />)
  // const linkElement = tree.getByText(/Welcome/i)
  // expect(linkElement).toBeInTheDocument()
  expect(/portalRoot/.test(tree.container.innerHTML)).toBeTruthy()
})
