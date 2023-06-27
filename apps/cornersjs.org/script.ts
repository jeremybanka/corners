const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

const inputDir = './src/components'; // The directory containing the original TSX files
const outputDir = './src/wrappedComponents'; // The directory to write the new TSX files to

// Function to wrap the TSX code in a function component
function wrapCode(code) {
  return `import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Component: React.FC = () => (
  <SyntaxHighlighter language="tsx" style={solarizedlight}>
    {${JSON.stringify(code)}}
  </SyntaxHighlighter>
);

export default Component;
`;
}

// Function to handle a file being added or changed
function handleFile(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  const fileName = path.basename(filePath);
  const outputFilePath = path.resolve(outputDir, fileName);
  const wrappedCode = wrapCode(code);
  fs.writeFileSync(outputFilePath, wrappedCode);
}

// Create the watcher
const watcher = chokidar.watch(inputDir, { persistent: true });

// Handle the "add" and "change" events
watcher.on('add', handleFile);
watcher.on('change', handleFile);
