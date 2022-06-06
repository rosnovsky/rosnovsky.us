import React, { useState } from 'react';
import {
  Badge,
  Box,
  Button as FetchBook,
  Inline,
  Text,
  Tooltip,
} from '@sanity/ui';
import client from 'part:@sanity/base/client';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { withDocument } from 'part:@sanity/form-builder';
import { SanityDocument } from '@sanity/client';

const sanityClient = client.withConfig({ apiVersion: '2021-10-21' });

export const Button = withDocument((props) => {
  const { document }: { document: SanityDocument } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any>(null);

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const updateResult = await fetch(
        `https://api2.isbndb.com/book/${document.isbn}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: process.env.SANITY_STUDIO_ISBNDB_KEY,
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          return res;
        });
      await sanityClient
        .patch(document._id)
        .set({
          title: updateResult.book.title,
          description: updateResult.book.synopsys,
          pages: updateResult.book.pages,
          author: updateResult.book.authors[0],
          publishedDate: updateResult.book.date_published,
          publisher: updateResult.book.publisher,
        })
        .commit()
        .then(async (res) => {
          await fetch('https://rosnovsky.us/api/fetchBookCover', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              image: updateResult.book.image,
              title: updateResult.book.title,
              _id: document._id,
            }),
          })
            .then((res) => res.json())
            .then((res) => console.log(res));
          setIsSuccess(true);
        });
    } catch (err) {
      console.error(err);
      setIsError(true);
      setErrorMessage(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Inline space={[3, 3, 4]}>
      <FetchBook
        disabled={isLoading}
        fontSize={[2, 2, 3]}
        icon={!isError ? FaCheckCircle : FaExclamationTriangle}
        mode="ghost"
        padding={[3, 3, 4]}
        onClick={handleClick}
        text={isLoading ? 'Fetching...' : 'Fetch Book'}
      />
      {isError ? (
        <Tooltip
          content={
            <Box padding={2}>
              <Text size={2}>
                <pre>
                  {errorMessage.message ? errorMessage.message : errorMessage}
                </pre>
              </Text>
            </Box>
          }
          fallbackPlacements={['right', 'left']}
          placement="top"
          portal
        >
          <Badge tone="critical">Error</Badge>
        </Tooltip>
      ) : isSuccess ? (
        <Badge tone="positive">Smashing success!</Badge>
      ) : null}
    </Inline>
  );
});
