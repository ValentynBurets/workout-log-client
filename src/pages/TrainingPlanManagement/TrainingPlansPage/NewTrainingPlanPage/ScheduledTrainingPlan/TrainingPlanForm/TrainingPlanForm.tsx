import { useState, useReducer, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import styles from "../TrainingPlanStyle.module.sass";
import { WeekDay } from "../../../../../../types/TrainingPlan/ScheduledTrainingPlan/DaySchedule/WeekDay";
import ExercisesCarousel from "../../../../../../components/ExercisesCarousel/ExercisesCarousel";
import { ExerciseType } from "../../../../../../types/ExerciseType";
import { fetchData } from "../../../../../../utils/fetchData";
import ConnectionConfig from "../../../../../../assets/jsonData/ConnectionConfig/ConnectionConfig.json";
import {
  ScheduledTrainingPlanReducer,
  initialState,
} from "../Reducer/ScheduledTrainingPlanReducer";
import { DaySchedule } from "../../../../../../types/TrainingPlan/ScheduledTrainingPlan/DaySchedule/DaySchedule";
import { ScheduleExercise } from "../../../../../../types/TrainingPlan/ScheduledTrainingPlan/ScheduleExercise/ScheduleExercise";
import { AddExerciseModal } from "../AddExerciseModal/AddExerciseModal";
import { DayList } from "../DayCarousel/DayList";

interface TrainingPlanFormProps {
  exercises: ExerciseType[];
}

const TrainingPlanForm: React.FC = () => {
  const [exercises, setExercises] = useState<ExerciseType[]>([]);
  const [day, setDay] = useState<WeekDay>(WeekDay.FRIDAY);
  const [showModal, setShowModal] = useState(false);
  const [state, dispatch] = useReducer(
    ScheduledTrainingPlanReducer,
    initialState
  );

  useEffect(() => {
    console.log(state);
  }, [state]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData: ExerciseType[] = [];
      exercisesData = await fetchData(
        ConnectionConfig.ServerUrl + ConnectionConfig.Routes.Exercises.GetAll
      );

      setExercises(exercisesData);
    };
    fetchExercisesData();
  }, []);
  const handleAddExercise = (dayIndex: number, exercise: ScheduleExercise) => {
    dispatch({
      type: "ADD_SCHEDULE_EXERCISE",
      payload: { dayIndex, exercise },
    });
  };

  const handleRemoveExercise = (dayIndex: number, exerciseIndex: number) => {
    dispatch({
      type: "REMOVE_SCHEDULE_EXERCISE",
      payload: { dayIndex, exerciseIndex },
    });
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log(state);
  };

  return (
    <div>
      <Form>
        <Form.Group controlId="name">
          <Form.Label>Training Plan Name</Form.Label>
          <Form.Control
            type="text"
            value={state.name}
            onChange={(e) =>
              dispatch({ type: "SET_NAME", payload: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="isNoDate">
          <Form.Check
            type="checkbox"
            label="No Date"
            checked={state.isNoDate}
            onChange={(e) =>
              dispatch({ type: "SET_IS_NO_DATE", payload: e.target.checked })
            }
          />
        </Form.Group>
        {!state.isNoDate && (
          <>
            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={state.startDate.toISOString().split("T")[0]}
                onChange={(e) =>
                  dispatch({
                    type: "SET_START_DATE",
                    payload: new Date(e.target.value),
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={state.endDate.toISOString().split("T")[0]}
                onChange={(e) =>
                  dispatch({
                    type: "SET_END_DATE",
                    payload: new Date(e.target.value),
                  })
                }
              />
            </Form.Group>
          </>
        )}
      </Form>
      <DayList
        setShowModal={setShowModal}
        setDay={(arg: WeekDay) => setDay(arg)}
      />
      {state.daySchedules.map((daySchedule, dayIndex) => (
        <div key={dayIndex}>
          <h4>{daySchedule.day}</h4>
          {daySchedule.scheduleExercises.map((exercise, exerciseIndex) => (
            <div>
              <div key={exerciseIndex}>
                <span>
                  {exercises.find((ex) => ex.id === exercise.exerciseId)?.name}
                </span>
              </div>
              <Button
                variant="danger"
                onClick={() => handleRemoveExercise(dayIndex, exerciseIndex)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      ))}
      <div className={styles["save-training-plan-style"]}>
      <Button variant="success" onClick={handleSubmit}>
        Save Training Plan
      </Button>
      </div>
      <AddExerciseModal
        show={showModal}
        onHide={() => setShowModal(false)}
        exercises={exercises}
        onAdd={() => handleAddExercise}
        onDelete={() => handleRemoveExercise}
        state={state}
        day={day}
      />
    </div>
  );
};

export default TrainingPlanForm;
