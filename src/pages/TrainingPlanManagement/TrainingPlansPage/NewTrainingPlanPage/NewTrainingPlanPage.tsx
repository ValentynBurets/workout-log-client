import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import SimpleTrainingPlanPage from "./SimpleTrainingPlan/SimpleTrainingPlanForm";
import TrainingPlanForm from "./ScheduledTrainingPlan/TrainingPlanForm/TrainingPlanForm";
import style from "./NewTrainingPlanPage.module.sass";
import { ExerciseType } from "../../../../types/ExerciseType";
import { fetchData } from "../../../../utils/fetchData";
import ConnectionConfig from "../../../../assets/jsonData/ConnectionConfig/ConnectionConfig.json";

interface INewTrainingPlanProps {}

function NewTrainingPlanPage(props: INewTrainingPlanProps) {
  const [exercises, setExercises] = useState<ExerciseType[]>([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = [];

      exercisesData = await fetchData(
        ConnectionConfig.ServerUrl + ConnectionConfig.Routes.Exercises.GetAll
      );

      setExercises(exercisesData);
    };
    fetchExercisesData();
  },[]);

  return (
    <div className={style.tab_component_style}>
      <div style={{ display: "block", width: 700, padding: 30 }}>
        <h4>Create new Training Plan</h4>
        <Tabs defaultActiveKey="second">
          <Tab eventKey="first" title="Simple training plan">
            <SimpleTrainingPlanPage />
          </Tab>
          <Tab eventKey="second" title="Scheduled training plan">
            <TrainingPlanForm/>
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
