import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"

import { globalStyles } from "../shared/styles"

const cache = createCache({ key: `next` })

const App = <P extends JSX.IntrinsicAttributes>({
  Component,
  pageProps,
}: {
  Component: React.ComponentType<P>
  pageProps: P
}): React.ReactNode => (
  <CacheProvider value={cache}>
    {globalStyles}
    <Component {...pageProps} />
  </CacheProvider>
)

export default App
