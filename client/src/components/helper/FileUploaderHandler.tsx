import React, { useState } from 'react'
import { FileUploader } from "react-drag-drop-files";

type Props = {}

export default function FileUploaderHandler({}: Props) {
  const fileTypes = ["JPG", "PNG", "GIF"];
  const [file, setFile] = useState(null);

  const handleChange = (file :any )=> {
    setFile(file);
  }


  return (
    <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
  )
}