import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
import Breadcrumb from '../../components/Common/Breadcrumb'
import PropertyBoxFour from '../../components/Common/Propertybox/PropertyBoxOne';
import { getData } from '../../components/utils/getData';
import axios from "axios"; 



const AllUsers = () => {
    const [userlist, setUserlist] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(
              "https://ehouseapi20230817222213.azurewebsites.net/api/User/GetLesseees"
            );
            setUserlist(response.data); // Thêm .data vào response
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, []);
    return (
        <>
            <Breadcrumb title='Người dùng' titleText='Chào Mừng Đến Với Bảng Quản Trị' parent='Quản lý' />
            <Container fluid={true}>
                <Row className="agent-section property-section user-lists">
                    <Col lg='12'>
                        <div className="property-grid-3 agent-grids ratio2_3">
                            <Row className="property-2 column-sm property-label property-grid list-view">
                                {
                                    userlist && userlist.map((item, i) => {
                                        return (
                                            <Col md='12' xl='6' key={i}>
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

export default AllUsers