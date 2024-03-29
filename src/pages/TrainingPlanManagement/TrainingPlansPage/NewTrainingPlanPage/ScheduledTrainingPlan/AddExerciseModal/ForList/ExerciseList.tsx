import React from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import ExerciseShortCard from "./ExerciseShortCard/ExerciseShortCard";
import { CreateScheduleExercise } from "../../../../../../../types/TrainingPlan/ScheduledTrainingPlan/ScheduleExercise/CreateScheduleExercise";

interface Props {
  exercises: CreateScheduleExercise[];
  onDelete: (id: string) => void;
}

const ExerciseList: React.FC<Props> = ({ exercises, onDelete }) => {
  const handleDelete = (id: string) => {
    onDelete(id);
  };

  return (
    <Container>
      <Row>
        {exercises.map((exercise) => (
          <Col xs={12} md={6} lg={4} key={exercise.exerciseId}>
            <ExerciseShortCard
              scheduleExercise={exercise}
              onDelete={() => handleDelete(exercise.exerciseId)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ExerciseList;
