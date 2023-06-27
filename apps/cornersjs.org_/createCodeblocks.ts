import fs from "fs"
import path from "path"

import chokidar from "chokidar"
import npmlog from "npmlog"

const myArgs = process.argv.slice(2)
const lastArgument = myArgs[myArgs.length - 1]
if (lastArgument == null) {
  npmlog.error(
    `createCodeblocks`,
    `No arguments provided: specify 'watch' or 'all'`
  )
  process.exit(1)
}

const inputDir = `./components` // The directory containing the original TSX files
const outputDir = `./wrappedComponents` // The directory to write the new TSX files to

// Function to wrap the TSX code in a function component
function wrapCode(code: string) {
  return `import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Component: React.FC = () => (
  <SyntaxHighlighter language="tsx" style={solarizedlight}>
    {${JSON.stringify(code)}}
  </SyntaxHighlighter>
);

export default Component;
`
}

// Function to handle a file being added or changed
function handleFile(filePath: string) {
  npmlog.info(`createCodeblocks`, `Handling file ${filePath}`)
  const code = fs.readFileSync(filePath, `utf8`)
  const fileName = path.basename(filePath)
  const outputFilePath = path.resolve(outputDir, fileName)
  const wrappedCode = wrapCode(code)
  fs.writeFileSync(outputFilePath, wrappedCode)
}

if (lastArgument === `watch`) {
  npmlog.info(`createCodeblocks`, `Watching ${inputDir} for changes...`)
  const watcher = chokidar.watch(inputDir, { persistent: true })

  watcher.on(`add`, (filePath) => {
    npmlog.info(`ADD`, `Handling add event for ${filePath}`)
    handleFile(filePath)
  })
  watcher.on(`change`, (filePath) => {
    npmlog.info(`CHANGE`, `Handling add event for ${filePath}`)
    handleFile(filePath)
  })
} else {
  npmlog.info(`createCodeblocks`, `Processing all files in ${inputDir}...`)
  fs.readdir(inputDir, (err, files) => {
    if (err) {
      return console.log(`Unable to scan directory: ` + err)
    }

    files.forEach((file) => {
      const filePath = path.join(inputDir, file)

      // Check if the path is a file
      fs.stat(filePath, (err, stats) => {
        if (err) {
          return console.log(`Unable to retrieve file stats: ${err}`)
        }

        if (stats.isFile()) {
          handleFile(filePath)
        }
      })
    })
  })
}
