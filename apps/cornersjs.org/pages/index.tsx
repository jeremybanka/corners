/// <reference types="@emotion/react/types/css-prop" />

import { css } from "@emotion/react"

import { visor, softCard } from "../shared/containers"
import { link } from "../shared/link"

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
      background-color: var(--bg-shade-1);
      h1 {
        font-size: 8vmax;
        line-height: 7vmax; 
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
      > section {
        margin-top: 40px;
        display: flex;
        gap: 10px;
      }
    `}
	>
		<h1>
			Cut corners <br /> with style
		</h1>
		<softCard.article />
		<section>
			<link.left href={`/docs`}>Read the Docs</link.left>
			<link.main href={`/docs/presets`}>Get Started!</link.main>
		</section>
	</visor.main>
)

export default Home
