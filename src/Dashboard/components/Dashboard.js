import React from "react";
import { Container, Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import Header from "Shared/Header/Header";
import AdminFooter from "Shared/Footers/AdminFooter";
import { Doughnut, Line } from "react-chartjs-2";
import Snackbar from "Shared/Notification/Snackbar";

const data = {
	labels: ["Jan", "Feb", "Mar", "Apr", "May", "June"],
	datasets: [
		{
			data: [12, 19, 3, 5, 2, 3],
			fill: false,
			backgroundColor: "rgb(255, 99, 132)",
			borderColor: "rgba(255, 99, 132, 0.2)",
		},
	],
};

const options = {
	plugins: {
		legend: {
			display: false,
		},
	},
	scales: {
		yAxes: {
			display: false,
			ticks: {
				min: 0,
			},
		},
		xAxes: {
			grid: {
				display: false,
			},
		},
	},
};

const data2 = {
	maintainAspectRatio: true,
	responsive: true,
	labels: ["Red", "Blue", "Yellow"],
	datasets: [
		{
			label: "My First Dataset",
			data: [300, 50, 100],
			backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)"],
			hoverOffset: 4,
		},
	],
};

const options2 = {
	plugins: {
		legend: {
			display: false,
		},
	},
	scales: {
		yAxes: {
			display: false,
		},
		xAxes: {
			display: false,
		},
	},
};

const Dashboard = () => {
	let displaySnackbar = Snackbar();

	return (
		<>
			<Header bg={"primary"} />
			<Container className=" pt-4" fluid>
				<Row className="mt-4 mb-4">
					<Col className="mb-5 mb-xl-0" xl="7">
						<Card>
							<CardHeader>
								<div className="col">
									<h6 className="text-uppercase text-muted ls-1 mb-1">Line1</h6>
									<h2
										className={" mb-0 geb fs-24"}
										style={{
											textTransform: "uppercase",
											letterSpacing: "1px",
											color: "#fb6340",
										}}
										onClick={() => {
											displaySnackbar({ head: "Contest", variant: "error", message: "Something Went Wrong!" });
										}}
									>
										Line2
									</h2>
								</div>
							</CardHeader>
							<CardBody>
								<Line data={data} options={options} />
							</CardBody>
						</Card>
					</Col>
					<Col className="mb-5 mb-xl-0" xl="4">
						<Card>
							<CardHeader>
								<div className="col">
									<h6 className="text-uppercase text-muted ls-1 mb-1">Line1</h6>
									<h2
										className={" mb-0 geb fs-24"}
										style={{
											textTransform: "uppercase",
											letterSpacing: "1px",
											color: "#fb6340",
										}}
									>
										Line2
									</h2>
								</div>
							</CardHeader>
							<CardBody style={{ height: 340, width: "100%" }} className="d-flex">
								<Doughnut style={{ height: "100%", width: "100%" }} data={data2} options={options2} />
							</CardBody>
						</Card>
					</Col>
				</Row>
				<AdminFooter />
			</Container>
		</>
	);
};

export default Dashboard;
