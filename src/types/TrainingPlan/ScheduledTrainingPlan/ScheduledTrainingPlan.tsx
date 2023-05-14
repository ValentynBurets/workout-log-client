import { DaySchedule } from "./DaySchedule/DaySchedule";

export interface ScheduledTrainingPlan {
    name: string;
    isNoDate: boolean;
    startDate: Date;
    endDate: Date;
    daySchedules: DaySchedule[];
}