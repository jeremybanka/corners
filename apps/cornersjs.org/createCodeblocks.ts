import fs from "fs"
import path from "path"

import chokidar from "chokidar"
import npmlog from "npmlog"

const inputDir = `./src/components` // The directory containing the original TSX files
const outputDir = `./src/wrappedComponents` // The directory to write the new TSX files to

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

npmlog.info(`createCodeblocks`, `Watching ${inputDir} for changes...`)

// Function to handle a file being added or changed
function handleFile(filePath: string) {
  npmlog.info(`createCodeblocks`, `Handling file ${filePath}`)
  const code = fs.readFileSync(filePath, `utf8`)
  const fileName = path.basename(filePath)
  const outputFilePath = path.resolve(outputDir, fileName)
  const wrappedCode = wrapCode(code)
  fs.writeFileSync(outputFilePath, wrappedCode)
}

// Create the watcher
const watcher = chokidar.watch(inputDir, { persistent: true })

// Handle the "add" and "change" events
watcher.on(`add`, (filePath) => {
  npmlog.info(`ADD`, `Handling add event for ${filePath}`)
  handleFile(filePath)
})
watcher.on(`change`, (filePath) => {
  npmlog.info(`CHANGE`, `Handling add event for ${filePath}`)
  handleFile(filePath)
})
