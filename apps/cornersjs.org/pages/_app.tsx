import createCache from "@emotion/cache"
import { CacheProvider, css } from "@emotion/react"

import { logo } from "../shared/containers"
import { anchor } from "../shared/link"
import { globalStyles } from "../shared/styles"
import Kitty from "../svg/kitty.svg"
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
		<article
			css={css`
        display: flex;
        flex-direction: column;
        height: 100vh;
        padding: 10px;
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 15px;
          gap: 20px;
          nav {
            display: flex;
            flex-flow: row nowrap;
            flex-grow: 1;
            ul {
              display: flex;
              gap: 10px;
              li {
                list-style: none;
                display: flex;
                a {
                  padding: 0;
                  width: 54px;
                  height: 54px;
                  display: flex;
                  align-items: flex-end;
                  justify-content: flex-end;
                  --fg-color: var(--color-light-soft);
                  .stroke > path {
                    stroke: var(--color-light-faint);
                  }
                  svg.kitty {
                    margin: -12px;
                    position: absolute;
                    left: 0px;
                    top: 0px;
                    path {
                      fill: var(--fg-color) !important;
                    }
                  }
                }
              }
            }
            .spacer {
              flex: 1;
              flex-grow: 1;
            }
          }
        }
        > main {
          display: flex;
          flex-direction: column;
          height: 100vh;
          padding: 10px;
          // docs styling - gotta be this way until we move to remote mdx
          > *:not(header):not(main):not(div) {
            width: 100%;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
          }
          p {
            font-size: 21px;
            line-height: 1.33;
          }
          p + p {
            text-indent: 1em;
          }
          h1 {
            font-family: Manufab;
            /* font-size: 90px; */
            padding-top: 30px;
          }
          h2 {
            font-weight: 500;
            font-size: 36px;
            padding-top: 30px;
            padding-bottom: 10px;
          }
          > *:not(pre, p, h1, h2, h3) {
            margin-top: 10px;
          }
          pre {
            margin: 0 !important;
            background-color: #222 !important;
            * {
              font-size: 16px !important;
              color: #ddd;
              text-shadow: none !important;
              background: none !important;
            }
          }
        }
      `}
		>
			<header>
				<logo.link href={`/`}>corners</logo.link>
				<nav>
					<ul>
						{/* <li>
							<bubble.link href={`/docs`}>Docs</bubble.link>
						</li>
						<li>
							<bubble.link href={`/blog`} aria-disabled={true}>
								Blog
							</bubble.link>
						</li> */}
					</ul>
					<span className="spacer" />
					<ul>
						{/* <input type="text" placeholder="Search" /> */}
						<li>
							<anchor.right
								href={`https://github.com/jeremybanka/corners`}
								className=""
							>
								<Kitty className="kitty" />
							</anchor.right>
						</li>
					</ul>
				</nav>
			</header>
			<main>
				<Component {...pageProps} />
			</main>
		</article>
	</CacheProvider>
)

export default App
