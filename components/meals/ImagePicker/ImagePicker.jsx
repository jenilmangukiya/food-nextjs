"use client";

import React, { useRef, useState } from "react";
import classes from "./ImagePicker.module.css";
import Image from "next/image";

export const ImagePicker = ({ name, label }) => {
  const [image, setImage] = useState();
  const ref = useRef();
  const handlePickImage = () => {
    ref.current.click();
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!image && <p>No image picked yet.</p>}
          {image && <Image src={image} fill alt="Image selected by user" />}
        </div>
        <input
          className={classes.input}
          type="file"
          accept="image/png, image/jpeg"
          name={name}
          id={name}
          ref={ref}
          onChange={handleImageChange}
          required
        />
        <button
          className={classes.button}
          type="button"
          onClick={handlePickImage}
        >
          Pick an image
        </button>
      </div>
    </div>
  );
};

export default ImagePicker;
