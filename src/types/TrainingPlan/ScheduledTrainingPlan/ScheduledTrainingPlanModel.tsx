import { DaySchedule } from "./DaySchedule/DaySchedule";

export interface ScheduledTrainingPlanModel {
    name: string;
    isNoDate: boolean;
    startDate: Date;
    endDate: Date;
    daySchedules: DaySchedule[];
}