import { ScheduledTrainingPlan } from "../../../../../../types/TrainingPlan/ScheduledTrainingPlan/ScheduledTrainingPlan";

// Define the initial state for the reducer
export const initialState: ScheduledTrainingPlan = {
  name: "",
  isNoDate: false,
  startDate: new Date(),
  endDate: new Date(),
  daySchedules: [],
};

// Define the reducer function to manage state updates
export function ScheduledTrainingPlanReducer(
  state: ScheduledTrainingPlan,
  action: any
): ScheduledTrainingPlan {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_IS_NO_DATE":
      return { ...state, isNoDate: action.payload };
    case "SET_START_DATE":
      return { ...state, startDate: action.payload };
    case "SET_END_DATE":
      return { ...state, endDate: action.payload };
    case "ADD_DAY_SCHEDULE":
      return {
        ...state,
        daySchedules: [
          ...state.daySchedules.filter(
            (item) => item.day !== action.payload.day
          ),
          action.payload,
        ],
      };
    case "REMOVE_DAY_SCHEDULE":
      return {
        ...state,
        daySchedules: state.daySchedules.filter(
          (_, index) => index !== action.payload
        ),
      };
    case "ADD_SCHEDULE_EXERCISE":
      const { day, exercise } = action.payload;
      const updatedDaySchedules = [...state.daySchedules];
      updatedDaySchedules[day].scheduleExercises.push(exercise);
      return { ...state, daySchedules: updatedDaySchedules };
    case "REMOVE_SCHEDULE_EXERCISE":
      const { dayIndex, exerciseIndex } = action.payload;
      const modifiedDaySchedules = [...state.daySchedules];
      modifiedDaySchedules[dayIndex].scheduleExercises.splice(exerciseIndex, 1);
      return { ...state, daySchedules: modifiedDaySchedules };
    default:
      return state;
  }
}
