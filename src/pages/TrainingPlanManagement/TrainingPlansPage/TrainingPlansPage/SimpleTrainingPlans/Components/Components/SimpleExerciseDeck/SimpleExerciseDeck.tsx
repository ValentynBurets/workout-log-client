import { Container } from "react-bootstrap";
import { SimpleTrainingPlan } from "../../../../../../../../types/TrainingPlan/SimpleTrainingPlan/SimpleTrainingPlan";

interface TaskCardDeckProps {
  lots: SimpleTrainingPlan[];
}

export default function SimpleExerciseCardDeck(props: TaskCardDeckProps) {
  return (
    <div>simple exercise deck</div>
//     <Container className="TaskList">
//       {props.lots?.map((lot: SimpleLot) => (
//         <LotCard key={lot.id} lot={lot} />
//       ))}
//     </Container>
  );
}