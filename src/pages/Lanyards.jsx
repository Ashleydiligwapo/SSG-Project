import React, { useEffect, useState } from "react";
import { Box, Text, Textarea, Grid, Flex } from "@chakra-ui/react";
import { Parallax } from "react-parallax";
import { FaAnglesDown } from "react-icons/fa6";
import bckImage from "../assets/ctu.jpg";
import axios from "axios";

import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useNavigate } from "react-router-dom";
function Lanyards() {
  const navigate = useNavigate();
  const [lanyards, setLanyards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const serverURL = import.meta.env.VITE_SERVER_URL;
  const [isAuth, setIsAuth] = useState(false);
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (user) {
      setIsAuth(user.email === "ashley.rodriguez@ctu.edu.ph");
    }
  }, [user]);
  useEffect(() => {
    axios
      .get(`${serverURL}/api/lanyards`)
      .then((result) => {
        setIsLoading(false);
        setLanyards(result.data);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }, []);
  const deleteMerch = (id) => {
    window.location.reload();
    axios
      .delete(`${serverURL}/api/lanyards/${id}`)
      .then((result) => {
        alert("Success deleting:");
        navigate("/Lanyards");
      })
      .catch((err) => {
        console.log("Error deleting merch:", err);
      });
  };
  return (
    <main>
      <Box>
        <Parallax
          blur={{ min: -14, max: 15 }}
          bgImage={bckImage}
          bgImageSizes="contain"
          strength={100}
        >
          <Box
            style={{
              justifyItems: "center",
              textAlign: "center",
              margin: "11%",
            }}
          >
            <Text className="text-5xl  font-bebas tracking-widest md:text-5xl ssm:text-4xl">
              CTU - LANYARDS
            </Text>
          </Box>
        </Parallax>
      </Box>
      <figure className="max-h-full  bg-cover bg-gradient-to-br from-[#224866] via-[#0a243a] to-[#051431]">
        <article className="px-5">
          <Text className=" px-2 py-5 text-4xl font-orbitron text-teal-100">
            PROCESS OF ORDERING
          </Text>
          <Grid className=" py-2 px-5 text-1xl font-orbitron text-teal-400">
            <Text className="text-teal-200">Step 1:</Text>
            <Text className="py-2">
              Place your orders to your CLASS MAYORS.
            </Text>
            <FaAnglesDown className="text-teal-100 ml-4" />
            <Text className="pt-3 text-teal-200">Step 2:</Text>
            <Text className="py-3">
              Orders will being collected by each departments GOVERNORS through
              from the CLASS MAYORS.
            </Text>
            <FaAnglesDown className="text-teal-100 ml-4" />
            <Text className="pt-3 text-teal-200">Step 3:</Text>
            <Text className="py-2">
              Orders has been collected by each department GOVERNORS would be
              submitted every list into the SSG Office.
            </Text>
            <FaAnglesDown className="text-teal-100 ml-4" />
            <Text className="pt-3 text-teal-200">Step 4:</Text>
            <Text className="py-2">
              Lastly, the SSG Team will process the order in to the Suppliers.
            </Text>
          </Grid>
        </article>

        <article className="">
          <Text className="grid justify-end px-7 py-5 text-4xl font-orbitron text-teal-100">
            PROCESS OF DISTRIBUTION
          </Text>
          <Grid className=" py-2 px-9 text-1xl font-orbitron text-teal-400">
            <Text className="grid justify-end text-teal-200">Step 1:</Text>
            <Text className="grid justify-end py-2">
              Supplier will deliver the items to SSG Office after the
              production.
            </Text>
            <div className="grid justify-end mr-5 py-2">
              <FaAnglesDown className="text-teal-100" />
            </div>
            <Text className="grid justify-end text-teal-200">Step 2:</Text>
            <Text className="grid justify-end py-2">
              SSG Team will conduct inventory with some list of the names who
              purchased the lanyards with a section of a students.
            </Text>
            <div className="grid justify-end mr-5 py-2">
              <FaAnglesDown className="text-teal-100" />
            </div>
            <Text className="grid justify-end text-teal-200">Step 3:</Text>
            <Text className="grid justify-end py-2">
              SSG Team will inform the GOVERNORS to distribute each of their
              Class Mayors.
            </Text>
            <div className="grid justify-end mr-5 py-2">
              <FaAnglesDown className="text-teal-100" />
            </div>
            <Text className="grid justify-end text-teal-200">Step 4:</Text>
            <Text className="grid justify-end py-2">
              Lastly, CLASS MAYORS will Distribute the items into their
              Classmates.
            </Text>
          </Grid>
        </article>
        <article className="max-w-md mx-auto max-h-full rounded-xl py-5 overflow-hidden sm:max-w-3xl md:max-w-7xl ">
          <figure className="md:shrink-0 grid grid-cols-1 ssm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {lanyards
              .map((post) => {
                return (
                  <>
                    <ul className="">
                      <figure
                        className="max-h-full max-w-full  rounded-xl bg-gradient-to-r from-[#d8ce92] via-[#e0ddc3] to-[#eedb9c] font-quicksand my-2 rounded-x sm:mx-2 md:mx-2 "
                        key={post._id}
                      >
                        <div className="relative  hover:scale-105 transition duration-500 cursor-pointer">
                          <a href={post.image} target="_blank">
                            <img
                              className="max-h-96 w-96 object-cover  rounded-xl ssm:w-full ssm:h-full sm:h-full  lg:h-full md:h-full "
                              src={post.image}
                              alt={`Image ${post.id}`}
                            />
                          </a>
                          <div
                            className="absolute px-5 py-5 bottom-0 left-0 right-0 bg-gradient-to-t from-[#32a6c99a] via-[#5cc8db28]
                         to-[#147c9600] rounded-b-md "
                          >
                            {!isAuth ? (
                              <></>
                            ) : (
                              <>
                                <button
                                  className="grid text-red-600"
                                  onClick={() => {
                                    deleteMerch(post._id);
                                  }}
                                >
                                  Delete
                                </button>
                              </>
                            )}
                            <h3 class="z-10 overflow-hidden text-left mb-1 text-2xl font-bold font-orbitron italic text-teal-900">
                              <p> {post.department}</p>
                              {post.course}
                            </h3>

                            <div class="z-10 bg-slate-900  gap-y-1 overflow-hidden text-1xl leading-3 p-3 w-24 rounded-2xl font-extrabold text-teal-500">
                              ₱ {post.price}.00
                            </div>
                          </div>
                        </div>
                      </figure>
                    </ul>
                  </>
                );
              })
              .reverse()}
          </figure>
        </article>
      </figure>
    </main>
  );
}

export default Lanyards;
