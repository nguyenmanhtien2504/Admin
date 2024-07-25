import React from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap'
import Breadcrumb from '../../components/Common/Breadcrumb'
import EditUserdataForm from '../../components/manageuser/edituser/EditUserdataForm'

const EditUser = () => {
    return (
        <>
            <Breadcrumb title='Chỉnh sửa người dùng' titleText='Chào mừng đến với Bảng quản trị' parent='Chỉnh sửa' />
            <Container fluid={true}>
                <Row>
                    <Col lg='12'>
                        <Card className="card">
                            <CardHeader className="card-header pb-0">
                                <h5>Chỉnh sửa chi tiết</h5>
                            </CardHeader>
                            <CardBody className="card-body admin-form">
                                <EditUserdataForm />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default EditUser