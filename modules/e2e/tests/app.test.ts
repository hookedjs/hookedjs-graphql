import 'expect-puppeteer'

import { loadPage } from '../load'

describe('React App', () => {
  it('should be titled \'Login - Boilerplate\'', async () => {
    await loadPage({})
    expect(await page.title()).toBe('Login - Boilerplate')
  })
})
