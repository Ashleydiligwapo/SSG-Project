import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ChartData from "./ChartData";
import { Chart as ChartJS, defaults } from "chart.js";
import { Bar, Line, Doughnut, Pie } from "react-chartjs-2";
defaults.maintainAspectRatio = false;
defaults.responsive = true;
function Dashboard() {
  const serverURL = import.meta.env.VITE_SERVER_URL;
  const navigate = useNavigate();
  const [usersLists, setUsersLists] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [joinMerch, setjoinMerch] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [merch, setMerch] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  useEffect(() => {
    axios
      .get(`${serverURL}/api/merchpurchaseds`)
      .then((result) => {
        setIsLoading(false);
        setUsersLists(result.data);
        // setMerch(result.data);
        // setMerch(result.data.totalCount);
      })
      .catch((err) => {
        console.log("Error fetch data: ", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${serverURL}/api/merches`)
      .then((result) => {
        setIsLoading(false);
        setMerch(result.data);
        // setCount(result.data.totalCount);
      })
      .catch((err) => {
        console.log("Error fetch: ", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${serverURL}/totalCount`)
      .then((result) => {
        setTotalCount(result.data.totalCount);
      })
      .catch((err) => {
        console.log("Error fetch total", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${serverURL}/totalUsers`)
      .then((result) => {
        setTotalUsers(result.data.to_name);
      })
      .catch((err) => {
        console.log("Error fetch total", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${serverURL}/merchjoinmerchpurchased`)
      .then((result) => {
        console.log(result.data);
        setjoinMerch(result.data);
      })
      .catch((err) => {
        console.log("Error fetch total", err);
      });
  }, []);

  const Bardata = {
    labels: usersLists.map((data) => `${data.from_name} - ${data.name}`),
    // labels: usersLists.map((data) => data.date),

    datasets: [
      {
        indexAxis: "y",

        label: "Purchased item",

        data: usersLists.map((data) => data.total),
        fill: false,
        backgroundColor: [
          "#42e3ce",
          "#644cdc",
          "#c6a928",
          "#00bcd4",
          "#00bcd4",
        ],
        borderRadius: 6,
        borderColor: "gray",
      },
      {
        indexAxis: "y",
        label: "Quantity",
        data: usersLists.map((data) => data.quantity),
        fill: false,
        backgroundColor: "#f44336",
        borderRadius: 6,
      },
    ],
  };

  const countTotal = {
    // labels: merch.map((data) => data.name),
    labels: ["Total of Over all sales:"],
    datasets: [
      {
        label: "Over all total Sold Items.",
        data: [totalCount],
        fill: false,
        backgroundColor: "#4ec980",
        borderRadius: 6,
      },
    ],
  };

  const usersAll = {
    // labels: merch.map((data) => data.name),
    labels: ["Total of Users Purchasing:"],
    datasets: [
      {
        label: "Over all total Sold Items.",
        data: [totalUsers],
        fill: false,
        backgroundColor: "#4ec980",
        borderRadius: 6,
      },
    ],
  };

  const itemsTotalEarned = {
    // labels: merch.map((data) => data.name),
    labels: joinMerch.map((data) => data._id),

    datasets: [
      {
        label: "Over all total Sold Items.",
        data: joinMerch.map((data) => data.totalOfThisItems),
        fill: false,
        backgroundColor: "#009688",
        borderRadius: 6,
      },
    ],
  };

  return (
    <main className="max-h-full bg-gray-200">
      <figure className="max-h-full max-w-full px-3 py-5 bg-gray-200 ">
        <article className="m-2 p-5 bg-gray-50 rounded-md">
          <Bar data={Bardata} />
        </article>
      </figure>

      <figure className="flex max-h-full max-w-full px-3 py-1 bg-gray-200 ">
        <article className="m-2 p-4 w-96 bg-gray-50 rounded-md pb-7 pt-5">
          <Doughnut className="" data={countTotal} />
        </article>
        <article className="m-2 p-4 w-96 bg-gray-50 rounded-md pb-7 pt-5">
          <Pie className="" data={usersAll} />
        </article>
      </figure>
      <figure>
        <article className="m-2 p-4 bg-gray-50 rounded-md pb-7 pt-5">
          <Line data={itemsTotalEarned} />
        </article>
      </figure>
      <figure>
        <article className="max-h-full max-w-full px-3 py-5 bg-gray-200 ">
          {usersLists.map((post) => {
            return (
              <ul className="flex px-2" key={post._id}>
                <p>{post.name}</p>
                <p>{post.from_name}</p>
              </ul>
            );
          })}
        </article>
      </figure>
    </main>
  );
}

export default Dashboard;
