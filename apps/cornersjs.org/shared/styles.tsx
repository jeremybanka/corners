import { css, Global } from "@emotion/react"

export const globalStyles = (
  <Global
    styles={css`
      @font-face {
        font-family: Manufab;
        src: url("/ManufabVF.ttf") format("truetype-variations");
      }
      @font-face {
        font-family: Theia;
        font-weight: 500;
        src: url("/Theia0.2.500-500.otf") format("opentype");
      }
      * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        color: var(--fg-color);
      }
      :root {
        color-scheme: light dark;
        --fg-color: #fff;
        --bg-color: #111;
        --hyperlink-color: #09f;
        --hyperlink-hover-color: #0df;
        --hyperlink-visited-color: #99f;
        --special-color: #9200ff;

        background: var(--bg-color);
        min-height: 100vh;
        font-family: Palatino;
        font-size: 21px;
      }
      a {
        --fg-color: var(--hyperlink-color);
        color: var(--fg-color);
        font-weight: 500;
        font-variation-settings: "wght" 500;
        text-decoration: inherit;
        &:hover {
          --fg-color: var(--hyperlink-hover-color);
          text-decoration: underline;
        }
        &:visited {
          --fg-color: var(--hyperlink-visited-color);
        }
      }
      code {
        font-family: Theia, monospace !important;
        background: #7777;
      }

      @media (prefers-color-scheme: light) {
        :root {
          --fg-color: #333;
          --bg-color: #faf9f9;
          --hyperlink-color: #08f;
          --hyperlink-hover-color: #04f;
          --hyperlink-visited-color: #99f;
        }
        button {
          background-color: #f9f9f9;
        }
      }
    `}
  />
)
