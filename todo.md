# notes

- FIRST example needs to be done defferently in code
- side-by side rounded corners and squorcle
- 





- [ ] Initial work
  - [x] remove husky/lint-staged
  - [x] convert to pnpm / clean out yarn package-cache
  - [x] set up github workflow to cache pnpm stuff

TODO: reorganize the codebase
TODO: find internal things and move them to an /internal folder

- [ ] Documentation:

  - [ ] Pre-sets
    - [ ] Clip-path vs. layers
    - [ ] Drop-shadow
    - [ ] Styled components
    - [ ] @emotion/react (emotion-css)
    - [ ] Classnames with Emotion (hover and active-effects)
    - [ ] Animation with Framer Motion with a pop-in effect
    - [ ] Putting it all together: how to organize a project with styled components (example template with showcase)

  - [ ] Deep-dive: customizing and making it yours
    - [ ] what is a corner
    - [ ] How do shapes implement corners
    - [ ] Canonical example: rectange
    - [ ] Canonical example: triangle
    - [ ] Canonical example: chamfered rectangle
    - [ ] Canonical example: shouting baloon
    - [ ] Canonical example: (conventional/naive) circular corner (e.g. border-radius)
    - [ ] Canonical example: squorcle (apple-style rounded rectangle)

- [ ] The API docs
  - [ ] chamfer, straight, round,
  - [ ] preset factories (chamfer, round, semi/demi chamfer) // straight add?
  - [ ] .size() and .with()
  - [ ] writePathPoint() / interpolate()
  - [ ] createCorner() ?? Does this actually get used?
