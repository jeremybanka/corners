import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import localFont from "next/font/local"

import { globalStyles } from "../shared/styles"

const cache = createCache({ key: `next` })

const myFont = localFont({
  /* eslint-disable-next-line quotes */
  src: "./ManufabVF.ttf",
  /* eslint-disable-next-line quotes */
  display: "swap",
})

const App = <P extends JSX.IntrinsicAttributes>({
  Component,
  pageProps,
}: {
  Component: React.ComponentType<P>
  pageProps: P
}): React.ReactNode => (
  <CacheProvider value={cache}>
    {globalStyles}
    <article className={myFont.className}>
      <Component {...pageProps} />
    </article>
  </CacheProvider>
)

export default App
