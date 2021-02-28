import Container from '../Layout/container'
import Link from 'next/link'
import { BlogAlert } from '../..'

const Alert = ({ message, alertLink, internal }: BlogAlert) => {
  return (
    <div className="border-b border-accent-2 construction">
      <Container>
        <div className="flex py-2 text-center text-sm">
          <div className="bg-white px-4 font-semibold text-lg mx-auto">
            {message}{' '}
            {alertLink ? (
              <span className="underline hover:text-success duration-200 transition-colors">
                {internal ? (
                  <Link href={alertLink}>Learn More &rarr;</Link>
                ) : (
                  <a href={alertLink}>Learn More &rarr;</a>
                )}
              </span>
            ) : (
              ''
            )}
          </div>
          )
        </div>
      </Container>
    </div>
  )
}

export default Alert
