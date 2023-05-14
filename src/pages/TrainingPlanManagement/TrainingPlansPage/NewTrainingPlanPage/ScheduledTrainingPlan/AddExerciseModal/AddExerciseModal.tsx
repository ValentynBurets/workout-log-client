import { useState } from "react";
import { ScheduleExercise } from "../../../../../../types/TrainingPlan/ScheduledTrainingPlan/ScheduleExercise/ScheduleExercise";
import { ExerciseType } from "../../../../../../types/ExerciseType";
import { Button, Form, Modal } from "react-bootstrap";
import ExercisesCarousel from "../../../../../../components/ExercisesCarousel/ExercisesCarousel";
import ExerciseList from "./ForList/ExerciseList";
import { ScheduledTrainingPlan } from "../../../../../../types/TrainingPlan/ScheduledTrainingPlan/ScheduledTrainingPlan";
import { WeekDay } from "../../../../../../types/TrainingPlan/ScheduledTrainingPlan/DaySchedule/WeekDay";

// Component for adding exercises to the day schedule
export const AddExerciseModal: React.FC<{
  show: boolean;
  onHide: () => void;
  exercises: ExerciseType[];
  onAdd: (exercise: ScheduleExercise) => void;
  onDelete: (exerciseId: string) => void;
  state: ScheduledTrainingPlan;
  day: WeekDay;
}> = ({ show, onHide, exercises, onAdd, state, day, onDelete }) => {
  const [selectedExercise, setSelectedExercise] = useState<ExerciseType | null>(
    null
  );
  const [frequency, setFrequency] = useState(1);

  const handleAddExercise = () => {
    if (selectedExercise) {
      const exercise: ScheduleExercise = {
        startDate: new Date(),
        durationInMinutes: 0,
        frequency,
        exerciseId: selectedExercise.id,
      };
      onAdd(exercise);
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Create day plan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {state.daySchedules[day] && (
              <ExerciseList
                exercises={state.daySchedules[day].scheduleExercises}
                onDelete={(id: string) => {
                  onDelete(id);
                }}
              />
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Form>
              <Form.Group controlId="exercise">
                <Form.Label>Select Exercise</Form.Label>
                <ExercisesCarousel
                  exercisesArrray={exercises}
                  selectExercise={(arg: ExerciseType) =>
                    setSelectedExercise(arg)
                  }
                />
              </Form.Group>
              <Form.Group controlId="frequency">
                <Form.Label>Frequency</Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  value={frequency}
                  onChange={(e) => setFrequency(parseInt(e.target.value))}
                />
              </Form.Group>
            </Form>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleAddExercise}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
