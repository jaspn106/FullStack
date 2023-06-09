import { Container, Nav, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import NavBarLoggedInView from "./NavBarLoggedInView";
import NavBarLoggedOutView from "./NavBarLoggedOutView";

interface NavBarProps {
  loggedInUser: User | null;
  onSignUpClicked: () => void;
  onLogInClicked: () => void;
  onLogoutSuccess: () => void;
}

const NavBar = ({
  loggedInUser,
  onSignUpClicked,
  onLogInClicked,
  onLogoutSuccess,
}: NavBarProps) => {
  return (
    <Navbar bg="primary" variant="dark" expand="sm" sticky="top">
      <Container>
        <Navbar.Brand>Jasons first fullstack website</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            {loggedInUser ? (
              <NavBarLoggedInView
                user={loggedInUser}
                onLogoutSuccess={onLogoutSuccess}
              />
            ) : (
              <NavBarLoggedOutView
                onLoginClicked={onLogInClicked}
                onSignUpClicked={onSignUpClicked}
              />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavBar;
