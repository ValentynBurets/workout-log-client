import * as React from "react";
import { useState, useEffect, useReducer } from "react";
import {
  ScheduledTrainingPlanReducer,
  initialState,
} from "../Reducer/ScheduledTrainingPlanReducer";
import { TrainingPlanContextType } from "./Types/TrainingPlanType";
import { RequestResult } from "../../../../../../../types/RequestResult";
import { requestDefaultState } from "../../../../../../../components/Message/RequestMessage";
import { CreateDaySchedule } from "../../../../../../../types/TrainingPlan/ScheduledTrainingPlan/DaySchedule/CreateDaySchedule";
import { WeekDay } from "../../../../../../../types/TrainingPlan/ScheduledTrainingPlan/DaySchedule/WeekDay";

export const TrainingPlanContext =
  React.createContext<TrainingPlanContextType | null>(null);

const TrainingPlanProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(
    ScheduledTrainingPlanReducer,
    initialState
  );

  const [day, setDay] = useState<WeekDay>(WeekDay.FRIDAY);
  const [dayName, setDayName] = useState<string>("");

  const [request, setRequest] = useState<RequestResult>(requestDefaultState);

  const handleAddDaySchedule = (daySchedule: CreateDaySchedule) => {
    if (daySchedule.scheduleExercises.length === 0) {
      setRequest(
        (prev: any) =>
          prev && {
            ...prev,
            bad: {
              show: true,
              message: "day plan doesn't contain any exercise",
            },
          }
      );
      return;
    }

    dispatch({
      type: "ADD_DAY_SCHEDULE",
      payload: daySchedule,
    });
  };

  const dayScheduleInitialState = {
    day: day,
    scheduleExercises: [],
  };

  const [daySchedule, setDaySchedule] = useState<CreateDaySchedule>(
    dayScheduleInitialState
  );

  useEffect(() => {
    if (daySchedule.day !== day) {
      if (state.daySchedules.length === 0) {
        // console.log("test 0")
        setDaySchedule(dayScheduleInitialState);
      } else {
        let tempDaySchedule = state.daySchedules.find(
          (item: CreateDaySchedule) => item.day === day
        );
        // console.log(tempDaySchedule, day, state);
        setDaySchedule(
          tempDaySchedule !== undefined
            ? tempDaySchedule
            : dayScheduleInitialState
        );
      }
    }
  }, [day]);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <TrainingPlanContext.Provider
      value={{
        state,
        dispatch,
        request,
        setRequest,
        handleAddDaySchedule,
        daySchedule,
        dayScheduleInitialState,
        setDaySchedule,
        day,
        setDay,
        dayName,
        setDayName,
      }}
    >
      {children}
    </TrainingPlanContext.Provider>
  );
};

export default TrainingPlanProvider;

export const useTrainingPlanContext = () =>
  React.useContext(TrainingPlanContext);
