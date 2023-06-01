import axios from "axios";
import ConnectionConfig from "../../../../../../../../assets/jsonData/ConnectionConfig/ConnectionConfig.json";
import { ExerciseType } from "../../../../../../../../types/ExerciseType";

interface LoadServiceProps {
  exerciseId: string;
}

function GetExerciseService(props: LoadServiceProps): Promise<ExerciseType | void> {
  return axios
    .get(
      `${
        ConnectionConfig.ServerUrl +
        ConnectionConfig.Routes.Exercises.GetById +
        "?exerciseid=" +
        props.exerciseId
      }`
    )
    .then((responce) => {
      var data = responce.data;
      //console.log(data)
      if (data != null) {
        return data as ExerciseType | void;
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

export default GetExerciseService;
