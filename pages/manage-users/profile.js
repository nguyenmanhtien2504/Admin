import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Breadcrumb from "../../components/Common/Breadcrumb";
import About from "../../components/manageuser/profile/About";
import ProfileDetail from "../../components/manageuser/profile/ProfileDetail";
import axios from "axios";
import { getTokenFromCookie } from "../../pages/api/tokenUtils.js";
import { useRouter } from "next/router";
import { hasCookie, deleteCookie } from "cookies-next";

const Profile = () => {
  const router = useRouter();
  const [AgentAbout, setAgentAbout] = useState({});

  useEffect(() => {
    const token = getTokenFromCookie();

    axios
      .get("https://ehouseapi20230817222213.azurewebsites.net/api/User/LoggedUser", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        const newAgentAbout = response.data;
        setAgentAbout(newAgentAbout);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Xử lý lỗi nếu cần thiết
      });
  }, []);

  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    if (AgentAbout.roleName === undefined) {
      return; // Nếu chưa có giá trị, đợi lần chạy useEffect tiếp theo khi AgentAbout.roleName đã được thiết lập
    }

    if (AgentAbout.roleName !== "Admin") {
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
  }, [AgentAbout.roleName]);

  return (
    <>
      {showDashboard && (
        <>
          <Breadcrumb
            title="Thông tin người dùng"
            titleText="Chào mừng đến với Bảng quản trị"
            parent="Thông tin"
          />
          <Container fluid={true}>
            <Row>
              <Col lg="12">
                <Row className="user-info">
                  <ProfileDetail />
                  <Col xl="3 xl-6" lg="12" md="5">
                    <Row className="about-profile">
                      <Col xl="12 xl-12" lg="6" className="about-info">
                        <About Aboutdata={AgentAbout} />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default Profile;
