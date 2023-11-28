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
import bg from "../assets/bcimage.jpg";
import { FaCaretDown } from "react-icons/fa";
import { IoCaretUpSharp, IoCaretDownOutline } from "react-icons/io5";

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
function Home({ isAuth }) {
  const [lists, setLists] = useState([]); //MERN data items
  const [isLoading, setIsLoading] = useState(true);
  const [updatedLists, setUpdatedLists] = useState([]);
  const apiURL = "http://localhost:8001/api/lists";
  const updateModal = useDisclosure();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiURL);
        setLists(response.data);
        setUpdatedLists(response.data);
        setIsLoading(false);
        console.log(lists);
      } catch (error) {
        console.log("Error to fetch", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <main className="bg-cover bg-gradient-to-br from-[#224866] via-[#073255] to-[#051431]">
        <Background />
        <ChakraSlider />
        <h1 className="text-center py-4 text-4xl text-white font-quicksand">
          EVENTS
        </h1>
        <Modal
          blockScrollOnMount={false}
          isOpen={updateModal.isOpen}
          onClose={updateModal.onClose}
          isCentered
        >
          {" "}
          <ModalOverlay />
          <ModalContent>
            <ModalHeader className="text-center">
              Sign in to Google.
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={10} className="text-center">
              <Box></Box>
            </ModalBody>
          </ModalContent>
        </Modal>
        <Button onClick={updateModal.onOpen}></Button>
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
            <article className="md:shrink-0 grid grid-cols-1 ssm:grid-cols-1 sm:grid-cols-2 md:grid-cols-2">
              {lists
                .map((post) => {
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
                              className="max-h-full w-full object-cover rounded-xl md:h-full "
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
                              lines={7}
                              className="content-css "
                              less={<IoCaretUpSharp />}
                              more={<IoCaretDownOutline />}
                            >
                              {post.PostText}
                            </ShowMoreText>
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
