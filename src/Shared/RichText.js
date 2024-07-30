import React, { useContext, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CreateContext from "../Components/CreateContex";

const RichText = () => {
  const { richText, setValueOfRichText } = useContext(CreateContext);

  return (
    <ReactQuill theme="snow" value={richText} onChange={setValueOfRichText} />
  );
};

export default RichText;
