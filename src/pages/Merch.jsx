import React, { useEffect, useState, useRef } from "react";
import axios, { isAxiosError } from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import {
  Button,
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
import { useDisclosure } from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import emailjs from "@emailjs/browser";
function Merch() {
  const navigate = useNavigate();
  const [merchLists, setMerchLists] = useState([]);
  const form = useRef();
  const [email, setEmail] = useState("");

  const [quantity, setQuantity] = useState();
  const [name, setName] = useState("");
  const { id } = useParams();
  const [isAuth, setIsAuth] = useState(false);
  const [user] = useAuthState(auth);
  const buyModal = useDisclosure();
  const editModal = useDisclosure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    if (user) {
      setIsAuth(user.email === "ashley.rodriguez@ctu.edu.ph");
    }
  }, [user]);

  useEffect(() => {
    axios
      .get("http://localhost:8001/api/merches")
      .then((result) => {
        setMerchLists(result.data);
      })
      .catch((err) => {
        console.log("Error fetch Data.", err);
      });
  }, []);

  const deleteMerch = (id) => {
    window.location.reload();
    axios
      .delete(`http://localhost:8001/api/merches/${id}`)
      .then((result) => {
        alert("Success deleting:");
        navigate("/Merch");
      })
      .catch((err) => {
        console.log("Error deleting merch:", err);
      });
  };
  // const increment = () => {
  //   const quantityInc = quantity + 1;
  //   setQuantity(quantityInc);
  // };
  const quantityHandler = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    setQuantity(newQuantity);
  };
  // const total = selectedPostId.price * quantity;

  const toast = useToast();
  const sendEmail = (e) => {
    e.preventDefault();

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
        <article className="max-w-md mx-auto max-h-full rounded-xl overflow-hidden md:max-w-7xl">
          <article className="md:shrink-0 grid grid-cols-1 ssm:grid-cols-1 sm:grid-cols-2 md:grid-cols-2">
            {merchLists
              .map((post) => {
                return (
                  <ul>
                    <figure
                      // data-aos="fade-up"
                      className=" rounded-xl m-2 bg-gradient-to-r from-[#93f8df] via-[#e0ddc3] to-[#eedb9c] font-quicksand my-10 rounded-x ssm:pb-5 ssm:grid ssm:text-center sm:max-h-full sm:pb-5 sm: md:pb-1 md:flex md:text-justify"
                      key={post._id}
                    >
                      <img
                        className="max-h-full w-96 object-cover rounded-xl md:h-full "
                        src={post.image}
                        alt={`Image ${post.id}`}
                      />

                      <div className="">
                        <p className=" font-bold font-bebas tracking-widest text-2xl px-2 text-teal-900">
                          {post.name}
                        </p>
                        {!isAuth ? (
                          <></>
                        ) : (
                          <>
                            <button
                              className="grid"
                              onClick={() => {
                                deleteMerch(post._id);
                              }}
                            >
                              Delete
                            </button>
                            <button onClick={() => handleOpenModal(post)}>
                              Buy
                            </button>
                            {/* <button onClick={buyModal.onOpen}>Buy</button> */}
                          </>
                        )}
                        <p className=" text-md px-2 font-roboto text-teal-900">
                          ₱ {post.price}
                        </p>

                        <p className="px-5 py-2 text-teal-950 font-poppins">
                          <p className="text-teal-900 font-bold">Colors:</p>{" "}
                          {post.color}
                        </p>

                        <p className="px-2 py-1 text-teal-950 font-poppins flex justify-around">
                          <p className=" font-bold">Size:</p>
                          {post.plusSize}
                        </p>
                        <p className="px-2 pt-3 py-2 text-teal-950 font-bold font-poppins">
                          Product Specification:
                        </p>
                        <p className=" text-sm px-2 py-1 text-teal-900 font-bold font-poppins">
                          <p className="text-teal-950 font-bold">Print type:</p>
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
                      </div>
                    </figure>
                  </ul>
                );
              })
              .reverse()}
          </article>
        </article>
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
                    value={name}
                    placeholder="Full name"
                    onChange={(e) => setName(e.target.value)}
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

                  <label className="text-teal-950">Email</label>
                  <input
                    className="py-3 px-3 border-solid border-2 rounded-md"
                    type="email"
                    name="from_name"
                    placeholder="@email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="text-teal-950">Department:</label>
                  <select
                    className="py-3 px-3 border-solid border-2 rounded-md"
                    type="text"
                    name="department"
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
                  <label className="text-teal-950">Item Quantity:</label>

                  <NumberInput type="number" min={1} max={10} name="quantity">
                    <NumberInputField
                      required
                      value={quantity}
                      onChange={quantityHandler}
                    />
                    {/* <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper> */}
                  </NumberInput>

                  <label className="text-teal-950">
                    Input Date & Time to purchase:
                  </label>
                  <Input
                    placeholder="Select Date and Time"
                    size="md"
                    type="datetime-local"
                    name="date"
                  />
                  <label className="text-teal-950">Message</label>
                  <textarea
                    className="py-1 px-3 border-solid border-2 rounded-md mb-5"
                    name="message"
                    required
                  />
                  <p className="px-2 pb-2 py-1 text-2xl">
                    ${selectedPostId.price * quantity}
                  </p>
                  <input
                    className="text-white bg-transparent uppercase px-2 hidden"
                    type="text"
                    name="total"
                    value={selectedPostId.price * quantity}
                  />
                  <Button bg={"teal.400"} textColor={"black.200"} type="submit">
                    Purchase
                  </Button>
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
