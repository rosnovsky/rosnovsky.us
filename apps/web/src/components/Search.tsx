import {
  AutocompleteOptions,
  AutocompleteState,
  createAutocomplete,
} from '@algolia/autocomplete-core';
import { getAlgoliaResults } from '@algolia/autocomplete-preset-algolia';
import { Hit } from '@algolia/client-search';
import algoliasearch from 'algoliasearch/lite';

import { parseAlgoliaHitHighlight } from '@algolia/autocomplete-preset-algolia';
import {
  createElement,
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import dynamic from 'next/dynamic';
const Link = dynamic(() => import('next/link'));

import '@algolia/autocomplete-theme-classic';
import Image from 'next/image';

export const searchClient = algoliasearch(
  'MX9C0DBFF5',
  '7f731b4f232d7b9e557319bc45e709fb'
);

type AutocompleteItem = Hit<{
  title: string;
  cover: string;
  publishedAt: string;
  objectID: string;
  slug: string;
  summary: string;
}>;

export function Search(props: Partial<AutocompleteOptions<AutocompleteItem>>) {
  const [autocompleteState, setAutocompleteState] = useState<
    AutocompleteState<AutocompleteItem>
  >({
    collections: [],
    completion: null,
    context: {},
    isOpen: false,
    query: '',
    activeItemId: null,
    status: 'idle',
  });
  const autocomplete = useMemo(
    () =>
      createAutocomplete<
        AutocompleteItem,
        React.BaseSyntheticEvent,
        React.MouseEvent,
        React.KeyboardEvent
      >({
        onStateChange({ state }) {
          setAutocompleteState(state);
        },
        getSources() {
          return [
            {
              sourceId: 'posts',
              getItems({ query }) {
                return getAlgoliaResults({
                  searchClient,
                  queries: [
                    {
                      indexName: 'blog_posts',
                      query,
                      params: {
                        hitsPerPage: 5,
                      },
                    },
                  ],
                });
              },
              getItemUrl({ item }) {
                return `/blog/${item.slug}`;
              },
            },
          ];
        },
        ...props,
      }),
    [props]
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const { getEnvironmentProps } = autocomplete;

  useEffect(() => {
    if (!formRef.current || !panelRef.current || !inputRef.current) {
      return undefined;
    }

    const { onTouchStart, onTouchMove } = getEnvironmentProps({
      formElement: formRef.current,
      inputElement: inputRef.current,
      panelElement: panelRef.current,
    });

    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove);

    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [getEnvironmentProps, formRef, inputRef, panelRef]);

  return (
    <div className="container mx-auto">
      <div className="aa-Autocomplete z-50" {...autocomplete.getRootProps({})}>
        <form
          ref={formRef}
          className="aa-Form"
          {...autocomplete.getFormProps({ inputElement: inputRef.current })}
        >
          <div className="aa-InputWrapperPrefix">
            <label className="aa-Label" {...autocomplete.getLabelProps({})}>
              <button className="aa-SubmitButton" type="submit" title="Submit">
                <SearchIcon />
              </button>
            </label>
          </div>
          <div className="aa-InputWrapper">
            <input
              className="aa-Input"
              ref={inputRef}
              {...autocomplete.getInputProps({
                inputElement: inputRef.current,
                placeholder: 'Try searching, say, "Ukraine" or "Mountains"',
              })}
            />
          </div>
          <div className="aa-InputWrapperSuffix">
            <button className="aa-ClearButton" title="Clear" type="reset">
              <ClearIcon />
            </button>
          </div>
        </form>

        {autocompleteState.isOpen && (
          <div
            ref={panelRef}
            className={[
              'z-50',
              'aa-Panel',
              'aa-Panel--desktop',
              autocompleteState.status === 'stalled' && 'aa-Panel--stalled',
            ]
              .filter(Boolean)
              .join(' ')}
            {...autocomplete.getPanelProps({})}
          >
            <div className="w-3xl aa-PanelLayout aa-Panel--scrollable">
              {autocompleteState.collections.map((collection, index) => {
                const { source, items } = collection;

                return (
                  <section
                    key={`source-${index}`}
                    className="z-20 bg-zinc-50 min-w-3xl max-w-3xl aa-Source"
                  >
                    {items.length > 0 && (
                      <ul className="aa-List" {...autocomplete.getListProps()}>
                        {items.map((item) => {
                          return (
                            <li
                              key={item.objectID}
                              className="aa-Item"
                              {...autocomplete.getItemProps({ item, source })}
                            >
                              <div className="aa-ItemWrapper">
                                <Link
                                  href={`/blog/${encodeURIComponent(
                                    item.slug
                                  )}`}
                                >
                                  <div className="aa-ItemContent">
                                    <div className="aa-ItemIcon aa-ItemIcon--picture aa-ItemIcon--alignTop">
                                      <Image
                                        src={item.cover}
                                        alt={item.title}
                                        width="90"
                                        height="90"
                                        objectFit="cover"
                                        priority
                                        quality={70}
                                      />
                                    </div>
                                    <div className="aa-ItemContentBody">
                                      <div className="aa-ItemContentTitle">
                                        <Highlight
                                          hit={item}
                                          attribute="title"
                                        />
                                      </div>
                                      <div className="aa-ItemContentDescription">
                                        <Highlight
                                          hit={item}
                                          attribute="summary"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                                <div className="aa-ItemActions">
                                  <button
                                    className="aa-ItemActionButton aa-DesktopOnly aa-ActiveOnly"
                                    type="button"
                                    title="Select"
                                    style={{ pointerEvents: 'none' }}
                                  >
                                    <svg
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M18.984 6.984h2.016v6h-15.188l3.609 3.609-1.406 1.406-6-6 6-6 1.406 1.406-3.609 3.609h13.172v-4.031z" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </section>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;

export function ClearIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="currentColor"
      {...props}
    >
      <path
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}

type HighlightHitParams<THit> = {
  /**
   * The Algolia hit whose attribute to retrieve the highlighted parts from.
   */
  hit: THit;
  /**
   * The attribute to retrieve the highlighted parts from.
   *
   * You can use the array syntax to reference nested attributes.
   */
  attribute: keyof THit | string[];
  /**
   * The tag name to use for highlighted parts.
   *
   * @default "mark"
   */
  tagName?: string;
};

export function Highlight<
  THit extends { _highlightResult?: Record<string, unknown> | undefined }
>({ hit, attribute, tagName = 'mark' }: HighlightHitParams<THit>): JSX.Element {
  return createElement(
    Fragment,
    {},
    parseAlgoliaHitHighlight<THit>({ hit, attribute }).map(
      ({ value, isHighlighted }, index) => {
        if (isHighlighted) {
          return createElement(tagName, { key: index }, value);
        }

        return value;
      }
    )
  );
}

export function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" {...props}>
      <path
        d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </svg>
  );
}