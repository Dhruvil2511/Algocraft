import React, { useState } from "react";

import Editor from "@monaco-editor/react";

const CodeEditorWindow = ({ onChange, language, code, theme }) => {
    const [value, setValue] = useState(code || "");

    const handleEditorChange = (value) => {
        setValue(value);
        onChange("code", value);
    };

    return (
        <div className="overflow-hidden w-100 h-100" style={{ border: 'none', borderRadius: '8px', boxShadow: " 0px 2px 4px #00000014,0px 4px 8px #00000014,0px 6px 12px #00000014" }}>
            <Editor
                height="85vh"
                width={`100%`}
                language={language || "C++"}
                value={value}
                theme={theme}
                defaultValue="// some comment"
                onChange={handleEditorChange}
            />
        </div>
    );
};
export default CodeEditorWindow;