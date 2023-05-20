import { useState, useReducer, useEffect } from "react";
import { Modal, Button, Form, Tabs, Tab } from "react-bootstrap";
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
import { BadRequest, GoodRequest, requestDefaultState } from "../../../../../../components/Message/RequestMessage";
import { RequestResult } from "../../../../../../types/RequestResult";

interface TrainingPlanFormProps {
  exercises: ExerciseType[];
}

const TrainingPlanForm: React.FC = () => {
  const [request, setRequest] = useState<RequestResult>(requestDefaultState);

  const [exercises, setExercises] = useState<ExerciseType[]>([]);
  const [day, setDay] = useState<WeekDay>(WeekDay.FRIDAY);
  const [dayName, setDayName] = useState<string>("");

  const [showModal, setShowModal] = useState(false);
  const [state, dispatch] = useReducer(
    ScheduledTrainingPlanReducer,
    initialState
  );

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData: ExerciseType[] = [];
      exercisesData = await fetchData(
        ConnectionConfig.ServerUrl + ConnectionConfig.Routes.Exercises.GetAll
      );
      console.log(exercisesData);
      setExercises(exercisesData);
    };
    fetchExercisesData();
  }, []);

  const handleAddDaySchedule = (dayIndex: number, daySchedule: DaySchedule) => {
    if(daySchedule.scheduleExercises.length === 0){
      setRequest(
        (prev) =>
          prev && {
            ...prev,
            bad: { show: true, message: "day plan doesn't contain any exercise" },
          }
      );
      return
    }

    dispatch({
      type: "ADD_DAY_SCHEDULE",
      payload: { dayIndex, daySchedule },
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

    setRequest(
      (prev) =>
        prev && {
          ...prev,
          good: { show: true, message: "trainig plan is added" },
        }
    );
    console.log(state);
  };

  return (
    <div>
      <GoodRequest show={request.good.show} text={request.good.message} />
      <BadRequest show={request.bad.show} text={request.bad.message} />
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
        setDayName={(arg: string) => setDayName(arg)}
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
        setExercises={setExercises}
        onAdd={() => handleAddDaySchedule}
        onDelete={() => handleRemoveExercise}
        state={state}
        day={day}
        dayName={dayName}
      />
    </div>
  );
};

export default TrainingPlanForm;
