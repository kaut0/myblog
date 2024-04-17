import * as React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Create,
  Home,
  NotFound,
  Detail,
  Update,
  Login,
  Register,
} from "../pages";

const Routing = () => {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/" element={<Home />} />
      <Route exact path="/create" element={<Create />} />
      <Route exact path="/update/:id" element={<Update />} />
      <Route exact path="/detail/:id" element={<Detail />} />
      <Route exact path="*" element={<NotFound />} />
      {/* <Route exact path="/product" element={<Product />} /> */}
    </Routes>
  );
};

export default Routing;
