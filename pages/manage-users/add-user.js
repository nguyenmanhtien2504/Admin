import React from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap'
import Breadcrumb from '../../components/Common/Breadcrumb'
import AddUserForm from '../../components/manageuser/adduser/AddUserForm'

const AddUser = () => {
    return (
        <>
            <Breadcrumb title='Thêm người dùng' titleText='Chào mừng đến với Bảng quản trị' parent='Thêm người' />
            <Container fluid={true}>
                <Row>
                    <Col lg='12'>
                        <Card className="card">
                            <CardHeader className="card-header pb-0">
                                <h5>Thêm người cho thuê</h5>
                            </CardHeader>
                            <CardBody className="card-body admin-form">
                                <AddUserForm />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default AddUser