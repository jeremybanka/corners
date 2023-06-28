/// <reference types="@emotion/react/types/css-prop" />

import { css } from "@emotion/react"
import Emotion from "@emotion/styled"
import { chamfered, rounded, semiChamfered } from "corners"
import Link from "next/link"

const styled = {
  roundedLink: Emotion(
    rounded(Link, {
      cornerSize: 15,
      useClipPath: true,
      above: {
        color: `transparent`,
        stroke: { color: `var(--fg-color)`, width: 1 },
      },
    })
  ),
  chamferedMain: Emotion(
    chamfered(`main`, {
      cornerSize: 5,
      useClipPath: false,
      above: {
        color: `transparent`,
        stroke: { color: `var(--fg-color)`, width: 1 },
      },
    })
  ),
  roundedArticle10: Emotion(
    rounded(`article`, {
      cornerSize: 10,
      useClipPath: false,
      below: [
        {
          className: `shadow`,
          color: `#0009`,
          blur: 2,
          spread: 1,
          offset: { x: 0, y: -1 },
        },
        {
          className: `paper`,
          color: `#fff`,
        },
      ],
    })
  ),
  inlaidDiagonalInput: Emotion(
    semiChamfered(`input`, {
      cornerSize: 5,
      useClipPath: true,
      above: {
        color: `transparent`,
        stroke: { color: `var(--fg-color)`, width: 1 },
        blur: 2,
        spread: 1,
        offset: { x: 0, y: 1 },
      },
    })
  ),
}

const inlaid = {
  searchBar: styled.inlaidDiagonalInput`
    padding: 10px 15px;
    background: linear-gradient(0deg, #fd01 0%, transparent 100%);
  `,
}

const bubble = {
  link: styled.roundedLink`
    border: none;
    padding: 10px 15px 8px;
    cursor: pointer;
    &:hover {
      text-decoration: none;
    }
  `,
}

const visor = {
  main: styled.chamferedMain`
    padding: 10px 15px;
    background: linear-gradient(0deg, #fd01 0%, transparent 100%);
  `,
}

const softCard = {
  article: styled.roundedArticle10`
    padding: 10px 15px;
    background: linear-gradient(0deg, #fd01 0%, transparent 100%);
  `,
}

const Home: React.FC = () => (
  <div
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
        nav {
          ul {
            display: flex;
            gap: 10px;
            li {
              list-style: none;
            }
          }
        }
      }
      main {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        flex: 1;
        flex-grow: 1;
        gap: 20px;
        h1 {
          font-size: 60px;
          text-align: center;
        }
        article {
          width: 100%;
          height: 50%;
        }
      }
    `}
  >
    <header>
      <h1>corners</h1>
      <nav>
        <ul>
          <li>
            <Link href={`/docs/presets`}>Docs</Link>
          </li>
          <li>
            <Link href={`/blog`}>Blog</Link>
          </li>
        </ul>
        {/* <inlaid.searchBar placeholder="Search..." /> */}
      </nav>
    </header>
    <visor.main>
      <h1>Cut corners with style</h1>
      <softCard.article>hello</softCard.article>
      <bubble.link href={`/docs/presets`}>Get Started!</bubble.link>
    </visor.main>
  </div>
)

export default Home
