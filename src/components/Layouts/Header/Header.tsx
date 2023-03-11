import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container'; 
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import { useHistory } from "react-router-dom";
import axios from "axios";

import ConnectionConfig from "../../../assets/jsonData/ConnectionConfig/ConnectionConfig.json";
import LinkConfig from "../../../assets/jsonData/LinkConfig/LinkConfig.json";
import { useTranslation, Trans } from "react-i18next";

import style from "./Header.module.sass";

function Header() {
  const [name, setName] = useState<string | null>("");
  const [surname, setSurname] = useState<string | null>("");
  const [email, setEmail] = useState<string | null>("");
  const [password, setPassword] = useState<string | null>("");
  const [role, setRole] = useState<string | null>("");

  const [show, setShow] = useState<boolean>(false);
  let history = useHistory();

  const lngs: { [id: string]: { nativeName: string } } = {
    en: { nativeName: "Eng" },
    ua: { nativeName: "Ukr" },
  };

  const { i18n } = useTranslation();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleSignOut() {
    localStorage.clear();
    setName("");
    setSurname("");
    history.push({
      pathname: "/about",
    });
  }

  function handleSignIn() {
    const logInJson = {
      email: email,
      password: password,
    };

    console.log(logInJson);

    axios
      .post(
        `${ConnectionConfig.ServerUrl + ConnectionConfig.Routes.Authentication.Login}`,
        logInJson
      )
      .then((responce) => {
        var data = responce.data;
        localStorage.setItem("token", data.token);
      })
      .finally(function () {
        myInfo();
      })
      .catch((e) => {
        console.log(e);
        alert(e);
      });
  }

  const myInfo = () => {
    console.log(
      "ConnectionConfig.ServerUrl + ConnectionConfig.Routes.GetProfileInfo",
      ConnectionConfig.ServerUrl + ConnectionConfig.Routes.Profile.GetProfileInfo
    );
    axios
      .get(
        `${
          ConnectionConfig.ServerUrl + ConnectionConfig.Routes.Profile.GetProfileInfo
        }`,
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: "Bearer " + localStorage.getItem("token"), //the token is a variable which holds the token
          },
        }
      )
      .then((responce) => {
        var data = responce.data;
        localStorage.setItem("UserName", data.name);
        localStorage.setItem("UserSurname", data.surname);
        localStorage.setItem("UserRole", data.role);
        localStorage.setItem("UserEmail", data.email);
        console.log(data);
      })
      .finally(function () {
        setShow(false);
      })
      .catch((e) => {
        console.log(e);
        alert(e);
        return false;
      });
  };

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      setName(localStorage.getItem("UserName"));
      setSurname(localStorage.getItem("UserSurname"));
      setRole(localStorage.getItem("UserRole"));
      setEmail(localStorage.getItem("UserEmail"));
    }
  }, []);

  const getDropdown = () => {
    if (name !== null) {
      return (
        <Nav>
          <Dropdown
            id="dropdown-basic-button"
            title={name + " " + surname + " " + email + " " + role}
          >
            {/* <Dropdown.Item variant="primary" id="dd-but-sign-in" onClick={handleShow}>Sign in</Dropdown.Item> */}
            <Dropdown.Item variant="primary" id="dd-but-profile">
              <Trans i18nKey="Profile">Profile</Trans>
            </Dropdown.Item>
            <Dropdown.Item
              variant="primary"
              id="dd-but-sign-out"
              onClick={handleSignOut}
            >
              <Trans i18nKey="LogOut">LogOut</Trans>
            </Dropdown.Item>
          </Dropdown>
        </Nav>
      );
    } else {
      return (
        <Nav>
          <Dropdown id="dropdown-basic-button" title="Account">
            <Dropdown.Item
              variant="primary"
              id="dd-but-sign-in"
              onClick={handleShow}
            >
              <Trans i18nKey="LogIn">LogIn</Trans>
            </Dropdown.Item>
          </Dropdown>
        </Nav>
      );
    }
  };

  const getUserLinks = () => {
    if (localStorage.getItem("UserRole") === "User") {
      return (
        <div className={style.header_links_container}>
          <Nav.Link href={LinkConfig.home}>
            <Trans i18nKey="Exercises">Exercises</Trans>
          </Nav.Link>
          {/* <Nav.Link href={LinkConfig.lot_management.new_lot}>
            <Trans i18nKey="CreateNewLot">create new lot</Trans>
          </Nav.Link> */}
          <Nav.Link href={LinkConfig.user_management.profile}>
            <Trans i18nKey="Profile">Profile</Trans>
          </Nav.Link>
        </div>
      );
    } else if (localStorage.getItem("UserRole") === "Admin") {
      return (
        <div className={style.header_links_container}>
          {/* <Nav.Link href={LinkConfig.lot_management.agreement.agreement_list}>
            <Trans i18nKey="AgreementList">Agreement list</Trans>
          </Nav.Link> */}
          <Nav.Link href={LinkConfig.user_management.user_list}>
            <Trans i18nKey="Users">Users</Trans>
          </Nav.Link>
          {/* <Nav.Link href="/lot-list-management">
            <Trans i18nKey="LotListManagement">Lot list management</Trans>
          </Nav.Link> */}
        </div>
      );
    }
  };

  return (
    <>
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <Trans i18nKey="WOL">WOL</Trans>
          </Navbar.Brand>

          <div>
            {Object.keys(lngs).map((lng) => (
              <button
                key={lng}
                style={{
                  fontWeight: i18n.resolvedLanguage === lng ? "bold" : "normal",
                }}
                className={style.lang_button_style}
                type="submit"
                onClick={() => {
                  i18n.changeLanguage(lng);
                  window.location.reload();
                }}
              >
                {lngs[lng].nativeName}
              </button>
            ))}
          </div>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/lot-list">
                <Trans i18nKey="Lots">Lots</Trans>
              </Nav.Link>
              <Nav.Link href={LinkConfig.statistics}>
                <Trans i18nKey="Statistics">Statistics</Trans>
              </Nav.Link>
              {getUserLinks()}
              <Nav.Link href={LinkConfig.about}>
                <Trans i18nKey="AboutUs">About Us</Trans>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Nav>{getDropdown()}</Nav>
        </Container>
      </Navbar>
      <Modal show={show}>
        <Modal.Header className={style.login_modal_header}>
          <Modal.Title>
            <Trans i18nKey="LogIn">LogIn</Trans>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="fromBasicEmail">
              <Form.Label>
                <Trans i18nKey="Email">Email</Trans>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email !== null ? email : ""}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Form.Text className="text-muted">
                <Trans i18nKey="InvalidEmail">InvalidEmail</Trans>
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="fromBasicPassword">
              <Form.Label>
                {" "}
                <Trans i18nKey="Password">Password</Trans>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password !== null ? password : ""}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="fromBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <Form.Group controlId="fromSignInButton">
              <div className={style.login_modal_footer}>
                <Button variant="primary" onClick={handleSignIn}>
                  <Trans i18nKey="LogIn">LogIn</Trans>
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  <Trans i18nKey="Close">Close</Trans>
                </Button>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Header;
