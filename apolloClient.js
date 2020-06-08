import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { createHttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import fetch from 'isomorphic-unfetch'
import { devEndpoint, prodEndpoint } from './config'

const delay = setContext(
  request =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 2000)
    })
)

const http = new HttpLink({
  uri: process.env.NODE_ENV === 'development' ? devEndpoint : prodEndpoint,
  credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
  fetch
})

const link = ApolloLink.from([
  // delay,
  http
])

const newLink = cookieHeader => {
  let settings = {
    uri: process.env.NODE_ENV === 'development' ? devEndpoint : prodEndpoint,
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    fetch
  }

  if (cookieHeader) {
    settings.headers = { Cookie: cookieHeader }
  }

  const link = createHttpLink(settings)

  return link
}

export default function createApolloClient(initialState, ctx) {
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  let cookieHeader = null
  if (ctx) {
    cookieHeader = ctx.req.headers['cookie']
  }
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: newLink(cookieHeader),
    cache: new InMemoryCache().restore(initialState)
  })
}
