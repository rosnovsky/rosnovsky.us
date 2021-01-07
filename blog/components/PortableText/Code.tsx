import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import nightOwl from 'react-syntax-highlighter/dist/cjs/styles/hljs/night-owl'

const Code: React.FC<{ node: { language: string; code: string } }> = ({
  node,
}) => {
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
