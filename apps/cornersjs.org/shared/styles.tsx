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
        --color-light: #fff;
        --color-light-soft: #ccc;
        --color-light-faint: #444;
        --color-dark: #111;
        --color-dark-shade-1: #222;
        --fg-color: var(--color-light);
        --bg-color: var(--color-dark);
        --bg-tint-1: #191919;
        --bg-shade-1: #0a0a0a;
        --hyperlink-color: #09f;
        --hyperlink-hover-color: #0df;
        --hyperlink-visited-color: #99f;
        --special-color: #9200ff;
        @media (prefers-color-scheme: light) {
          :root {
            --fg-color: #333;
            --fg-soft: #777;
            --bg-color: #f9f9f9;
            --bg-tint1: #fff;
            --bg-shade1: #f3f3f3;
            --bg-shade2: ##bebebe;
            --hyperlink-color: #08f;
            --hyperlink-hover-color: #04f;
            --hyperlink-visited-color: #99f;
          }
          button {
            background-color: #f9f9f9;
          }
        }
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

      
    `}
	/>
)
