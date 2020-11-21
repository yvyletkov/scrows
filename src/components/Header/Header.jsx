import React, {useEffect} from "react";
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
    Collapse,
    Button,
    ButtonGroup,
    ButtonToolbar,
} from "shards-react";

const Header = (props) => {

    const {logout, isAuth} = props;

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
                            <NavLink href="/personal-info">
                                Личный кабинет
                            </NavLink>
                        </NavItem>
                        {isAuth && <NavItem>
                            <NavLink href="/deals">
                                Сделки
                            </NavLink>
                        </NavItem>}
                        <NavItem>
                            <NavLink href="/deals">
                                Список сделок
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <ButtonToolbar>
                                <ButtonGroup>
                                    {isAuth ?
                                        <Button theme="dark" onClick={logout}>
                                            Выйти
                                        </Button> :
                                    <NavLink active href="/login">
                                        Войти
                                    </NavLink>}
                                </ButtonGroup>
                            </ButtonToolbar>
                        </NavItem>
                    </Nav>
                </Collapse>
            </div>

        </Navbar>
    );
}

export default Header;