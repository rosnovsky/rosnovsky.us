import React from 'react'
import Container from '../Containers/container'
import { Link } from 'gatsby'

const Alert = () => {
  return (
    <div className="border-b border-accent-2 construction">
      <Container>
        <div className="flex py-2 text-center text-sm">
          <div className="bg-white px-4 font-semibold text-lg mx-auto">
            Work in progress.{' '}
            <span className="underline hover:text-success duration-200 transition-colors">
              <Link to="/blog/2020/10/26/building-this-website/">
                Learn More &rarr;
              </Link>
            </span>
          </div>
          )
        </div>
      </Container>
    </div>
  )
}

export default Alert
