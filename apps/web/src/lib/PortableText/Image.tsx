import { getImageDimensions } from '@sanity/asset-utils';
import { SanityDocument, SanityImageAssetDocument } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityClient } from '@/lib/Sanity';
import Image from "next/image";

export const urlFor = (source: SanityDocument) => {
  return imageUrlBuilder(SanityClient).image(source);
};

export const ImageComponent = ({ value }: { value: SanityImageAssetDocument }) => {
  if (!value) return null;
  const ImageComponent = () => {
    return (
      <div className=" w-full">
        {value.asset && (
          <>
            <Image
              src={value.asset.url}
              width={800}
              height={getImageDimensions(value).height / getImageDimensions(value).width * 800}
              placeholder="blur"
              sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
              blurDataURL={value.asset.metadata.lqip}
              quality={75}
              alt=""
              loading='lazy'
            />
            <div className="w-full mt-3 text-gray-700 mb-5 text-center text-sm">
              {value.asset.description}
            </div>
          </>
        )}
      </div>
    );
  };

  return <ImageComponent />;
}
