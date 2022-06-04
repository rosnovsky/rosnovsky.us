import React, { useState } from 'react';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { $generateHtmlFromNodes } from '@lexical/html';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { LinkNode } from '@lexical/link';
import exampleTheme from './theme';
import ToolbarPlugin from './toolbar';
import { $getRoot, EditorState, LexicalEditor } from 'lexical';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TRANSFORMERS } from '@lexical/markdown';
import CodeHighlightPlugin from './plugins/codeHighlight';

export function CommentEditor({ postId, handleComment }) {
  const [disabled, setDisabled] = useState(true);
  const [commentLength, setCommentLength] = useState(0);
  const [commentEditorEditor, setCommentEditorEditor] =
    useState<LexicalEditor>();
  const [_commentEditorState, setCommentEditorState] = useState<EditorState>();

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
      setDisabled(false);
      setCommentLength(contentLength);
      setCommentEditorEditor(editor);
      setCommentEditorState(_editorState);

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
    setCommentLength(0);
    setDisabled(true);
    commentEditorEditor?.update(() => {
      $getRoot().clear();
    });

    handleComment(comment);
  }

  function onError(error) {
    console.error(error);
  }

  const initialConfig = {
    onError,
    theme: exampleTheme,
    // disabled: true,
    // disabled: user.user?.name ? false : true,
    nodes: [LinkNode, CodeNode, CodeHighlightNode],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="container border rounded-t-lg text-left caret-darkCoolGray-700">
        <ToolbarPlugin />
        <div className="container bg-darkCoolGray-50">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={null}
          />
          <OnChangePlugin onChange={onChange} />
          <HistoryPlugin />
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
