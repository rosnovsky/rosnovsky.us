import Quote from '@components/Utils/Quote';
import SubscribeCard from '@components/Cards/SubscribeCard';

import Container from '@components/Container';

const ExternalLink = ({ href, children }) => (
  <a
    className="text-gray-900 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-500 transition"
    target="_blank"
    rel="noopener noreferrer"
    href={href}
  >
    {children}
  </a>
);

const Podcast = ({ title, link, children }) => (
  <>
    <h3 className="font-medium mb-2 text-lg">
      <a
        className="flex items-center text-gray-900 dark:text-gray-100"
        target="_blank"
        rel="noopener noreferrer"
        href={link}
      >
        {title}
        <div>
          <svg
            className="h-4 w-4 ml-1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </div>
      </a>
    </h3>
    <p className="text-gray-600 dark:text-gray-400 mb-8">{children}</p>
  </>
);

export default function About() {
  return (
    <Container title="About - Art Rosnovsky">
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          About Me
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mt-5 mb-8">
          Hey, my name is Art.
        </p>

        <p className="text-gray-600 dark:text-gray-400 mb-4">
          I&apos;m a web developer based off Western Washington. I live about 50
          miles north of Seattle in a small town called Arlington.
        </p>

        <Quote
          quote={
            'For a while, I lived in London (not that one, but the one in Ontario, Canada) before moving to Vancouver (not that one, but the one in Washington; not that Washington, but Washington state). Now I live in Arlington (and not the one in Virgina, mind you!)'
          }
        />

        <p className="text-gray-600 dark:text-gray-400 mb-4">
          After short gigs at Intel, AT&T, and Microsoft, I ended up at{' '}
          <ExternalLink href="https://auth0.com">Auth0</ExternalLink> (aquired
          by <ExternalLink href="https://okta.com">Okta</ExternalLink> in May
          2021). Here I work as a Customer Onboarding Engineer, building out
          Auth0&apos;s enterprise customer onboarding program and tooling.
        </p>

        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Feel free to connect with me on{' '}
          <ExternalLink href="https://www.linkedin.com/in/rosnovsky/">
            LinkedIn
          </ExternalLink>{' '}
          or follow me on{' '}
          <ExternalLink href="https://www.twitter.com/rosnovsky/">
            Twitter
          </ExternalLink>
          .
        </p>

        <Quote quote="For the longest time, I'd been a podcaster. In my previous life, I even was a minor radio celebrity, worked as a television producer and correspondent, and have done a bunch of front-line reporting from terrorist attacks, riots, and hostage situations. Yet here we are." />

        <h2 className="font-bold text-3xl tracking-tight my-4 text-black dark:text-white">
          Podcasts in Russian // Подкасты на русском
        </h2>
        <Podcast
          title="Rosnovsky Park™ Weekly"
          link="https://gumroad.com/rosnovsky#gdTD"
        >
          Все доступные эпизоды подкаста Rosnovsky Park™ Weekly, одного из
          старейших подкастов на русском языке.
        </Podcast>
        <Podcast
          title="Rosnovsky In Canada"
          link="https://gumroad.com/rosnovsky#iYQx"
        >
          Все 39 эпизодов подкаста Rosnovsky in Canada. Как получить визу в
          Канаду, как приехать учиться и остаться, на что похожа учеба и жизнь
          семьи в Канаде, где и как может учиться ребенок, на что посмотреть,
          куда съездить и так далее.
        </Podcast>
        <Podcast
          title="Evergreen Podcast"
          link="https://gumroad.com/rosnovsky#qaxYX"
        >
          <p>Самый аутентичный подкаст на русском языке!</p>

          <p>
            Легендарный ведущий старейших подкастов на русском языке
            представляет третью серию подкастов — Вечнозелёный подкаст из
            вечнозеленого штата Вашингтон, что на Тихоокеанском Северо-Западе
            США 🇺🇸. Путешествия, походы, природа, работа, технологии, семья,
            дети, деньги — всё, что волнует интересует!
          </p>
        </Podcast>
        <SubscribeCard />
      </div>
    </Container>
  );
}
