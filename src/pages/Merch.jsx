import React, { useEffect, useState, useRef } from "react";
import axios, { isAxiosError } from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, provider } from "../firebase";
import {
  Button,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Text,
  Box,
  Stack,
  Modal,
  Input,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useToast,
  ModalCloseButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { BsCart3 } from "react-icons/bs";
import { signInWithPopup } from "firebase/auth";
import { useDisclosure } from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { Parallax } from "react-parallax";
import bckImage from "../assets/ctu.jpg";
import { FaFacebookSquare, FaGoogle } from "react-icons/fa";
function Merch() {
  const serverURL = import.meta.env.VITE_SERVER_URL;
  const navigate = useNavigate();
  const [merchLists, setMerchLists] = useState([]);
  const form = useRef();
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState();
  const [name, setName] = useState("");
  const { id } = useParams();
  const [isAuth, setIsAuth] = useState(false);
  const [userAuth, setUserAuth] = useState(false);
  const [user] = useAuthState(auth);
  const buyModal = useDisclosure();
  const editModal = useDisclosure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const [purchasedMerch, setPurchasedMerch] = useState({
    to_name: "",
    from_name: "",
    total: "",
    date: "",
    department: "",
    quantity: "",
  });

  const signInWithGoogle = () => {
    // window.location.reload();
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("userAuth", true);

      setUserAuth(true);
      navigate("/Merch");
    });
  };

  //Firebase Account as ADMIN
  useEffect(() => {
    if (user) {
      setIsAuth(user.email === "ashley.rodriguez@ctu.edu.ph");
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setUserAuth(user.email);
      setUserAuth();
    }
  }, [user]);

  useEffect(() => {
    axios
      .get(`${serverURL}/api/merches`)
      .then((result) => {
        setIsLoading(false);
        setMerchLists(result.data);
      })
      .catch((err) => {
        console.log("Error fetch Data.", err);
      });
  }, []);

  const deleteMerch = (id) => {
    window.location.reload();
    axios
      .delete(`${serverURL}/api/merches/${id}`)
      .then((result) => {
        alert("Success deleting:");
        navigate("/Merch");
      })
      .catch((err) => {
        console.log("Error deleting merch:", err);
      });
  };

  const quantityHandler = (e) => {
    e.preventDefault();
    const newQuantity = parseInt(e.target.value, 10);
    setQuantity(newQuantity);
  };
  const incrementQnty = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };
  const decrementQnty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const toast = useToast();
  const sendEmail = (e) => {
    e.preventDefault();

    axios
      .post(`${serverURL}/api/merchpurchaseds`, purchasedMerch)
      .then((result) => {
        setPurchasedMerch({
          to_name: "",
          from_name: "",
          total: "",
          date: "",
          department: "",
          quantity: "",
        });
        navigate("/Merch");
      })
      .catch((err) => {
        console.log("Error purchase:", err);
      });

    // window.location.reload();
    emailjs
      .sendForm(
        "service_q6156hs",
        "template_jlxt4ws",
        form.current,
        "P_fgWrBJrvje7_WyA"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("Message sent.");
        },
        (error) => {
          console.log(error.text);
        }
      );

    toast({
      title: "Item purchased successfully.",

      description: `Thank you and please check your Email: ${email}.`,

      status: "success",
      duration: "7000",
      position: "top",
      isClosable: true,
    });
    onClose();
  };
  const handleOpenModal = (postId) => {
    setSelectedPostId(postId);
    onOpen();
  };
  const handleCloseModal = () => {
    setSelectedPostId(null);
    setIsModalOpen(false);
    onClose();
  };

  return (
    <>
      <main className="bg-cover bg-gradient-to-br from-[#233d52] via-[#173955] to-[#051431]">
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
                UNIVERSITY MERCH
              </Text>
            </Box>
          </Parallax>
        </Box>
        <Text className="text-center py-5 text-4xl font-orbitron text-teal-100">
          PROCESS OF ORDERING
        </Text>

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
            <Text className="text-center py-1 text-1xl font-orbitron text-teal-100">
              Choose and purchase the item, read the message to your email after
              purchasing.
            </Text>
            <article className="md:shrink-0 grid grid-cols-1 ssm:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
              {merchLists
                .map((post) => {
                  return (
                    <ul>
                      <figure
                        // data-aos="fade-up"
                        className="max-h-full max-w-full  rounded-xl m-2 bg-gradient-to-r from-[#d8ce92] via-[#e0ddc3] to-[#eedb9c] font-quicksand my-10 rounded-x ssm:pb-5 ssm:grid ssm:text-center sm:max-h-full sm:pb-5 sm: md:pb-1 md:flex md:text-justify md:h-96 lg:p-0  "
                        key={post._id}
                      >
                        <div className="relative hover:scale-105 transition duration-300 cursor-pointer">
                          <a href={post.image} target="_blank">
                            <img
                              className="max-h-96 w-96 object-cover  rounded-xl ssm:w-full ssm:h-full sm:h-full  lg:h-full md:h-full"
                              src={post.image}
                              alt={`Image ${post.id}`}
                            />
                          </a>
                          <div
                            className="absolute px-5 py-5 bottom-0 left-0 right-0 bg-gradient-to-t from-[#32a6c99a] via-[#5cc8db28]
                         to-[#147c9600] rounded-b-md "
                          >
                            <h3 class="z-10 overflow-hidden text-left mb-1 text-2xl font-bold font-orbitron italic text-emerald-900">
                              {post.name}
                            </h3>
                            <div class="z-10 bg-slate-900  gap-y-1 overflow-hidden text-1xl leading-3 p-3 w-24 rounded-2xl font-extrabold text-teal-500">
                              ₱ {post.price}.00
                            </div>
                          </div>
                        </div>

                        <div className="grid">
                          <p className="px-2  py-1 text-teal-950 font-bold font-poppins">
                            Product Specification:
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
                          </p>

                          <p className="px-1 py-1 text-teal-950 font-poppins flex">
                            <p className="px-1 text-teal-900 font-bold">
                              Colors:
                            </p>
                            {post.color}
                          </p>

                          <p className="px-1 py-1 text-teal-950 font-poppins flex">
                            <p className="px-1 pr-2 font-bold">Sizes:</p>
                            {post.plusSize}
                          </p>

                          <p className=" text-sm px-2 py-1 text-teal-900 font-bold font-poppins ssm:text-left ssm:flex lg:grid">
                            <p className="text-teal-950 font-bold">
                              Print type:
                            </p>
                            {post.Tprint}
                          </p>
                          <p className="text-sm px-2 text-teal-900 font-bold font-poppins flex ">
                            <p className="text-teal-950 font-bold pr-2">
                              Material:{" "}
                            </p>
                            {post.material}
                          </p>
                          <p className="text-sm text-teal-900 font-bold font-poppins flex px-2">
                            <p className="text-teal-950 font-bold pr-2">
                              Variation:{" "}
                            </p>
                            {post.variation}
                          </p>
                          <p className="text-sm text-teal-900 font-bold font-poppins flex  px-2">
                            <p className="text-teal-950 font-bold pr-2">
                              Gender:
                            </p>
                            {post.type}
                          </p>
                          <p className="px-2 text-teal-900 font-bold font-poppins flex">
                            <p className="text-teal-950 font-bold pr-2">
                              Item Stocks:
                            </p>
                            {post.stock}
                            <p>
                              {" "}
                              {!isAuth ? (
                                <></>
                              ) : (
                                <button className="pl-2">
                                  <Link to={`/MerchUpdate/${post._id}`}>
                                    <FaEdit />
                                  </Link>
                                </button>
                              )}
                            </p>
                          </p>
                          <div>
                            <Button
                              left={2}
                              w={140}
                              m={2}
                              bg={"teal.400"}
                              textColor={"black.200"}
                              onClick={() => handleOpenModal(post)}
                            >
                              <p className="px-3">Purchase</p> <BsCart3 />
                            </Button>
                          </div>
                        </div>
                      </figure>
                    </ul>
                  );
                })
                .reverse()}
            </article>
          </article>
        )}

        {selectedPostId && (
          <Modal
            blockScrollOnMount={false}
            isOpen={isOpen}
            onClose={handleCloseModal}
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader className="text-center flex ">
                Purchase Item:
                <p className="uppercase px-2 text-2xl text-teal-600 font-quicksand">
                  {selectedPostId.name}
                </p>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={5}>
                <form ref={form} className="grid " onSubmit={sendEmail}>
                  <label className="text-teal-950">Name:</label>
                  <input
                    className="py-3 px-3 border-solid border-2 rounded-md"
                    type="text"
                    name="to_name"
                    value={purchasedMerch.to_name}
                    placeholder="Full name"
                    onChange={(e) => {
                      setPurchasedMerch({
                        ...purchasedMerch,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    required
                  />

                  <input
                    className="text-white bg-transparent uppercase px-2 hidden"
                    type="text"
                    name="name"
                    value={selectedPostId.name}
                  ></input>
                  <input
                    className="text-white bg-transparent uppercase px-2 hidden"
                    type="number"
                    name="prices"
                    value={selectedPostId.price}
                  ></input>

                  <label className="text-teal-950">Confirm Email</label>

                  <input
                    className="py-3 px-3 border-solid border-2 rounded-md "
                    type="email"
                    name="from_name"
                    value={purchasedMerch.from_name}
                    placeholder="@email"
                    required
                    onChange={(e) => {
                      setPurchasedMerch({
                        ...purchasedMerch,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />

                  <label className="text-teal-950">Department:</label>
                  <select
                    className="py-3 px-3 border-solid border-2 rounded-md"
                    type="text"
                    name="department"
                    value={purchasedMerch.department}
                    onChange={(e) => {
                      setPurchasedMerch({
                        ...purchasedMerch,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    placeholder="Input Department"
                    required
                  >
                    <option value="College of Engineering">
                      College of Engineering
                    </option>
                    <option value="College of Education">
                      College of Education
                    </option>
                    <option value="College of Management and Entrepreneurship">
                      College of Management
                    </option>
                    <option value="College of Technology ">
                      College of Technology
                    </option>
                    <option value="College of Tourism ">
                      College of Tourism
                    </option>
                  </select>
                  <label>CTU ID:</label>
                  <input
                    className="py-3 px-3 border-solid border-2 rounded-md"
                    type="number"
                    name="student_id"
                    placeholder="Id number:"
                    required
                  />
                  <label className="text-teal-950">Item Quantity: 1 ~ 10</label>

                  <NumberInput
                    type="number"
                    min={1}
                    max={10}
                    name="quantity"
                    value={(purchasedMerch.quantity = quantity)}
                    onChange={(e) => {
                      setPurchasedMerch({
                        ...purchasedMerch,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  >
                    <NumberInputField required onChange={quantityHandler} />
                    <NumberInputStepper>
                      <NumberIncrementStepper onClick={incrementQnty} />
                      <NumberDecrementStepper onClick={decrementQnty} />
                    </NumberInputStepper>
                  </NumberInput>

                  <label className="text-teal-950">
                    Input Date & Time to purchase:
                  </label>
                  <Input
                    placeholder="Select Date and Time"
                    size="md"
                    type="datetime-local"
                    name="date"
                    value={purchasedMerch.date}
                    onChange={(e) => {
                      setPurchasedMerch({
                        ...purchasedMerch,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />

                  <label className="text-teal-950">Message</label>
                  <textarea
                    className="py-1 px-3 border-solid border-2 rounded-md mb-5"
                    name="message"
                    required
                  />

                  {!userAuth ? (
                    <>
                      {" "}
                      <Box>
                        <Text className=" font-quicksand text-center py-1">
                          Sign in first with <b>Google</b>
                        </Text>
                        <Button
                          size="lg"
                          width={"full"}
                          background={"teal.200"}
                          onClick={signInWithGoogle}
                        >
                          <FaGoogle size={30} color="teal" />
                        </Button>
                      </Box>
                    </>
                  ) : (
                    <>
                      <p className="px-2 pb-2 py-1 text-2xl">
                        Total: ₱{selectedPostId.price * quantity}
                      </p>
                      <input
                        className="text-white bg-transparent uppercase px-2 hidden"
                        type="text"
                        name="total"
                        value={
                          (purchasedMerch.total =
                            selectedPostId.price * quantity)
                        }
                        onChange={(e) => {
                          setPurchasedMerch({
                            ...purchasedMerch,
                            [e.target.name]: e.target.value,
                          });
                        }}
                      />
                      <Button
                        bg={"teal.400"}
                        textColor={"black.200"}
                        type="submit"
                      >
                        Purchase
                      </Button>
                    </>
                  )}
                </form>
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
      </main>
    </>
  );
}

export default Merch;
