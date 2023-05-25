import { CartAlt } from "iconoir-react";
import { Navbar } from "flowbite-react";

export default function NavbarPage() {
  return (
    <Navbar fluid={true} rounded={true}>
      <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
        Yekcommerce
      </span>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="/navbars" active={true}>
          <CartAlt />
        </Navbar.Link>
        <Navbar.Link href="/navbars"></Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
