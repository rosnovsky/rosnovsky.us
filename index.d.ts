  export type PictureDescription = {
  description: {
    tags: string[]
    captions:
      {
        text: string
        confidence: number
      }[]
  },
  requestId: string
  metadata: {
    height: number,
    width: number,
    format: string
  },
  modelVersion: string
}
