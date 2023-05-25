import { RequestResult } from "../../../../../../../../types/RequestResult";
import { CreateDaySchedule } from "../../../../../../../../types/TrainingPlan/ScheduledTrainingPlan/DaySchedule/CreateDaySchedule";
import { WeekDay } from "../../../../../../../../types/TrainingPlan/ScheduledTrainingPlan/DaySchedule/WeekDay";
import { CreateScheduledTrainingPlan } from "../../../../../../../../types/TrainingPlan/ScheduledTrainingPlan/CreateScheduledTrainingPlan";

export type TrainingPlanContextType = {
  state: CreateScheduledTrainingPlan;
  dispatch: (arg: any) => void;
  request: RequestResult;
  setRequest: (arg: any) => any;
  handleAddDaySchedule: (arg: any) => any;
  dayScheduleInitialState: CreateDaySchedule;
  daySchedule: CreateDaySchedule;
  setDaySchedule: (arg: any) => any;
  day: WeekDay;
  setDay: (arg: any) => any;
  dayName: string;
  setDayName: (arg: string) => any
};  