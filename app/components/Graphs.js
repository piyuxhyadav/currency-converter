"use client";
import * as React from "react";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useState } from "react";
import { Box } from "@material-ui/core";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Graphs=({ toCurrency, fromCurrency })=> {

	const [dates, setDates] = useState([]);
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [graphData, setgraphData] = useState([]);

	// we can use this to get the current date and the date 7 days ago
	// 	const today = new Date();
	// 	const endDate1 =
	// 		today.getFullYear() +
	// 		"-" +
	// 		(today.getMonth() + 1) +
	// 		"-" +
	// 		today.getDate();
	// 	setEndDate(endDate1);
	// 	console.log(endDate);
	// 	const weekago = today.setDate(today.getDate() - 7);
	// 	const startDate1 =
	// 		today.getFullYear() +
	// 		"-" +
	// 		(today.getMonth() + 1) +
	// 		"-" +
	// 		today.getDate();
	// 	setStartDate(startDate1);
	// 	console.log(startDate);

	useEffect(() => {
		//the api only supports old dates
		var requestURL = `https://api.exchangerate.host/timeseries?start_date=2020-01-01&end_date=2020-01-04&base=${fromCurrency}`;
		var request = new XMLHttpRequest();
		request.open("GET", requestURL);
		request.responseType = "json";
		request.send();

		request.onload = function () {
			var response = request.response;
			console.log(response);
			setDates(Object.keys(response?.rates));

			const arr = Object.keys(response?.rates).map((key) => ({
				x: key,
				y: response?.rates[key][toCurrency],
			}));
			setgraphData(arr);
			console.log(arr);
		};
	}, [fromCurrency, toCurrency, startDate]);

	const apexOptions = {
		chart: {
			type: "area",
			height: 350,
			zoom: {
				enabled: false,
			},
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			curve: "straight",
		},

		title: {
			text: "Analysis of Price Movements (PAST DATA)",
			align: "left",
		},
		subtitle: {
			text: "Price Movements",
			align: "left",
		},
		labels: "this",
		// xaxis: {
		// 	categories: xaxisData ? xaxisData : ["1", "2", "3", "4"],
		// },

		// yaxis: {
		// 	opposite: true,
		// },
		legend: {
			horizontalAlign: "left",
		},

		series: [
			{
				name: "INR",
				data: graphData
					? graphData
					: [
							{ x: "2020-01-01", y: "22" },
							{ x: "2020-01-02", y: "23" },
							{ x: "2020-01-03", y: "25" },
					  ],
			},
		],
	};

	return (
		<Box>
			<Chart
				options={apexOptions}
				series={apexOptions.series}
				type="area"
				className="apex-charts mt-0"
				height={400}
				width="100%"
				dir="ltr"
			/>
		</Box>
	);
}

export default Graphs;