import React, { useEffect, useState } from "react";
import Chart from "./Components/Chart";
import LoadStatisticServices from "./Services/LoadStatisticServices";

import BadRequest from "../../components/Message/BadRequest";
import { Container } from "react-bootstrap";

import style from "./StatisticChartsStyle.module.sass";
import { Trans } from "react-i18next";

interface IStatisticChartsProps {}

function StatisticCharts(props: IStatisticChartsProps) {
  // const [quantity, setQuantity] = useState<Quantity>({
  //   lots: 0,
  //   agreements: 0,
  //   bids: 0,
  //   averageViewsPerLot: 0,
  // });

  const [badRequest, setBadRequest] = useState<{
    show: boolean;
    message: string;
  }>({ show: false, message: "" });

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
        <BadRequest show={badRequest.show} text={badRequest.message} />
        {/* <Chart quantity={quantity} /> */}
      </Container>
    </div>
  );
}

export default StatisticCharts;
