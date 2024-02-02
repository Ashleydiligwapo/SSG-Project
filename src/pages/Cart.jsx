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
import { FaUserCircle } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
function Cart() {
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

  const userDelete = (id) => {
    axios
      .delete(`${serverURL}/api/merchpurchaseds/${id}`)
      .then((result) => {
        alert("Order Canceled: ");
        navigate("/Merch");
      })
      .catch((err) => {
        console.log("Error Deleting:", err);
      });
  };

  return (
    <div>
      {!userAuth ? (
        <>
          <figure>
            <article className="max-h-full max-w-full px-3 py-5 bg-gray-200 ">
              <figure className="bg-white m-2 p-3 rounded-xl flex">
                <p className="text-3xl text-teal-900">
                  <FaUserCircle />
                </p>
                <p className="ml-2 mt-1 text-1xl font-quicksand text-teal-600">
                  {exactUser}
                </p>
              </figure>
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
                    <Tr className="text-teal-100">
                      <Th>Item</Th>
                      <Th>Date to Purchase</Th>
                      <Th>Unit Price</Th>
                      <Th>Total Price</Th>
                      <Th>Quantity</Th>
                      <Th>Actions</Th>
                      <Th>Status</Th>
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
                          <Tr className=" font-poppins" key={post._id}>
                            <Td>
                              <a href={post.image} target="_blank">
                                <img
                                  className=" ml-3 mt-2 mb-5 max-h-32 w-32 object-cover  rounded-xl ssm:w-32 ssm:h-full sm:h-full sm:w-72 lg:h-full lg:w-64 md:h-full"
                                  src={post.image}
                                  alt={`Image ${post.id}`}
                                />
                              </a>

                              <p class="overflow-hidden text-left  text-1xl font-bold font-orbitron  text-emerald-900">
                                {post.name}
                              </p>
                            </Td>
                            <Td>{post.date}</Td>
                            <Td>₱ {post.prices}</Td>
                            <Td>₱ {post.total}</Td>

                            <Td>
                              <Link className="" to={`/UserEdit/${post._id}`}>
                                <Button className="mr-2 " bg={"teal.500"}>
                                  {" "}
                                  {post.quantity} <p className="p-1"></p>{" "}
                                  <FaEdit />
                                </Button>
                              </Link>
                            </Td>
                            <Td>
                              <Button
                                bg={"red.300"}
                                onClick={() => {
                                  userDelete(post._id);
                                }}
                              >
                                Cancel Order
                              </Button>
                            </Td>
                            <Td className="">
                              <p className="text-teal-700 text-1xl flex">
                                Pending <p className="pl-1"></p>
                                <MdPendingActions />
                              </p>
                            </Td>
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
              <figure className="bg-white p-3 rounded-xl flex">
                <p className="text-3xl text-teal-900">
                  <FaUserCircle />
                </p>
                <p className="ml-2 mt-1 text-1xl font-quicksand text-teal-600">
                  <p>ADMIN</p>
                </p>
              </figure>
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
                    <Tr className="text-teal-100">
                      <Th>Item</Th>
                      <Th>User</Th>
                      <Th>Date to Purchase</Th>
                      <Th>Unit Price</Th>
                      <Th>Total Price</Th>
                      <Th>Qty</Th>
                      <Th>Actions</Th>
                      <Th>Status</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {usersLists.map((post) => {
                      return (
                        <Tr className=" font-poppins" key={post._id}>
                          <Td>{post.name}</Td>
                          <Td className="">
                            {post.to_name}
                            <br />
                            {post.from_name}
                          </Td>
                          <Td>{post.date}</Td>
                          <Td>₱ {post.prices}</Td>
                          <Td>₱ {post.total}</Td>

                          <Td>{post.quantity}</Td>
                          <Td>
                            <Button
                              bg={"red.300"}
                              onClick={() => {
                                userDelete(post._id);
                              }}
                            >
                              Mark Purchased
                            </Button>
                          </Td>
                          <Td className="">
                            <p className="text-teal-700 text-1xl flex">
                              Pending <p className="pl-1"></p>
                              <MdPendingActions />
                            </p>
                          </Td>
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
    </div>
  );
}

export default Cart;
