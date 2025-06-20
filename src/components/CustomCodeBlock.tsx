"use client";

import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export function CustomCodeBlock({ className, children }: any) {
  const [copied, setCopied] = useState(false);
  const language = className?.replace("language-", "") || "text";

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div
      style={{
        position: "relative", // Ensure the button is positioned relative to this container
        marginBottom: "16px",
      }}
    >
      {/* Copy Button */}
      <button
        onClick={handleCopy}
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          background: "transparent", // Transparent background
          color: copied ? "green" : "white", // Change text color based on copy state
          border: "none", // Remove border
          borderRadius: "4px",
          padding: "4px 8px",
          cursor: "pointer",
          fontSize: "12px",
          zIndex: 10, // Ensure the button appears above other elements
        }}
      >
        {copied ? "Copied!" : "Copy"}
      </button>

      {/* Syntax Highlighter */}
      <SyntaxHighlighter
        language={language}
        style={{
          ...materialDark,
          'pre[class*="language-"]': {
            ...materialDark['pre[class*="language-"]'],
            background: "rgba(0, 0, 0, 0.2)", // Add slight black tint
            boxShadow: "none", // Remove any shadows
            border: "none", // Remove borders
            padding: "16px", // Add padding for better readability
            margin: "0", // Remove margins
            borderRadius: "8px", // Add rounded corners
          },
          'code[class*="language-"]': {
            ...materialDark['code[class*="language-"]'],
            background: "transparent", // Transparent background for inline code
          },
        }}
        customStyle={{
          background: "rgba(0, 0, 0, 0.2)", // Add slight black tint
          padding: "16px", // Add padding for better readability
          margin: "0", // Remove margins
          borderRadius: "8px", // Add rounded corners
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}