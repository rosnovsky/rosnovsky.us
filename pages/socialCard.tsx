import { Box, Flex, Paragraph } from 'theme-ui';
import { ThemeProvider } from 'theme-ui';

export const theme = {
  fonts: {
    body: 'Inter, system-ui, sans-serif',
    heading: '"Space Grotesk", sans-serif',
    monospace: 'Menlo, monospace',
  },
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#33e',
  },
};

const generateSocialImage = ({ coverImage, title, meta }) => {
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://rosnovsky.us'
      : 'http://localhost:3000';

  return (
    <ThemeProvider theme={theme}>
      <div className="mx-auto">
        <Box
          sx={{
            position: 'relative',
            border: '1px solid black',
            backgroundColor: 'white',
            backgroundImage: `url('${baseUrl}${coverImage}')`,
            backgroundSize: 'cover',
            width: '843px',
            aspectRatio: '16/9',
            zIndex: 1,
            '::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              background: 'rgba(0, 0, 0, 0)',
              zIndex: 2,
            },
          }}
        >
          <Flex
            sx={{
              position: 'relative',
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: '90%',
              height: '100%',
              padding: 30,
              background:
                'linear-gradient(75deg,rgb(255,255,255) 69%,rgb(66,153,225) 69%,rgb(229,62,62) 70%,transparent 0%)',
              color: 'rgb(0,0,0)',
              zIndex: 3,
              opacity: 0.9,
            }}
          >
            <Flex sx={{ alignItems: 'center' }}>
              <Paragraph
                sx={{
                  color: 'black',
                  // textTransform: 'uppercase',
                  fontFamily: 'body',
                  fontSize: 15,
                }}
              >
                rosnovsky.us
              </Paragraph>
            </Flex>

            <Box>
              <Paragraph
                sx={{
                  marginBottom: 4,
                  width: '70%',
                  fontFamily: 'heading',
                  fontSize: 6,
                  fontWeight: '500',
                  lineHeight: 'normal',
                }}
              >
                {title}
              </Paragraph>
              <Paragraph
                sx={{
                  marginBottom: 3,
                  fontFamily: 'body',
                  fontSize: 2,
                  fontWeight: '300',
                  lineHeight: 'normal',
                  color: 'black',
                }}
              >
                {meta}
              </Paragraph>
            </Box>
          </Flex>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default generateSocialImage;

export async function getServerSideProps(params: any) {
  const {
    title = 'Something went wrong: this is NOT the cover image you deserve!',
    meta = 'December 2, 2021 | 8 min read',
    coverImage = '/static/socialCard.jpg',
  } = params.query;
  return {
    props: {
      title,
      meta,
      coverImage,
    },
  };
}
