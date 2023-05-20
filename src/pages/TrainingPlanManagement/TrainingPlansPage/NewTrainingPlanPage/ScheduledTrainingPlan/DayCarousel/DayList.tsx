import React, { useState, useEffect, useReducer } from "react";
import { Button, Container, Col, Row } from "react-bootstrap";
import { WeekDay } from "../../../../../../types/TrainingPlan/ScheduledTrainingPlan/DaySchedule/WeekDay";
import "./DayListStyle.sass";

interface DayCarouselProps {
  setShowModal: (arg: boolean) => void;
  setDay: (arg: WeekDay) => void;
  setDayName: (arg: string) => void;
}

export const DayList: React.FC<DayCarouselProps> = (props) => {
  return (
    <div>
      <Container>
        <Row>
          {Object.keys(WeekDay).map((day, index) => (
            <Col xs={12} md={6} lg={4} key={index}>
              <div className={"day-label-wrapper"}>
                <span
                  onClick={() => {
                    props.setDay(WeekDay[day as keyof typeof WeekDay]);
                    props.setDayName(day);
                    props.setShowModal(true);
                  }}
                >
                  {/* <h5 style={{textAlign: "center"}}>{day}</h5> */}
                  <div className={`day-label ${day}`}></div>
                </span>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
