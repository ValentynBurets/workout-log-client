export interface SimpleTrainingPlan {
    name: string;
    isNoDate: boolean;
    startDate: Date;
    endDate: Date;
    planExerciseIds: string[];
}