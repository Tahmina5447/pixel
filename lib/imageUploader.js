const imgUrl = `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`;
export const singleImageUploader = (
  event,
  setImageUrl,
  setImageUploadErrorMessage = () => { }
) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = (event) => {
    const img = new Image();
    img.src = event.target.result;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);

      canvas.toBlob(
        (blob) => {
          const formdata = new FormData();
          const fileType = file.type;
          const isWebP = fileType === "image/webp";

          if (!isWebP) {
            formdata.append("image", blob, "image.webp");
          } else {
            formdata.append("image", blob, "image." + fileType.split("/")[1]);
          }

          fetch(imgUrl, {
            method: "POST",
            body: formdata,
          })
            .then((response) => response.json())
            .then((result) => {
              if (result.data?.url) {
                setImageUrl(result.data?.url);
                return setImageUploadErrorMessage(null);
              }

              setImageUploadErrorMessage(
                "Image Upload failed, please check your internet connection"
              );
            })
            .catch((error) => console.error("Error:", error));
        },
        file.type,
        0.8
      );
    };
  };
};

export const handleMultiImageUpload = (
  event,
  imageUrl,
  setImageUrl,
  setImageUploadErrorMessage = () => { }
) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = (event) => {
    const img = new Image();
    img.src = event.target.result;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);

      canvas.toBlob(
        (blob) => {
          const formdata = new FormData();
          formdata.append("image", blob, "image.webp");

          fetch(imgUrl, {
            method: "POST",
            body: formdata,
          })
            .then((response) => response.json())
            .then((result) => {
              if (result.data?.url) {
                let newImageUrls = [...imageUrl];
                newImageUrls.push(result.data?.url);
                setImageUrl(newImageUrls);
                return setImageUploadErrorMessage(null);
              }

              setImageUploadErrorMessage(
                "Image Upload failed, please check your internet connectoin"
              );
            })
            .catch((error) => console.error("Error:", error));
        },
        "image/webp",
        0.8
      );
    };
  };
};
