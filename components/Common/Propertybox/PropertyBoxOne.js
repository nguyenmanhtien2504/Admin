import Link from "next/link";
import React, { useState } from "react";
import Img from "../../utils/Img";
import SocialAccounts from "../SocialAccounts";

const PropertyBoxFour = ({ data }) => {
    const [show, setShow] = useState();
    const img = data?.avatar;
    console.log(data);
    return (
        <>
            <div className="property-box">
                <div className="agent-image">
                    <div>
                        <Img src={img} className="bg-img" alt="" />
                        <div className="agent-overlay"></div>
                        <div className="overlay-content">
                            <SocialAccounts />
                            <span>Kết nối</span>
                        </div>
                    </div>
                </div>
                <div className="agent-content">
                    <h3>
                        <Link href="/pages/agency/agency-profile">{data?.fullName}</Link>
                    </h3>
                    <p className="font-roboto">Người dùng đã xác thực</p>
                    <ul className="agent-contact">
                        <li>
                            <i className="fas fa-phone-alt"></i>
                            <span className="character">+84 {data?.phoneNumber === show ? data?.phoneNumber : data?.phoneNumber.slice(0, 5) + "*****"}</span>
                            <span
                                className="label label-light-Bận"
                                onClick={() => {
                                    setShow(data?.phoneNumber);
                                    data?.phoneNumber === show && setShow();
                                }}>
                                {show === data?.phoneNumber ? "show" : "hide"}
                            </span>
                        </li>
                        <li>
                            <i className="fas fa-envelope"></i> {data?.gmail}
                        </li>
                        <li>
                            <i className="fas fa-fax"></i> {data?.citizenIdentification}
                        </li>
                    </ul>
                    {/* <Link href="/manage-users/profile">
                        Xem <i className="fas fa-arrow-right"></i>
                    </Link> */}
                </div>
            </div>
        </>
    );
};

export default PropertyBoxFour;

