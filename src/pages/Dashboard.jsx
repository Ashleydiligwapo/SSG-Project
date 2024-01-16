import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import ChartData from "./ChartData";
import { Chart as ChartJS, defaults } from "chart.js";
import { Bar, Doughnut, Pie, PolarArea, Radar, Line } from "react-chartjs-2";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Button,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import "chartjs-plugin-datalabels";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

function Dashboard() {
  const serverURL = import.meta.env.VITE_SERVER_URL;
  const { id } = useParams();
  const [isAuth, setIsAuth] = useState(false);
  const [user] = useAuthState(auth);
  const [userAuth, setUserAuth] = useState(false);
  const navigate = useNavigate();
  const [usersLists, setUsersLists] = useState([]);
  const [exactUser, setExactUser] = useState(user.email);
  const [loading, setIsLoading] = useState(true);
  const [joinMerch, setjoinMerch] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [merch, setMerch] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [joinMerchUsers, setjoinMerchUsers] = useState([]);
  useEffect(() => {
    if (user) {
      setIsAuth(user.email === "ashley.rodriguez@ctu.edu.ph");
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setUserAuth(user.email);
      setUserAuth();

      console.log(user.email);
    }
  }, [user]);

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

  useEffect(() => {
    axios
      .get(`${serverURL}/merchjoinmerchpurchasedusers`)
      .then((result) => {
        console.log(result.data);
        setjoinMerchUsers(result.data);
      })
      .catch((err) => {
        console.log("Error fetch total", err);
      });
  }, []);

  const userDelete = (id) => {
    axios
      .delete(`${serverURL}/api/merchpurchaseds/${id}`)
      .then((result) => {
        alert("Delete Success: ");
        navigate("/Merch");
      })
      .catch((err) => {
        console.log("Error Deleting:", err);
      });
  };

  const Bardata = {
    labels: usersLists.map((data) => `${data.from_name} - ${data.name}`),

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
          "#192564",
          "#00bcd4",
          "#cc2e63",
          "#174c47",
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
        label: "Total of Users.",
        data: [totalUsers],
        fill: false,
        backgroundColor: "#129b8ec9",
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
        backgroundColor: "#649801",
        borderRadius: 6,
      },
    ],
  };

  const itemsDatePurchased = {
    labels: usersLists.map((data) => data.date),

    datasets: [
      {
        label: "Purchased Item on this time and Date.",
        data: usersLists.map((data) => data.total),
        fill: false,
        backgroundColor: "#009688",
        borderRadius: 6,
      },
      {
        label: "Total Items sold of this date.",
        data: joinMerch.map((data) => data.totalOfThisItems),
        fill: false,
        backgroundColor: "#002118",
        borderRadius: 6,
      },
    ],
  };

  return (
    <main className="max-h-full bg-gray-200">
      <figure className="max-h-full max-w-full px-3 py-5 bg-gray-200 ">
        <article className="m-2 p-4 bg-gray-50 rounded-md pb-7 pt-5  ssm: h-screen md:h-80 lg:h-96">
          <Bar
            className="hidden"
            data={Bardata}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Users Purchased items information",
                },
              },
            }}
          />
        </article>
        <article className="m-2 p-4 bg-gray-50 rounded-md pb-7 pt-5 ssm:h-screen md:h-80 lg:h-64">
          <Line
            data={itemsTotalEarned}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Over all Sales of Purchased Items",
                },
              },
            }}
          />
        </article>
        <article className="m-2 p-4  bg-gray-50 rounded-md pb-5 pt-5 ssm:h-screen md:h-80 lg:h-64">
          <Bar
            data={itemsDatePurchased}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Date and Time of Purchased Items",
                },
              },
            }}
          />
        </article>
      </figure>

      <figure></figure>
      <figure className="flex max-h-full max-w-4xl px-2  bg-gray-200 ssm:grid sm:grid md:grid md:max-w-full lg:flex lg:h-80">
        <article className="m-6 p-10  bg-gray-50 rounded-md pb-4 pt-4">
          <Doughnut className="" data={countTotal} />
        </article>
        <article className="m-6 p-4  bg-gray-50 rounded-md pb-4 pt-4">
          <Pie className="" data={usersAll} />
        </article>
      </figure>

      {!userAuth ? (
        <>
          <figure>
            <article className="max-h-full max-w-full px-3 py-5 bg-gray-200 ">
              <TableContainer className="bg-white rounded-md  m-2">
                <form>
                  <input
                    className="hidden"
                    type="text"
                    onChange={(e) => setExactUser(e.target.value)}
                  />
                </form>
                <Table size="sm">
                  <Thead>
                    <Tr className="">
                      <Th>Item Name</Th>
                      <Th>User mail</Th>
                      <Th>User Name</Th>
                      <Th>Quantity</Th>
                      <Th></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {usersLists
                      .filter((item) => {
                        return exactUser.toLowerCase() === ""
                          ? item
                          : item.from_name.toLowerCase().includes(exactUser);
                      })
                      .map((post) => {
                        return (
                          <Tr key={post._id}>
                            <Td>{post.name}</Td>
                            <Td>{post.from_name}</Td>

                            <Td>{post.to_name}</Td>
                            <Td>
                              {post.quantity}{" "}
                              <Link
                                className="pl-3"
                                to={`/UserEdit/${post._id}`}
                              >
                                <Button bg={"teal.200"}>
                                  {" "}
                                  <FaEdit />
                                </Button>
                              </Link>
                            </Td>

                            <Button
                              className="mt-2"
                              bg={"red.300"}
                              onClick={() => {
                                userDelete(post._id);
                              }}
                            >
                              Delete
                            </Button>
                          </Tr>
                        );
                      })}
                  </Tbody>
                  <Tfoot></Tfoot>
                </Table>
              </TableContainer>
            </article>
          </figure>
        </>
      ) : (
        <>
          <div></div>
        </>
      )}
      {isAuth ? (
        <>
          <figure>
            <article className="max-h-full max-w-full px-3 py-5 bg-gray-200 ">
              <TableContainer className="bg-white rounded-md  m-2">
                <form>
                  <input
                    className="hidden"
                    type="text"
                    onChange={(e) => setExactUser(e.target.value)}
                  />
                </form>
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th>Item Name</Th>
                      <Th>User mail</Th>
                      <Th>User Name</Th>
                      <Th>Quantity</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {usersLists.map((post) => {
                      return (
                        <Tr key={post._id}>
                          <Td>{post.name}</Td>
                          <Td>{post.from_name}</Td>

                          <Td>{post.to_name}</Td>
                          <Td>
                            {post.quantity}{" "}
                            <Button bg={"teal.200"}>
                              <Link to={`/UserEdit/${post._id}`}>
                                {" "}
                                <FaEdit />
                              </Link>
                            </Button>
                          </Td>

                          <Button
                            bg={"red.300"}
                            onClick={() => {
                              userDelete(post._id);
                            }}
                          >
                            Delete
                          </Button>
                        </Tr>
                      );
                    })}
                  </Tbody>
                  <Tfoot></Tfoot>
                </Table>
              </TableContainer>
            </article>
          </figure>
        </>
      ) : (
        <></>
      )}
    </main>
  );
}

export default Dashboard;
