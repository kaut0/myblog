import * as React from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function NavbarComponent() {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const checkToken = () => {
    if (!token) {
      navigate("/login");
    }
  };
  React.useEffect(() => {
    checkToken();
  }, []);
  return (
    <Navbar
      className="bg-gradient-to-r from-cokelatKuning-900 to-cokelatKuning-50"
      fluid
    >
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          My Blog
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2 justify-between w-40">
        <Dropdown
          arrowIcon={false}
          inline
          label={<Avatar className="hidden sm:block" rounded />}
        >
          <Dropdown.Item onClick={handleLogOut}>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle className="bg-transparent"></Navbar.Toggle>
        {/* <Avatar className="hidden sm:block" rounded />
        <Avatar className="hidden sm:block" rounded /> */}
      </div>
      <Navbar.Collapse>
        <Navbar.Link
          className="mx-8 sm:mx-0"
          href="/"
          active={location.pathname === "/" ? true : false}
        >
          Home
        </Navbar.Link>
        <Navbar.Link
          className="mx-8 sm:mx-0"
          href="/create"
          active={location.pathname === "/create" ? true : false}
        >
          New Blogs
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
