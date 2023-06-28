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
        --bg-color: #070707;
        background: var(--bg-color);
        color: var(--fg-color);
        min-height: 100%;
        font-family: Manufab, Helvetica, Arial, sans-serif;
        font-size: 21px;
      }
      a {
        font-weight: 500;
        color: #09f;
        text-decoration: inherit;
        &:hover {
          color: #0df;
          text-decoration: underline;
        }
      }

      @media (prefers-color-scheme: light) {
        :root {
          /* --fg-color: #333;
          --bg-color: #fff; */
          color: var(--fg-color);
          background-color: var(--bg-color);
        }
        a:hover {
          color: #08f;
        }
        button {
          background-color: #f9f9f9;
        }
      }
    `}
  />
)
