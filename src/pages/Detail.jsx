import * as React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useFetch from "../network/useFetch";
import { NavbarComponent } from "../component";

const Detail = () => {
  const { id } = useParams();
  const {
    data: blog,
    error,
    isPending,
  } = useFetch("http://localhost:8000/api/myForums/" + id);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleClick = () => {
    fetch("http://localhost:8000/api/forums/" + blog.id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then(() => {
      navigate("/");
    });
  };

  const RenderData = (val) => {
    console.log("ini value", val.data);
    return (
      <React.Fragment>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="max-w-3xl mx-auto">
            <div class="py-8">
              <h1 class="text-3xl font-bold mb-2">{val.data.title}</h1>
              <p class="text-gray-500 text-sm">
                Published on <time>{val.data.created_at}</time>
              </p>
            </div>
            <img
              src={val.data.image}
              alt="Featured image"
              class="w-full h-auto mb-8"
            />
            <div class="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto">
              <p>{val.data.body}</p>
            </div>
          </div>
          <div className="flex flex-row">
            <button
              className="mr-2 bg-cokelatKuning-900"
              onClick={() => {
                navigate(`/update/${id}`);
              }}
            >
              edit
            </button>
            <button onClick={handleClick}>delete</button>
          </div>
        </div>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <div className="bg-gradient-to-r from-cokelatKuning-900 to-cokelatKuning-50">
        <NavbarComponent />
      </div>
      <div className="blog-details">
        {isPending && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {/* {blog && (
          <article>
            <h2>{blog.title}</h2>
            <div>
              <img
                className="h-auto max-w-full"
                src={blog.image}
                alt="image description"
              />
              {blog.body}
            </div>
            <p>di tulis oleh {blog.author}</p>
            <div className="flex flex-row">
              <button
                className="mr-2 bg-cokelatKuning-900"
                onClick={() => {
                  navigate(`/update/${id}`);
                }}
              >
                edit
              </button>
              <button onClick={handleClick}>delete</button>
            </div>
          </article>
        )} */}
        {blog && <RenderData data={blog} />}
      </div>
    </React.Fragment>
  );
};

export default Detail;