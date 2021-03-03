import { render, screen } from '@testing-library/react'
import Alert from '../components/Alert/alert'

describe('Alert', () => {
  it('renders when active', () => {
    render(
      <Alert
        message="Alert Message"
        alertLink="https://cnn.com"
        internal={true}
      />
    )
    expect(screen.getByRole('link', { name: 'Learn More →' })).toHaveAttribute(
      'href',
      'https://cnn.com'
    )
  })
})
