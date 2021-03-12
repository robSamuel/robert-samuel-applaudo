import React from "react";
import Layout from "../components/Layout";
import List from "../components/List";
import SEO from "../components/seo";
import { getAllCharacters } from "../services/characters";
import { mapPaginatedData } from "../utils";

const Characters = () => {
    const fetchCharacters = async(options) => {
        const { data } = await getAllCharacters(options);

        if(data) {
            const fetchedData = mapPaginatedData(data);

            return fetchedData;
        }
    };
    
    return (
        <Layout>
            <SEO title="Characters List" />
            <section className="Page">
                <div className="container-fluid Page-container">
                    <List
                        link="character"
                        placeholderSearch="Search Characters"
                        retrieveData={fetchCharacters}
                        searchBy="name"
                        useSearch={true}
                    />
                </div>
            </section>
        </Layout>
    );
};

export default Characters;
