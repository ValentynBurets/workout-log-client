import { useEffect, useState } from "react";
import { ScheduleExercise } from "../../../../../../types/TrainingPlan/ScheduledTrainingPlan/ScheduleExercise/ScheduleExercise";
import { ExerciseType } from "../../../../../../types/ExerciseType";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import ExercisesCarousel from "../../../../../../components/ExercisesCarousel/ExercisesCarousel";
import ExerciseList from "./ForList/ExerciseList";
import { ScheduledTrainingPlan } from "../../../../../../types/TrainingPlan/ScheduledTrainingPlan/ScheduledTrainingPlan";
import { WeekDay } from "../../../../../../types/TrainingPlan/ScheduledTrainingPlan/DaySchedule/WeekDay";
import "./AddExerciseModalStyle.sass";
import { DaySchedule } from "../../../../../../types/TrainingPlan/ScheduledTrainingPlan/DaySchedule/DaySchedule";

interface AddExerciseModalProps {
  show: boolean;
  onHide: () => void;
  exercises: ExerciseType[];
  setExercises: (arg: ExerciseType[]) => void;
  onAdd: (daySchedule: DaySchedule) => void;
  onDelete: (exerciseId: string) => void;
  state: ScheduledTrainingPlan;
  day: WeekDay;
  dayName: string;
}

// Component for adding exercises to the day schedule
export const AddExerciseModal: React.FC<AddExerciseModalProps> = (
  props: AddExerciseModalProps
) => {
  const [selectedExercise, setSelectedExercise] = useState<ExerciseType | null>(
    null
  );

  const [daySchedule, setDaySchedule] = useState<DaySchedule>({
    day: props.day,
    scheduleExercises: [],
  });

  useEffect(() => {
    console.log(daySchedule);
  }, [daySchedule]);

  const [frequency, setFrequency] = useState<number>(1);
  const [duration, setDuration] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date>(new Date());

  const handleAddExercise = () => {
    if (selectedExercise) {
      const exercise: ScheduleExercise = {
        frequency,
        duration,
        startDate,
        exerciseId: selectedExercise.id,
      };

      setDaySchedule((prev: DaySchedule) => ({
        ...prev,
        scheduleExercises: [...prev.scheduleExercises, exercise],
      }));

      props.setExercises(props.exercises.filter(item => item.id !== selectedExercise.id))
    }
  };

  console.log(props.exercises);

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Create day plan for {props.dayName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xs={8}>
            {daySchedule ? (
              <ExerciseList
                exercises={daySchedule.scheduleExercises}
                onDelete={(id: string) => {
                  props.onDelete(id);
                }}
              />
            ) : (
              <div style={{ textAlign: "center" }}>
                <h2>Selected Exercises</h2>
              </div>
            )}
          </Col>
          <Col>
            <Form>
              <Form.Group controlId="exercise">
                <Form.Label>Select Exercise</Form.Label>
                <ExercisesCarousel
                  exercisesArrray={props.exercises}
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
              <Form.Group controlId="duration">
                <Form.Label>Duration in minutes</Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                />
              </Form.Group>
              <Form.Group controlId="duration">
                <Form.Label>Start Time</Form.Label>
                <Form.Control
                  type="date"
                  value={startDate.toISOString().split("T")[0]}
                  onChange={(e) => setStartDate(new Date(e.target.value))}
                />
              </Form.Group>
              <Form.Group controlId="submit">
                <Button
                  onClick={() => {
                    handleAddExercise();
                  }}
                >
                  Add Exercise
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            props.onAdd(daySchedule);
            props.onHide();
          }}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
