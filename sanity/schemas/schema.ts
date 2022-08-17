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
import person from './life/people/person';
import country from './life/places/country';
import city from './life/places/city';
import company from './life/jobs/company';
import airline from './life/travel/airline';
import flight from './life/travel/flight';
import socialCard from './socialCard';
import comment from './comment';
import book from './life/books/book';
import video from './mux';
import settings from './settings';

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
    category,
    youtube,
    metacard,
    person,
    country,
    city,
    company,
    airline,
    flight,
    video,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    blockContent,
    socialCard,
    comment,
  ]),
});
