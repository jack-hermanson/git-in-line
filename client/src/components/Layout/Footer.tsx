import React from "react";
import {Col, Container, Row} from "reactstrap";
import {COLLEGES, FOOTER_THIRD_COLUMN, GENERIC_FOOTER_LINKS, SCHOOLS_AND_PROGRAMS} from "../../constants";
import csuSignatureSansSerif from "../../images/csu-signature-sans-serif.svg";
import supportCsu from "../../images/support-csu-nb.svg";

export const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="upper-footer">
                <Container>
                    <Row>
                        <Col lg={4} className="mb-3 mb-lg-0">
                            <h3>Colleges:</h3>
                            <ul>
                                {COLLEGES.map(college => (
                                    <li key={college.name}>
                                        <a href={college.url}>{college.name}</a>
                                    </li>
                                ))}
                            </ul>

                        </Col>
                        <Col lg={4} className={`${FOOTER_THIRD_COLUMN !== undefined && "mb-3 mb-lg-0"}`}>
                            <h3>Schools & Programs:</h3>
                            <ul>
                                {SCHOOLS_AND_PROGRAMS.map(sap => (
                                    <li key={sap.name}>
                                        <a href={sap.url}>{sap.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </Col>
                        {FOOTER_THIRD_COLUMN && (
                            <Col lg={4}>
                                <a href="https://giving.colostate.edu/">
                                    <img src={supportCsu} alt="Support CSU" />
                                </a>
                            </Col>
                        )}
                    </Row>

                </Container>
            </div>
            <div className="lower-footer">
                <Container>
                    <Row>
                        <Col lg={8} className="mb-3 mb-lg-0 d-flex align-items-center">
                            <ul className="generic-footer-links">
                                {GENERIC_FOOTER_LINKS.map(link => (
                                    <li key={link.name}>
                                        <a href={link.url}>{link.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </Col>
                        <Col lg={4} >
                            <img className="footer-logo" src={csuSignatureSansSerif} alt="CSU logo" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p className="my-2">&copy; {new Date().getFullYear()} Colorado State University</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </footer>
    );
}
