import axios from "axios";
import ConnectionConfig from "../../../../../assets/jsonData/ConnectionConfig/ConnectionConfig.json";
import {TrainingPlanList} from "../../../../../types/TrainingPlan/TrainingPlanList"

interface LoadServiceProps{
  selectedParams: any,
  setTrainingPlans: (arg: TrainingPlanList) => void,
  setDataLoading: (arg: any) => void
}

const GetTrainingPlans = (props: LoadServiceProps) => {
  props.setDataLoading((prev: any) => ({
    ...prev,
    isLoading: true,
    requests: true,
    inProgress: true,
  }));
  
  axios
    .post(
      `${ConnectionConfig.ServerUrl + ConnectionConfig.Routes.TrainingPlan.Get}`,
      props.selectedParams
    )
    .then((responce) => {
      var data = responce.data;
      //console.log(data)
      if (data != null) {
        props.setTrainingPlans(data);
      }
    })
    .catch((e) => {
      console.log(e);
    }); 

    props.setDataLoading((prev: any) => ({
      ...prev,
      isLoading: false,
      requests: false,
      inProgress: false,
    }));
  }

export default GetTrainingPlans