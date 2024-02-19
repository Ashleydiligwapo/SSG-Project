import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import ChartData from "./ChartData";
import { Chart as ChartJS, defaults } from "chart.js";
import { Box, Text, Textarea, Grid, Flex } from "@chakra-ui/react";
import { FaAnglesDown } from "react-icons/fa6";
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
import { FaEdit, FaCircle } from "react-icons/fa";
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

  const [cotUser, setCotUser] = useState(false);
  const [cmeUser, setCmeUser] = useState(false);
  const [coedUser, setCoedUser] = useState(false);
  const [coengrUser, setCoengrUser] = useState(false);

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
      setCotUser(user.email === "ashley.rodriguez@ctu.edu.ph");
    }
  }, [user]);
  useEffect(() => {
    if (user) {
      setCmeUser(user.email === "ashley.rodriguez@ctu.edu.ph");
    }
  }, [user]);
  useEffect(() => {
    if (user) {
      setCoedUser(user.email === "ashley.rodriguez@ctu.edu.ph");
    }
  }, [user]);
  useEffect(() => {
    if (user) {
      setCoengrUser(user.email === "ashley.rodriguez@ctu.edu.ph");
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
    <div className="">
      {!userAuth ? (
        <>
          <figure>
            <article className="max-h-full max-w-full px-3 py-5 bg-cover bg-gradient-to-br from-[#233d52] via-[#173955] to-[#051431] ">
              <figure className="bg-white m-1 p-3 rounded-xl flex">
                <p className="text-lg pt-1 text-teal-600">
                  <FaCircle />
                </p>
                <p className="ml-2 text-1xl font-quicksand text-teal-700">
                  {exactUser}
                </p>
              </figure>
              <article className="">
                <Grid className=" py-2 px-4  text-1xl font-orbitron text-teal-400 grid-cols-1 lg:grid-cols-2 ">
                  <figure className="">
                    <Text className="  text-4xl font-orbitron text-teal-100">
                      PROCESS OF ORDER.
                    </Text>
                    <Text className="text-teal-200">Step 1:</Text>
                    <Text className="py-2">
                      Set your payment based on your appointed Organization from
                      your department.
                    </Text>
                    <FaAnglesDown className="text-teal-100 ml-4" />
                    <Text className="pt-3 text-teal-200">Step 2:</Text>
                    <Text className="py-3">
                      Kindly pay your purchased item on the date you purchased
                      the item.
                    </Text>
                    <FaAnglesDown className="text-teal-100 ml-4" />
                    <Text className="pt-3 text-teal-200">Step 3:</Text>
                    <Text className="py-2">
                      Orders has been collected by each department GOVERNORS
                      would be submitted every list into the SSG Office.
                    </Text>
                    <FaAnglesDown className="text-teal-100 ml-4" />
                    <Text className="pt-3 text-teal-200">Step 4:</Text>
                    <Text className="py-2">
                      Lastly, the SSG Team will process the order in to the
                      Suppliers and wait for a few days to receive the item from
                      the office of your Organization.
                    </Text>
                    <FaAnglesDown className="text-teal-100 ml-4" />
                    <Text className="pt-3 text-teal-200"></Text>
                    <Text className="py-2">
                      You can cancel your order below if you would like to
                      cancel.
                    </Text>
                  </figure>

                  <figure className=" w-3/2">
                    <Text className="grid justify-end px-7 py-5 text-4xl font-orbitron text-teal-100 lg:pt-0">
                      CTU ORGANIZATIONS
                    </Text>
                    <Grid className=" py-2 px-2 text-1xl font-orbitron text-teal-400">
                      <Text className="grid justify-end text-teal-200">
                        for College of Technology:
                      </Text>
                      <Text className="grid justify-end py-2">
                        Techno Gadget Organization (TGO).
                      </Text>
                      <div className="grid justify-end mr-5 py-2">
                        <FaAnglesDown className="text-teal-100" />
                      </div>
                      <Text className="grid justify-end text-teal-200">
                        for College of Engr:
                      </Text>
                      <Text className="grid justify-end py-2">
                        ENGINEERING SOCIETY (ES).
                      </Text>
                      <div className="grid justify-end mr-5 py-2">
                        <FaAnglesDown className="text-teal-100" />
                      </div>
                      <Text className="grid justify-end text-teal-200">
                        for College of Management:
                      </Text>
                      <Text className="grid justify-end py-2">
                        TOURISM ORGANIZATION ULTIMATE <br /> RIGHTMOVERS FOR
                        CHANGE (TOURCH).
                      </Text>
                      <div className="grid justify-end mr-5 py-2">
                        <FaAnglesDown className="text-teal-100" />
                      </div>
                      <Text className="grid justify-end text-teal-200">
                        for College of Education:
                      </Text>
                      <Text className="grid justify-end py-2">
                        EDUCATORS LEAGUE (EL).
                      </Text>
                    </Grid>
                  </figure>
                </Grid>
              </article>

              {/* MOBILE RESPONSIVE HERE */}
              {usersLists
                .filter((item) => {
                  return exactUser.toLowerCase() === ""
                    ? item
                    : item.from_name.toLowerCase().includes(exactUser);
                })
                .map((post) => {
                  return (
                    <ul
                      className=" bg-gray-100 mx-5 rounded-md font-quicksand hidden ssm:block sm:block md:hidden"
                      key={post._id}
                    >
                      <li>
                        <a href={post.image} target="_blank">
                          <img
                            className=" mt-5 mb-3 max-h-64 w-full object-cover  rounded-xl ssm:w-full ssm:h-full "
                            src={post.image}
                            alt={`Image ${post.id}`}
                          />
                        </a>

                        <p class="overflow-hidden text-center p-2  text-1xl font-bold font-orbitron  text-emerald-900">
                          {post.name}
                        </p>
                      </li>
                      <figure className="mx-2">
                        <p className=" max-w-sm text-1xl flex ">
                          <p className="text-gray-800 font-medium  font-sans  pr-2">
                            Department:{" "}
                          </p>
                          {post.department}
                        </p>
                        <p className="flex">
                          {" "}
                          <p className="text-gray-800 font-medium  font-sans  pr-2">
                            Date to Purchase:
                          </p>{" "}
                          {post.date}
                        </p>
                        {/* <Td>{post.date}</Td> */}
                        <p className="flex">
                          <p className="text-gray-800 font-semibold font-sans  pr-2">
                            PRICE:{" "}
                          </p>{" "}
                          <p className=""> ₱ {post.prices}</p>
                        </p>
                        <p className="flex">
                          {" "}
                          <p className="text-gray-800 font-medium  font-sans  pr-2">
                            TOTAL:{" "}
                          </p>{" "}
                          ₱ {post.total}{" "}
                        </p>
                        <p className="">
                          <p className="text-teal-700 text-1xl flex">
                            <p className="text-gray-800 font-medium  font-sans  pr-2">
                              STATUS:{" "}
                            </p>{" "}
                            Pending <p className="pl-1"></p>
                            <MdPendingActions />
                          </p>
                        </p>
                        <figure className="flex justify-center p-2">
                          <p>
                            <Link className="" to={`/UserEdit/${post._id}`}>
                              <Button className="mr-2 " bg={"teal.500"}>
                                {" "}
                                <p className="p-1 pr-2">Qnty: </p>
                                {post.quantity} <p className="p-1"></p>{" "}
                                <FaEdit />
                              </Button>
                            </Link>
                          </p>
                          <p>
                            <Button
                              bg={"red.300"}
                              onClick={() => {
                                userDelete(post._id);
                              }}
                            >
                              Cancel Order
                            </Button>
                          </p>
                        </figure>
                      </figure>
                    </ul>
                  );
                })}

              {/*  for Max width */}
              <TableContainer className="bg-white rounded-md  m-2">
                <form>
                  <input
                    className="hidden"
                    type="text"
                    onChange={(e) => setExactUser(e.target.value)}
                  />
                </form>
                <Table size="sm" className="hidden sm:hidden md:block">
                  <Thead className="">
                    <Tr className="text-teal-100">
                      <Th>Item</Th>
                      <Th>
                        Department & <br /> Date to Purchase
                      </Th>
                      <Th>
                        Unit Price & <br /> Total Price
                      </Th>
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
                            <td className=" max-w-sm text-1xl ">
                              {post.department}
                              <br />
                              {post.date}
                            </td>
                            {/* <Td>{post.date}</Td> */}
                            <Td>
                              Price: ₱ {post.prices} <br />
                              Total: ₱ {post.total}{" "}
                            </Td>

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
                            <br />
                            {post.department}
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
        <>
          {" "}
          {cotUser ? (
            <>
              <figure>
                <article className="max-h-full max-w-full px-3 py-5 bg-gray-200 ">
                  <figure className="bg-white p-3 rounded-xl flex">
                    <p className="text-3xl text-teal-900">
                      <FaUserCircle />
                    </p>
                    <p className="ml-2 mt-1 text-1xl font-quicksand text-teal-600">
                      <p>TECHNO GADGET ORGANIZATION</p>
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
                        {usersLists
                          .filter((item) =>
                            item.department.includes("College of Technology")
                          )
                          .map((post) => {
                            return (
                              <Tr className=" font-poppins" key={post._id}>
                                <Td>{post.name}</Td>
                                <Td className="">
                                  {post.to_name}
                                  <br />
                                  {post.from_name}
                                  <br />
                                  {post.department}
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
            <>
              {coedUser ? (
                <>
                  <figure>
                    <article className="max-h-full max-w-full px-3 py-5 bg-gray-200 ">
                      <figure className="bg-white p-3 rounded-xl flex">
                        <p className="text-3xl text-teal-900">
                          <FaUserCircle />
                        </p>
                        <p className="ml-2 mt-1 text-1xl font-quicksand text-teal-600">
                          <p>COED</p>
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
                            {usersLists
                              .filter((item) =>
                                item.department.includes("College of Education")
                              )
                              .map((post) => {
                                return (
                                  <Tr className=" font-poppins" key={post._id}>
                                    <Td>{post.name}</Td>
                                    <Td className="">
                                      {post.to_name}
                                      <br />
                                      {post.from_name}
                                      <br />
                                      {post.department}
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
                <>
                  {" "}
                  {coengrUser ? (
                    <>
                      <figure>
                        <article className="max-h-full max-w-full px-3 py-5 bg-gray-200 ">
                          <figure className="bg-white p-3 rounded-xl flex">
                            <p className="text-3xl text-teal-900">
                              <FaUserCircle />
                            </p>
                            <p className="ml-2 mt-1 text-1xl font-quicksand text-teal-600">
                              <p>COEngring</p>
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
                                {usersLists
                                  .filter((item) =>
                                    item.department.includes(
                                      "College of Engineering"
                                    )
                                  )
                                  .map((post) => {
                                    return (
                                      <Tr
                                        className=" font-poppins"
                                        key={post._id}
                                      >
                                        <Td>{post.name}</Td>
                                        <Td className="">
                                          {post.to_name}
                                          <br />
                                          {post.from_name}
                                          <br />
                                          {post.department}
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
                    <>
                      {" "}
                      {cmeUser ? (
                        <>
                          <figure>
                            <article className="max-h-full max-w-full px-3 py-5 bg-gray-200 ">
                              <figure className="bg-white p-3 rounded-xl flex">
                                <p className="text-3xl text-teal-900">
                                  <FaUserCircle />
                                </p>
                                <p className="ml-2 mt-1 text-1xl font-quicksand text-teal-600">
                                  <p>CME</p>
                                </p>
                              </figure>
                              <TableContainer className="bg-white rounded-md  m-2">
                                <form>
                                  <input
                                    className="hidden"
                                    type="text"
                                    onChange={(e) =>
                                      setExactUser(e.target.value)
                                    }
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
                                    {usersLists
                                      .filter((item) =>
                                        item.department.includes(
                                          "College of Management"
                                        )
                                      )
                                      .map((post) => {
                                        return (
                                          <Tr
                                            className=" font-poppins"
                                            key={post._id}
                                          >
                                            <Td>{post.name}</Td>
                                            <Td className="">
                                              {post.to_name}
                                              <br />
                                              {post.from_name}
                                              <br />
                                              {post.department}
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
                    </>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Cart;
