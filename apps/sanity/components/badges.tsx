import defaultResolve from 'part:@sanity/base/document-badges';

export function DraftBadge(props) {
  console.log(props.draft);
  if (props.draft) {
    return {
      label: 'Draft',
      title: 'This is a draft',
      color: 'warning',
    };
  }
  return null;
}

export default function resolveDocumentBadges(props) {
  return [...defaultResolve(props), DraftBadge];
}
