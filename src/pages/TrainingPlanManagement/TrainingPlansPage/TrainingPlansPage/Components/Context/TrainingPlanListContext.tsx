import * as React from "react";
import { useState, useEffect } from "react";
import { TrainingPlanListContextType } from "./Types/TrainingPlanListType";
import { TrainingPlanList } from "../../../../../../types/TrainingPlan/TrainingPlanList";
import { requestDefaultState } from "../../../../../../components/Message/RequestMessage";
import { RequestResult } from "../../../../../../types/RequestResult";
import { fetchData } from "../../../../../../utils/fetchData";
import ConnectionConfig from "../../../../../../assets/jsonData/ConnectionConfig/ConnectionConfig.json";

export const TrainingPlanListContext =
  React.createContext<TrainingPlanListContextType | null>(null);

const TrainingPlanListProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {

  const [request, setRequest] = useState<RequestResult>(requestDefaultState)

  const [trainingPlanList, setTrainingPlanList] = useState<TrainingPlanList>({
    scheduledTrainingPlan: [],
    simpleTrainingPlanModel: [],
  });

  useEffect(() => {
    const GetAllTrainingPlans = async () => {
      let data: TrainingPlanList;
      data = await fetchData(
        ConnectionConfig.ServerUrl + ConnectionConfig.Routes.Exercises.GetAll
      );
      setTrainingPlanList(data);
    };

    GetAllTrainingPlans();
  }, []);

  return (
    <TrainingPlanListContext.Provider
      value={{
        request, 
        setRequest,
        trainingPlanList,
        scheduledTrainingPlans: trainingPlanList.scheduledTrainingPlan,
        simpleTrainingPlans: trainingPlanList.simpleTrainingPlanModel,
      }}
    >
      {children}
    </TrainingPlanListContext.Provider>
  );
};

export default TrainingPlanListProvider;

export const useTrainingPlanListContext = () =>
  React.useContext(TrainingPlanListContext);
