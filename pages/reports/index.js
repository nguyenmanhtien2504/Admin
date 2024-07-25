import React from 'react'
import {  Container, Row } from 'reactstrap'
import Breadcrumb from '../../components/Common/Breadcrumb'
import RecentTransaction from '../../components/Report/RecentTransaction'
import RecentTransactionAll from '../../components/Report/RecentTransactionAll'

const Report = () => {
    return (
        <>
            <Breadcrumb title='Quản lý hợp đồng' titleText='Chào mừng đến với Bảng quản trị' parent='Quản lý' />
            <Container fluid={true}>
                <Row className="report-summary">
                    <RecentTransaction />
                    <RecentTransactionAll />
                </Row>
            </Container>
        </>
    )
}

export default Report
