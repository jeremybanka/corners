import path from "path"

import express from "express"

const app = express()

app.use(express.static(path.join(__dirname, `.`)))

app.post(`/`, function (_, res) {
  res.sendFile(path.join(`./index.html`))
})

app.listen(process.env.PORT || 3001)
