import { ExerciseType } from "../../ExerciseType";

export interface SimpleTrainingPlan {
  id: string;
  name: string;
  isNoDate: boolean;
  startDate: Date;
  endDate: Date;
  exercises: ExerciseType[];
}
