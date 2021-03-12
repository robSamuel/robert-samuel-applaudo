import React from "react";
import Layout from "../components/Layout";
import List from "../components/List";
import SEO from "../components/seo";
import { getAllStories } from "../services/stories";
import { mapPaginatedData } from "../utils";

const Stories = () => {

    const fetchStories = async(options) => {
        const { data } = await getAllStories(options);

        if(data) {
            const fetchedData = mapPaginatedData(data);

            return fetchedData;
        }
    };
    
    return (
        <Layout>
            <SEO title="Stories List" />
            <section className="Page">
                <div className="container-fluid Page-container">
                    <List
                        retrieveData={fetchStories}
                        link="story"
                    />
                </div>
            </section>
        </Layout>
    );
};

export default Stories;
