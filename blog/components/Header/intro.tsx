const Intro = () => {
  return (
    <main className="m-36 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-28">
      <div className="text-center">
        <h2 className="text-4xl tracking-tight leading-10 font-black text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
          <span className="mr-1">Welcome to the </span>
          <br className="xl:hidden" />
          <span className="text-green-900">Rosnovsky Park</span>
        </h2>
        <p className="mt-3 max-w-md mx-auto mb-10 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          My name is Art Rosnovsky, and this is my park.
        </p>
      </div>
    </main>
  )
}

export default Intro
