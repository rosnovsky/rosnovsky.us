import SyntaxHighlighter from 'react-syntax-highlighter'

const Code: React.FC<{ node: { language: string; code: string } }> = ({
  node,
}) => {
  if (!node || !node.code) {
    return null
  }
  const { language, code } = node
  return (
    <SyntaxHighlighter language={language || 'text'}>{code}</SyntaxHighlighter>
  )
}

export default Code
