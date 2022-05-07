import Container from '@components/Container';
import NewsletterForm from '@components/NewsletterForm';
import Link from 'next/link';

export default function Custom404() {
  return (
    <Container>
      <section
        className="py-16 md:py-24 bg-white"
        style={{
          backgroundImage: `url('/flex-ui-assets/elements/pattern-white.svg')`,
          backgroundPosition: 'center top',
        }}
      >
        <div className="container px-4 mx-auto">
          <div className="md:max-w-2xl mx-auto mb-12 text-center">
            <h2 className="mb-4 text-3xl md:text-5xl leading-tight text-darkCoolGray-900 font-bold tracking-tighter">
              Page Not Found
            </h2>
          </div>

          <div className="w-full text-center prose prose-xl md:max-w-3xl mx-auto">
            Sorry, this page does not exist. Go <Link href="/">home</Link>.
          </div>
        </div>
      </section>
      <NewsletterForm />
    </Container>
  );
}
