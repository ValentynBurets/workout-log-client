import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import SheduledTrainingPlansTab from "./SheduledTrainingPlans/SheduledTrainingPlans";
import SimpleTrainingPlansTab from "./SimpleTrainingPlans/SimpleTrainingPlansTab";
import TrainingPlanListProvider from "./Components/Context/TrainingPlanListContext";

interface ITrainingPlansProps {}

function TrainingPlansPage(props: ITrainingPlansProps) {
  return (
    <div>
      <TrainingPlanListProvider>
        <Tabs defaultActiveKey="second">
          <Tab eventKey="first" title="Simple training plan">
            <SimpleTrainingPlansTab />
          </Tab>
          <Tab eventKey="second" title="Scheduled training plan">
            <SheduledTrainingPlansTab />
          </Tab>
          <Tab eventKey="third" title="How to create ?">
            Hii, I am 3rd tab content
          </Tab>
        </Tabs>
      </TrainingPlanListProvider>
    </div>
  );
}

export default TrainingPlansPage;
