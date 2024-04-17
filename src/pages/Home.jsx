import * as React from "react";
import { BlogList, NavbarComponent } from "../component";
import { Button, Carousel } from "flowbite-react";
import useFetch from "../network/useFetch";
const Home = () => {
  const {
    error,
    isPending,
    data: blogs,
  } = useFetch("http://localhost:8000/api/myForums");
  React.useEffect(() => {
    document.title = "Home";
  }, []);
  return (
    <div>
      <div className="bg-gradient-to-r from-cokelatKuning-900 to-cokelatKuning-50">
        <NavbarComponent />
      </div>
      <section className="flex p-3">
        {error && <div>{error}</div>}
        {isPending && <div>Loading...</div>}
        {blogs && <BlogList blogs={blogs.data} />}
      </section>
    </div>
  );
};

export default Home;
