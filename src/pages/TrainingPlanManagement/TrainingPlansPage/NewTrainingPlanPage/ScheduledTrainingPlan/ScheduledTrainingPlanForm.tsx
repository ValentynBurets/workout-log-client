import React, { useState, useEffect } from "react";
import { ExerciseType } from "../../../../../types/ExerciseType";
import ListGroup from "react-bootstrap/ListGroup";
import { fetchData } from "../../../../../utils/fetchData";
import ConnectionConfig from "../../../../../assets/jsonData/ConnectionConfig/ConnectionConfig.json";
import { SimpleTrainingPlan } from "../../../../../types/TrainingPlan/SimpleTrainingPlan";

interface IScheduledTrainingPlanProps {}

function ScheduledTrainingPlanPage(props: IScheduledTrainingPlanProps) {
  const [exercises, setExercices] = useState<ExerciseType[]>([]);

  const [trainingPlan, setTrainingPlan] = useState<SimpleTrainingPlan | null>(null);

  const addExerciceToTrainingPlan = (id: string) => {
    setTrainingPlan((prev) => (prev && { ...prev,  planExerciseIds: [...prev.planExerciseIds, id]}));
  };

  const deleteExerciceToTrainingPlan = (id: string) => {
    setTrainingPlan((prev) => (prev && { ...prev,  planExerciseIds: prev.planExerciseIds.filter(item => item !== id)}));
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

  return (
    <div>
      <div>
        {exercises.map((exercice) => (
          <ListGroup key={exercice.id} className="my-2">
            <ListGroup.Item>This ListGroup</ListGroup.Item>
            <ListGroup.Item>renders horizontally</ListGroup.Item>
            <ListGroup.Item>on </ListGroup.Item>
            <ListGroup.Item>
                {/* <ExercisesCarousel exercises={exercises} addExerciceToTrainingPlan={(id: string) => addExerciceToTrainingPlan(id)}/> */}
            </ListGroup.Item>
          </ListGroup>
        ))}
      </div>
    </div>
  );
}

export default ScheduledTrainingPlanPage