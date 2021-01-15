const CommentForm = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white py-16 px-4 sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12">
        <div className="max-w-lg mx-auto lg:max-w-none">
          <div className="">
            <label htmlFor="message" className="sr-only">
              Comment form
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="block w-full shadow-lg py-3 px-4 placeholder-gray-500 ring-red-500 border-gray-300 rounded-lg border-2"
              placeholder="What's on your mind?"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentForm
