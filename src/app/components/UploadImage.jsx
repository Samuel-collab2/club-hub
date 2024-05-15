"use client";

import { useState } from "react";
import styled from "styled-components";
import UploadImageIcon from "@mui/icons-material/CenterFocusStrong";
import Image from "next/image";

export default function UploadImage({ ...props }) {
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewImage(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Container {...props} className={previewImage ? "disabled-dashed" : null}>
      {!previewImage && (
        <h1>
          <UploadImageIcon id="upload-image-icon" />
        </h1>
      )}

      {previewImage && (
        <Image
          src={previewImage}
          alt="Preview Image"
          width={300}
          height={300}
          style={{ objectFit: "cover" }}
        />
      )}
      <label for="file-upload" class="custom-file-upload">
        Upload {previewImage && "a different"} Image
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleImageChange}
      />
    </Container>
  );
}

const Container = styled.div`
  border: 5px solid black;
  border-style: dashed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &.disabled-dashed {
    border: none;
  }

  #upload-image-icon {
    transform: scale(3);
  }

  .custom-file-upload {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000a3e;
    border: none;
    border-radius: 15px;
    color: white;
    padding: 10px 15px;
    gap: 5px;
    cursor: pointer;
    max-width: 200px;
    margin-top: 10px;
  }

  input[type="file"] {
    display: none;
  }
`;
