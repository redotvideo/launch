import React, { useState } from 'react';
import { Controlled as CodeMirror } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';

const Editor = () => {
  const [code, setCode] = useState('// Write your code here\n');

  const handleCodeChange = (editor, data, value) => {
    setCode(value);
  };

  return (
    <div className="editor-container">
      <CodeMirror
        value={code}
        options={{
          mode: 'javascript',
          theme: oneDark,
          lineNumbers: true,
        }}
        onBeforeChange={handleCodeChange}
      />
    </div>
  );
};

export default Editor;
