import React, { useEffect, useState } from "react";
import Chart from "./Components/Chart";
import LoadStatisticServices from "./Services/LoadStatisticServices";

import { BadRequest, requestDefaultState } from "../../components/Message/RequestMessage";
import { Container } from "react-bootstrap";

import style from "./StatisticChartsStyle.module.sass";
import { Trans } from "react-i18next";
import { RequestResult } from "../../types/RequestResult";

interface IStatisticChartsProps {}

function StatisticCharts(props: IStatisticChartsProps) {
  // const [quantity, setQuantity] = useState<Quantity>({
  //   lots: 0,
  //   agreements: 0,
  //   bids: 0,
  //   averageViewsPerLot: 0,
  // });

  const [request, setRequest] = useState<RequestResult>(requestDefaultState);

  // useEffect(() => {
  //   LoadStatisticServices({
  //     setLotsQuantity: (data: number) => {
  //       setQuantity((prev: any) => ({ ...prev, lots: data }));
  //     },
  //     setAgreementsQuantity: (data: number) => {
  //       setQuantity((prev: any) => ({ ...prev, agreements: data }));
  //     },
  //     setBidsQuantity: (data: number) => {
  //       setQuantity((prev: any) => ({ ...prev, bids: data }));
  //     },
  //     setAverageViewsPerLot: (data: number) => {
  //       setQuantity((prev: any) => ({ ...prev, averageViewsPerLot: data }));
  //     },
  //     setBadRequest: setBadRequest,
  //   });
  // }, []);

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
        {/* <Chart quantity={quantity} /> */}
      </Container>
    </div>
  );
}

export default StatisticCharts;
