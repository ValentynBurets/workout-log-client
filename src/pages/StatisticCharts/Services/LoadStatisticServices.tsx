import React from "react";
import GetService from "../../../components/Services/GetService";

import ConnectionConfig from "../../../assets/jsonData/ConnectionConfig/ConnectionConfig.json";
import { RequestResult } from "../../../types/RequestResult";

interface ILoadStatisticServicesProps {
  setExercisesQuantityPerWeekByUserId: (data: number) => void;
  setBurnedCalloriesQuantityPerWeekByUserId: (data: number) => void;
  setTrainedMinutesQuantityPerWeekByUserId: (data: number) => void;
  setRequest: (arg: RequestResult) => void;
}

function LoadStatisticServices(props: ILoadStatisticServicesProps) {
  GetService.request(
    ConnectionConfig.ServerUrl + ConnectionConfig.Routes.Statistic.GetExercisesQuantityPerWeekByUserId
  ).then((response) => {
    if (response.data === null) {
      props.setRequest({
        good: {
          message: "",
          show: false,
        },
        bad: {
          message: "exercises quantity per week by user Id weren't loaded",
          show: true,
        },
      });
    } else {
      var data = response.data;
      props.setExercisesQuantityPerWeekByUserId(data);
      // console.log(data);
    }
  });

  GetService.request(
    ConnectionConfig.ServerUrl + ConnectionConfig.Routes.Statistic.GetBurnedCalloriesQuantityPerWeekByUserId
  ).then((response) => {
    if (response.data === null) {
      props.setRequest({
        good: {
          message: "",
          show: false,
        },
        bad: {
          message: "burned callories quantity per week by user Id weren't loaded",
          show: true,
        },
      });
    } else {
      var data = response.data;
      props.setBurnedCalloriesQuantityPerWeekByUserId(data);
      // console.log(data);
    }
  });

  GetService.request(
    ConnectionConfig.ServerUrl + ConnectionConfig.Routes.Statistic.GetTrainedMinutesQuantityPerWeekByUserId
  ).then((response) => {
    if (response.data === null) {
      props.setRequest({
        good: {
          message: "",
          show: false,
        },
        bad: {
          message: "trained minutes quantity per week ny user id weren't loaded",
          show: true,
        },
      });
    } else {
      var data = response.data;
      props.setTrainedMinutesQuantityPerWeekByUserId(data);
      // console.log(data);
    }
  });
}

export default LoadStatisticServices;
