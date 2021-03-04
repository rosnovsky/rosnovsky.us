import { render, screen } from '@testing-library/react'
import Footer from '../components/Footer/footer'

const menuItems = [{ title: 'Test Page', slug: { current: 'test' } }]

describe('Footer Component', () => {
  it('Displays Page Links', async () => {
    render(<Footer menuItems={menuItems} />)
    expect(screen.getByText('Test Page')).toBeInTheDocument
  })
})
