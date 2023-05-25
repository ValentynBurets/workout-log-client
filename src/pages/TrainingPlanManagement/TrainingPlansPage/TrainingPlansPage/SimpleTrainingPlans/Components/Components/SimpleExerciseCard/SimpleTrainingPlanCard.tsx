import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
import Coll from "react-bootstrap/Col";
import style from "./SheduledExerciseCardStyle.module.sass";
import React from "react";
import LinkConfig from "../../../../../../../../assets/jsonData/LinkConfig/LinkConfig.json"
import { SimpleTrainingPlan } from "../../../../../../../../types/TrainingPlan/SimpleTrainingPlan/SimpleTrainingPlan";
import ExercisesCarousel from "../../../../../../../../components/ExercisesCarousel/ExercisesCarousel";

interface ISimpleTrainingPlanCardProps{
  simpleTrainingPlan: SimpleTrainingPlan;
}

export default function SimpleTrainingPlanCard(props: ISimpleTrainingPlanCardProps) {
//   let history = useHistory();

//   const viewLot = () => {
//     history.push({
//       pathname: LinkConfig.All.TrainingPlan + `/${props.simpleTrainingPlan.id}`,
//       state: { lotId: `${props.simpleTrainingPlan.id}` },
//     });
//   };

//   const trainingPlan = props.simpleTrainingPlan;

//   let d = new Date(trainingPlan.startDate);
//   let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
//   let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
//   let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);

//   // useEffect(() => {
//   //   if (props.lot.id) {
//   //     LoadImagesService({
//   //       lotId: props.lot.id,
//   //       setImageArray: (arg: LotImage[]) => {
//   //         setImageArray(arg);
//   //       },
//   //     });
//   //   }
//   // }, [props.lot]);

//   // console.log(props.lot);

  return (
    <div></div>
//     <Card
//       bg=""
//       border="success"
//       style={{    
//         backgroundColor: "RGB(250, 250, 250, 0.823)",
//         margin: "1em", 
//         marginLeft: "auto", 
//         marginRight: "auto", 
//         textAlign: "center",   
//         borderRadius: "20px"
//       }}
//       onClick={viewLot}
//     >
//       <Row>
//         <Col>
//           {props.simpleTrainingPlan.planExercises && props.simpleTrainingPlan.planExercises.length > 0 && (
//             <ExercisesCarousel  exercisesArrray = {props.simpleTrainingPlan.planExercises}
//             selectExercise = {()=> {return null}} />
//           )}
//         </Col>
//         <Coll style={{marginTop: "2rem"}} className={style.card_col_block}>
//           <Card.Title style={{fontSize: "30px"}}>{lot.header}</Card.Title>
//           <Card.Text className="ml-3">
//             {"Publiction date: " + `${da} ${mo} ${ye}`}
//           </Card.Text>
//           <Card.Text style={{fontSize: "20px"}} className="ml-3">
//             {lot.isAuction ? "Auction" : lot.isRent && "Rent"}
//           </Card.Text>
//           <Card.Text style={{fontSize: "20px"}} className="ml-3">
//             {lot.isAuction && "Buy price: " + lot.buyPrice}
//           </Card.Text>
//           <Card.Text className="ml-3">
//             {lot.location &&
//               lot.location.region +
//                 " " +
//                 lot.location.city +
//                 " " +
//                 lot.location.street}
//           </Card.Text>
//         </Coll>
//       </Row>
//     </Card>
  );
}