import React, { useState } from 'react';
import {
  Badge,
  Box,
  Button as GenerateButton,
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

    const result: SanityDocument = await sanityClient.fetch(
      `*[_type == $type && _id == $id]
      {
        coverImage {
          asset->{
            url
          }
        },
        body,
        "estimatedReadingTime": round(
          length(pt::text(body))/5/180)
    }`,
      { id: document._id, type: document._type }
    );

    try {
      const updateResult = await fetch(
        'https://rosnovsky-api.vercel.app/api/generate',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: document.title,
            estimatedReadingTime: result[0].estimatedReadingTime || 1,
            publishedAt: new Date(document._createdAt).toLocaleDateString(
              'en-US',
              { year: 'numeric', month: 'long', day: 'numeric' }
            ),
            documentId: document._id,
            coverImage: {
              url: result[0].coverImage.asset.url,
            },
          }),
        }
      );
      if (updateResult.ok) {
        setIsSuccess(true);
      } else {
        console.error(updateResult);
        setErrorMessage(await updateResult.json());
        throw new Error('Something went wrong');
      }
      return updateResult;
    } catch (err) {
      console.error(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Inline space={[3, 3, 4]}>
      <GenerateButton
        disabled={isLoading}
        fontSize={[2, 2, 3]}
        icon={!isError ? FaCheckCircle : FaExclamationTriangle}
        mode="ghost"
        padding={[3, 3, 4]}
        onClick={handleClick}
        text={isLoading ? 'Generating...' : 'Generate Social Card'}
      />
      {isError ? (
        <Tooltip
          content={
            <Box padding={2}>
              <Text size={2}>
                <pre>
                  {errorMessage?.message ? errorMessage.message : errorMessage}
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
