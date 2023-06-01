import { Container } from "react-bootstrap";
import SheduledExerciseCard from "../SheduledExerciseCard/SheduledExerciseCard";
import { SimpleTrainingPlan } from "../../../../../../../types/TrainingPlan/SimpleTrainingPlan/SimpleTrainingPlan";
import { ScheduledTrainingPlan } from "../../../../../../../types/TrainingPlan/ScheduledTrainingPlan/ScheduledTrainingPlan";

interface SheduledPlanDeckProps {
  trainingPlans: ScheduledTrainingPlan[];
}

export default function SheduledPlanDeck(props: SheduledPlanDeckProps) {

  //console.log(props.trainingPlans);

   return (
    <Container className="TaskList">
      {props.trainingPlans?.map((scheduledTrainingPlan: ScheduledTrainingPlan) => (
          scheduledTrainingPlan.daySchedules[0].scheduleExercises.length !== 0 
          && <SheduledExerciseCard key={scheduledTrainingPlan.id} scheduledTrainingPlan={scheduledTrainingPlan} />
      ))}
    </Container>
   );
 }