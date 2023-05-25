import { ExerciseType } from "../../../ExerciseType";

export interface ScheduleExercise {
  startDate: Date;
  durationInMinutes: number;
  frequency: number;
  exerciseId: string;
  exercises: ExerciseType[]
}