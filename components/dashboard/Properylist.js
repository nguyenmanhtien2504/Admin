import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Media } from "reactstrap";
import axios from "axios"; // Thêm import này
// import { Propertydata1 } from "../../data/dashboard/data";

const Properylist = () => {
  const nha = [
    "/assets/images/property/nha11.png",
    "/assets/images/property/nha2.jpg",
    "/assets/images/property/nha33.png",
    "/assets/images/property/nha4.jpg",
    "/assets/images/property/nha33.png",    
  ];

  const [propertydata, setPropertydata] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://ehouseapi20230817222213.azurewebsites.net/api/HouseRent/GetHouseRentsByHouseStatus?houseStatus=false"
        );
        setPropertydata(response.data); // Thêm .data vào response
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="col-xl-4 xl-6 col-lg-12 col-md-6">
      <div className="card">
        <div className="card-header pb-0">
          <div className="d-flex">
            <h5>Tài sản chưa cho thuê</h5>
          </div>
        </div>
        <div className="card-body properties-list">
          {propertydata &&
            propertydata.slice(0, 5).map((item, i) => {
              return (
                <Media key={i}>
                  <img src={nha[i]} className="img-fluid" alt="" />
                  <Media body>
                    <Link href="/myproperties/propertylist">
                      <h6>{item.houseRentName}</h6>
                    </Link>
                    <ul>
                      {item.bed !== 0 && (
                        <li>
                          <img
                            src="/assets/images/svg/icon/double-bed.svg"
                            className="img-fluid"
                            alt=""
                          />
                        </li>
                      )}
                      {item.restroom !== 0 && (
                        <li>
                          <img
                            src="/assets/images/svg/icon/restroom.png"
                            className="img-fluid"
                            alt=""
                          />
                        </li>
                      )}

                      <li>
                        <img
                          src="/assets/images/svg/icon/coin.png"
                          className="img-fluid"
                          alt=""
                        />
                        <span>{`${item.rentPrice.toLocaleString()} VND`}</span>
                      </li>
                    </ul>
                    <div>
                      <span className="light-font">Trạng thái: </span>
                      {item.houseStatus ? (
                        <span className={`label label-light-ban`}>{"Nhà đã thuê"}</span>
                      ) : (
                        <span className={`label label-light-ranh`}>
                          {"Nhà chưa thuê"}
                        </span>
                      )}
                    </div>
                  </Media>
                </Media>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Properylist;
