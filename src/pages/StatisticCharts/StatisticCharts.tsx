import React, { useEffect, useState } from "react";
import Chart from "./Components/Chart";
import LoadStatisticServices from "./Services/LoadStatisticServices";

import {
  BadRequest,
  requestDefaultState,
} from "../../components/Message/RequestMessage";
import { Container } from "react-bootstrap";

import style from "./StatisticChartsStyle.module.sass";
import { Trans } from "react-i18next";
import { RequestResult } from "../../types/RequestResult";
import { StatisticType } from "../../types/TrainingPlan/Statistic/StatisticType";

interface IStatisticChartsProps {}

function StatisticCharts(props: IStatisticChartsProps) {
  const [request, setRequest] = useState<RequestResult>(requestDefaultState);

  const [statisticData, setStatisticData] = useState<StatisticType>({
    exercisesQuantityPerWeekByUserId: 0,
    burnedCalloriesQuantityPerWeekByUserId: 0,
    trainedMinutesQuantityPerWeekByUserId: 0,
  });

  useEffect(() => {
    LoadStatisticServices({
      setExercisesQuantityPerWeekByUserId: (data: number) => {
        setStatisticData((prev: any) => ({
          ...prev,
          exercisesQuantityPerWeekByUserId: data,
        }));
      },
      setBurnedCalloriesQuantityPerWeekByUserId: (data: number) => {
        setStatisticData((prev: any) => ({
          ...prev,
          burnedCalloriesQuantityPerWeekByUserId: data,
        }));
      },
      setTrainedMinutesQuantityPerWeekByUserId: (data: number) => {
        setStatisticData((prev: any) => ({
          ...prev,
          trainedMinutesQuantityPerWeekByUserId: data,
        }));
      },
      setRequest: setRequest,
    });
  }, []);

  return (
    <div
      className={style.page_wraper}
      style={{ minHeight: `${window.innerHeight - 180}px` }}
    >
      <Container className={style.container_style}>
        <div className={style.header_text}>
          <Trans i18nKey="StatisticCharts">StatisticCharts</Trans>
        </div>
        <BadRequest show={request.bad.show} text={request.bad.message} />
          <Chart statisticData={statisticData} /> 
      </Container>
    </div>
  );
}

export default StatisticCharts;
