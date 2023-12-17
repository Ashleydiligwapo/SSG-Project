import React, { useEffect, useState } from "react";

import { auth, db, storage } from "../firebase";
import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Box,
  Stack,
  Button,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Parallax } from "react-parallax";
import bckImage from "../assets/ctu.jpg";

import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useNavigate } from "react-router-dom";
function Engage() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [reports, setReports] = useState([]);
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
      .get(`${serverURL}/api/reports`)
      .then((result) => {
        setIsLoading(false);
        setReports(result.data);
      })
      .catch((err) => {
        console.log("Error fetch Data.", err);
      });
  }, []);

  const deleteReport = (id) => {
    // window.location.reload();
    axios
      .delete(`${serverURL}/api/reports/${id}`)
      .then((result) => {
        alert("Deleted.");
        navigate("/Engage");
      })
      .catch((err) => {
        console.log("Error deleting: ", err);
      });
  };
  return (
    <div className="bg-cover bg-gradient-to-br from-[#224866] via-[#073255] to-[#051431]">
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
              NARRATIVE REPORT
            </Text>
          </Box>
        </Parallax>
      </Box>

      {isLoading ? (
        <center class="pt-5 py-6">
          <Stack width="80%">
            <Skeleton
              startColor="blue.400"
              endColor="orange.400"
              height="40px"
            />
            <Skeleton
              startColor="blue.500"
              endColor="orange.500"
              height="40px"
            />
            <Skeleton
              startColor="blue.500"
              endColor="orange.500"
              height="40px"
            />
            <Skeleton
              startColor="blue.500"
              endColor="orange.500"
              height="40px"
            />
            <Skeleton
              startColor="blue.500"
              endColor="orange.500"
              height="40px"
            />
          </Stack>
        </center>
      ) : (
        <article className="max-w-md mx-auto max-h-full rounded-xl overflow-hidden md:max-w-7xl">
          <article className="md:shrink-0 grid grid-cols-1 ssm:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {reports
              .map((post) => {
                return (
                  <ul>
                    <figure
                      className="max-h-full max-w-96 w-72 m-6 bg-gradient-to-r from-[#f0ebdd] via-[#f1eed6] to-[#ddd4bb] font-quicksand my-10 ssm:text-center   sm:text-center md:m-6  md:w-72 ssm:w-52 ssm:m-0 ssm:mt-6"
                      key={post._id}
                    >
                      <li>
                        <a href={post.link} target="_blank">
                          <img
                            className="max-h-96 w-96 object-cover  md:h-full "
                            src={post.image}
                            alt={`Image ${post.id}`}
                          />
                        </a>
                        <div className="font-poppins md:text-center ssm:p-2 md:p-3">
                          <p className="text-xs font-thin italic mb-4">
                            {post.information}
                          </p>
                          <p className="font-bold text-2xl text-slate-900">
                            {post.title}
                          </p>

                          {!isAuth ? (
                            <></>
                          ) : (
                            <Button
                              onClick={() => {
                                deleteReport(post._id);
                              }}
                              className="delete float-right"
                            >
                              Delete
                            </Button>
                          )}
                        </div>
                      </li>
                    </figure>
                    ;
                  </ul>
                );
              })
              .reverse()}
          </article>
        </article>
      )}
    </div>
  );
}

export default Engage;
