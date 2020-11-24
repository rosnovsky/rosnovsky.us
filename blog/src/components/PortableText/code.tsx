import React from 'react'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import typescript from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/hljs'

SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('typescript', typescript);

const Code = ({ node }) => {
  if (!node || !node.code) {
    return null
  }
  const { language, code } = node
  return (
    <SyntaxHighlighter language={language || 'text'} style={nightOwl}>
      {code}
    </SyntaxHighlighter>
  )
}

export default Code
