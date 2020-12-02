import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import { getBlogUrl } from '../../utils/helpers';
import ReactPlayer from 'react-player/file';
import Youtube from 'react-player/youtube';
import sanityClient from '@sanity/client';
import Figure from './figure';
import sanityConfig from '../../../client-config';
import Code from './code';
let ReactTinyLink = require('react-tiny-link');

const client = sanityClient({ ...sanityConfig.sanity, useCdn: true });

const serializers = {
  marks: {
    internalLink: ({ mark, children }) => {
      return (
        <Link
          to={getBlogUrl(
            mark.reference.publishedAt,
            mark.reference.slug.current
          )}
        >
          {children}
        </Link>
      );
    },
    link: ({ mark, children }) => {
      const { blank, href } = mark;
      return blank ? (
        <a href={href} target="_blank" rel="noopener">
          {children}
        </a>
      ) : (
        <a href={href}>{children}</a>
      );
    },
  },
  types: {
    authorReference: ({ node }) => <span>{node.author.name}</span>,
    mainImage: Figure,
    code: Code,

    // Youtube component could be replaced with ReactPlayer, removing 2 dependencies (YouTube and getYoutubeId)
    youtube: ({ node }) => {
      const { url } = node;
      // const id = getYouTubeId(url)
      return (
        <div className="w-full">
          <Youtube
            url={url}
            className="youtubeContainer"
            autoplay={false}
            pip
            width="100%"
          />
          {/* <YouTube containerClassName={'youtubeContainer'} videoId={id} /> */}
        </div>
      );
    },
    mux: (props) => {
      // TODO: Fix this bullshit
      const [asset, setAsset] = useState();

      const query = `*[_type == "post" && body[]._type =="mux" ]{
        "asset": *[asset._id == "${props.node.asset._ref}"]{...}
      }`;

      useEffect(() => {
        client
          .fetch(query)
          .then((video) => setAsset(video[0].asset[0].playbackId));
      }, []);

      return (
        <ReactPlayer
          url={`https://stream.mux.com/${asset}.m3u8`}
          autoplay={false}
          pip
          width="100%"
          // height={'auto'}
        />
      );
    },
    linkCard: ({ node }) => {
      return typeof window !== 'undefined' ? (
        <div>
          <ReactTinyLink
            cardSize="small"
            showGraphic={true}
            maxLine={4}
            minLine={1}
            loadSecureUrl={false}
            autoPlay={false}
            url={node.href}
            defaultMedia={'https://rosnovsky.us/favicon.png'}
          />
        </div>
      ) : null;
    },
  },
};

export default serializers;
