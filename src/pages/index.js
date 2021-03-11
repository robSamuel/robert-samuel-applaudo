import React, { useState } from "react";
import {
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane
} from "reactstrap";
import List from "../components/List";
import { getAllCharacters } from "../services/characters";
import { getAllComics } from "../services/comics";
import { getAllStories } from "../services/stories";
import { mapPaginatedData } from "../utils";

import Layout from "../components/Layout";
import SEO from "../components/seo";

const IndexPage = () => {
    const [activeTab, setActiveTab] = useState("1");

    const toogle = tab => () => {
        if(activeTab !== tab)
            setActiveTab(tab);
    }

    const getLinkClass = tab => 
        tab === activeTab ? "active" : "";

    const processRetrievedData = data => {
        if(data) {
            const fetchedData = mapPaginatedData(data);

            return fetchedData;
        }
    };

    const fetchCharacters = async(options) => {
        const { data } = await getAllCharacters(options);

        return processRetrievedData(data);
    };

    const fetchComics = async(options) => {
        const { data } = await getAllComics(options);

        return processRetrievedData(data);
    };

    const fetchStories = async(options) => {
        const { data } = await getAllStories(options);

        return processRetrievedData(data);
    };
    
    return (
        <Layout>
            <SEO title="Home" />

            <section className="Home">
                <div className="container-fluid Home-container">
                    <Nav className="Home-tabs" tabs>
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
                            <List
                                itemType="character"
                                retrieveData={fetchCharacters}
                            />
                        </TabPane>
                        <TabPane tabId="2">
                            <List
                                itemType="comic"
                                retrieveData={fetchComics}
                            />
                        </TabPane>
                        <TabPane tabId="3">
                            <List
                                itemType="story"
                                retrieveData={fetchStories}
                            />
                        </TabPane>
                    </TabContent>
                </div>
            </section>
        </Layout>
    );
};

export default IndexPage
