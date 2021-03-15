import React from "react";
import PropTypes from "prop-types";

const ItemDetails = props => {
    const { description, image, item, label } = props;

    const renderDescription = () => {
        if(!description)
            return (
                <p className="ItemDetails-description">
                    {`There is no description provided for this ${item}.`}
                </p>
            );

        return <p className="ItemDetails-description">{description}</p>;
    };

    return (
        <div className="ItemDetails">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6 ItemDetails-image-container">
                        <img
                            src={image}
                            alt={label}
                            className="ItemDetails-image"
                        />
                    </div>
                    <div className="col-12 col-md-6 ItemDetails-label-container">
                        <h1>{label}</h1>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="ItemDetails-description-container">
                        {renderDescription()}
                    </div>
                </div>
            </div>
        </div>
    );
};

ItemDetails.propTypes = {
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    item: PropTypes.oneOf(["character", "comic", "story"]).isRequired,
    label: PropTypes.string.isRequired,
};

export default ItemDetails;
