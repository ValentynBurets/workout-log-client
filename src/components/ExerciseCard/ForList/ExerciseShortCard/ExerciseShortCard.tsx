import React from "react";
import { Button, Card } from "react-bootstrap";
import { ExerciseType } from "../../../../types/ExerciseType";
import style from "./ExerciseShortCard.module.sass"

interface ExerciseCardProps {
  exercise: ExerciseType;
  onDelete: (id: string) => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, onDelete }) => {
  return (
    <Card className={style['exercise-card']}>
      <Card.Img variant="top" src={exercise.gifUrl} className={style['card-img-top']} />
      <Card.Body className={style['card-body']}>
        <Card.Title className={style['card-title']}>{exercise.name}</Card.Title>
        <Card.Text className={style['card-text']}>
          <strong>Body part:</strong> {exercise.bodyPart}
        </Card.Text>
        <Card.Text className={style['card-text']}>
          <strong>Target:</strong> {exercise.target}
        </Card.Text>
        <Card.Text className={style['card-text']}>
          <strong>Calories:</strong> {exercise.calories.toFixed(2)} per minute
        </Card.Text>
        <Card.Text className={style['card-equipment']}>{exercise.equipment}</Card.Text>
        <Button variant="danger" onClick={() => onDelete(exercise.id)}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ExerciseCard;
