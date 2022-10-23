import { Book } from 'index'

export const bookStatus = (status: Book["status"]) => {
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
  topTenAuthorsByBookCount: number
  topTenPublishersByBookCount: number

  constructor(books: Book[]) {
    this.totalBooks = books.length
    this.totalRead = books.filter((book) => book.status === 'read').length
    this.totalReading = books.filter((book) => book.status === 'reading').length
    this.totalToRead = books.filter((book) => book.status === 'to read').length
    this.totalAbandoned = books.filter((book) => book.status === 'abandoned').length
    this.currentlyReading = books.filter((book) => book.status === 'reading') || []
    this.totalAuthors = [...new Set(books.map((book) => book.author))].length
    this.totalPublishers = [...new Set(books.map((book) => book.publisher))].length
    this.totalTimeToRead = books.reduce((acc, book) => acc + book.estimatedReadingTime, 0)
    this.totalTimeRead = books.reduce((acc, book) => acc + book.estimatedReadingTime, 0)
    this.averageBooksPerAuthor = this.totalBooks / this.totalAuthors
    this.averageAuthorsPerPublisher = this.totalAuthors / this.totalPublishers
    this.averageBooksPerPublisher = this.totalBooks / this.totalPublishers
    this.averageReadingTimePerBook = this.totalTimeToRead / this.totalBooks
    this.topTenAuthorsByBookCount = books.reduce((acc, book) => {
      const author = book.author
      if (!acc[author.name]) {
        acc[author.name] = 0
      }
      acc[author.name]++
      return acc
    }
      , {})
    
    this.topTenPublishersByBookCount = books.reduce((acc, book) => {

      const publisher = book.publisher
      if (!acc[publisher.name]) {
        acc[publisher.name] = 0
      }
      acc[publisher.name]++
      return acc
    }
      , {})
    
  }

  get totalNotRead() {
    return this.totalBooks - this.totalRead
  }
}

export const libraryStats = (books: Book[]) => {  

  currentlyReading: books.filter((book) => book.status === 'reading') || null;
  totalAuthors: books.map((book) => book.author).length;
  totalPublishers: books.map((book) => book.publisher).length;
  totalTimeToRead: books.reduce((acc, book) => acc + book.estimatedReadingTime, 0);
  totalTimeRead: books.reduce((acc, book) => acc + book.estimatedReadingTime, 0);
  averageBooksPerAuthor: books.length / books.map((book) => book.author).length;
  averagePagesPerBook: books.reduce((acc, book) => acc + book.pages, 0) / books.length;
  averageReadingTimePerBook: books.reduce((acc, book) => acc + book.estimatedReadingTime, 0) / books.length;
  averageAuthorsPerPublisher: books.map((book) => book.author).length / books.map((book) => book.publisher).length;
  topTenAuthorsByBookCount: books.map((book) => book.author).reduce((acc, author) => {
    if (acc[author.name]) {
      acc[author.name] += 1;
    } else {
      acc[author.name] = 1;
    }
    return acc;
  }, {});
  topTenPublishersByBookCount: books.map((book) => book.publisher).reduce((acc, publisher) => {
    if (acc[publisher.name]) {
      acc[publisher.name] += 1;
    } else {
      acc[publisher.name] = 1;
    }
    return acc;
  }, {});
}
