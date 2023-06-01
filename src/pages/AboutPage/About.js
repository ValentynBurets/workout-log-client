import React, { Component } from "react";
import { Container, Tab, Nav, Row, Col, Card} from "react-bootstrap";
import { CardDeck } from "reactstrap";
import { Trans } from "react-i18next";

import WorkOutImage from "../../assets/images/Logo/work_out_symbol.webp";

import Photo from "../../assets/images/Misha_photo.jpg";

import TextData from "../../assets/jsonData/TextData/en.json"

import style from "./AboutStyle.module.sass";

export default class About extends Component {
  render() {
    return (
      <div className={style.page_background} style={{ minHeight: `${window.innerHeight - 205}px` }} >
        <Container>
          <Tab.Container id="ledt-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={3} style={{marginTop: "4rem"}}>
                <Nav variant="pills" className="flex-column mt-2">
                  <Nav.Item>
                    <Nav.Link eventKey="first">
                      <Trans i18nKey="WhatISLS">What is "{TextData.WorkOutLog}"?</Trans>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">
                      <Trans i18nKey="OurTeam">
                        <Trans i18nKey="OurTeam">Our team</Trans>
                      </Trans>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="third">
                      <Trans i18nKey="UsedInstruments">Used instruments</Trans>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content 
                  className="mt-3"   
                  style={
                    {
                      borderRadius: "8px",
                      backgroundColor: "RGB(250, 250, 250, 0.823)",
                      boxShadow: "0px 0px 30px 5px rgba(0, 0, 0, 0.123)",
                      margin: "3rem",
                      padding: "5px"
                    }
                  } 
                >
                  <Tab.Pane eventKey="first">
                    <h2 className="text-center m-4">
                      <Trans i18nKey="WhoWeAre">Who we are?</Trans>
                    </h2>
                    <p style={{padding: "1rem"}}>
                      <Trans i18nKey="WeTeam">
                        We are a team of young professionals who want to develop
                        a new and unique products that will not leave you
                        indifferent.
                      </Trans>
                    </p>
                    <img
                      className="mx-auto d-block"
                      width="700"
                      height="auto"
                      src={WorkOutImage}
                      alt="WorkOutImage"
                    ></img>

                    <h2 className="text-center m-4">
                      <Trans i18nKey="MainGoal">Our main goal?</Trans>
                    </h2>
                    <p style={{padding: "1rem"}}>
                      <Trans i18nKey="OurMainGoal">
                        Our main goal is to gain maximum skills in the
                        development of this site to apply them in the future in
                        new and even better projects. Each of us wants to
                        develop in this direction in the future and develop
                        better and better projects.
                      </Trans>
                    </p>
                    <p style={{padding: "1rem"}}>
                      <Trans i18nKey="PartOfThesis">
                        As part of this thesis, a web system for the sale and
                        lease of land and real estate was designed and
                        implemented. The system provides for its use by real
                        estate companies. To do this, the system has a
                        user-friendly interface and various opportunities for
                        sale or lease of land and real estate.
                      </Trans>
                    </p>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <CardDeck                         style={{
                          display: "flex",
                          justifyContent: "center"
                        }}>
                      <Card
                        bg=""
                        border="dark"
                        className="mb-4"
                        style={{
                          flexWrap: "nowrap",
                          minWidth: "200px",
                          maxWidth: "300px",
                          display: "flex",
                          justifyContent: "center"
                        }}
                      >
                        <Card.Img
                          style={{ padding: "20px" }}
                          variant="top"
                          src={Photo}
                        />
                        <Card.Body>
                          <Card.Title>{this.props.Title}</Card.Title>
                          <Card.Text>
                            Keryta Misha
                            <p />
                            Front-end and back end developer
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </CardDeck>
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    <h2 className="text-center m-4">Front-end</h2>
                    <p style={{padding: "1rem"}}>
                      <Trans i18nKey="React">
                        React (також відомий як React.js або ReactJS) є
                        відкритим вихідним кодом інтерфейсна бібліотека
                        JavaScript для побудови інтерфейсів користувача або
                        Компоненти інтерфейсу користувача. Його підтримують
                        Facebook і спільнота індивідуальних забудовників і
                        компаній. React можна використовувати як база в розробці
                        односторінкових або мобільних додатків. Однак React
                        займається лише станом управління та відтворення цього
                        стану в DOM, щоб створити Додатки React зазвичай
                        вимагають використання додаткових бібліотеки для
                        маршрутизації, а також певні клієнтські функціональність
                      </Trans>
                    </p>
                    <img
                      className="mb-4 mx-auto d-block"
                      width="700"
                      height="auto"
                      src="https://miro.medium.com/max/2484/1*CeuWv9fCjD1uTiTuKytnBQ.png"
                      alt="react"
                    ></img>

                    <h2 className="text-center m-4">Back-end</h2>
                    <p style={{padding: "1rem"}}>
                      <Trans i18nKey="Net">
                        The .NET Framework (pronounced as 'dot net') is a
                        software framework developed by Microsoft that runs
                        primarily on Microsoft Windows. It includes a large
                        class library called Framework Class Library (FCL) and
                        provides language interoperability (each language can
                        use code written in other languages) across several
                        programming languages. Programs written for .NET
                        Framework execute in a software environment (in contrast
                        to a hardware environment) named the Common Language
                        Runtime (CLR). The CLR is an application virtual machine
                        that provides services such as security, memory
                        management, and exception handling. As such, computer
                        code written using .NET Framework is called 'managed
                        code'. FCL and CLR together constitute the .NET
                        Framework.
                      </Trans>
                    </p>
                    <img
                      className="mb-4 mx-auto d-block"
                      width="700"
                      height="auto"
                      src="https://media.proglib.io/wp-uploads/2019/08/c-sharp-dot-net.png"
                      alt=".net"
                    ></img>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </div>
    );
  }
}
