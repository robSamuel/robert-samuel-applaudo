import React from "react";
import Logo from "../Logo";

const SOCIAL_MEDIA = [
    {
        network: "Facebook",
        url: "http://facebook.com/marvel",
        icon: "fab fa-facebook-square"
    },
    {
        network: "Twitter",
        url: "http://twitter.com/marvel",
        icon: "fab fa-twitter"
    },
    {
        network: "Instagram",
        url: "http://instagram.com/marvel",
        icon: "fab fa-instagram"
    },
    {
        network: "Tumblr",
        url: "http://marvelentertainment.tumblr.com/",
        icon: "fab fa-tumblr"
    },
    {
        network: "Youtube",
        url: "http://youtube.com/marvel",
        icon: "fab fa-youtube"
    },
    {
        network: "Snapchat",
        url: "https://www.snapchat.com/add/marvelhq",
        icon: "fab fa-snapchat-ghost"
    },
    {
        network: "Pinterest",
        url: "https://www.pinterest.com/marvelofficial",
        icon: "fab fa-pinterest"
    }
];

const Footer = () => {
    const renderSocialItems = () => {

        return SOCIAL_MEDIA.map(item => {

            return (
                <li className="Social-item">
                    <a
                        aria-label={`Follow Marvel on ${item.network}`}
                        className="Social-link"
                        href={item.url}
                        rel="noopener noreferrer"
                        target="_blank"
                        title={`Follow Marvel on ${item.network}`}
                    >
                        <i class={item.icon} />
                    </a>
                </li>
            )
        });
    };

    return (
        <footer className="Footer">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="Footer-logo d-flex h-100">
                            <Logo />
                            <span className="footer-text">
                                © {new Date().getFullYear()}
                            </span>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <ul className="Social-wrapper">
                            <li className="Social-item">
                                <span className="footer-text">
                                    Follow Marvel
                                </span>
                            </li>
                            {renderSocialItems()}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
