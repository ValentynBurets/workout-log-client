import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

import style from "./ChartStyle.module.sass";

//import { Quantity } from "../../../Components/Types/Quantity";

interface IChartProps {
  quantity: any;
}

function Chart(props: IChartProps) {
  useEffect(() => {
    console.log(props.quantity);
  });

  const [chartOptions, setChartOptions] = useState({});
  const [viewsChartOptions, setViewsChartOptions] = useState({});

  useEffect(() => {
    //afterChartCreated();
    afterViewsChartCreated();
  }, [props.quantity]);

  // const afterChartCreated = () => {
  //   const chart: Highcharts.Options = {
  //     chart: {
  //       type: "column",
  //     },
  //     title: {
  //       align: "center",
  //       text: "Activity",
  //     },
  //     subtitle: {
  //       align: "center",
  //       text: "activity on the site",
  //     },
  //     accessibility: {
  //       announceNewData: {
  //         enabled: true,
  //       },
  //     },
  //     xAxis: {
  //       type: "category",
  //     },
  //     yAxis: {
  //       title: {
  //         text: "Quantity",
  //       },
  //     },
  //     legend: {
  //       enabled: false,
  //     },
  //     plotOptions: {
  //       series: {
  //         borderWidth: 0,
  //         dataLabels: {
  //           enabled: true,
  //           format: "{point.y:.1f}",
  //         },
  //       },
  //     },
  //     tooltip: {
  //       headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
  //       pointFormat:
  //         '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of total<br/>',
  //     },

  //     series: [
  //       {
  //         name: "Browsers",
  //         colorByPoint: true,
  //         type: "column",
  //         data: [
  //           { name: "Lots", y: props.quantity.lots },
  //           { name: "Agreements", y: props.quantity.agreements },
  //           { name: "Bids", y: props.quantity.bids },
  //         ],
  //       },
  //     ],
  //   };

  //   setChartOptions(chart);
  // };

  const afterViewsChartCreated = () => {
    const chart: Highcharts.Options = {
      chart: {
        type: "column",
      },
      title: {
        align: "center",
        text: "Views",
      },
      subtitle: {
        align: "center",
        text: "views per each lot",
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
          text: "Quantity",
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
            {
              name: "lots quantity",
              y: props.quantity.lots,
            },
            {
              name: "avarage lot wieves",
              y: props.quantity.averageViewsPerLot,
            },
          ],
        },
      ],
    };

    setViewsChartOptions(chart);
  };

  return (
    <div className={style.chart_container}>
      {chartOptions ? (
        <HighchartsReact className={style.chart_style} highcharts={Highcharts} options={chartOptions} />
      ) : (
        <p>No data</p>
      )}

      {viewsChartOptions ? (
        <HighchartsReact className={style.chart_style} highcharts={Highcharts} options={viewsChartOptions} />
      ) : (
        <p>No data</p>
      )}
    </div>
  );
}

export default Chart;
