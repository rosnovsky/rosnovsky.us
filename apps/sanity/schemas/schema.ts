// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';

// We import object and document schemas
import blockContent from './blockContent';
import category from './category';
import post from './post';
import page from './page';
import youtube from './youtube';
import metacard from './metacard';
import hike from './hike';
import socialCard from './socialCard';
import comment from './comment';
import book from './life/books/book';
import authors from './life/books/authors';
import publishers from './life/books/publishers';
import video from './mux';
import settings from './settings';
import flags from './flags';
import hardware from './life/things/hardware';
import software from './life/things/software';
import genre from './life/books/genre';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'blog',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    settings,
    post,
    hike,
    page,
    book,
    authors,
    publishers,
    genre,
    category,
    hardware,
    software,
    youtube,
    metacard,
    video,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    blockContent,
    socialCard,
    comment,
    flags,
  ]),
});
