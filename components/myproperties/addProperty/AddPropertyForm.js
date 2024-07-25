import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button,  Col, Row} from "reactstrap";

import * as Yup from "yup";
import {
  ReactstrapInput,
  ReactstrapSelect1,
} from "../../utils/ReactStarpInputsValidation";
import axios from "axios";
import { useRouter } from "next/router";
import {getTokenFromCookie } from '../../../pages/api/tokenUtils.js'

const AddPropertyForm = () => {

    const router = useRouter();
    const [dataLoaded, setDataLoaded] = useState(false);
    const [UserProfile, setUserProfile] = useState({});
    const token = getTokenFromCookie();

    useEffect(() => {

        axios.get('https://ehouseapi20230817222213.azurewebsites.net/api/User/LoggedUser', {
          headers: {
            Authorization: token,
          }
        })
          .then((response) => {
            const newUserProfile = response.data;
            setUserProfile(newUserProfile);
            setDataLoaded(true);
          })
          .catch((error) => {
            console.error('Error:', error);
            // Xử lý lỗi nếu cần thiết
          });
      }, []);

    const options = [
      { value: true, label: "Có" },
      { value: false, label: "Không" },
    ];
    if (dataLoaded) {
        return (
            <Formik
                initialValues={{
                houseRentName: "",
                area: undefined,
                airConditioning: true,
                waterHeater: true,
                wifi: true,
                washingMachine: true,
                bed: undefined,
                parking: true,
                refrigerator: true,
                restroom: undefined,
                kitchen: true,
                electricityPrice: undefined,
                waterPrice: undefined,
                rentPrice: undefined,
                houseStatus: false,
                detail: "",
                longitude: undefined,
                latitude: undefined,
                address: "",
                leId: undefined,
                }}
                validationSchema={Yup.object().shape({
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
                    detail: Yup.string().required(),
                    longitude: Yup.number().required(),
                    latitude: Yup.number().required(),
                    address: Yup.string().required(),
                    leId: Yup.number().required(),
                })}
                onSubmit={async (value) => {
                    try {
                        // Gửi yêu cầu POST đến API đăng kí tài sản
                        const response = await fetch("https://ehouseapi20230817222213.azurewebsites.net/api/HouseRent/AddHouseRent", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(value),
                        });
                        if (response.ok) {
                            // Xử lý Đăng kí tài sản thành công
                            alert('Đăng kí tài sản thành công')
                            router.push(`/myproperties/add-propertyImg/?name=${value.houseRentName}`);
                          } else {
                            // Xử lý Đăng kí tài sản thất bại
                            alert('Đăng kí thất bại , lỗi' + error);
                          }
                    
                        } catch (error) {
                            alert('Đăng kí thất bại , lỗi' + error);
                        };
                  }}
                render={() => (
                    <Form>
                        <Row className="gx-3">
                          <Col sm="6" className="form-group">
                            <Field
                              name="leId"
                              type="number"
                              component={ReactstrapInput}
                              className="form-control"
                              label="ID người cho thuê"
                            />
                          </Col>
                          <Col sm="6" className="form-group">
                            <Field
                              name="houseRentName"
                              type="text"
                              component={ReactstrapInput}
                              className="form-control"
                              label="Tên nhà thuê"
                            />
                          </Col>
                          <Col sm="6" className="form-group">
                            <Field
                              name="area"
                              type="number"
                              component={ReactstrapInput}
                              className="form-control"
                              label="Diện tích/m2"
                            />
                          </Col>
                          <Col sm="6" className="form-group">
                            <Field
                              name="bed"
                              type="number"
                              component={ReactstrapInput}
                              className="form-control"
                              label="Phòng ngủ"
                            />
                          </Col>
                          <Col sm="6" className="form-group">
                            <Field
                              name="electricityPrice"
                              type="number"
                              component={ReactstrapInput}
                              className="form-control"
                              label="Tiền điện"
                            />
                          </Col>
                          <Col sm="6" className="form-group">
                            <Field
                              name="waterPrice"
                              type="number"
                              component={ReactstrapInput}
                              className="form-control"
                              label="Tiền nước/m3"
                            />
                          </Col>
                          <Col sm="6" className="form-group">
                            <Field
                              name="rentPrice"
                              type="number"
                              component={ReactstrapInput}
                              className="form-control"
                              label="Tiền thuê nhà"
                            />
                          </Col>
                          <Col sm="6" className="form-group">
                            <Field
                              name="restroom"
                              type="number"
                              component={ReactstrapInput}
                              className="form-control"
                              label="Nhà vệ sinh"
                            />
                          </Col>

                          <Col sm="6" className="form-group">
                            <Field
                              name="longitude"
                              type="number"
                              component={ReactstrapInput}
                              className="form-control"
                              label="Kinh độ"
                            />
                          </Col>
                          <Col sm="6" className="form-group">
                            <Field
                              name="latitude"
                              type="number"
                              component={ReactstrapInput}
                              className="form-control"
                              label="Vĩ độ"
                            />
                          </Col>
                          <Col sm="6" className="form-group">
                            <Field
                              name="address"
                              type="text"
                              component={ReactstrapInput}
                              className="form-control"
                              label="Địa chỉ nhà thuê"
                            />
                          </Col>

                          <Col sm="6" className="form-group">
                            <Field
                              name="airConditioning"
                              component={ReactstrapSelect1}
                              className="form-control"
                              label="Điều hòa"
                              options={options}
                            />
                          </Col>
                          <Col sm="6" className="form-group">
                            <Field
                              name="waterHeater"
                              component={ReactstrapSelect1}
                              className="form-control"
                              label="Nước nóng lạnh"
                              options={options}
                            />
                          </Col>
                          <Col sm="6" className="form-group">
                            <Field
                              name="wifi"
                              component={ReactstrapSelect1}
                              className="form-control"
                              label="wifi"
                              options={options}
                            />
                          </Col>
                          <Col sm="6" className="form-group">
                            <Field
                              name="washingMachine"
                              component={ReactstrapSelect1}
                              className="form-control"
                              label="Máy giặt"
                              options={options}
                            />
                          </Col>
                          <Col sm="6" className="form-group">
                            <Field
                              name="parking"
                              component={ReactstrapSelect1}
                              className="form-control"
                              label="Nơi đỗ xe"
                              options={options}
                            />
                          </Col>
                          <Col sm="6" className="form-group">
                            <Field
                              name="refrigerator"
                              component={ReactstrapSelect1}
                              className="form-control"
                              label="Tủ lạnh"
                              options={options}
                            />
                          </Col>
                          <Col sm="6" className="form-group">
                            <Field
                              name="kitchen"
                              component={ReactstrapSelect1}
                              className="form-control"
                              label="Nhà bếp"
                              options={options}
                            />
                          </Col>
                          <Col sm="12" className="form-group">
                            <Field
                              type="textarea"
                              name="detail"
                              component={ReactstrapInput}
                              className="form-control"
                              rows={4}
                              label="Miêu tả thêm chi tiết"
                            />
                          </Col>
                        </Row>
                        <div className="dropzone-admin form-inputs">
                            <Row className="gx-3">
                              <Col sm="12" className="form-btn">
                                <Button type="submit" className="btn btn-gradient btn-pill">
                                  Nộp
                                </Button>
                              </Col>
                            </Row>
                        </div>
                    </Form>
                )}
            />
        )
    } else {
        return <p>Loading...</p>;
    }
    return null;
}

export default AddPropertyForm