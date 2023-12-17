import React, { useEffect, useState } from "react";
import Background from "../components/background";
import ChakraSlider from "../components/ChakraSlider";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { listAll, getDownloadURL, ref } from "firebase/storage";
import Footer from "../components/Footer";
import ShowMoreText from "react-show-more-text";
import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Box,
  Stack,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "react-router-dom";
import bg from "../assets/bcimage.jpg";
import { FaCaretDown } from "react-icons/fa";
import { IoCaretUpSharp, IoCaretDownOutline } from "react-icons/io5";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useToast,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { Navigate, useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  const [lists, setLists] = useState([]); //MERN data items
  const [isLoading, setIsLoading] = useState(true);
  const [updatedLists, setUpdatedLists] = useState([]);
  const serverURL = import.meta.env.VITE_SERVER_URL;
  const apiURL = `${serverURL}/api/lists`;
  const { id } = useParams();
  const updateModal = useDisclosure();
  const [isAuth, setIsAuth] = useState(false);
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (user) {
      setIsAuth(user.email === "ashley.rodriguez@ctu.edu.ph");
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiURL);
        setLists(response.data);

        setIsLoading(false);
        console.log(lists);
      } catch (error) {
        console.log("Error to fetch", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const RemoveThis = async (id) => {
    window.location.reload();
    axios
      .delete(`${serverURL}/api/lists/${id}`)
      .then((result) => {
        navigate("/");
      })
      .catch((err) => {
        console.log("Error delete: ", err);
      });
  };

  ///   to update in input forms
  // const handleUpdate = async (id, updatedLists) => {
  //   try {
  //     await fetch(`http://localhost:8001/api/lists/${id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(updatedLists),
  //     });
  //     fetchData();
  //   } catch (error) {
  //     console.log("Error updating: ", error);
  //   }
  // };

  // const handleChange = (index, field, value) => {
  //   const updateItem = [...lists];
  //   updateItem[index][field] = value;
  //   setLists(updateItem);
  // };

  return (
    <>
      <main className="bg-cover bg-gradient-to-br from-[#224866] via-[#073255] to-[#051431]">
        <Background />
        <ChakraSlider />
        <h1 className="text-center py-4 text-4xl text-white font-quicksand">
          EVENTS
        </h1>

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
          <article className="max-w-md mx-auto max-h-full rounded-xl overflow-hidden md:max-w-5xl">
            <article className="md:shrink-0 grid grid-cols-1 ssm:grid-cols-1 sm:grid-cols-1 md:grid-cols-2">
              {lists
                .map((post, index) => {
                  return (
                    <ul>
                      <figure
                        data-aos="fade-up"
                        className="rounded-xl m-6 bg-gradient-to-r from-[#eec64d] via-[#ebd650] to-[#ce9b02] font-quicksand my-10 rounded-x ssm:pb-5 ssm:text-center sm:max-h-full sm:pb-5 sm:text-center md:pb-1 "
                        key={post._id}
                      >
                        <li>
                          <a href={post.HreF} target="_blank">
                            <img
                              className="max-h-64 w-full object-cover rounded-xl md:h-full "
                              src={post.images}
                              alt={`Image ${post.id}`}
                            />
                          </a>
                          <div className="font-poppins ssm:p-5 sm:text-left md:p-5">
                            <p className="font-bold text-slate-900">
                              {post.title}
                            </p>
                            <p className="text-xs font-thin italic mb-4">
                              {post.Date}
                            </p>

                            <ShowMoreText
                              lines={3}
                              className="content-css md:px-1 md:py-2 ssm:px-0 ssm:py-0"
                              less={<IoCaretUpSharp />}
                              more={<IoCaretDownOutline />}
                            >
                              {post.PostText}
                            </ShowMoreText>

                            {!isAuth ? (
                              <></>
                            ) : (
                              <Button
                                onClick={() => RemoveThis(post._id)}
                                className="delete float-right"
                              >
                                Delete form
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
      </main>
    </>
  );
}

export default Home;
