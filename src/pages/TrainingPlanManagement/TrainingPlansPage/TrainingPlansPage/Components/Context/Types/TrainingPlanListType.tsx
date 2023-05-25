import { RequestResult } from "../../../../../../../types/RequestResult";
import { ScheduledTrainingPlan } from "../../../../../../../types/TrainingPlan/ScheduledTrainingPlan/ScheduledTrainingPlan";
import { SimpleTrainingPlan } from "../../../../../../../types/TrainingPlan/SimpleTrainingPlan/SimpleTrainingPlan";
import { TrainingPlanList } from "../../../../../../../types/TrainingPlan/TrainingPlanList";

export type TrainingPlanListContextType = {
  request: RequestResult, 
  setRequest: (arg: RequestResult) => void,
  trainingPlanList: TrainingPlanList,
  simpleTrainingPlans: SimpleTrainingPlan[],
  scheduledTrainingPlans: ScheduledTrainingPlan[]
};  