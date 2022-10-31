import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'experimental-edge',
};

export default function OG(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // ?title=<title>
    const hasTitle = searchParams.has('title');
    const hasReadTime = searchParams.has('readTime'); // ?readTime=<readTime> 1 min read
    const hasDate = searchParams.has('date'); // ?date=<date> 2021-01-01
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'Blog post';
    const readTime = hasReadTime ? searchParams.get('readTime') : 'a few minutes'; // ?readTime=<readTime> 1 min read
    const date = hasDate ? searchParams.get('date') : 'sometime in the past'; // ?date=<date> 2021-01-01

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            backgroundColor: 'white',
            backgroundImage: 'radial-gradient(circle at 5px 5px, rgba(20, 184, 166, 0.1) 1%, transparent 0%), radial-gradient(circle at 15px 15px, rgba(20, 184, 166, 0.1) 2%, transparent 0%),radial-gradient(circle at 10px 10px, rgba(20, 184, 166, 0.2) 2%, transparent 0%), radial-gradient(circle at 15px 15px, rgba(20, 184, 166, 0.3) 3%, transparent 0%), ',
            backgroundSize: '50px 50px',
          }}
        >
          <div style={{
            border: '1px dashed rgba(20, 184, 166, 0.2)',
            padding: '100px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',

          }} >
            <div
              style={{
                display: 'flex',
                fontSize: '60px',
                fontStyle: 'normal',
                color: 'black',
                marginBottom: '30px',
                width: '80%',
                justifyContent: 'center',
                lineHeight: 1.3,
                fontWeight: 900,
                whiteSpace: 'pre-wrap',
              }}
            >
              {title}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 500,
                color: 'black'
              }}
            >
              {date}<svg role="img" xmlns="http://www.w3.org/2000/svg" width="30px" style={{ margin: '0 10px' }} height="30px" viewBox="0 0 24 24" stroke="rgb(20 184 166)" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" fill="none" color="rgb(20 184 166)">  <circle cx="12" cy="13" r="8" /> <path d="M12 9L12 13M18 7L20 5M15 2L9 2" /> </svg>{readTime}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 300,
                color: 'lightgrey',
                textDecoration: 'underline',
                marginTop: '70px'
              }}
            >rosnovsky.us</div>
          </div>
        </div >),
      {
        width: 1200,
        height: 600,
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
