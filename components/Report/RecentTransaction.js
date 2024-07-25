import React, { useEffect, useState } from "react";
import {  FileText, Link, CheckSquare } from "react-feather";
import { Card, CardBody, CardHeader, Col, Media, Table } from 'reactstrap'
import axios from "axios"; 
import { getCookie } from 'cookies-next';
import {getTokenFromCookie } from '../../pages/api/tokenUtils.js';
import { Button, Form, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const RecentTransaction = () => {

    const [contractData, setcontractData] = useState([]);
    const [modal, setModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const actionsCellStyle = {
        cursor: 'pointer', // Đổi con trỏ chuột thành bàn tay trỏ
    };

    const token = getTokenFromCookie();

    const numberWithCommas = (number) => {
        return number.toLocaleString();
      };

    useEffect(() => {
        const storedDataA = localStorage.getItem('contractDataA');
        if (storedDataA) {
            setcontractData(JSON.parse(storedDataA)); 
        }
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://ehouseapi20230817222213.azurewebsites.net/api/Contract/GetStatusAdminId?statusAdminId=false" ,{
                        headers: { 
                            Authorization: token,
                        } 
                    }
                );
                setcontractData(response.data); // Thêm .data vào response
                localStorage.setItem('contractDataA', JSON.stringify(response.data));
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleActionsClick = async (item) => {
        item.statusAdminId = true;
        item.adId = getCookie('AdminId');
        console.log(item);

        try {
            const response = await fetch('https://ehouseapi20230817222213.azurewebsites.net/api/Contract/UpdateContract', {
                method: 'PUT',
                headers: {
                    Authorization: token,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
              });
              const responseText = await response.text();

              if (response.ok) {
                if (responseText === "SUCCESS") {
                alert('Bạn đã duyệt thành công');
                  console.log('Update đăng kí thuê nhà thành công');
                  localStorage.removeItem('contractDataA');
                  window.location.reload();
                } else {
                  // Handle other responses if needed
                alert('Bạn đã duyệt không thành công');
                  console.log('Update đăng kí thuê nhà không thành công');
                }
              } else {
                // Xử lý đăng nhập thất bại
                alert('Bạn đã duyệt không thành công !');
              }

        } catch (error) {
            alert('Bạn đã duyệt không thành công ! lỗi sever');
            console.error('Đã xảy ra lỗi:', error);
        }

    };

    const handleLinkClick = (item) => {
        const url = 'https://ehomesystem.vercel.app/property/image-slider?id=' + item.hoId ;
        window.open(url);
    };

    const handleViewClick = (item) => {
        setSelectedItem(item);
        setModal(true);
    }

    return (
        <Col sm='12'>
            <Card className="card">
                <CardHeader className="card-header pb-0">
                    <h5>Hợp đồng chưa ký</h5>
                </CardHeader>
                <CardBody className="card-body report-table">
                    <div className="table-responsive transactions-table">
                            <Table className="table table-bordernone m-0">
                                <thead>
                                    <tr>
                                        <th className="light-font">ID nhà</th>
                                        <th className="light-font">Tên nhà</th>
                                        {/* <th className="light-font">Type</th> */}
                                        {/* <th className="light-font">Amount</th> */}
                                        <th className="light-font">Giá nhà</th>
                                        <th className="light-font">Ngày tạo</th>
                                        <th className="light-font">Trạng thái Admin</th>
                                        <th className="light-font">Chấp nhận</th>
                                        <th className="light-font">Link</th>
                                        <th className="light-font">Tổng quan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        contractData && contractData.map((item, i) => {
                                            const datePart = item.contractCreatedDay.split("T")[0];
                                            return (
                                                <tr key={i}>
                                                    <td>{item.hoId}</td>
                                                    <td>
                                                        <Media className="media">
                                                            {/* <img src={item.img} className="img-fluid img-80" alt='' /> */}
                                                            <Media body className="media-body">
                                                                <h6>{item.houseRentName}</h6>
                                                                {/* <span className="light-font">{item.country}</span> */}
                                                            </Media>
                                                        </Media>
                                                    </td>
                                                    {/* <td>{item.type}</td> */}
                                                    {/* <td>{item.amount}</td> */}
                                                    <td>{numberWithCommas(item.rentPrice)} VND</td>
                                                    <td>{datePart}</td>
                                                    <td><span className={`label badge-light-danger`}>{item.statusAdminId ? ('Hoàn thành'):('Chờ duyệt')}</span></td>
                                                    <td style={actionsCellStyle}><CheckSquare className="light-font" onClick={() => handleActionsClick(item)} /></td>
                                                    <td style={actionsCellStyle}><Link className="light-font" onClick={() => handleLinkClick(item)}/></td>
                                                    <td style={actionsCellStyle}><FileText className="light-font" onClick={() => handleViewClick(item)}/></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                    </div>
                    <Modal isOpen={modal} toggle={() => setModal(!modal)}>
                      <ModalHeader ModalHeader>
                        <strong>Thông tin hợp đồng</strong>
                      </ModalHeader>              
                      <ModalBody>
                      {selectedItem && (
                          <>
                            <p className="m-1">Tên nhà : {selectedItem.houseRentName}</p>
                            <br />
                            <p className="m-1">Giá thuê : {numberWithCommas(selectedItem.rentPrice)} VND</p>
                            <br />
                            <p className="m-1">Ngày tạo : {selectedItem.contractCreatedDay.split("T")[0]}</p>
                            <br />
                            <p className="m-1">Trạng thái Admin : {selectedItem.statusAdminId ? ('Đóng dấu') : ('Chưa đóng dấu')}</p>
                            <br />
                            <p className="m-1">Trạng thái Người thuê : {selectedItem.statusLessorId ? ('Đóng dấu') : ('Chưa đóng dấu')}</p>
                            <br />
                            <p className="m-1">Thời gian thuê : {selectedItem.tenancyPeriod} Tháng</p>
                          </>
                        )}
                      </ModalBody>
                      <ModalFooter>
                        <Button color="primary" onClick={() => {setModal(false); console.log('yes')}}>
                          Done
                        </Button>
                      </ModalFooter>
                    </Modal>
                </CardBody>
            </Card>
        </Col>
    )
}

export default RecentTransaction;
