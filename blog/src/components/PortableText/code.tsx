import React from 'react'
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/hljs'

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
