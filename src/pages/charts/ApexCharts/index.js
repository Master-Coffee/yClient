import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Col, Container, Row } from "react-bootstrap";

import Area from "./Area";


const ApexCharts = () => {
  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 100);
  }, []);

  return (
    <React.Fragment>
      <Helmet title="ApexCharts" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">ApexCharts</h1>

        <Row>
          <Col lg="12">
            <Area />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default ApexCharts;
