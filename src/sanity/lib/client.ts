import { createClient } from 'next-sanity'


export const client = createClient({
  projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:process.env.NEXT_PUBLIC_SANITY_DATASET,
  token:process.env.SANITY_API_TOKEN,
  apiVersion: '2023-10-15',
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
