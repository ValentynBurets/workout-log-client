import React  from "react";

import axios from "axios";

import connection from "../../../assets/jsonData/ConnectionConfig/ConnectionConfig.json";
import { InfoData } from "../../../types/InfoData";

interface LoadProfileInfoByIdServiceProps {
  setFieldsStateCash: (arg: InfoData) => void;
  setFieldsState: (arg: InfoData) => void;
  id: string;
}

function LoadProfileInfoByIdService(props: LoadProfileInfoByIdServiceProps) {
  axios({
    url: connection.ServerUrl + "Profile/info/getById" +
    "?userId=" +
    props.id,

    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((request) => {
    let infoData = request.data;

    let tempInfoData: InfoData = {
      name: infoData.name,
      surname: infoData.surname,
      phoneNumber: infoData.phoneNumber,
      email: infoData.email,
      password: "",
    };

    props.setFieldsStateCash(tempInfoData);
    props.setFieldsState(tempInfoData);
  });
}

export default LoadProfileInfoByIdService;
