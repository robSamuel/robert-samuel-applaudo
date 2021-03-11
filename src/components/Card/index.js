import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby"

const Card = props => {
    const { id, image, itemType, title } = props;

    return (
        <div className="Card">
            <Link to={`/${itemType}`} state={{ id: id }}>
                <img src={image} alt={``} className="Card-image"/>
                <h3 className="Card-title">{title}</h3>
            </Link>
        </div>
    );
};

Card.propTypes = {
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    itemType: PropTypes.oneOf(["character", "comic", "story"]).isRequired,
    title: PropTypes.string.isRequired,
};

export default Card;
