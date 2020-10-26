import React from 'react'
import { Auth0Provider } from './src/utils/auth'

const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  )
}

const AUTH0_DOMAIN = 'auth.rosnovsky.us'
const AUTH0_CLIENTID = '56CVFXGTxGzffHxOxwGsQxoXQoirrgdC'
const AUTH0_AUDIENCE = '/blog/'

const Auth0Domain = AUTH0_DOMAIN
const Auth0ClientID = AUTH0_CLIENTID
const Auth0Audience = AUTH0_AUDIENCE
export const wrapRootElement = ({ element }) => (
  <Auth0Provider
    domain={Auth0Domain}
    client_id={Auth0ClientID}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
    audience={Auth0Audience}
  >
    {element}
  </Auth0Provider>
)
