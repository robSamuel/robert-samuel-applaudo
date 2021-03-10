import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Card from "../Card";
import { getThumbnailUrl, isNotEmptyArray } from "../../utils";
import InfiniteScroll from 'react-infinite-scroll-component';

const List = props => {
    const [hasMore, setHasMore] = useState(true);
    const [list, setList] = useState([]);
    const containerId = `ScrollContainer-${props.itemType}`;

    const fetchData = async() => {
        const options = {
            limit: 20,
            offset: list.length
        };
        const data = await props.retrieveData(options);

        if(data && data.results) {
            setList((prevList) => {
                return [...prevList, ...data.results];
            });

            setHasMore(list.length <= data.total);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderList = props => {
        if(!isNotEmptyArray(list))
            return <span>There are no items available</span>;

        return list.map((item, index) => {
            const label = item.name || item.title || "";

            return (
                <Card
                    key={`${index}-${item.id}`}
                    id={item.id}
                    title={label}
                    image={getThumbnailUrl(item.thumbnail)}
                    itemType={props.itemType}
                />
            );
        });
    };

    return (
        <div id={containerId} className="List-container">
            <InfiniteScroll
                className="List"
                dataLength={list.length}
                hasMore={hasMore}
                next={fetchData}
                scrollableTarget={containerId}
            >
                {renderList(props)}
            </InfiniteScroll>           
        </div>
    );
};

List.propTypes = {
    itemType: PropTypes.oneOf(["characters", "comics", "stories"]).isRequired,
    retrieveData: PropTypes.func.isRequired,
};

export default List;
