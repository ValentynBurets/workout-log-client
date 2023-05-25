import { CreateDaySchedule } from "../../../../../../../types/TrainingPlan/ScheduledTrainingPlan/DaySchedule/CreateDaySchedule";
import { CreateScheduledTrainingPlan } from "../../../../../../../types/TrainingPlan/ScheduledTrainingPlan/CreateScheduledTrainingPlan";

// Define the initial state for the reducer
export const initialState: CreateScheduledTrainingPlan = {
  name: "",
  isNoDate: false,
  startDate: new Date(),
  endDate: new Date(),
  daySchedules: [],
};
export type ScheduledTrainingPlanAction = 
({type: "SET_NAME", payload: string})|
({type: "SET_IS_NO_DATE", payload: boolean})|
({type: "SET_START_DATE", payload: Date})|
({type: "SET_END_DATE", payload: Date})|
({type: "ADD_DAY_SCHEDULE", payload: CreateDaySchedule})|
({type: "REMOVE_DAY_SCHEDULE", payload: number});
// ({type: "ADD_SCHEDULE_EXERCISE", payload: })|
// ({type: "REMOVE_SCHEDULE_EXERCISE", payload: })|
// ({
//   type: 
// });
// Define the reducer function to manage state updates
export function ScheduledTrainingPlanReducer(
  state: CreateScheduledTrainingPlan,
  action: ScheduledTrainingPlanAction
): CreateScheduledTrainingPlan {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_IS_NO_DATE":
      return { ...state, isNoDate: action.payload };
    case "SET_START_DATE":
      return { ...state, startDate: action.payload };
    case "SET_END_DATE":
      return { ...state, endDate: action.payload };
    case "ADD_DAY_SCHEDULE": {      
      // const updatedDaySchedules = state.daySchedules.map((daySchedule) => {
      //   if (daySchedule.day === action.payload.day) {
      //     return action.payload; // Update the existing daySchedule
      //   }
      //   return daySchedule;
      // });
    
      // // If the daySchedule doesn't exist, add it to the array
      // if (!updatedDaySchedules.find((daySchedule) => daySchedule.day === action.payload.day)) {
      //   updatedDaySchedules.push(action.payload);
      // }
    
      // return {
      //   ...state,
      //   daySchedules: updatedDaySchedules,
      // };

      return {
        ...state,
        daySchedules: [
            ...state.daySchedules,
            action.payload,
        ],
      };
    }
    case "REMOVE_DAY_SCHEDULE":
      return {
        ...state,
        daySchedules: state.daySchedules.filter(
          (_, index) => index !== action.payload
        ),
      };
    // case "ADD_SCHEDULE_EXERCISE":
    //   const { day, exercise } = action.payload;
    //   const updatedDaySchedules = [...state.daySchedules];
    //   updatedDaySchedules[day].scheduleExercises.push(exercise);
    //   return { ...state, daySchedules: updatedDaySchedules };
    // case "REMOVE_SCHEDULE_EXERCISE":
    //   const { dayIndex, exerciseIndex } = action.payload;
    //   const modifiedDaySchedules = [...state.daySchedules];
    //   modifiedDaySchedules[dayIndex].scheduleExercises.splice(exerciseIndex, 1);
    //   return { ...state, daySchedules: modifiedDaySchedules };
    default:
      return state;
  }
}
