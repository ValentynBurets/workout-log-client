import { Container } from "react-bootstrap";
import SheduledExerciseCard from "../SheduledExerciseCard/SheduledExerciseCard";
import { SimpleTrainingPlan } from "../../../../../../../types/TrainingPlan/SimpleTrainingPlan/SimpleTrainingPlan";

interface TaskCardDeckProps {
  SimpleTrainingPlans: SimpleTrainingPlan[];
}

export default function TaskCardDeck(props: TaskCardDeckProps) {
   return (
    <div>test</div>
//     <Container className="TaskList">
//       {props.lots?.map((lot: SimpleLot) => (
//         <LotCard key={lot.id} lot={lot} />
//       ))}
//     </Container>
   );
 }