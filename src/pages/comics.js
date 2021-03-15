import React from "react";
import Layout from "../components/Layout";
import List from "../components/List";
import SEO from "../components/seo";
import { getAllComics } from "../services/comics";
import { mapPaginatedData } from "../utils";

const Comics = () => {
    const fetchComics = async(options) => {
        const { data } = await getAllComics(options);

        if(data) {
            const fetchedData = mapPaginatedData(data);

            return fetchedData;
        }
    };

    return (
        <Layout>
            <SEO title="Comics List" />
            <section className="Page">
                <div className="container-fluid Page-container">
                    <List
                        link="comic"
                        placeholderSearch="Search Comics"
                        retrieveData={fetchComics}
                        searchBy="title"
                        useSearch={true}
                    />
                </div>
            </section>
        </Layout>
    );
};

export default Comics;