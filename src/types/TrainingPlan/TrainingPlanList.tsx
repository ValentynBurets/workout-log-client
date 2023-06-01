import { ScheduledTrainingPlan } from "./ScheduledTrainingPlan/ScheduledTrainingPlan";
import { SimpleTrainingPlan } from "./SimpleTrainingPlan/SimpleTrainingPlan";

export interface TrainingPlanList{
  scheduleTrainingPlans: ScheduledTrainingPlan[];
  simpleTrainingPlans: SimpleTrainingPlan[];
}