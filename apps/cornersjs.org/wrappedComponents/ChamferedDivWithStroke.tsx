import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

const Component: React.FC = () => (
  <SyntaxHighlighter language="tsx">
    {"import { css } from \"@emotion/react\"\nimport { chamfered } from \"corners\"\n\nconst BoxStyles = css`\n  box-sizing: border-box;\n  width: 100%;\n  color: red;\n  background: #e3e3e3;\n  display: flex;\n  font-size: 5vmin;\n  font-family: Charter;\n  justify-content: center;\n  align-items: center;\n  padding: 30px;\n`\n\nconst ChamferedDivWithStroke = chamfered.div.with({\n  cornerSize: 10,\n})\n\n// eslint-disable-next-line\nexport default function Foo(): React.ReactNode {\n  return (\n    <ChamferedDivWithStroke css={BoxStyles}>\n      Now is the time\n    </ChamferedDivWithStroke>\n  )\n}\n"}
  </SyntaxHighlighter>
);

export default Component;