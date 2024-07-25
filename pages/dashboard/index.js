import { Container } from "reactstrap";
import Breadcrumb from "../../components/Common/Breadcrumb";
import Properylist from "../../components/dashboard/Properylist";
import ProperylistBan from "../../components/dashboard/ProperylistBan";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getTokenFromCookie } from "../api/tokenUtils.js";
import axios from "axios";
import { hasCookie, deleteCookie } from "cookies-next";
import Properies from '../../components/dashboard/Properies'


const Dashboard = () => {
  const router = useRouter();
  const [showDashboard, setShowDashboard] = useState(false);
  const [UserProfile2, setUserProfile2] = useState({});

  useEffect(() => {
    const token = getTokenFromCookie();

    axios
      .get("https://ehouseapi20230817222213.azurewebsites.net/api/User/LoggedUser", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setUserProfile2(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Xử lý lỗi nếu cần thiết
        if (error.response && error.response.status === 401) {
          // Nếu token hết hạn hoặc không hợp lệ, xóa token và đẩy người dùng về trang đăng nhập
          deleteCookie("token1");
          deleteCookie("currentUser");
          router.push("/authentication/login");
        }
      });
  }, []);

  useEffect(() => {
    if (UserProfile2.roleName === undefined) {
      return; // Nếu chưa có giá trị, đợi lần chạy useEffect tiếp theo khi UserProfile2.roleName đã được thiết lập
    }

    if (UserProfile2.roleName !== "Admin") {
      deleteCookie("token1");
      deleteCookie("currentUser");
      deleteCookie("hoId");
      deleteCookie("AdminId");
      localStorage.removeItem("value");
      localStorage.removeItem("dataHouse");
      router.push("/authentication/404/wrongRole");
    } else {
      if (hasCookie("token1")) {
        setShowDashboard(true);
      } else {
        router.push("/authentication/login");
      }
    }
  }, [UserProfile2.roleName]);

  return (
    <>
      {showDashboard && (
        <>
          <Breadcrumb
            title="Bảng điều khiển"
            titleText="Xin chào bạn đến với trang Admin"
            parent="Bảng điều khiển"
          />
          <Container fluid={true}>
            <div className="row">
              <Properylist />
              <ProperylistBan />
              <Properies />
            </div>
          </Container>
        </>
      )}
    </>
  );
};

export default Dashboard;
