import JoditEditor from "jodit-react";
import React, { useContext, useRef } from "react";
import CreateContext from "../../Components/CreateContex";
const config = ["bold", "italic", "underline", "link", "unlink"];

const RichText = () => {
  const editor = useRef(null);
  const { setRichTextContent } = useContext(CreateContext);

  return (
    <JoditEditor
      ref={editor}
      tabIndex={8}
      onBlur={(newContent) => setRichTextContent(newContent)} // preferred to use only this option to update the content for performance reasons
    />
  );
};

export default RichText;
