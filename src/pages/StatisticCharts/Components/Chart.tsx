import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

import style from "./ChartStyle.module.sass";
import { StatisticType } from "../../../types/TrainingPlan/Statistic/StatisticType";

//import { Quantity } from "../../../Components/Types/Quantity";

interface IChartProps {
  statisticData: StatisticType;
}

function Chart(props: IChartProps) {
  useEffect(() => {
    console.log(props.statisticData);
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    afterChartCreated();
  }, [props.statisticData]);

  const afterChartCreated = () => {
    const chart: Highcharts.Options = {
      chart: {
        type: "column",
      },
      title: {
        align: "center",
        text: "Activity",
      },
      subtitle: {
        align: "center",
        text: "activity per week",
      },
      accessibility: {
        announceNewData: {
          enabled: true,
        },
      },
      xAxis: {
        type: "category",
      },
      yAxis: {
        title: {
          text: "Quantity of clories",
        },
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: "{point.y:.1f}",
          },
        },
      },
      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat:
          '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of total<br/>',
      },

      series: [
        {
          name: "Browsers",
          colorByPoint: true,
          type: "column",
          data: [
            { name: "burned Callories Quantity Per Week By User", y: props.statisticData.burnedCalloriesQuantityPerWeekByUserId },
            { name: "exercises Quantity Per Week By User", y: props.statisticData.exercisesQuantityPerWeekByUserId },
            { name: "trained Minutes Quantity Per Week By User", y: props.statisticData.trainedMinutesQuantityPerWeekByUserId },
          ],
        },
      ],
    };

    setChartOptions(chart);
  };



  return (
    <div className={style.chart_container}>
      {chartOptions ? (
        <HighchartsReact className={style.chart_style} highcharts={Highcharts} options={chartOptions} />
      ) : (
        <p>No data</p>
      )}

    </div>
  );
}

export default Chart;
