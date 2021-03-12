import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane
} from "reactstrap";
import Card from "../components/Card";
import Layout from "../components/Layout";
import SEO from "../components/seo";

const Favorites = () => {
    const [activeTab, setActiveTab] = useState("1");
    const favoriteCharacters = useSelector(state => state.favorites.characters);
    const favoriteComics = useSelector(state => state.favorites.comics);
    const favoriteStories = useSelector(state => state.favorites.stories);

    const toogle = tab => () => {
        if(activeTab !== tab)
            setActiveTab(tab);
    }

    const getLinkClass = tab => 
        tab === activeTab ? "active" : "";

    const renderList = list => {
        const cardsList = list.map(item => {
            return (
                <Card
                    key={`${item.itemType}-${item.id}`}
                    id={item.id}
                    image={item.image}
                    itemType={item.itemType}
                    link={item.link}
                    title={item.label}
                />
            )
        });

        return (
            <div className="List-container">
                <div className="List">
                    {cardsList}
                </div>
            </div>
        );
    };

    return (
        <Layout>
            <SEO title="Favorites" />
            <section className="Page">
                <div className="container-fluid Page-container">
                    <Nav className="NavTabs" tabs>
                        <NavItem>
                            <NavLink
                                onClick={toogle("1")}
                                className={getLinkClass("1")}
                            >
                                Characters
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                onClick={toogle("2")}
                                className={getLinkClass("2")}
                            >
                                Comics
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                onClick={toogle("3")}
                                className={getLinkClass("3")}
                            >
                                Stories
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            {renderList(favoriteCharacters)}
                        </TabPane>
                        <TabPane tabId="2">
                            {renderList(favoriteComics)}
                        </TabPane>
                        <TabPane tabId="3">
                            {renderList(favoriteStories)}
                        </TabPane>
                    </TabContent>
                </div>
            </section>
        </Layout>
    );
};

export default Favorites;