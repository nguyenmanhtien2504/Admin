import React, { useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'
import PropertyBox1 from '../../Common/Propertybox/PropertyBox1'
import { getData } from '../../utils/getData'
import {getTokenFromCookie } from '../../../pages/api/tokenUtils.js'
import usePagination from '../../utils/usePagination'
import axios from "axios"; 

const Listview = () => {
    const token = getTokenFromCookie();
    const [value, setValue] = useState();
    //
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(
              `https://ehouseapi20230817222213.azurewebsites.net/api/HouseRent/GetHouseRents`
              , {
                headers: {
                  Authorization: token,
                }
              });
            setValue(response.data); // Thêm .data vào response
            localStorage.setItem('dataHouse', JSON.stringify(response.data));
          } catch (error) {
            console.log(error);
          }
        };
        const storedData = localStorage.getItem('dataHouse');
        if (storedData) {
          setValue(JSON.parse(storedData));
        } else {
          fetchData();
        }
      }, [token]);

    const [Pagination, data] = usePagination(value && value);
    return (
        <div className="col-xl-12">
            <Row className="property-2 column-sm property-label property-grid">
                {
                    data && data.map((item, i) => {
                        return (
                            <Col xl='4' md='6 xl-6' key={i}>
                                <PropertyBox1 data={item} />
                            </Col>
                        )
                    })
                }
            </Row>
            <Pagination />
        </div>

    )
}

export default Listview