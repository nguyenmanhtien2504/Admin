import React, { Fragment } from "react";

const PropertyLabel = ({ labels }) => {
    return (
        <>
                        <Fragment>
                            {labels === true && (
                                <div>
                                    <span className='label label-shadow'>Nhà đã thuê</span>
                                </div>
                            )}
                            {labels === false && (
                                <div>
                                    <span className='label label-success'>nhà chưa thuê</span>
                                </div>
                            )}
                        </Fragment>
        </>
    );
};

export default PropertyLabel;
