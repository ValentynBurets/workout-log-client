import { CreateDaySchedule } from "./DaySchedule/CreateDaySchedule";

export interface ScheduledTrainingPlan {
    id: string;
    userId: string;
    name: string;
    startDate: Date;
    endDate: Date;
    daySchedules: CreateDaySchedule[];
}
