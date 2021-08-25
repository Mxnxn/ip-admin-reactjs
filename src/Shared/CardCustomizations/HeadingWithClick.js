import React from "react";
import { Row } from "reactstrap";

const HeadingWithClick = ({ editMode, subHeading, mainHeading, btnName, onClickHandler, disableBtn }) => {
    return (
        <Row className="align-items-center geb">
            <div className="col">
                <h6 className="text-uppercase text-muted ls-1 mb-1">{subHeading}</h6>
                <h2
                    className={" mb-0 geb fs-24"}
                    style={{
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        color: editMode ? "#fb6340" : "#115EF6",
                    }}
                >
                    {mainHeading}
                </h2>
            </div>

            {!disableBtn && (
                <button onClick={onClickHandler} className="btn btn-primary fira shadow mr-3">
                    {btnName}
                </button>
            )}
        </Row>
    );
};

export default HeadingWithClick;
