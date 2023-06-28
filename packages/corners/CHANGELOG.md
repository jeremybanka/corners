# corners

## 0.1.0

### Minor Changes

- a0b5fe3: 💥 BREAKING CHANGE: Backgrounds of layers no longer default to ⬛ `black` but to 🏁 `transparent` instead.
- 8479511: 💥 BREAKING CHANGE: When `useClipPath` is `false`, css `background` is no longer automatically made 🏁 `transparent`.
- 8479511: 💥 BREAKING CHANGE: The use of `clip-path` remains on by default. however, the flag has been renamed from `noClipping` to `useClipPath`. `useClipPath: false` overrides the default behavior in the same way `noClipping: true` did previously.
