import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'gatsby';
import Logo from "../Logo";

const MENU_ITEMS = [
    {
        link: "/",
        title: "Home"
    },
    {
        link: "/characters",
        title: "Characters"
    },
    {
        link: "/comics",
        title: "Comics"
    },
    {
        link: "/stories",
        title: "Stories"
    },
    {
        link: "/favorites",
        title: "Favorites"
    }
];

const Header = () => {
    const renderMenuItems = () => {
        return MENU_ITEMS.map(item => {
            return (
                <li
                    className="HeaderMenu-item"
                    key={uuidv4()}
                >
                    <Link
                        className="HeaderMenu-link"
                        to={item.link}
                    >
                        {item.title}
                    </Link>
                </li>
            );
        })
    };

    return (
        <header className="Header">
            <div className="Header-content">
                <div className="Header-logo">
                    <Logo />
                </div>
                <ul className="HeaderMenu">
                    {renderMenuItems()}
                </ul>
            </div>
            <div className="Header-background" />
        </header>
    );
};

export default Header;
