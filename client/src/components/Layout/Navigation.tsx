import React, {useState} from "react";
import {
    ButtonDropdown,
    Collapse,
    Container,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem
} from "reactstrap";
import {NavLink, useHistory} from "react-router-dom";
import {faCodeBranch, faHome, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon as FA} from "@fortawesome/react-fontawesome";
import {useStoreActions, useStoreState} from "../../store";
import {APP_NAME, CONTAINER_FLUID} from "../../constants";

export const Navigation: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggle = () => setIsOpen(!isOpen);
    const history = useHistory();

    return (
        <Navbar dark className="mb-4 main-navbar px-0" expand="lg">
            <Container fluid={CONTAINER_FLUID}>
                <NavbarBrand className="hover-mouse" onClick={() => history.push("/")}>
                    {APP_NAME}
                </NavbarBrand>
                <NavbarToggler onClick={toggle}/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav navbar style={{marginRight: "auto"}}>
                        <NavItem>
                            <NavLink exact className="nav-link" to="/"><FA icon={faHome}/> Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/pull-requests"><FA icon={faCodeBranch}/> Pull Requests</NavLink>
                        </NavItem>
                    </Nav>
                    <Nav navbar style={{marginLeft: "auto"}}>
                        <NavItem>
                            <NavLink className="nav-link" to="/account"><FA icon={faUser}/> Account</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    );
}
