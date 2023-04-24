import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { ExerciseType } from "../../../../types/ExerciseType";
import SimpleTrainingPlanPage from "./SimpleTrainingPlan/SimpleTrainingPlanForm";
import ScheduledTrainingPlanPage from "./ScheduledTrainingPlan/ScheduledTrainingPlanForm";
import style from "./NewTrainingPlanPage.module.sass";

interface INewTrainingPlanProps {}

function NewTrainingPlanPage(props: INewTrainingPlanProps) {
  return (
    <div className={style.tab_component_style}>
      <div style={{ display: "block", width: 700, padding: 30 }}>
        <h4>Create new Training Plan</h4>
        <Tabs defaultActiveKey="second">
          <Tab eventKey="first" title="Simple training plan">
            <SimpleTrainingPlanPage />
          </Tab>
          <Tab eventKey="second" title="Scheduled training plan">
            <ScheduledTrainingPlanPage />
          </Tab>
          <Tab eventKey="third" title="How to create ?">
            Hii, I am 3rd tab content
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default NewTrainingPlanPage;
