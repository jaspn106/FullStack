import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as UserApi from "../network/users_api";

interface NavBarLoggedInProps {
  user: User;
  onLogoutSuccess: () => void;
}

const NavBarLoggedInView = ({ user, onLogoutSuccess }: NavBarLoggedInProps) => {
  async function logout() {
    try {
      await UserApi.logout;
      onLogoutSuccess();
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <>
    <Navbar.Text className="me-2">
      Signed in as: {user.username}
    </Navbar.Text>
    <Button onClick={logout}>Log Out</Button>
    </>
  );
};
export default NavBarLoggedInView;
