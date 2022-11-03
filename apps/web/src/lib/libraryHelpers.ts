import { Book } from 'index'
import sanityClient from './sanityClient'

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
  totalPages: number
  totalPagesRead: number
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
    this.totalPages = books.reduce((acc, book) => acc + book.pages, 0)
    this.totalPagesRead = books.reduce(
      (acc, book) =>
        acc +
        (book.status === 'read' || book.status === 'abandoned'
          ? book.pages
          : 0),
      0
    )
    this.totalTimeToRead = Math.floor(
      books.reduce((acc, book) => acc + book.estimatedReadingTime, 0)
    )
    this.totalTimeRead = Math.floor(
      books
        .filter((book) => book.status === 'read' || book.status === 'abandoned')
        .reduce((acc, book) => acc + book.estimatedReadingTime, 0)
    )
    this.averageBooksPerAuthor = Math.floor(this.totalBooks / this.totalAuthors)
    this.averageAuthorsPerPublisher = Math.floor(
      this.totalAuthors / this.totalPublishers
    )
    this.averageBooksPerPublisher = Math.floor(
      this.totalBooks / this.totalPublishers
    )
    this.averageReadingTimePerBook = Math.floor(
      this.totalTimeToRead / this.totalBooks
    )
    this.topTenAuthorsByBookCount = Object.entries(
      books.reduce((acc, book) => {
        acc[book.author?.name] = (acc[book.author?.name] || 0) + 1
        return acc
      }, {} as Record<string, number>)
    )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 11)

    this.topTenPublishersByBookCount = Object.entries(
      books.reduce((acc, book) => {
        acc[book.publisher?.name] = (acc[book.publisher?.name] || 0) + 1
        return acc
      }, {} as Record<string, number>)
    )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 11)
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
  get totalPagesReadFormatted() {
    return `${Math.floor(this.totalPagesRead / 1000)}k`
  }

  get totalPagesFormatted() {
    return `~${Math.floor(this.totalPages / 1000)}k`
  }

  get totalReadingTimeInYears() {
    return `~${Math.ceil(this.totalTimeToRead / 24 / 365)}y
    `
  }

  get totalReadTimeInYears() {
    return `${Math.ceil(this.totalTimeRead / 24 / 365)}y
    `
  }
}

export const fetcher = ({ pageNumber, query }) => {
  const startLimit = parseInt(pageNumber) * 20
  const data = sanityClient.fetch(query, {
    startLimit,
    endLimit: startLimit + 20,
  })
  return data
}
