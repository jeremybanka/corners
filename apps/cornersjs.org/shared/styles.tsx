import { css, Global } from "@emotion/react"

export const globalStyles = (
  <Global
    styles={css`
      * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
      }
      :root {
        color-scheme: light dark;
        --fg-color: #fff;
        --bg-color: #9200ff;
        --hyperlink-color: #09f;
        --hyperlink-hover-color: #0df;
        --hyperlink-visited-color: #99f;
        background: var(--bg-color);
        color: var(--fg-color);
        min-height: 100vh;
        font-family: Manufab, Helvetica, Arial, sans-serif;
        font-size: 21px;
      }
      a {
        color: var(--fg-color);
        --fg-color: var(--hyperlink-color);
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

      @media (prefers-color-scheme: light) {
        :root {
          --fg-color: #333;
          --bg-color: #fff;
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
