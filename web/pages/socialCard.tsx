const generateSocialImage = ({ coverImage, title, meta }) => {
  return (
    <div className="mx-auto">
      <div
        className={`relative border-1 border-black bg-white  bg-cover z-1 before:content-['""'] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:z-2`}
        style={{
          backgroundImage: `url('${coverImage}')`,
        }}
      >
        <div
          className="relative flex flex-col justify-between w-9/10 min-h-screen p-10 z-3 opacity-90 bg-gradient-to-r-bottom bg-gradient-to-r-top "
          style={{
            background:
              'linear-gradient(75deg,rgb(255,255,255) 69%,rgb(66,153,225) 69%,rgb(229,62,62) 70%,transparent 0%)',
          }}
        >
          <div className="align-center">
            <div className="text-sx prose-lead">rosnovsky.us</div>
          </div>

          <div>
            <div className="mb-20 w-2/3 prose font-black text-5xl">{title}</div>
            <div className="mb-3 prose-body text-sm font-medium">{meta}</div>
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
