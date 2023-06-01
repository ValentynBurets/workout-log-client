import { Container } from "react-bootstrap";
import { SimpleTrainingPlan } from "../../../../../../../types/TrainingPlan/SimpleTrainingPlan/SimpleTrainingPlan";
import SimpleTrainingPlanCard from "../SimpleTrainingPlanCard/SimpleTrainingPlanCard";

interface SimpleTrainingPlanDeckProps {
  SimpleTrainingPlan: SimpleTrainingPlan[];
}

export default function SimpleTrainingPlanDeck(props: SimpleTrainingPlanDeckProps) {
  return (
    //<div>simple plans deck</div>
    <Container className="TaskList">
      {props.SimpleTrainingPlan?.map((plan: SimpleTrainingPlan) => (
        <SimpleTrainingPlanCard key={plan.id} simpleTrainingPlan={plan} />
      ))}
    </Container>
  );
}