import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
import Coll from "react-bootstrap/Col";
import style from "./SheduledExerciseCardStyle.module.sass";
import React from "react";
import { ScheduledTrainingPlan } from "../../../../../../../types/TrainingPlan/ScheduledTrainingPlan/ScheduledTrainingPlan";
import ExercisesCarousel from "../../../../../../../components/ExercisesCarousel/ExercisesCarousel";
import { ExerciseType } from "../../../../../../../types/ExerciseType";
import GetExerciseService from "./Servises/GetExerciseServise";

interface ISheduleTrainingPlanCardProps {
  scheduledTrainingPlan: ScheduledTrainingPlan;
}

export default function SheduleTrainingPlanCard(
  props: ISheduleTrainingPlanCardProps
) {
  let history = useHistory();

  const viewTrainingPlan = () => {
    // history.push({
    //   pathname: LinkConfig.All.TrainingPlan + `/${props.scheduledTrainingPlan.id}`,
    //   state: { lotId: `${props.scheduledTrainingPlan.id}` },
    // });
  };

  const plan = props.scheduledTrainingPlan;

  let d = new Date(plan.startDate);
  let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
  let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);

  // useEffect(() => {
  //   if (props.lot.id) {
  //     LoadImagesService({
  //       lotId: props.lot.id,
  //       setImageArray: (arg: LotImage[]) => {
  //         setImageArray(arg);
  //       },
  //     });
  //   }
  // }, [props.lot]);

  // console.log(props.lot);

  const [exercises, setExercises] = useState<ExerciseType[]>([]);
  // const [exercise, setExercise] = useState<ExerciseType>({
  //   id: "",
  //   gifUrl: "",
  //   bodyPart: "",
  //   target: "",
  //   name: "",
  //   equipment: "",
  //   calories: 1,
  // });

  useEffect(() => {
    const getExercises = async () => {
    props.scheduledTrainingPlan.daySchedules.map((daySchedule) =>
      daySchedule.scheduleExercises.map(async (sheduleExercise) => {
        let exercise: ExerciseType | void = await GetExerciseService({
          exerciseId: sheduleExercise.exerciseId,
        })

        console.log(exercise);

        if(exercise !== undefined){
          setExercises((oldArray) => [...oldArray, exercise as ExerciseType]);
        }  
      }
      ))
    }
      
    getExercises();
  }, [props.scheduledTrainingPlan]);

// useEffect(()=> {console.log(exercises)},[exercises])

  return (
    <Card
      bg=""
      border="success"
      style={{
        backgroundColor: "RGB(250, 250, 250, 0.823)",
        margin: "1em",
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center",
        borderRadius: "20px",
      }}
      onClick={viewTrainingPlan}
    >
      <Row>
        <Col>
          {props.scheduledTrainingPlan.daySchedules[0] &&
            props.scheduledTrainingPlan.daySchedules[0].scheduleExercises
              .length > 0 && (
              <ExercisesCarousel
                exercisesArrray={exercises}
                selectExercise={() => {
                  return null;
                }}
                showSelect={false}
              />
            )}
        </Col>
        <Coll style={{ marginTop: "2rem" }} className={style.card_col_block}>
          <Card.Title style={{ fontSize: "30px" }}>
            {props.scheduledTrainingPlan.name}
          </Card.Title>
          <Card.Text className="ml-3">
            {"Publiction date: " + `${da} ${mo} ${ye}`}
          </Card.Text>
        </Coll>
      </Row>
    </Card>
  );
}
