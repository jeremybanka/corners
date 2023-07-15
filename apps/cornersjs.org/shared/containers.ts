import Emotion from "@emotion/styled"
import corners, { chamfer, chamfered, rounded, semiChamfered } from "corners"
import Link from "next/link"

const styled = {
  roundedLink: Emotion(
    rounded(Link, {
      cornerSize: 15,
      useClipPath: false,
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
      useClipPath: true,
      above: {
        color: `transparent`,
        stroke: { color: `var(--fg-color)`, width: 2 },
      },
    })
  ),
  roundedArticle10: Emotion(
    rounded(`article`, {
      cornerSize: 50,
      useClipPath: false,
      below: [
        {
          className: `shadow`,
          color: `#bebebe`,
          blur: 60,
          spread: 30,
          offset: { x: 30, y: -30 },
        },
        {
          className: `highlight`,
          color: `#fff`,
          blur: 60,
          spread: 30,
          offset: { x: -30, y: 30 },
        },
        {
          className: `paper`,
          color: `#eae9e9`,
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
  logoLink: Emotion(
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
    })(Link)
  ),
}

export const inlaid = {
  searchBar: styled.inlaidDiagonalInput`
    padding: 10px 15px;
    background: linear-gradient(0deg, #fd01 0%, transparent 100%);
  `,
}

export const bubble = {
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

export const visor = {
  main: styled.chamferedMain`
    padding: 10px 15px;
    /* background: linear-gradient(0deg, #fd01 0%, transparent 100%); */
  `,
}

export const softCard = {
  article: styled.roundedArticle10``,
}

export const neo = {
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

export const logo = {
  link: styled.logoLink`
    padding-top: 5px;
    padding-left: 2px;
    padding-bottom: 1px;
    padding-right: 8px;
    line-height: 23px;
    font-size: 27px;
    font-variation-settings: "wght" 700;
  `,
}
