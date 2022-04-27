import Image from 'next/image';
import Footer from '@components/Footer';
import { NavBar } from '@components/NavBar';
import cover from '../../public/flex-ui-assets/images/blog-content/content-photo1.jpg';
import content from '../../public/flex-ui-assets/images/blog-content/content-photo3.jpg';

const Post = () => {
  return (
    <div className="">
      <section className="relative bg-coolGray-50 overflow-hidden">
        <div className="bg-transparent">
          <NavBar />
          <section
            className="py-16 md:py-24 bg-white"
            style={{
              backgroundImage: `url('/flex-ui-assets/elements/pattern-white.svg')`,
              backgroundPosition: 'center top',
            }}
          >
            <div className="container px-4 mx-auto">
              <div className="md:max-w-2xl mx-auto mb-12 text-center">
                <div className="flex items-center justify-center">
                  <p className="inline-block text-blue-500 font-medium">
                    John Doe
                  </p>
                  <span className="mx-1 text-blue-500">•</span>
                  <p className="inline-block text-blue-500 font-medium">
                    19 Jan 2022
                  </p>
                </div>
                <h2 className="mb-4 text-3xl md:text-5xl leading-tight text-darkCoolGray-900 font-bold tracking-tighter">
                  Lorem ipsum dolor sit amet
                </h2>
                <p className="mb-6 text-lg md:text-xl font-medium text-coolGray-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <div className="inline-block py-1 px-3 text-xs leading-5 text-blue-500 font-medium uppercase bg-blue-100 rounded-full shadow-sm">
                  Technology
                </div>
              </div>
              <div className="mb-10 mx-auto max-w-max overflow-hidden rounded-lg">
                <Image src={cover} placeholder="blur" objectFit="cover" />
              </div>
              <div className="md:max-w-3xl mx-auto">
                <p className="mb-8 pb-10 text-lg md:text-xl font-medium text-coolGray-500 border-b border-coolGray-100">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  ullamcorper mattis lorem non. Ultrices praesent amet ipsum
                  justo massa. Eu dolor aliquet risus gravida nunc at feugiat
                  consequat purus. Non massa enim vitae duis mattis. Vel in
                  ultricies vel fringilla.
                </p>
                <h3 className="mb-4 text-2xl md:text-3xl font-semibold text-coolGray-800">
                  Header 1
                </h3>
                <p className="mb-4 text-base md:text-lg text-coolGray-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  ullamcorper mattis lorem non. Ultrices praesent amet ipsum
                  justo massa. Eu dolor aliquet risus gravida nunc at feugiat
                  consequat purus. Non massa enim vitae duis mattis. Vel in
                  ultricies vel fringilla.
                </p>
                <div className="mb-6 p-6 border-l-2 border-blue-500">
                  <p className="mb-4 text-xl md:text-2xl leading-tight font-medium text-coolGray-800">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec ullamcorper mattis lorem non. Ultrices praesent amet
                    ipsum justo massa. Eu dolor aliquet risus gravida nunc at
                    feugiat consequat purus.
                  </p>
                  <span className="text-base md:text-lg text-coolGray-400 font-medium">
                    — John Doe, CEO &amp; Founder
                  </span>
                </div>
                <p className="mb-6 text-base md:text-lg text-coolGray-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  ullamcorper mattis lorem non. Ultrices praesent amet ipsum
                  justo massa. Eu dolor aliquet risus gravida nunc at feugiat
                  consequat purus. Non massa enim vitae duis mattis. Vel in
                  ultricies vel fringilla.
                </p>
                <div className="mb-4 max-w-max overflow-hidden rounded-md">
                  <Image src={content} placeholder="blur" objectFit="cover" />
                </div>
                <p className="mb-8 text-base md:text-lg text-coolGray-400 font-medium">
                  <span>Non massa enim vitae duis mattis. Vel in</span>
                  <a className="hover:text-coolGray-600 underline" href="1">
                    ultricies
                  </a>
                  <span>vel fringilla.</span>
                </p>
                <h3 className="mb-4 text-2xl md:text-3xl font-semibold text-coolGray-800">
                  Header 1
                </h3>
                <p className="mb-14 text-base md:text-lg text-coolGray-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  ullamcorper mattis lorem non. Ultrices praesent amet ipsum
                  justo massa. Eu dolor aliquet risus gravida nunc at feugiat
                  consequat purus. Non massa enim vitae duis mattis. Vel in
                  ultricies vel fringilla.
                </p>
                <p className="mb-4 text-base md:text-lg text-coolGray-500">
                  Sagittis et eu at elementum, quis in. Proin praesent volutpat
                  egestas sociis sit lorem nunc nunc sit. Eget diam curabitur mi
                  ac. Auctor rutrum lacus malesuada massa ornare et. Vulputate
                  consectetur ac ultrices at diam dui eget fringilla tincidunt.
                  Arcu sit dignissim massa erat cursus vulputate gravida id. Sed
                  quis auctor vulputate hac elementum gravida cursus dis.
                </p>
                <ol className="list-decimal list-inside md:px-5 mb-14 text-base md:text-lg text-coolGray-500">
                  <li>Lectus id duis vitae porttitor enim gravida morbi.</li>
                  <li>
                    Eu turpis posuere semper feugiat volutpat elit, ultrices
                    suspendisse. Auctor vel in vitae placerat.
                  </li>
                  <li>
                    Suspendisse maecenas ac donec scelerisque diam sed est duis
                    purus.
                  </li>
                </ol>
                <p className="mb-10 pb-10 text-base md:text-lg text-coolGray-500 border-b border-coolGray-100">
                  <span>
                    Vestibulum placerat magna nulla, sit amet venenatis sapien
                    consequat ut. Cras pulvinar, lorem tristique pharetra
                    finibus, dui erat finibus orci, a vehicula arcu sapien id
                    metus. Quisque quis lorem a sem porttitor feugiat. Etiam
                    quis congue est. Donec fermentum ac libero a pretium. Nulla
                    nisl sem, euismod ut eros vitae, egestas scelerisque enim.
                  </span>
                  <a
                    className="text-blue-500 hover:text-blue-600 underline"
                    href="1"
                  >
                    Vivamus id pharetra massa
                  </a>
                  <span>
                    . Nulla aliquet erat elit, a gravida dui efficitur vel. Sed
                    pulvinar diam sed neque ullamcorper semper. Nulla elementum
                    arcu lacus, quis porta nisl posuere varius. Quisque tempus
                    libero sed urna posuere hendrerit.
                  </span>
                </p>
                <div className="flex items-center justify-center">
                  <a
                    className="inline-flex mr-4 items-center justify-center py-2 px-4 text-coolGray-300 hover:text-coolGray-400 bg-white hover:bg-coolGray-100 border border-coolGray-200 hover:border-coolGray-300 rounded-md shadow-md transition duration-200"
                    href="1"
                  >
                    <svg
                      width="20"
                      height="16"
                      viewBox="0 0 20 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 13.8333H5C4.33696 13.8333 3.70108 13.5699 3.23224 13.1011C2.76339 12.6323 2.5 11.9964 2.5 11.3333V4.66667C2.5 4.44565 2.41221 4.23369 2.25592 4.07741C2.09964 3.92113 1.88768 3.83333 1.66667 3.83333C1.44566 3.83333 1.23369 3.92113 1.07741 4.07741C0.921133 4.23369 0.833336 4.44565 0.833336 4.66667V11.3333C0.833336 12.4384 1.27232 13.4982 2.05372 14.2796C2.44063 14.6665 2.89996 14.9734 3.40549 15.1828C3.91101 15.3922 4.45283 15.5 5 15.5H15C15.221 15.5 15.433 15.4122 15.5893 15.2559C15.7455 15.0996 15.8333 14.8877 15.8333 14.6667C15.8333 14.4457 15.7455 14.2337 15.5893 14.0774C15.433 13.9211 15.221 13.8333 15 13.8333ZM19.1667 6.28333C19.158 6.20678 19.1412 6.13136 19.1167 6.05833V5.98333C19.0766 5.89765 19.0232 5.81889 18.9583 5.75V5.75L13.9583 0.75C13.8894 0.68518 13.8107 0.631734 13.725 0.591667H13.65L13.3833 0.5H6.66667C6.00363 0.5 5.36774 0.763392 4.8989 1.23223C4.43006 1.70107 4.16667 2.33696 4.16667 3V9.66667C4.16667 10.3297 4.43006 10.9656 4.8989 11.4344C5.36774 11.9033 6.00363 12.1667 6.66667 12.1667H16.6667C17.3297 12.1667 17.9656 11.9033 18.4344 11.4344C18.9033 10.9656 19.1667 10.3297 19.1667 9.66667V6.33333C19.1667 6.33333 19.1667 6.33333 19.1667 6.28333ZM14.1667 3.34167L16.325 5.5H15C14.779 5.5 14.567 5.4122 14.4107 5.25592C14.2545 5.09964 14.1667 4.88768 14.1667 4.66667V3.34167ZM17.5 9.66667C17.5 9.88768 17.4122 10.0996 17.2559 10.2559C17.0996 10.4122 16.8877 10.5 16.6667 10.5H6.66667C6.44565 10.5 6.23369 10.4122 6.07741 10.2559C5.92113 10.0996 5.83334 9.88768 5.83334 9.66667V3C5.83334 2.77899 5.92113 2.56702 6.07741 2.41074C6.23369 2.25446 6.44565 2.16667 6.66667 2.16667H12.5V4.66667C12.5 5.32971 12.7634 5.96559 13.2322 6.43443C13.7011 6.90327 14.337 7.16667 15 7.16667H17.5V9.66667Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <span className="ml-2 text-sm text-coolGray-500 hover:text-coolGray-600 font-medium">
                      Copy Link
                    </span>
                  </a>
                  <a
                    className="inline-flex mr-2 h-9 w-9 items-center justify-center text-coolGray-500 hover:text-coolGray-600 bg-white hover:bg-coolGray-100 border border-coolGray-200 rounded-md shadow-md transition duration-200"
                    href="1"
                  >
                    <svg
                      width="10"
                      height="18"
                      viewBox="0 0 10 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.6 3.43332H9.16667V0.783318C8.40813 0.70444 7.64596 0.665497 6.88333 0.666651C4.61667 0.666651 3.06667 2.04998 3.06667 4.58332V6.76665H0.508333V9.73332H3.06667V17.3333H6.13333V9.73332H8.68333L9.06667 6.76665H6.13333V4.87498C6.13333 3.99998 6.36667 3.43332 7.6 3.43332Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </a>
                  <a
                    className="inline-flex mr-2 h-9 w-9 items-center justify-center text-coolGray-500 hover:text-coolGray-600 bg-white hover:bg-coolGray-100 border border-coolGray-200 rounded-md shadow-md transition duration-200"
                    href="1"
                  >
                    <svg
                      width="18"
                      height="14"
                      viewBox="0 0 18 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.3333 1.83339C16.7069 2.10513 16.0445 2.28477 15.3667 2.36672C16.0818 1.93949 16.6177 1.26737 16.875 0.475053C16.203 0.875105 15.4673 1.15697 14.7 1.30839C14.1871 0.752196 13.5041 0.381966 12.7582 0.255762C12.0122 0.129558 11.2455 0.254518 10.5782 0.611044C9.91087 0.96757 9.38078 1.5355 9.07104 2.22575C8.76129 2.916 8.68941 3.68954 8.86667 4.42505C7.50786 4.35632 6.1787 4.00251 4.96555 3.3866C3.75239 2.77069 2.68237 1.90646 1.825 0.850052C1.52428 1.37519 1.36627 1.9699 1.36667 2.57505C1.3656 3.13704 1.50352 3.69057 1.76813 4.18636C2.03275 4.68215 2.41585 5.10481 2.88333 5.41672C2.33998 5.40194 1.80824 5.25613 1.33333 4.99172V5.03339C1.33741 5.82079 1.61333 6.58263 2.11443 7.19002C2.61553 7.79742 3.31105 8.21309 4.08333 8.36672C3.78605 8.45719 3.4774 8.50489 3.16667 8.50839C2.95158 8.50587 2.73702 8.48637 2.525 8.45005C2.74493 9.1274 3.17052 9.71934 3.74256 10.1435C4.31461 10.5677 5.00465 10.803 5.71667 10.8167C4.51434 11.7628 3.0299 12.2791 1.5 12.2834C1.22145 12.2843 0.943114 12.2676 0.666668 12.2334C2.22869 13.2419 4.04901 13.7773 5.90833 13.7751C7.19141 13.7884 8.46428 13.5459 9.6526 13.0618C10.8409 12.5777 11.9209 11.8616 12.8293 10.9555C13.7378 10.0493 14.4566 8.97121 14.9438 7.78414C15.431 6.59707 15.6767 5.32483 15.6667 4.04172C15.6667 3.90005 15.6667 3.75005 15.6667 3.60005C16.3206 3.11239 16.8846 2.51457 17.3333 1.83339V1.83339Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </a>
                  <a
                    className="inline-flex h-9 w-9 items-center justify-center text-coolGray-500 hover:text-coolGray-600 bg-white hover:bg-coolGray-100 border border-coolGray-200 rounded-md shadow-md transition duration-200"
                    href="1"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.45 3.54996C13.2522 3.54996 13.0589 3.60861 12.8944 3.71849C12.73 3.82837 12.6018 3.98455 12.5261 4.16728C12.4504 4.35 12.4306 4.55107 12.4692 4.74505C12.5078 4.93903 12.603 5.11721 12.7429 5.25707C12.8827 5.39692 13.0609 5.49216 13.2549 5.53074C13.4489 5.56933 13.65 5.54953 13.8327 5.47384C14.0154 5.39815 14.1716 5.26998 14.2815 5.10553C14.3913 4.94108 14.45 4.74774 14.45 4.54996C14.45 4.28474 14.3446 4.03039 14.1571 3.84285C13.9696 3.65532 13.7152 3.54996 13.45 3.54996V3.54996ZM17.2833 5.56663C17.2671 4.87521 17.1376 4.19113 16.9 3.54163C16.6881 2.9859 16.3583 2.48269 15.9333 2.06663C15.5207 1.63948 15.0163 1.31177 14.4583 1.10829C13.8105 0.863427 13.1257 0.730968 12.4333 0.716626C11.55 0.666626 11.2667 0.666626 9 0.666626C6.73333 0.666626 6.45 0.666626 5.56666 0.716626C4.87429 0.730968 4.18945 0.863427 3.54166 1.10829C2.98473 1.31383 2.48078 1.64126 2.06666 2.06663C1.63952 2.47927 1.31181 2.98366 1.10833 3.54163C0.863465 4.18941 0.731006 4.87425 0.716664 5.56663C0.666664 6.44996 0.666664 6.73329 0.666664 8.99996C0.666664 11.2666 0.666664 11.55 0.716664 12.4333C0.731006 13.1257 0.863465 13.8105 1.10833 14.4583C1.31181 15.0163 1.63952 15.5206 2.06666 15.9333C2.48078 16.3587 2.98473 16.6861 3.54166 16.8916C4.18945 17.1365 4.87429 17.269 5.56666 17.2833C6.45 17.3333 6.73333 17.3333 9 17.3333C11.2667 17.3333 11.55 17.3333 12.4333 17.2833C13.1257 17.269 13.8105 17.1365 14.4583 16.8916C15.0163 16.6881 15.5207 16.3604 15.9333 15.9333C16.3602 15.5188 16.6903 15.0151 16.9 14.4583C17.1376 13.8088 17.2671 13.1247 17.2833 12.4333C17.2833 11.55 17.3333 11.2666 17.3333 8.99996C17.3333 6.73329 17.3333 6.44996 17.2833 5.56663V5.56663ZM15.7833 12.3333C15.7773 12.8623 15.6815 13.3864 15.5 13.8833C15.3669 14.246 15.1532 14.5736 14.875 14.8416C14.6047 15.117 14.2777 15.3303 13.9167 15.4666C13.4197 15.6481 12.8956 15.7439 12.3667 15.75C11.5333 15.7916 11.225 15.8 9.03333 15.8C6.84166 15.8 6.53333 15.8 5.7 15.75C5.15074 15.7602 4.60383 15.6757 4.08333 15.5C3.73815 15.3567 3.42613 15.1439 3.16666 14.875C2.89007 14.6072 2.67903 14.2793 2.55 13.9166C2.34654 13.4126 2.2337 12.8766 2.21666 12.3333C2.21666 11.5 2.16666 11.1916 2.16666 8.99996C2.16666 6.80829 2.16666 6.49996 2.21666 5.66663C2.2204 5.12584 2.31912 4.58991 2.50833 4.08329C2.65504 3.73155 2.88022 3.41801 3.16666 3.16663C3.41984 2.8801 3.73274 2.65254 4.08333 2.49996C4.59129 2.31666 5.12666 2.22086 5.66666 2.21663C6.5 2.21663 6.80833 2.16663 9 2.16663C11.1917 2.16663 11.5 2.16663 12.3333 2.21663C12.8623 2.22269 13.3864 2.3185 13.8833 2.49996C14.262 2.6405 14.6019 2.869 14.875 3.16663C15.1481 3.42261 15.3615 3.73557 15.5 4.08329C15.6852 4.59074 15.7811 5.12644 15.7833 5.66663C15.825 6.49996 15.8333 6.80829 15.8333 8.99996C15.8333 11.1916 15.825 11.5 15.7833 12.3333ZM9 4.72496C8.15484 4.72661 7.32913 4.97873 6.62721 5.44947C5.92529 5.92022 5.37865 6.58846 5.05636 7.36975C4.73407 8.15105 4.6506 9.01035 4.81649 9.83907C4.98238 10.6678 5.39019 11.4287 5.98839 12.0258C6.58659 12.6228 7.34834 13.0291 8.17738 13.1934C9.00642 13.3577 9.86555 13.2725 10.6462 12.9487C11.4269 12.6249 12.0941 12.077 12.5634 11.3742C13.0328 10.6713 13.2833 9.84512 13.2833 8.99996C13.2844 8.43755 13.1743 7.88047 12.9594 7.36076C12.7444 6.84105 12.4288 6.36897 12.0307 5.97167C11.6326 5.57437 11.16 5.25969 10.6398 5.04573C10.1197 4.83178 9.56241 4.72276 9 4.72496V4.72496ZM9 11.775C8.45115 11.775 7.91464 11.6122 7.45829 11.3073C7.00194 11.0024 6.64627 10.569 6.43623 10.0619C6.2262 9.55484 6.17124 8.99688 6.27832 8.45858C6.38539 7.92029 6.64969 7.42583 7.03778 7.03774C7.42587 6.64965 7.92033 6.38535 8.45862 6.27828C8.99692 6.17121 9.55488 6.22616 10.0619 6.43619C10.569 6.64623 11.0024 7.00191 11.3073 7.45825C11.6122 7.9146 11.775 8.45112 11.775 8.99996C11.775 9.36438 11.7032 9.72523 11.5638 10.0619C11.4243 10.3986 11.2199 10.7045 10.9622 10.9622C10.7045 11.2199 10.3986 11.4243 10.0619 11.5637C9.72527 11.7032 9.36442 11.775 9 11.775V11.775Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </div>
      </section>
    </div>
  );
};

export default Post;
