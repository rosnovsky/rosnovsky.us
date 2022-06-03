import { useEffect, useState } from 'react';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $generateHtmlFromNodes } from '@lexical/html';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { LinkNode } from '@lexical/link';
import exampleTheme from './theme';
import ToolbarPlugin from './toolbar';
import { $getRoot, EditorState, LexicalEditor } from 'lexical';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TRANSFORMERS } from '@lexical/markdown';
import CodeHighlightPlugin from './codeHighlight';

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.focus();
  }, [editor]);

  return null;
}

function onError(error) {
  console.error(error);
}

export function CommentEditor({ postId, handleComment }) {
  const [disabled, setDisabled] = useState(true);
  const [commentLength, setCommentLength] = useState(0);

  function onChange(_editorState: EditorState, editor: LexicalEditor) {
    editor.update(() => {
      const contentLength = $getRoot()
        .getAllTextNodes()
        .reduce(
          (acc, node) => acc + node.getTextContent(false, false).trim().length,
          0
        );
      // autosave on change
      localStorage.setItem(postId, $generateHtmlFromNodes(editor, null));
      setCommentLength(contentLength);

      // disable Save button if there is no content
      if (contentLength < 10) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    });
  }

  function saveComment() {
    const comment = localStorage.getItem(postId);
    handleComment(comment);
  }

  const initialConfig = {
    onError,
    theme: exampleTheme,
    nodes: [LinkNode, CodeNode, CodeHighlightNode],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="container border rounded-t-lg text-left caret-darkCoolGray-700">
        <ToolbarPlugin />
        <div className="container bg-darkCoolGray-50">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
          />
          <OnChangePlugin onChange={onChange} />
          <HistoryPlugin />
          <MyCustomAutoFocusPlugin />
          <CodeHighlightPlugin />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </div>
      </div>
      <button
        className="mt-4 inline-block py-2 px-4 w-full text-sm leading-5 text-white bg-blue-500 hover:bg-blue-600 font-medium text-center focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md disabled:bg-gray-600"
        disabled={disabled}
        onClick={saveComment}
      >
        {disabled ? `Add ${10 - commentLength} characters` : 'Post Comment'}
      </button>
      <span className="text-xs text-gray-600 mt-2">
        Use markdown to add links, paste code to add code snippets
      </span>
    </LexicalComposer>
  );
}
