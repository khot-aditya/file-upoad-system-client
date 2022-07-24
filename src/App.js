import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [imageArray, setImageArray] = useState(null);

  const ip = "192.168.29.249";

  useEffect(() => {
    fetch(`http://${ip}:3001/media/images`)
      .then((response) => response.json())
      .then((responseData) => {
        setImageArray(responseData.data);
      });
  }, []);

  const deleteImage = (filename) => {
    fetch(`http://${ip}:3001/media/images?filename=${filename}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((responseData) => setImageArray(responseData.data));
  };

  return (
    <div className="center">
      <h1>React File Upload System</h1>
      <form
        encType="multipart/form-data"
        multiple
        action={`http://${ip}:3001/upload/img`}
        method="post"
      >
        <input type="file" multiple name="file" id="file" />
        <input type="submit" value="upload" />
      </form>

      {/* <img src="http://192.168.105.139:3001/images/1658296525457.png"/> */}

      {imageArray ? <h1>data</h1> : <h1>no data</h1>}

      <div>
        {imageArray?.map((image) => (
          <div key={image.id}>
            <img
              src={`http://${ip}:3001/images/${image.filename}`}
              alt={image.originalname}
              width="400"
              onClick={() => {
                deleteImage(image.filename);
              }}
            />
            <h2>{image.originalname}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
