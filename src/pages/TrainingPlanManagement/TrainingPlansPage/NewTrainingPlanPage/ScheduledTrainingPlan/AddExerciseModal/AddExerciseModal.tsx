import { useEffect, useState } from "react";
import { CreateScheduleExercise } from "../../../../../../types/TrainingPlan/ScheduledTrainingPlan/ScheduleExercise/CreateScheduleExercise";
import { ExerciseType } from "../../../../../../types/ExerciseType";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import ExercisesCarousel from "../../../../../../components/ExercisesCarousel/ExercisesCarousel";
import ExerciseList from "./ForList/ExerciseList";
import { CreateScheduledTrainingPlan } from "../../../../../../types/TrainingPlan/ScheduledTrainingPlan/CreateScheduledTrainingPlan";
import { WeekDay } from "../../../../../../types/TrainingPlan/ScheduledTrainingPlan/DaySchedule/WeekDay";
import "./AddExerciseModalStyle.sass";
import { CreateDaySchedule } from "../../../../../../types/TrainingPlan/ScheduledTrainingPlan/DaySchedule/CreateDaySchedule";
import { useTrainingPlanContext } from "../Components/Context/TrainingPlanContext";
import { TrainingPlanContextType } from "../Components/Context/Types/TrainingPlanType";
import ConnectionConfig from "../../../../../../assets/jsonData/ConnectionConfig/ConnectionConfig.json";
import { fetchData } from "../../../../../../utils/fetchData";

interface AddExerciseModalProps {
  show: boolean;
  onHide: () => void;
}

// Component for adding exercises to the day schedule
export const AddExerciseModal: React.FC<AddExerciseModalProps> = (
  props: AddExerciseModalProps
) => {
  const [selectedExercise, setSelectedExercise] = useState<ExerciseType | null>(
    null
  );

  const { daySchedule, setDaySchedule, dayScheduleInitialState, dayName, handleAddDaySchedule } =
    useTrainingPlanContext() as TrainingPlanContextType;

  const [exercises, setExercises] = useState<ExerciseType[]>([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData: ExerciseType[] = [];
      exercisesData = await fetchData(
        ConnectionConfig.ServerUrl + ConnectionConfig.Routes.Exercises.GetAll
      );
      setExercises(
        daySchedule.scheduleExercises.length !== 0
          ? exercisesData.filter(
              (item) =>
                !daySchedule.scheduleExercises.find(
                  (exercise: CreateScheduleExercise) => exercise.exerciseId === item.id
                )
            )
          : exercisesData
      );
    };
    fetchExercisesData();
  }, []);

  // const onDelete = (exerciseId: string) => {
  //   setDaySchedule(
  //     (prev: any) =>
  //       prev && {
  //         ...prev,
  //         scheduleExercises: [
  //           ...(daySchedule.scheduleExercises.length > 0
  //             ? daySchedule.scheduleExercises.filter(
  //                 (item: CreateDaySchedule) => item.scheduleExercises !== exerciseId
  //               )
  //             : []),
  //         ],
  //       }
  //   );
  // };

  const [frequency, setFrequency] = useState<number>(1);
  const [duration, setDuration] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date>(new Date());

  const handleAddExercise = () => {
    if (selectedExercise) {
      const exercise: CreateScheduleExercise = {
        frequency,
        duration,
        startDate,
        exerciseId: selectedExercise.id,
      };

      setDaySchedule((prev: CreateDaySchedule) => ({
        ...prev,
        scheduleExercises: [...prev.scheduleExercises, exercise],
      }));

      setExercises(
        exercises.filter((item) => item.id !== selectedExercise.id)
      );
    }
  };

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Create day plan for {dayName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xs={8}>
            {daySchedule ? (
              <ExerciseList
                exercises={daySchedule.scheduleExercises}
                onDelete={(id: string) => {
                  //onDelete(id);
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
            handleAddDaySchedule(daySchedule);
            props.onHide();
          }}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
