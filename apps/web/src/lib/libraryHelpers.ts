import { Author, Book, Publisher } from 'index'

export const bookStatus = (status: Book['status']) => {
  switch (status) {
    case 'read':
      return 'Finished'
    case 'reading':
      return 'Reading now'
    case 'to read':
      return 'Want to Read'
    case 'abandoned':
      return 'Started but Abandoned'
    default:
      return 'Not Read'
  }
}

export class LibraryStats {
  totalBooks: number
  totalRead: number
  totalReading: number
  totalToRead: number
  totalAbandoned: number
  currentlyReading: Book[]
  totalAuthors: number
  totalPublishers: number
  totalTimeToRead: number
  totalTimeRead: number
  averageBooksPerAuthor: number
  averageBooksPerPublisher: number
  averageReadingTimePerBook: number
  averageAuthorsPerPublisher: number
  topTenAuthorsByBookCount: Array<Array<string | number>>
  topTenPublishersByBookCount: Array<Array<string | number>>

  constructor(books: Book[]) {
    this.totalBooks = books.length
    this.totalRead = books.filter((book) => book.status === 'read').length
    this.totalReading = books.filter((book) => book.status === 'reading').length
    this.totalToRead = books.filter((book) => book.status === 'to read').length
    this.totalAbandoned = books.filter(
      (book) => book.status === 'abandoned'
    ).length
    this.currentlyReading =
      books.filter((book) => book.status === 'reading') || []
    this.totalAuthors = [...new Set(books.map((book) => book.author))].length
    this.totalPublishers = [
      ...new Set(books.map((book) => book.publisher)),
    ].length
    this.totalTimeToRead = books.reduce(
      (acc, book) => acc + book.estimatedReadingTime,
      0
    )
    this.totalTimeRead = books.reduce(
      (acc, book) => acc + book.estimatedReadingTime,
      0
    )
    this.averageBooksPerAuthor = this.totalBooks / this.totalAuthors
    this.averageAuthorsPerPublisher = this.totalAuthors / this.totalPublishers
    this.averageBooksPerPublisher = this.totalBooks / this.totalPublishers
    this.averageReadingTimePerBook = this.totalTimeToRead / this.totalBooks
    this.topTenAuthorsByBookCount = Object.entries(
      books.reduce((acc, book) => {
        acc[book.author?.name] = (acc[book.author?.name] || 0) + 1
        return acc
      }, {} as Record<string, number>)
    )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)

    this.topTenPublishersByBookCount = Object.entries(
      books.reduce((acc, book) => {
        acc[book.publisher?.name] = (acc[book.publisher?.name] || 0) + 1
        return acc
      }, {} as Record<string, number>)
    )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
  }

  get topTenAuthors() {
    return this.topTenAuthorsByBookCount.map((author) => ({
      name: author[0],
      books: author[1],
    }))
  }

  get topTenPublishers() {
    return this.topTenPublishersByBookCount.map((publisher) => ({
      name: publisher[0],
      books: publisher[1],
    }))
  }
}

export const libraryStats = (books: Book[]) => {
  currentlyReading: books.filter((book) => book.status === 'reading') || null
  totalAuthors: books.map((book) => book.author).length
  totalPublishers: books.map((book) => book.publisher).length
  totalTimeToRead: books.reduce(
    (acc, book) => acc + book.estimatedReadingTime,
    0
  )
  totalTimeRead: books.reduce((acc, book) => acc + book.estimatedReadingTime, 0)
  averageBooksPerAuthor: books.length / books.map((book) => book.author).length
  averagePagesPerBook: books.reduce((acc, book) => acc + book.pages, 0) /
    books.length
  averageReadingTimePerBook: books.reduce(
    (acc, book) => acc + book.estimatedReadingTime,
    0
  ) / books.length
  averageAuthorsPerPublisher: books.map((book) => book.author).length /
    books.map((book) => book.publisher).length
  topTenAuthorsByBookCount: books
    .map((book) => book.author)
    .reduce((acc, author) => {
      if (acc[author.name]) {
        acc[author.name] += 1
      } else {
        acc[author.name] = 1
      }
      return acc
    }, {})
  topTenPublishersByBookCount: books
    .map((book) => book.publisher)
    .reduce((acc, publisher) => {
      if (acc[publisher.name]) {
        acc[publisher.name] += 1
      } else {
        acc[publisher.name] = 1
      }
      return acc
    }, {})
}