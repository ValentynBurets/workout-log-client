import React, { useState, useEffect, useReducer } from "react";
import { Button, Container, Col, Row } from "react-bootstrap";
import { WeekDay } from "../../../../../../types/TrainingPlan/ScheduledTrainingPlan/DaySchedule/WeekDay";
import "./DayListStyle.sass";

interface DayCarouselProps {
  setShowModal: (arg: boolean) => void;
  setDay: (arg: WeekDay) => void;
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
                  className={`day-label ${day}`}
                  onClick={() => {
                    props.setDay(WeekDay[day as keyof typeof WeekDay]);
                    props.setShowModal(true);
                  }}
                >
                  {day}
                </span>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
