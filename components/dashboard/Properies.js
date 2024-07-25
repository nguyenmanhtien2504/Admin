import Link from 'next/link'
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Col, Media, Row } from 'reactstrap'
import { getTokenFromCookie } from "../../pages/api/tokenUtils.js";
import axios from "axios";

const Properies = () => {

    const [properties, setProperties] = useState({});
    const [value, setValue] = useState({});


    const token = getTokenFromCookie();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://ehouseapi20230817222213.azurewebsites.net/api/HouseRent/StatisticHouseRent" ,{
                        headers: { 
                            Authorization: token,
                        } 
                    }
                );
                setProperties(response.data); // Thêm .data vào response

                const response1 = await axios.get(
                    "https://ehouseapi20230817222213.azurewebsites.net/api/User/StatisticUser" ,{
                        headers: { 
                            Authorization: token,
                        } 
                    }
                );
                setValue(response1.data); // Thêm .data vào response

            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    
    return (
        <Col xl='4 large-12'>
            <Row>
                <Col lg='12 large-6' md='6'>
                    <Card className="all-properties">
                        <CardHeader className="pb-0">
                            <div>
                                <h5>Toàn bộ nhà</h5>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <Media className="media">
                                <img src="/assets/images/svg/icon/1.svg" className="img-fluid" alt='' />
                                <Media body>
                                    <h4 className="mb-0">{properties?.totalHouseRent}</h4>
                                    <h6 className="light-font">Căn nhà</h6>
                                </Media>
                            </Media>
                            <ul className="light-box">
                                <li>
                                    <img src="/assets/images/svg/icon/sold.png" className="img-fluid" alt='' />
                                    <div>
                                        <h5>{properties?.totalHouseRentAreTrue} Căn</h5>
                                        <span className="light-font">Nhà đã thuê</span>
                                    </div>
                                </li>
                                <li>
                                    <img src="/assets/images/svg/icon/rent.png" className="img-fluid" alt='' />
                                    <div>
                                        <h5>{properties?.totalHouseRentAreFalse} Căn</h5>
                                        <span className="light-font">Nhà chưa thuê</span>
                                    </div>
                                </li>
                            </ul>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg='12 large-6' md='6'>
                    <Card className="invoice-card">
                        <CardHeader className="pb-0">
                            <div>
                                <h5>Người dùng</h5>
                            </div>
                        </CardHeader>
                        <CardBody className="calculations">
                            <ul>
                                <li>
                                    <h5 className="font-success">{value?.totalLessor}</h5>
                                    <h6 className="light-font mb-0">Bên cho thuê</h6>
                                </li>
                                <li>
                                    <h5 className="font-success">{value?.totalLessee}</h5>
                                    <h6 className="light-font mb-0">Bên đi thuê</h6>
                                </li>
                            </ul>
                            <div className="d-flex">

                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Col>

    )
}

export default Properies