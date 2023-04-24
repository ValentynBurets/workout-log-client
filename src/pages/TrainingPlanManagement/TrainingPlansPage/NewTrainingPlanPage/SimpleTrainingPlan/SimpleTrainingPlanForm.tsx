import React, { useState, useEffect } from "react";
import { ExerciseType } from "../../../../../types/ExerciseType";
import ListGroup from "react-bootstrap/ListGroup";
import { fetchData } from "../../../../../utils/fetchData";
import ConnectionConfig from "../../../../../assets/jsonData/ConnectionConfig/ConnectionConfig.json";
import { SimpleTrainingPlan } from "../../../../../types/TrainingPlan/SimpleTrainingPlan";
import { SimpleTrainingPlanModel } from "../../../../../types/TrainingPlan/SimpleTrainingPlanModel";
import ExercisesCarousel from "../../../../../components/ExercisesCarousel/ExercisesCarousel";
import style from "./SimpleTrainingPlanForm.module.sass"

interface ISimpleTrainingPlanProps {}

function SimpleTrainingPlanPage(props: ISimpleTrainingPlanProps) {
  const [exercises, setExercices] = useState<ExerciseType[]>([]);

  //const [trainingPlan, setTrainingPlan] = useState<SimpleTrainingPlan | null>(null);
  const SimpleTrainingPlanModelInitialValue: SimpleTrainingPlanModel = { 
    name: "Name",
    isNoDate: true,
    startDate: new Date(),
    endDate: new Date(),
    planExercises: []
  }

  const [trainingPlanModel, setTrainingPlanModel] = useState<SimpleTrainingPlanModel>(SimpleTrainingPlanModelInitialValue);

  const addExerciceToTrainingPlan = (item: ExerciseType) => {
    console.log(item)
    console.log(trainingPlanModel)
    setTrainingPlanModel((prev) => (prev && { ...prev,  planExercises: [...prev.planExercises, item]}));
  };

  const deleteExerciceToTrainingPlan = (id: string) => {
    setTrainingPlanModel((prev) => (prev && { ...prev,  planExercises: prev.planExercises.filter(item => item.id !== id)}));
  };

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = [];

      exercisesData = await fetchData(
        ConnectionConfig.ServerUrl + ConnectionConfig.Routes.Exercises.GetAll
      );

      setExercices(exercisesData);
    };
    fetchExercisesData();
  }, []);

  useEffect( () => {
    console.log(trainingPlanModel)
  }, [trainingPlanModel])

  return (
      <div >
        {trainingPlanModel?.planExercises.map((exercice) => (
          <ListGroup key={exercice.id} className="my-2">
            <ListGroup.Item>This ListGroup</ListGroup.Item>
            <ListGroup.Item>{exercice.name}</ListGroup.Item>
            <ListGroup.Item>on </ListGroup.Item>
          </ListGroup>
        ))}
        <ListGroup className="my-2">
          <ListGroup.Item>
            <ExercisesCarousel exercisesArrray={exercises} selectExercise={(arg: ExerciseType) => addExerciceToTrainingPlan(arg)}/>
          </ListGroup.Item>
        </ListGroup>
      </div>
  );
}

export default SimpleTrainingPlanPage