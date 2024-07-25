import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import Dropzone from "react-dropzone-uploader";
import { Button, Col, Row } from "reactstrap";
import {
  ReactstrapInput,
  ReactstrapSelect,
} from "../../utils/ReactStarpInputsValidation";
import { getTokenFromCookie } from "../../../pages/api/tokenUtils.js";
import { useRouter } from "next/router";
import { format } from "date-fns";

const AddUserForm = () => {
  const router = useRouter();

  const handleSubmit = async (value) => {
    const signUpdata = {
      uId: 0,
      fullName: value.fullName,
      dateofbirth: format(new Date(value.dateofbirth), "dd/MM/yyyy"),
      address: value.address,
      citizenIdentification: value.citizenIdentification.toString(),
      phoneNumber: value.phoneNumber.toString(),
      gender: value.gender,
      gmail: value.gmail,
      avatar: "/assets/images/avatar/user.jpg",
      username: value.username,
      password: value.password,
      rId: 3,
      roleName: "Lessee",
    };

    try {
      // Gửi yêu cầu POST đến API đăng nhập
      const response = await fetch("https://ehouseapi20230817222213.azurewebsites.net/api/User/Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpdata),
      });

      if (response.ok) {
        // Xử lý đăng kí thành công
        const responseText = await response.text();

        if (responseText === "SUCCESS") {
          alert("Đăng kí thành công");
          router.push("/manage-users/allusersLessee");
        } else {
          // Xử lý khi không thành công
          alert(
            "Tài khoản bạn đăng kí đã có sẵn trên hệ thống, mời bạn kiểm tra lại: " +
              responseText
          );
          console.log(responseText);
        }
      } else {
        // Xử lý đăng kí thất bại
        alert("Đăng kí thất bại , lỗi" + error);
      }
    } catch (error) {
      alert("lỗi sever");
    }
    console.log(signUpdata);
  };

  return (
    <Formik
      initialValues={{
        fullName: "",
        address: "",
        citizenIdentification: undefined,
        phoneNumber: undefined,
        gender: "",
        gmail: "",
        username: "",
        password: "",
      }}
      validationSchema={Yup.object().shape({
        fullName: Yup.string().required("Họ và tên là bắt buộc..!"),
        dateofbirth: Yup.string().required(
          "Ngày tháng năm sinh là bắt buộc..!"
        ),
        address: Yup.string().required("địa chỉ là bắt buộc..!"),
        citizenIdentification: Yup.number().required(
          "Căn cước công dân là bắt buộc..!"
        ),
        phoneNumber: Yup.number().required("Số diện thoại là bắt buộc..!"),
        gender: Yup.string().required("Giới tính là bắt buộc..!"),
        gmail: Yup.string()
          .required("gmail là bắt buộc..!")
          .matches(/\S+@\S+\.\S+/, "Phải là gmail hoàn chỉnh"),
        username: Yup.string().required("Tên đăng nhập là bắt buộc..!"),
        password: Yup.string()
          .required("mật khẩu là bắt buộc..!")
          .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
          .matches(
            /^(?=.*[a-zA-Z])(?=.*\d)/,
            "Mật khẩu nên chứa chữ cái và số"
          ),
      })}
      onSubmit={handleSubmit}
      render={() => (
        <Form>
          <Row className="gx-3">
            <Col sm="4" className="form-group">
              <Field
                name="fullName"
                type="text"
                component={ReactstrapInput}
                className="form-control"
                placeholder="Mời bạn nhập họ và tên"
                label="Họ và tên"
              />
            </Col>
            <Col sm="4" className="form-group">
              <Field
                name="gmail"
                type="email"
                component={ReactstrapInput}
                className="form-control"
                placeholder="Mời bạn nhập địa chỉ email"
                label="Gmail"
              />
            </Col>
            <Col sm="4" className="form-group">
              <Field
                name="dateofbirth"
                type="date"
                component={ReactstrapInput}
                className="form-control"
                placeholder="Mời bạn nhập Ngày tháng năm sinh"
                label="Ngày tháng năm sinh"
              />
            </Col>
            <Col sm="4" className="form-group">
              <Field
                name="gender"
                component={ReactstrapSelect}
                className="form-control"
                label="Mời bạn nhập giới tính"
                inputprops={{ options: ["Nam", "Nữ"],defaultOption: "Giới tính" }}
              />
            </Col>
            <Col sm="4" className="form-group">
              <Field
                name="citizenIdentification"
                type="number"
                component={ReactstrapInput}
                className="form-control"
                placeholder="Mời bạn nhập căn cước công dân"
                label="căn cước công dân"
              />
            </Col>
            <Col sm="4" className="form-group">
              <Field
                name="phoneNumber"
                type="number"
                component={ReactstrapInput}
                className="form-control"
                placeholder="Mời bạn nhập số điện thoại"
                label="Số điện thoại"
              />
            </Col>
            <Col sm="4" className="form-group">
              <Field
                name="address"
                type="text"
                component={ReactstrapInput}
                className="form-control"
                placeholder="Mời bạn nhập địa chỉ"
                label="Địa chỉ"
              />
            </Col>
            <Col sm="4" className="form-group">
              <Field
                name="username"
                type="text"
                component={ReactstrapInput}
                className="form-control"
                placeholder="Mời bạn nhập tên đăng nhập"
                label="Tên dăng nhập"
              />
            </Col>
            <Col sm="4" className="form-group">
              <Field
                name="password"
                type="text"
                component={ReactstrapInput}
                className="form-control"
                placeholder="Mời bạn nhập mật khẩu"
                label="Mật khẩu"
              />
            </Col>
          </Row>
          <div className="dropzone-admin mb-0">
            <Col sm="12" className="form-btn">
              <Button type="submit" className="btn btn-gradient btn-pill">
                Đăng kí
              </Button>
            </Col>
          </div>
        </Form>
      )}
    />
  );
};

export default AddUserForm;
