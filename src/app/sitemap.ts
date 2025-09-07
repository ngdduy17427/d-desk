import { MetadataRoute } from 'next'

const sitemap = (): MetadataRoute.Sitemap => {
  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
    },
  ]
}

// eslint-disable-next-line import/no-default-export
export default sitemap
