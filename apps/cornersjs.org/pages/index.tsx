/// <reference types="@emotion/react/types/css-prop" />

import { css } from "@emotion/react"

import { bubble, visor, softCard } from "../shared/containers"

const Home: React.FC = () => (
  <visor.main
    css={css`
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
      flex: 1;
      flex-grow: 1;
      gap: 20px;
      background-color: #eae9e9;
      h1 {
        font-size: 90px;
        line-height: 81px;
        text-align: center;
        --fg-color: #eae9e9;
        @media (prefers-color-scheme: light) {
          --fg-color: #3a3939;
        }
      }
      article {
        width: 50%;
        height: 50%;
        margin: 0 50px;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
      }
      a {
        font-size: 40px;
      }
    `}
  >
    <h1>
      Cut corners <br /> with style
    </h1>
    <softCard.article></softCard.article>
    <bubble.link href={`/docs/presets`}>Get Started!</bubble.link>
  </visor.main>
)

export default Home
