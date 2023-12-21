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
        <article className="max-w-md mx-auto max-h-full rounded-xl overflow-hidden md:max-w-7xl">
          <figure className="md:shrink-0 grid grid-cols-1 ssm:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
            {/* {lanyards
              .map((post) => {
                return (
                  <>
                    <ul>
                      <figure
                        className="max-h-full max-w-full  rounded-xl m-2 bg-gradient-to-r from-[#d8ce92] via-[#e0ddc3] to-[#eedb9c] font-quicksand my-10 rounded-x ssm:pb-5 ssm:grid ssm:text-center sm:max-h-full sm:pb-5 sm: md:pb-1 md:flex md:text-justify md:h-96 lg:p-0  "
                        key={post._id}
                      ></figure>
                    </ul>
                  </>
                );
              })
              .reverse()} */}
          </figure>
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
      </figure>
    </main>
  );
}

export default Lanyards;
