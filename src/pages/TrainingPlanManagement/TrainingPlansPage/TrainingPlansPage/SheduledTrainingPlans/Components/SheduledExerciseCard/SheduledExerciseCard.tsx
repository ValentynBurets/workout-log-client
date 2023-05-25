import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
import Coll from "react-bootstrap/Col";
import style from "./SheduledExerciseCardStyle.module.sass";
import React from "react";
import { useTrainingPlanListContext } from "../../../Components/Context/TrainingPlanListContext";
import LinkConfig from "../../../../../../../assets/jsonData/LinkConfig/LinkConfig.json"
import { ScheduledTrainingPlan } from "../../../../../../../types/TrainingPlan/ScheduledTrainingPlan/ScheduledTrainingPlan";

interface ISheduleTrainingPlanCardProps{
  scheduledTrainingPlan: ScheduledTrainingPlan;
}

export default function SheduleTrainingPlanCard(props: ISheduleTrainingPlanCardProps) {
//   let history = useHistory();

//   const viewLot = () => {
//     history.push({
//       pathname: LinkConfig.All.TrainingPlan + `/${props.scheduledTrainingPlan.id}`,
//       state: { lotId: `${props.scheduledTrainingPlan.id}` },
//     });
//   };

//   const lot = props.scheduledTrainingPlan;

//   let d = new Date(lot.startDate);
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
    <div>exercise card</div>
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
//           {props.scheduledTrainingPlan.daySchedules[0] && props.scheduledTrainingPlan.daySchedules[0].scheduleExercises.length > 0 && (
//             <LotImageCarousel imgArray={props.scheduledTrainingPlan.daySchedules[0].scheduleExercises} />
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