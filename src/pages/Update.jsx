import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NavbarComponent } from "../component";
import { FileInput } from "flowbite-react";
import useFetch from "../network/useFetch";
import axios from "axios";

const Update = () => {
  const { id } = useParams();
  const {
    data: blog,
    error,
    isPending,
  } = useFetch("http://localhost:8000/api/myForums/" + id);
  //   console.log("makan", blog);
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [image, setImage] = React.useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  React.useMemo(() => {
    if (blog) {
      setTitle(blog.data.title);
      setBody(blog.data.body);
      setAuthor(blog.data.category);
      setImage(blog.data.image);
    }
  }, []);

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
    const blogs = {
      id,
      title: title !== "" ? title : blog.data.title,
      body: body !== "" ? body : blog.data.body,
      category: author !== "" ? author : blog.data.category,
      image: image !== "" ? image : blog.data.image,
    };
    axios
      .post("http://localhost:8000/api/updateForums/", blogs, {
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
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <div className="create">
          <h2>Update a Blog</h2>
          <form onSubmit={handleSubmit}>
            <label>Blog title:</label>
            <input
              type="text"
              required
              value={title !== "" ? title : blog.data.title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>Blog body:</label>
            <textarea
              required
              value={body !== "" ? body : blog.data.body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
            <div>
              <label>Upload Gambar</label>
              <FileInput
                id="file-upload"
                // required
                onChange={async (val) => {
                  const base64 = await convertBase64(val.target.files[0]);
                  setImage(base64);
                }}
              />
            </div>
            {/* <label>Blog author:</label>
            <input
              type="text"
              // required
              value={author !== "" ? author : blog.data.category}
              onChange={(e) => setAuthor(e.target.value)}
            /> */}
            <button>Update Blog</button>
          </form>
        </div>
      )}
    </React.Fragment>
  );
};

export default Update;
