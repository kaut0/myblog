import * as React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useFetch from "../network/useFetch";
import { NavbarComponent } from "../component";
import moment from "moment";

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
    fetch("http://localhost:8000/api/forums/" + blog.data.id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then(() => {
      navigate("/");
    });
  };

  const RenderData = (val) => {
    const forum = val.data.data;
    const user = val.data.user;
    const time = moment(forum.created_at).format("LL");
    return (
      <React.Fragment>
        <div className="flex flex-col self-center align-middle px-6 py-3 pb-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-3 lg:px-4">
            <div className="max-w-3xl mx-auto">
              <div className="py-4">
                <div className=" flex flex-row items-center justify-between">
                  <h1 className="text-3xl font-bold">{forum.title}</h1>
                  <div className="flex flex-row">
                    <button
                      className="mr-2"
                      onClick={() => {
                        navigate(`/update/${id}`);
                      }}
                    >
                      edit
                    </button>
                    <button onClick={handleClick}>delete</button>
                  </div>
                </div>
                <p className="text-gray-500 text-sm my-2">
                  Published on <time>{time}</time>
                </p>
                <p className="text-gray-500 text-sm">
                  Author by <time>{user.username}</time>
                </p>
              </div>
              <img
                src={forum.image}
                alt="Featured image"
                className="w-full h-80 mb-8"
              />
              <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto">
                <p>{forum.body}</p>
              </div>
            </div>
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
      <div>
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
