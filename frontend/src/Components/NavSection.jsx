import React, { useContext } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

import { useNavigate } from "react-router-dom";
import { MyContext } from "./Context/TaskContext";

const NavSection = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const route = useNavigate();
  const { state, logout } = useContext(MyContext);

  const menuItems = ["Profile", "System", "Log Out"];
  return (
    <>
      <Navbar
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand>
            <p className="font-bold text-inherit">Task Management</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarBrand>
            <p className="font-bold text-inherit">Task Management</p>
          </NavbarBrand>
          <NavbarItem>
            <Link>All Task</Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="success">Completed</Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="danger">Deleted</Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          {!state?.currentuser?.name ? (
            <NavbarItem className="hidden lg:flex">
              <Button onClick={() => route("/login")}>Login</Button>
            </NavbarItem>
          ) : (
            <NavbarItem>
              <Button onClick={logout} color="success">
                Logout
              </Button>
            </NavbarItem>
          )}
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color={
                  index === 2
                    ? "warning"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </>
  );
};

export default NavSection;
