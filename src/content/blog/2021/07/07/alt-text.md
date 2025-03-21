---
title: Using AI vision to generate alt text for images
description: Let's make sure that you never miss an alt text in your image tags using Azure Computer Vision.
publishDate: 2021-07-07
category: 'Web Development'
image:
  src: '@assets/blog/posts/alt-text/1661cf98394e1a5dacfc6b00cdd70e9e25ca9b0e-1134x2016.avif'
  alt: 'Generic blog post cover image'
---

I'm not proud of it, but sometimes I forget to add alt text to the images I post. This flaw makes these images invisible for people who access the web using screen readers. So I decided to fix this using AI, computer vision, and serverless functions.

## Concept

Whenever I add an image to a blog post, I want this image to be analyzed by an AI. I want the AI to describe an image and append alt text to it if none exists. Since I use [Next.js](https://nextjs.org/) and [MDX](https://mdxjs.com/), and I don't want to spend too much on this operation, I want this analysis to happen only at build time.

## Tools

There's a while variety of accessible cloud-base computer vision tools:

- [Google Vision AI](https://cloud.google.com/vision/)
- [AWS Computer Vision](https://aws.amazon.com/computer-vision/)
- [Azure Cognitive Services](https://azure.microsoft.com/en-us/services/cognitive-services/computer-vision/)

None of these services is perfect; in my tests, though, Azure came on top as the most accurate when it comes to image descriptions.

Since, again, I'm using Next.js, I don't have to do anything extra to deploy a serverless function that would request image analysis. I can do this right from within Next.js by just adding a file to /pages/api/ folder. The function will be available at https://rosnovsky.us/api/.

That's it. All we need is a cloud-based computer vision service and a way to deploy a serverless function.

## Bringing it all together

### Serverless function

First, let's create a serverelss function called pictureDescription. This function will accept image URL, reach out to Azure with this URL, and return alt text it recieves in response from Azure.

This function will return something like this:

### MDX Component

Now, to the MDX Component. This component allows you to use React components right in your MDX. Let's create a funtion that would take image path, width, height and (optionally) alt text. If alt text is supplied, the component will just return Next.js' [Image component](https://nextjs.org/docs/api-reference/next/image) with existing alt. However, if I forgot to supply alt text, the function will call our API, fetch alt text, and add it to the Image component. If there was an error fetching alt text, an "I'm sorry" text will populate alt text.

That's it. Now, whenever I include ImageWithAlt component in my MDX, it gets an alt text in case there were none.

Check this out:

![](assets/blog/posts/alt-text/1661cf98394e1a5dacfc6b00cdd70e9e25ca9b0e-1134x2016.avif)

This image had no alt text so Azure generated one for us.

## Final thoughts

There are a few caveats with this approach. First, obviously, its inaccuracy. While a generic description is better than no description, it certainly lacks accuracy. I hope that with time AI vision and analysis algorithms will get better at it. Second, an image has to be publically available on the web at build time. This requires me to first deploy the site with just images for an upcoming post and then redeploy it when I actually publish the post. Arguably, one could just deploy both images and the post at the same time and then just redeploy it again, but neither is great. Something to think about.

P.S. Always incude alt text with your images!
