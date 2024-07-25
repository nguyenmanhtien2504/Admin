import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
import Breadcrumb from '../../components/Common/Breadcrumb'
import PropertyBoxFour from '../../components/Common/Propertybox/PropertyBoxOne'
import { getData } from '../../components/utils/getData'
import axios from 'axios';
import {  getCookie  } from 'cookies-next';

const AllAgents = () => {
    const [userlist, setUserlist] = useState([]);

    useEffect(() => {
        const fetchData = async () =>{
            try {
                const response = await axios.get('https://ehouseapi20230817222213.azurewebsites.net/api/User/GetUsers', {
                    headers: {
                        Authorization : getCookie('token1'),
                },
                });
                setUserlist(response.data)
                console.log(userlist)
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    },[]);
    return (
        <>
            <Breadcrumb title='All Agents' titleText='welcome to admin panel' parent='Agents' />
            <Container fluid={true}>
                <Row className="agent-section property-section agent-lists">
                    <Col lg='12'>
                        <div className="ratio2_3">
                            <Row className="property-2 column-sm property-label property-grid">
                                {
                                    userlist && userlist.map((item, i) => {
                                        return (
                                            <Col xl='4' sm='6' key={i} className='wow fadeInUp'>
                                                <PropertyBoxFour data={item} />
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default AllAgents