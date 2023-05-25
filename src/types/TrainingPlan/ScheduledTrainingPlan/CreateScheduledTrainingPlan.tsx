import { CreateDaySchedule } from "./DaySchedule/CreateDaySchedule";

export interface CreateScheduledTrainingPlan {
    name: string;
    isNoDate: boolean;
    startDate: Date;
    endDate: Date;
    daySchedules: CreateDaySchedule[];
}
