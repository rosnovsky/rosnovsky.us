import { visit } from 'unist-util-visit';

export function replaceImgWithComponent(): any {
  return (tree: any) => {
    visit(tree, 'image', (node: { url: any; type: string; value: string; alt: any; }) => {
      const url = node.url;

      node.type = 'jsx';
      // @ts-ignore
      node.value = `<Image src=${url} alt=${node.alt} placeholder="tracedSVG" loading="lazy" />`;
    });
  };
};
