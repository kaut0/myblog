"use client";
import { Link } from "react-router-dom";
import { Card } from "flowbite-react";

const BlogList = ({ blogs }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {blogs.map((blog) => (
        <div key={blog.id}>
          <Link to={`/detail/${blog.id}`}>
            <Card className="">
              {blog.image && (
                <img
                  className="h-52 max-w-full"
                  src={blog.image}
                  alt="image description"
                />
              )}
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {blog.title}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {blog.body}
              </p>
            </Card>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
