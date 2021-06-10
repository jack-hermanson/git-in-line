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
import {useStoreState} from "../../store";
import {APP_NAME, CONTAINER_FLUID} from "../../constants";

export const Navigation: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showAccountDrop, setShowAccountDrop] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const history = useHistory();
    const currentUser = useStoreState(state => state.currentUser);

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
                            {renderAccount()}
                        </NavItem>
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    );

    function renderUserIcon() {
        return (
            <FA className="me-1" icon={faUser}/>
        );
    }

    function renderAccount() {
        if (!currentUser) {
            return (
                <NavLink className="nav-link" to="/account">{renderUserIcon()}Account</NavLink>
            );
        }

        return (
            <ButtonDropdown isOpen={showAccountDrop} toggle={() => setShowAccountDrop(o => !o)}>
                <DropdownToggle size="sm" color="secondary" style={{textTransform: "capitalize"}} caret>
                    {renderUserIcon()}{" "}
                    {currentUser.username}{" "}
                </DropdownToggle>
                <DropdownMenu end>
                    <DropdownItem onClick={() => history.push("/account")}>
                        My Account
                    </DropdownItem>
                    <DropdownItem>
                        Log Out
                    </DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>
        );
    }
}
