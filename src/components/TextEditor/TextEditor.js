import React, { useRef } from "react";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const TextEditor = ({ value, onChange, placeholder }) => {
  const quillRef = useRef(null);

  // Handle image upload
  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      if (file) {
        // Create a FileReader to convert image to base64
        const reader = new FileReader();
        reader.onload = () => {
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection();
          const index = range ? range.index : 0;
          
          // Insert the image as base64
          quill.insertEmbed(index, 'image', reader.result);
          quill.setSelection(index + 1);
        };
        reader.readAsDataURL(file);
      }
    };
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image", "code"],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ["clean"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  };

  const formats = [
    "header",
    "bold",
    "italic", 
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "code",
    "color",
    "background",
    "align",
  ];

  return (
    <div className="text-editor-container">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value || ""}
        modules={modules}
        formats={formats}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          height: '400px',
        }}
      />
      <style jsx global>{`
        .text-editor-container .ql-container {
          height: 340px !important;
          font-size: 14px;
        }
        .text-editor-container .ql-editor {
          height: 340px !important;
          overflow-y: auto !important;
          padding: 12px 15px;
        }
        .text-editor-container .ql-toolbar {
          border-top: 1px solid #ccc;
          border-left: 1px solid #ccc;
          border-right: 1px solid #ccc;
          border-bottom: none;
        }
        .text-editor-container .ql-container {
          border-bottom: 1px solid #ccc;
          border-left: 1px solid #ccc;
          border-right: 1px solid #ccc;
          border-top: none;
        }
      `}</style>
    </div>
  );
};

export default TextEditor;