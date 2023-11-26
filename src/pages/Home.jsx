import React, { useEffect, useState } from "react";
import Background from "../components/background";
import ChakraSlider from "../components/ChakraSlider";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { listAll, getDownloadURL, ref } from "firebase/storage";
import Footer from "../components/Footer";
import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Box,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import bg from "../assets/bcimage.jpg";
import { FaCaretDown } from "react-icons/fa";
import { IoCaretUpSharp, IoCaretDownOutline } from "react-icons/io5";
function Home({ isAuth }) {
  const [lists, setLists] = useState([]); //MERN data items
  const [postLists, setPostLists] = useState([]); //FireStore or firebase data

  const [imageLists, setImageLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const apiURL = "http://localhost:8001/api/lists";

  const imagesListRef = ref(storage, "HomePageImages/");
  useEffect(() => {
    const postsCollectionRef = collection(db, "Posts");
    const getPosts = async () => {
      try {
        const data = await getDocs(postsCollectionRef);
        setPostLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setIsLoading(false);
      } catch (error) {
        console.error("Error firebase:", error);
        setIsLoading(false);
      }
    };
    getPosts();
  });

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

  useEffect(() => {
    listAll(imagesListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageLists();
        });
      });
    });
  });

  const [showMore, setShowMore] = useState(false);
  const toggleShowMore = (id) => {
    setShowMore({ ...showMore, [id]: !showMore[id] });
  };
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
                              {post.title}{" "}
                            </p>
                            <p className="text-xs font-thin italic mb-4">
                              {post.Date}
                            </p>
                            {showMore[post._id]
                              ? post.PostText
                              : `${post.PostText.slice(0, 400)}`}

                            <button
                              className="px-4"
                              onClick={() => toggleShowMore(post._id)}
                            >
                              {showMore[post._id] ? (
                                <IoCaretUpSharp />
                              ) : (
                                <IoCaretDownOutline />
                              )}
                            </button>
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
