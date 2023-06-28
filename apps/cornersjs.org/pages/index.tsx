/// <reference types="@emotion/react/types/css-prop" />

import { css } from "@emotion/react"
import Emotion from "@emotion/styled"
import corners, { chamfer, chamfered, rounded, semiChamfered } from "corners"
import Link from "next/link"

const styled = {
  roundedLink: Emotion(
    rounded(Link, {
      cornerSize: 15,
      above: {
        color: `transparent`,
        stroke: { color: `var(--fg-color)`, width: 1 },
      },
    })
  ),
  neoLink: Emotion(
    rounded(Link, {
      cornerSize: 10,
      useClipPath: false,
      below: [
        {
          className: `shadow`,
          color: `#0004`,
          blur: 5,
          spread: -15,
          offset: { x: -15, y: -15 },
        },
        {
          className: `highlight`,
          color: `#fff`,
          blur: 5,
          spread: -20,
          offset: { x: 15, y: 15 },
        },
        {
          className: `surface`,
          color: `var(--bg-color)`,
        },
      ],
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
          color: `#0004`,
          blur: 0.3,
          spread: 0.6,
          offset: { x: 0, y: -0.3 },
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
  logoSpan: Emotion(
    corners(chamfer, null, null, null).options({
      cornerSize: Infinity,
      useClipPath: false,
      below: [
        {
          color: `var(--fg-color)`,
          offset: { x: 5, y: 4 },
        },
        {
          color: `var(--bg-color)`,
        },
      ],
    })(`span`)
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
    &[aria-disabled="true"] {
      opacity: 0.5;
      pointer-events: none;
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

const neo = {
  link: styled.neoLink`
    border: none;
    padding: 10px 15px 8px;
    cursor: pointer;
    &:hover {
      text-decoration: none;
    }
    &[aria-disabled="true"] {
      opacity: 0.5;
      pointer-events: none;
    }
  `,
}

const logo = {
  span: styled.logoSpan`
    padding-top: 5px;
    padding-left: 2px;
    padding-bottom: 1px;
    padding-right: 8px;
    line-height: 23px;
    font-size: 27px;
    font-variation-settings: "wght" 700;
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
              display: flex;
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
          font-size: 90px;
          line-height: 81px;
          text-align: center;
          --fg-color: #eae9e9;
          @media (prefers-color-scheme: light) {
            --fg-color: #3a3939;
          }
        }
        article {
          width: 100%;
          height: 50%;
          display: flex;
          flex-flow: column;
          justify-content: center;
          align-items: center;
        }
        a {
          font-size: 40px;
        }
      }
    `}
  >
    <header>
      <logo.span>corners</logo.span>
      <nav>
        <ul>
          <li>
            <bubble.link href={`/docs/presets`}>Docs</bubble.link>
          </li>
          <li>
            <bubble.link href={`/blog`} aria-disabled={true}>
              Blog
            </bubble.link>
          </li>
        </ul>
        {/* <inlaid.searchBar placeholder="Search..." /> */}
      </nav>
    </header>
    <visor.main>
      <h1>
        Cut corners <br /> with style
      </h1>
      <softCard.article>hello</softCard.article>
      <bubble.link href={`/docs/presets`}>Get Started!</bubble.link>
    </visor.main>
  </div>
)

export default Home
