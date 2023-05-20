import { ScheduleExercise } from "../ScheduleExercise/ScheduleExercise";
import { WeekDay } from "./WeekDay";

export interface DaySchedule {
    day: string | WeekDay;
    scheduleExercises: ScheduleExercise[];
}




