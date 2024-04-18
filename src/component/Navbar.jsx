import * as React from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
export default function NavbarComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const handleLogOut = () => {
    localStorage.removeItem("token");
    setOpenModal(false);
    navigate("/login");
  };
  const modalHandler = () => {
    setOpenModal(!openModal);
  };
  const token = localStorage.getItem("token");
  const checkToken = () => {
    if (!token) {
      navigate("/login");
    }
  };
  React.useEffect(() => {
    checkToken();
  }, []);
  return (
    <React.Fragment>
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
            <Dropdown.Item onClick={modalHandler}>Sign out</Dropdown.Item>
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
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Yakin ingin keluar?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => handleLogOut()}>
                <label className="text-white">{"Iya, Yakin"}</label>
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Tidak, batalkan
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}
