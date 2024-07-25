import React, { useEffect, useState } from 'react'
import { Field, Form, Formik } from 'formik';
import Dropzone from 'react-dropzone-uploader';
import { Button, Col, Label, Row } from 'reactstrap';
import * as Yup from 'yup';
import { ReactstrapInput, ReactstrapSelect, ReactstrapSelect1 } from '../../utils/ReactStarpInputsValidation';
import { getCookie } from 'cookies-next';
import axios from "axios"; 
import Select from 'react-select';
import { useRouter } from "next/router";
import {getTokenFromCookie } from '../../../pages/api/tokenUtils.js'

const EditPropertyForm = () => {

    const token = getTokenFromCookie();
    const router = useRouter();
    const { id } = router.query;

    const [value, setValue] = useState({});
    useEffect(() => {
        axios
          .get("https://ehouseapi20230817222213.azurewebsites.net/api/HouseRent/GetHouseRentsById/" + id, {
            headers: {
              Authorization: token,
            }
          })
          .then((res) => {
            setValue(res.data);
          })
          .catch((error) => {
            console.log("Error", error);
          });
      }, [id]);
      
      const options = [
        { value: true, label: 'Có' },
        { value: false, label: 'Không'}
    ];

    const handleClick = async (values) => {

        try {
            console.log(values);
        } catch (error) {
            console.log(error.message);
        }
        // try {
        //     const response = await fetch(`https://ehouseapi20230817222213.azurewebsites.net/api/HouseRent/UpdateHouseRent`, {
        //         method: 'PUT',
        //         headers: {
        //             Authorization: token,
        //           'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(values),
        //       });
        //       const responseText = await response.text();
      
        //       if (response.ok) {
        //         if (responseText === "SUCCESS") {
        //           console.log('Cập nhập nhà thuê thành công');
        //           alert('Cập nhập nhà thuê thành công')
        //             localStorage.removeItem("dataHouse");
        //           router.push('/dashboard');
        //         } else {
        //           // Handle other responses if needed
        //           alert('Cập nhập nhà thuê không thành công')
        //           console.log('Cập nhập nhà thuê không thành công');
        //         }
        //       } else {
        //         // Xử lý đăng nhập thất bại
        //         alert('Cập nhập nhà thuê không thành công, Lỗi sever')
        //         setError('Cập nhập thất bại');
        //       }
      
        // } catch (error) {
        //     console.error('Đã xảy ra lỗi:', error);
        // }
    }

    if (value && value.hoId) {
        return (
            <Formik
                initialValues={{
                    hoId : value.hoId,
                    houseRentName : value.houseRentName,
                    area : value.area,
                    airConditioning : value.airConditioning,
                    waterHeater : value.waterHeater,
                    wifi : value.wifi,
                    washingMachine : value.washingMachine,
                    bed : value.bed,
                    parking : value.parking,
                    refrigerator : value.refrigerator,
                    restroom : value.restroom,
                    kitchen : value.kitchen,
                    electricityPrice : value.electricityPrice,
                    waterPrice : value.waterPrice,
                    rentPrice : value.rentPrice,
                    houseStatus : value.houseStatus,
                    detail : value.detail,
                    longitude: value.longitude,
                    latitude: value.latitude,
                    address: value.address,
                    leId : value.leId,
                }}
                validationSchema={Yup.object().shape({
                    hoId: Yup.number().required(),
                    houseRentName: Yup.string().required(),
                    area: Yup.number().required(),
                    airConditioning: Yup.boolean().required(),
                    waterHeater: Yup.boolean().required(),
                    wifi: Yup.boolean().required(),
                    washingMachine: Yup.boolean().required(),
                    bed: Yup.number().required(),
                    parking: Yup.boolean().required(),
                    refrigerator: Yup.boolean().required(),
                    restroom: Yup.number().required(),
                    kitchen: Yup.boolean().required(),
                    electricityPrice: Yup.number().required(),
                    waterPrice: Yup.number().required(),
                    rentPrice: Yup.number().required(),
                    houseStatus: Yup.boolean().required(),
                    detail: Yup.string().required(),
                    longitude: Yup.number().required(),
                    latitude: Yup.number().required(),
                    address: Yup.string().required(),
                })}
                onSubmit={handleClick}
                render={() => (
                    <Form>
                        <Row className="gx-3">
                            <Col sm="6" className="form-group">
                                <Field name="hoId" type="number" component={ReactstrapInput} className="form-control" label="ID nhà" readOnly/>
                            </Col>
                            <Col sm="6" className="form-group">
                                <Field name="houseRentName" type="text" component={ReactstrapInput} className="form-control" label="Tên nhà"/>
                            </Col>
                            <Col sm="6" className="form-group">
                                <Field name="area" type="number" component={ReactstrapInput} className="form-control" label="Diện tích"/>
                            </Col>
                            <Col sm="6" className="form-group">
                                <Field name="bed" type="number" component={ReactstrapInput} className="form-control" label="Giường ngủ" />
                            </Col>
                            <Col sm="6" className="form-group">
                                <Field name="electricityPrice" type="number" component={ReactstrapInput} className="form-control" label="Tiền điện" />
                            </Col>
                            <Col sm="6" className="form-group">
                                <Field name="waterPrice" type="number" component={ReactstrapInput} className="form-control" label="Tiền nước" />
                            </Col>
                            <Col sm="6" className="form-group">
                                <Field name="rentPrice" type="number" component={ReactstrapInput} className="form-control" label="Tiền thuê" />
                            </Col>
                            <Col sm="6" className="form-group">
                                <Field name="restroom" type="number" component={ReactstrapInput} className="form-control" label="Nhà vệ sinh" />
                            </Col>
                            <Col sm="6" className="form-group">
                                <Field name="longitude" type="number" component={ReactstrapInput} className="form-control" label="Kinh độ" />
                            </Col>
                            <Col sm="6" className="form-group">
                                <Field name="latitude" type="number" component={ReactstrapInput} className="form-control" label="Vĩ độ" />
                            </Col>
                            <Col sm="6" className="form-group">
                                <Field name="address" type="text" component={ReactstrapInput} className="form-control" label="Địa chỉ" />
                            </Col>
                            <Col sm="6" className="form-group">
                                <Field name="airConditioning" component={ReactstrapSelect1} className="form-control" label="Điều hòa" options={options}
                                />
                            </Col>
                            <Col sm="6" className="form-group">
                                <Field name="waterHeater" component={ReactstrapSelect1} className="form-control" label="Nước nóng lạnh" options={options}
                                />
                            </Col>
                            <Col sm="6" className="form-group">
                                <Field name="wifi" component={ReactstrapSelect1} className="form-control" label="wifi" options={options}
                                />
                            </Col>
                            <Col sm="6" className="form-group">
                                <Field name="washingMachine" component={ReactstrapSelect1} className="form-control" label="Máy giặt" options={options}
                                />
                            </Col>
                            <Col sm="6" className="form-group">
                                <Field name="parking" component={ReactstrapSelect1} className="form-control" label="Nơi đỗ" options={options}
                                />
                            </Col>
                            <Col sm="6" className="form-group">
                                <Field name="refrigerator" component={ReactstrapSelect1} className="form-control" label="Tủ lạnh" options={options}
                                />
                            </Col>
                            <Col sm="6" className="form-group">
                                <Field name="kitchen" component={ReactstrapSelect1} className="form-control" label="Nhà bếp" options={options}
                                />
                            </Col>
                            <Col sm="6" className="form-group">
                                <Field name="houseStatus" component={ReactstrapSelect1} className="form-control" label="Trạng thái nhà" options={options}
                                />
                            </Col>
                            <Col sm="12" className="form-group">
                                <Field type="textarea" name="detail" component={ReactstrapInput} className="form-control" rows={4} label="Chi tiết" />
                            </Col>
                        </Row>
    
                        <div className="dropzone-admin form-inputs">
                            <Row className="gx-3">
                                <Col sm="12" className="form-btn">
                                    <Button type="submit" className="btn btn-gradient btn-pill">Nộp</Button>
                                </Col>
                            </Row>
                        </div>
                    </Form>
                )}
            />
        );
    } else {
        if (id) {
            <p>Loading...</p>
        }
        <p>Loading...</p>
    }
    
};

export default EditPropertyForm;
