import { ApolloClient, InMemoryCache } from "@apollo/client"


const API_URL = process.env.NEXT_PUBLIC_TEMPORARY_QUERY_URL
const NEXT_PUBLIC_RINKEBY_PROVIDER_URLS = process.env.NEXT_PUBLIC_RINKEBY_PROVIDER_URLS

const client = new ApolloClient({
    uri: API_URL,
    cache: new InMemoryCache()
})

export default client