export interface CreateSimpleTrainingPlan {
    name: string;
    isNoDate: boolean;
    startDate: Date;
    endDate: Date;
    planExerciseIds: string[];
}