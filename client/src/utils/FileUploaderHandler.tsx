import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";

type Props = {};

export default function FileUploaderHandler({}: Props) {
  const fileTypes = ["JPG", "PNG", "GIF"];
  const [file, setFile] = useState(null);
  const [image, setImage] = useState('');

  const handleChange = (file: any) => {
    setFile(file);
  };
  // read file
  const readFile = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log("read:", reader.result);
      setImage(reader.result as string);
    };
  };

  useEffect(() => {
    if (file) {
      readFile(file);
    }
  }, [file])

  return (
    <div>
      <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
      <img src={image} alt="uploaded" />
    </div>
  );
}
