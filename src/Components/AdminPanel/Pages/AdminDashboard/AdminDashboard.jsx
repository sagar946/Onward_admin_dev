import React, { useEffect } from "react";
import "../../Styles/AdminDashboard.css";
import ReactApexChart from "react-apexcharts";
import { IoOptionsOutline } from "react-icons/io5";

const AdminDashboard = () => {
  useEffect(() => {
    document.title = "Admin || Dashboard";
  }, []);
  const chartData = {
    series: [
      {
        name: "series1",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: "series2",
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  };
  const chartDatatwo = {
    series: [76, 61, 90],
    options: {
      chart: {
        height: 390,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: "30%",
            background: "transparent",
            image: undefined,
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: false,
            },
          },
          barLabels: {
            enabled: true,
            useSeriesColors: true,
            offsetX: -8,
            fontSize: "16px",
            formatter: function (seriesName, opts) {
              return (
                seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
              );
            },
          },
        },
      },
      colors: ["#0084ff", "#39539E", "#0077B5"],
      labels: ["Messenger", "Facebook", "LinkedIn"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: false,
            },
          },
        },
      ],
    },
  };
  return (
    <>
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <div className="pageheading">
          <h6>Dashboard</h6>
        </div>
      </div>
      <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
        <div className="databox">
          <div>
            <h6>Option</h6>
            <h5 style={{ color: "rgb(242, 193, 6)" }}>7k</h5>
          </div>
          <div>
            <IoOptionsOutline
              className="databoxicon"
              style={{
                color: "rgb(242, 193, 6)",
                border: "solid rgb(242, 193, 6) 1px",
              }}
            />
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
        <div className="databox">
          <div>
            <h6>Option</h6>
            <h5 style={{ color: "rgb(70, 201, 107)" }}>47</h5>
          </div>
          <div>
            <IoOptionsOutline
              className="databoxicon"
              style={{
                color: "rgb(70, 201, 107)",
                border: "solid rgb(70, 201, 107) 1px",
              }}
            />
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
        <div className="databox">
          <div>
            <h6>Option</h6>
            <h5 style={{ color: "rgb(65, 162, 204)" }}>1740</h5>
          </div>
          <div>
            <IoOptionsOutline
              className="databoxicon"
              style={{
                color: "rgb(65, 162, 204)",
                border: "solid rgb(65, 162, 204) 1px",
              }}
            />
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
        <div className="databox">
          <div>
            <h6>Option</h6>
            <h5 style={{ color: "rgb(248, 108, 107)" }}>44k</h5>
          </div>
          <div>
            <IoOptionsOutline
              className="databoxicon"
              style={{
                color: "rgb(248, 108, 107)",
                border: "solid rgb(248, 108, 107) 1px",
              }}
            />
          </div>
        </div>
      </div>
      <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12">
        <div className="designbox">
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="area"
            height={300}
          />
        </div>
      </div>
      <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12">
        <div className="designbox">
          <ReactApexChart
            options={chartDatatwo.options}
            series={chartDatatwo.series}
            type="radialBar"
            height={356}
          />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
