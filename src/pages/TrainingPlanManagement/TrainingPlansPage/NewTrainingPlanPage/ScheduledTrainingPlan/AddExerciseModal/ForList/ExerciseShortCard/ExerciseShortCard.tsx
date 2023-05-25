import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { ExerciseType } from "../../../../../../../../types/ExerciseType";
import style from "./ExerciseShortCard.module.sass"
import { CreateScheduleExercise } from "../../../../../../../../types/TrainingPlan/ScheduledTrainingPlan/ScheduleExercise/CreateScheduleExercise";
import ConnectionConfig from "../../../../../../../../assets/jsonData/ConnectionConfig/ConnectionConfig.json";
import { fetchData } from "../../../../../../../../utils/fetchData";

interface ExerciseCardProps {
  scheduleExercise: CreateScheduleExercise;
  onDelete: (id: string) => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ scheduleExercise, onDelete }) => {

  const[exerciseById, setExerciseById] = useState<ExerciseType>()

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exerciseData: ExerciseType = await fetchData(
        ConnectionConfig.ServerUrl + ConnectionConfig.Routes.Exercises.GetById +
        "?ExerciseId=" + scheduleExercise.exerciseId
      );
  
      setExerciseById(exerciseData);
    };
    fetchExercisesData();
  }, []);

  return (
    <Card className={style['exercise-card']}>
      <Card.Img variant="top" src={exerciseById?.gifUrl} className={style['card-img-top']} />
      <Card.Body className={style['card-body']}>
        <Card.Title className={style['card-title']}>{exerciseById?.name}</Card.Title>
        <Card.Text className={style['card-text']}>
          <strong>Body part:</strong> {exerciseById?.bodyPart}
        </Card.Text>
        <Card.Text className={style['card-text']}>
          <strong>Target:</strong> {exerciseById?.target}
        </Card.Text>
        <Card.Text className={style['card-text']}>
          <strong>Calories:</strong> {exerciseById?.calories.toFixed(2)} per minute
        </Card.Text>
        <Card.Text className={style['card-equipment']}>{exerciseById?.equipment}</Card.Text>
        <Button variant="danger" onClick={() => onDelete(scheduleExercise.exerciseId)}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ExerciseCard;
