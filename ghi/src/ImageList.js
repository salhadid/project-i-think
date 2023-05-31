import React, { useState, useEffect } from "react";

function ImageList() {
  const [images, setImages] = useState([]);
  const [votes, setVotes] = useState({});
  const [enlargedImageId, setEnlargedImageId] = useState(null); // track if an image is enlarged

  useEffect(() => {
    fetch("http://localhost:8000/api/images/list/")
      .then((response) => response.json())
      .then((data) => setImages(data))
      .catch((error) => console.error(error));
  }, []);

  const handleImportImage = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    fetch("http://localhost:8000/api/images/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setImages([...images, { _id: data.image_id, filename: file.name }]);
      })
      .catch((error) => console.error(error));
  };

  const deleteImage = (imageId) => {
    fetch(`http://localhost:8000/api/images/${imageId}`, {
      method: "DELETE",
    })
      .then(() => {
        setImages(images.filter((image) => image._id !== imageId));
      })
      .catch((error) => console.error(error));
  };

  const voteImage = (imageId, voteChange) => {
    setVotes((oldVotes) => ({
      ...oldVotes,
      [imageId]: (oldVotes[imageId] || 0) + voteChange,
    }));
  };

return (
  <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen pt-20">
    <div className="grid grid-cols-3 gap-4 p-4">
      {images.map((image) => (
        <div key={image._id} className="relative">
          <img
            src={`http://localhost:8000/api/images/${image.filename}`}
            alt={image.filename}
            className={`w-full h-64 object-cover rounded-lg ${
              enlargedImageId === image._id
                ? "scale-150 transform transition"
                : ""
            }`}
            onClick={() =>
              setEnlargedImageId(
                enlargedImageId === image._id ? null : image._id
              )
            }
          />
          <div className="absolute right-0 top-0 p-1">
            <span
              onClick={() => deleteImage(image._id)}
              role="img"
              aria-label="delete"
              className="text-2xl cursor-pointer"
            >
              ❌
            </span>
          </div>
          <div className="absolute left-0 bottom-0 p-1">
            <span
              onClick={() => voteImage(image._id, 1)}
              role="img"
              aria-label="upvote"
              className="text-2xl cursor-pointer"
            >
              👍
            </span>
          </div>
          <div className="absolute right-0 bottom-0 p-1">
            <span
              onClick={() => voteImage(image._id, -1)}
              role="img"
              aria-label="downvote"
              className="text-2xl cursor-pointer"
            >
              👎
            </span>
          </div>
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl">
            {votes[image._id] || 0}
          </div>
        </div>
      ))}
    </div>
    <div className="fixed bottom-0 left-0 right-0 text-center">
      <label className="my-4 bg-white rounded-lg text-black px-4 py-2 cursor-pointer inline-block">
        Upload .jpg
        <input type="file" onChange={handleImportImage} className="hidden" />
      </label>
    </div>
  </div>
);
}

export default ImageList;
