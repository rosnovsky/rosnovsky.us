const generateSocialImage = ({ coverImage, title, meta }) => {
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://rosnovsky.us'
      : 'http://localhost:3000';

  console.log(`${baseUrl}${coverImage}`);

  return (
    <div className="mx-auto">
      <div
        className={`relative border-1 border-black bg-white  bg-cover z-1`}
        // style={{
        //   before: {
        //     content: '""',
        //     position: 'absolute',
        //     top: 0,
        //     right: 0,
        //     bottom: 0,
        //     left: 0,
        //     background: 'rgba(0, 0, 0, 0)',
        //     zIndex: 2,
        //   },
        // }}
      >
        <div
        // sx={{
        //   position: 'relative',
        //   flexDirection: 'column',
        //   justifyContent: 'space-between',
        //   width: '90%',
        //   height: '100%',
        //   padding: 30,
        //   background:
        //     'linear-gradient(75deg,rgb(255,255,255) 69%,rgb(66,153,225) 69%,rgb(229,62,62) 70%,transparent 0%)',
        //   color: 'rgb(0,0,0)',
        //   zIndex: 3,
        //   opacity: 0.9,
        // }}
        >
          <div className="align-center">
            <div
            // sx={{
            //   color: 'black',
            //   // textTransform: 'uppercase',
            //   fontFamily: 'body',
            //   fontSize: 15,
            // }}
            >
              rosnovsky.us
            </div>
          </div>

          <div>
            <div
            // sx={{
            //   marginBottom: 4,
            //   width: '70%',
            //   fontFamily: 'heading',
            //   fontSize: 6,
            //   fontWeight: '500',
            //   lineHeight: 'normal',
            // }}
            >
              {title}
            </div>
            <div
            // sx={{
            //   marginBottom: 3,
            //   fontFamily: 'body',
            //   fontSize: 2,
            //   fontWeight: '300',
            //   lineHeight: 'normal',
            //   color: 'black',
            // }}
            >
              {meta}
            </div>
          </div>
        </div>
      </div>
    </div>
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
