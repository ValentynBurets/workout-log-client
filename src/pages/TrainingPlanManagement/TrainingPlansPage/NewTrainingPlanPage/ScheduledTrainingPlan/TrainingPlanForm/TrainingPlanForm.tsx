import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import styles from "../TrainingPlanStyle.module.sass";
import { AddExerciseModal } from "../AddExerciseModal/AddExerciseModal";
import { DayList } from "../Components/DayCarousel/DayList";
import { BadRequest, GoodRequest, requestDefaultState } from "../../../../../../components/Message/RequestMessage";
import { useTrainingPlanContext } from "../Components/Context/TrainingPlanContext";
import { TrainingPlanContextType } from "../Components/Context/Types/TrainingPlanType";
import { fetchData } from "../../../../../../utils/fetchData";
import ConnectionConfig from "../../../../../../assets/jsonData/ConnectionConfig/ConnectionConfig.json";
import PostService from "../../../../../../components/Services/PostService";

const TrainingPlanForm: React.FC = () => {
  //daySchedule={state.daySchedules.length !== 0 ? state.daySchedules.filter(item => item.day === day)[0] : null}
  const { state, dispatch, request, setRequest } = useTrainingPlanContext() as TrainingPlanContextType;
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async() => {
    // Handle form submission
    let data = await PostService(
      ConnectionConfig.Routes.TrainingPlan.Create.ScheduledTrainingPlan,
      state
    );

    if (data) {
      setRequest(
        (prev: any) =>
          prev && {
            ...prev,
            good: { show: true, message: "training plan is created" },
          }
      );
    } else {
      setRequest(
        (prev: any) =>
          prev && {
            ...prev,
            bad: { show: true, message: "training plan isn't created" },
          }
      );
    }

    setTimeout(setRequest(requestDefaultState), 3000);
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
      />
      <div className={styles["save-training-plan-style"]}>
        <Button variant="success" onClick={()=>{handleSubmit()}}>
          Save Training Plan
        </Button>
      </div>
      <AddExerciseModal
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </div>
  );
};

export default TrainingPlanForm;
