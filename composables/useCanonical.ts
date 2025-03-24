export const useCanonical = () => {
  const route = useRoute()
  const baseUrl = 'https://two025hotelbookingweb.onrender.com'

  const canonicalUrl = baseUrl + route.fullPath.split('?')[0]

  useHead({
    link: [
      { rel: 'canonical', href: canonicalUrl }
    ]
  })
}