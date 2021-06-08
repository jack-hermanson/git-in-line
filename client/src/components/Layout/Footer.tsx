import React from "react";
import {Col, Container, Row} from "reactstrap";
import {COLLEGES, GENERIC_FOOTER_LINKS, SCHOOLS_AND_PROGRAMS} from "../../constants";

export const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="upper-footer">
                <Container>
                    <Row>
                        <Col lg={4} md={6} className="mb-3 mb-lg-0">
                            <h3>Colleges:</h3>
                            <ul>
                                {COLLEGES.map(college => (
                                    <li key={college.name}>
                                        <a href={college.url}>{college.name}</a>
                                    </li>
                                ))}
                            </ul>

                        </Col>
                        <Col lg={4} md={6}>
                            <h3>Schools & Programs:</h3>
                            <ul className="schools-and-programs">
                                {SCHOOLS_AND_PROGRAMS.map(sap => (
                                    <li key={sap.name}>
                                        <a href={sap.url}>{sap.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </Col>
                    </Row>

                </Container>
            </div>
            <div className="lower-footer">
                <Container>
                    <Row>
                        <Col lg={8} className="mb-3 mb-lg-0">
                            <ul>
                                {GENERIC_FOOTER_LINKS.map(link => (
                                    <li key={link.name}>
                                        <a href={link.url}>{link.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </div>
        </footer>
    );
}
