import { ExerciseType } from "../../ExerciseType";

export interface SimpleTrainingPlanModel {
    name: string;
    isNoDate: boolean;
    startDate: Date;
    endDate: Date;
    planExercises: ExerciseType[];
}