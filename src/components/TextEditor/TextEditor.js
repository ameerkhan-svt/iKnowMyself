import React from "react";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';


const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ size: [] }],
    [{ font: [] }],
    [{ align: ["right", "center", "justify"] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    [{ color: ["red", "#785412"] }],
    [{ background: ["red", "#785412"] }]
  ]
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
  "link",
  "color",
  "image",
  "background",
  "align",
  "size",
  "font"
];
 
const TextEditor = ({ value, onChange, placeholder }) => {
  return (
    <>
      <ReactQuill
      style={{
        minHeight: '300px',
        fontSize: '18px',
        background: '#fff'
      }}
        theme="snow"
        value={value || ""}
        modules={modules}
        formats={formats}
        onChange={onChange}
        placeholder={placeholder}
        styles={{
          minHeight: '430px'
        }}
      />
    </>
  );
};
 
export default TextEditor;