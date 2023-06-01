import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import SheduledTrainingPlansTab from "./SheduledTrainingPlans/SheduledTrainingPlans";
import SimpleTrainingPlansTab from "./SimpleTrainingPlans/SimpleTrainingPlansTab";
import style from "./TrainingPlansPage.module.sass";

interface ITrainingPlansProps {}

function TrainingPlansPage(props: ITrainingPlansProps) {
  return (
    <div className={style.tab_wraper}>
      <div className={style.TrainingPlanListStyle}>
        <h4>Training Plan List</h4>
        <Tabs defaultActiveKey="second">
          <Tab eventKey="first" title="Simple training plan">
            <SimpleTrainingPlansTab />
          </Tab>
          <Tab eventKey="second" title="Scheduled training plan">
            <SheduledTrainingPlansTab />
          </Tab>
          <Tab eventKey="third" title="How to sort ?">
            Hii, please select correct sort type and Plan name
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default TrainingPlansPage;
