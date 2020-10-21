import React from "react";
import {
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Collapse
} from "shards-react";

const Header = () => {

    let [dropdownOpen1, setDropdownOpen1] = React.useState(false);
    let [dropdownOpen2, setDropdownOpen2] = React.useState(false);
    let [collapseOpen, setCollapseOpen] = React.useState(false);

    const toggleDropdown1 = () => {
        setDropdownOpen1(!dropdownOpen1)
    };

    const toggleDropdown2 = () => {
        setDropdownOpen2(!dropdownOpen2)
    };
    const toggleNavbar = () => {
        setCollapseOpen(!collapseOpen)
    };

    return (
        <Navbar type="dark" theme="dark" expand="md">
            <div className='container'>
                <NavbarBrand href="#">SCROWS.RU</NavbarBrand>
                <NavbarToggler onClick={toggleNavbar}/>
                <Collapse className={'justify-content-end'} open={collapseOpen} navbar>
                    <Nav navbar>
                        <Dropdown
                            open={dropdownOpen1}
                            toggle={toggleDropdown1}
                        >
                            <DropdownToggle nav caret>
                                Для кого
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>1</DropdownItem>
                                <DropdownItem>2</DropdownItem>
                                <DropdownItem>3</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown
                            open={dropdownOpen2}
                            toggle={toggleDropdown2}
                        >
                            <DropdownToggle nav caret>
                                О нас
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>1</DropdownItem>
                                <DropdownItem>2</DropdownItem>
                                <DropdownItem>3</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <NavItem>
                            <NavLink active href="#">
                                Личный кабинет
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </div>

        </Navbar>
    );
}

export default Header;