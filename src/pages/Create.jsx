import * as React from "react";
import { useNavigate } from "react-router-dom";
import { NavbarComponent } from "../component";
import { FileInput } from "flowbite-react";
import axios from "axios";

const Create = () => {
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [image, setImage] = React.useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, category: author, image };
    axios
      .post("http://localhost:8000/api/forums", blog, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <NavbarComponent />
      <div className="create">
        <h2>Add a New Blog</h2>
        <form onSubmit={handleSubmit}>
          <label>Blog title:</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Blog body:</label>
          <textarea
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
          <div>
            <label>Upload Gambar</label>
            <FileInput
              id="file-upload"
              onChange={async (val) => {
                const base64 = await convertBase64(val.target.files[0]);
                setImage(base64);
              }}
            />
          </div>
          <label>Blog author:</label>
          <input
            type="text"
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <button>Add Blog</button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Create;
