import React from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import ExerciseShortCard from "./ExerciseShortCard/ExerciseShortCard";
import { ExerciseType } from "../../../types/ExerciseType";

interface Props {
  exercises: ExerciseType[];
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
          <Col xs={12} md={6} lg={4} key={exercise.id}>
            <ExerciseShortCard
              exercise={exercise}
              onDelete={() => handleDelete(exercise.id)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ExerciseList;
