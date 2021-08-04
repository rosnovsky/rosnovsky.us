import SubscribeCard from '../components/Cards/SubscribeCard';

import Container from '../components/Container';

const Talk = ({ title, link, children }) => (
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
    <Container title="About – Art Rosnovsky">
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          About Me
        </h1>
        <div className="mb-8 prose leading-6 text-gray-600 dark:text-gray-400">
        </div>
        <h2 className="font-bold text-3xl tracking-tight mb-4 text-black dark:text-white">
          Podcasts in Russian // Подкасты на русском
        </h2>
        <Talk
          title="Rosnovsky Park™ Weekly"
          link="https://gumroad.com/rosnovsky#gdTD"
        >
          Все доступные эпизоды подкаста Rosnovsky Park™ Weekly, одного из старейших подкастов на русском языке.
        </Talk>
        <Talk
          title="Rosnovsky In Canada"
          link="https://gumroad.com/rosnovsky#iYQx"
        >
          Все 39 эпизодов подкаста Rosnovsky in Canada. Как получить визу в Канаду, как приехать учиться и остаться, на что похожа учеба и жизнь семьи в Канаде, где и как может учиться ребенок, на что посмотреть, куда съездить и так далее.
        </Talk>
        <Talk
          title="Evergreen Podcast"
          link="https://gumroad.com/rosnovsky#qaxYX"
        >
          <p>Самый аутентичный подкаст на русском языке!</p>

          <p>Легендарный ведущий старейших подкастов на русском языке представляет третью серию подкастов — Вечнозелёный подкаст из вечнозеленого штата Вашингтон, что на Тихоокеанском Северо-Западе США 🇺🇸. Путешествия, походы, природа, работа, технологии, семья, дети, деньги — всё, что волнует интересует!</p>
        </Talk>
      <SubscribeCard />
      </div>
    </Container>
  );
}
