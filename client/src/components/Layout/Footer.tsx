import React from "react";
import {Col, Container, Row} from "reactstrap";
import {
    CHHS_LINKS,
    COLLEGES,
    CONTAINER_FLUID,
    FOOTER_THIRD_COLUMN,
    GENERIC_FOOTER_LINKS,
    SCHOOLS_AND_PROGRAMS
} from "../../constants";
import csuSignatureSansSerif from "../../images/csu-signature-sans-serif.svg";
import supportCsu from "../../images/support-csu-nb.svg";

export const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="upper-footer">
                <Container fluid={CONTAINER_FLUID}>
                    <Row>
                        {renderColleges()}
                        {renderSchoolsAndPrograms()}
                        {renderThirdColumn()}
                    </Row>

                </Container>
            </div>
            <div className="lower-footer">
                <Container fluid={CONTAINER_FLUID}>
                    <Row>
                        {renderGenericLinks()}
                        {renderBottomLogo()}
                    </Row>
                </Container>
            </div>
        </footer>
    );

    function renderColleges() {
        return (
            <Col md={FOOTER_THIRD_COLUMN ? 4 : 6} lg={4} className="mb-3 mb-lg-0">
                <h3>Colleges:</h3>
                <ul>
                    {COLLEGES.map(college => (
                        <li key={college.name}>
                            <a href={college.url}>{college.name}</a>
                        </li>
                    ))}
                </ul>

            </Col>
        );
    }

    function renderSchoolsAndPrograms() {
        return (
            <Col md={FOOTER_THIRD_COLUMN ? 4 : 6} lg={4} className="mb-3 mb-lg-0">
                <h3>Schools & Programs:</h3>
                <ul>
                    {SCHOOLS_AND_PROGRAMS.map(sap => (
                        <li key={sap.name}>
                            <a href={sap.url}>{sap.name}</a>
                        </li>
                    ))}
                </ul>
            </Col>
        );
    }

    function renderThirdColumn() {
        if (FOOTER_THIRD_COLUMN) {
            return (
                <Col md={4}>
                    {FOOTER_THIRD_COLUMN === "support" ? (
                        <a href="https://giving.colostate.edu/">
                            <img src={supportCsu} alt="Support CSU" />
                        </a>
                    ) : (
                        <div>
                            <h3>CHHS Resources:</h3>
                            <ul>
                                {CHHS_LINKS.map(link => (
                                    <li key={link.name}>
                                        <a href={link.url}>{link.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </Col>
            );
        }
    }

    function renderGenericLinks() {
        return (
            <Col lg={8} className="mb-3 mb-lg-0 my-auto">
                <ul className="generic-footer-links">
                    {GENERIC_FOOTER_LINKS.map(link => (
                        <li key={link.name}>
                            <a href={link.url}>{link.name}</a>
                        </li>
                    ))}
                </ul>
                <p className="my-2">&copy; {new Date().getFullYear()} Colorado State University</p>
            </Col>
        );
    }

    function renderBottomLogo() {
        return (
            <Col lg={4}>
                <a className="my-auto" href="https://www.colostate.edu">
                    <img className="float-lg-end" src={csuSignatureSansSerif} alt="CSU logo" />
                </a>
            </Col>
        );
    }
}
