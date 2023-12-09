import { useRef, React } from "react";
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  Button,
  VisuallyHidden,
} from "@chakra-ui/react";
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
import { useState } from "react";
import { auth, provider } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { BiLogoGmail } from "react-icons/bi";
import { TbHeartHandshake } from "react-icons/tb";
import { FaFacebookSquare, FaGoogle } from "react-icons/fa";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import bgFooter from "../assets/foot.jpg";
import emailjs from "@emailjs/browser";

function Footer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstModal = useDisclosure();
  const secondModal = useDisclosure();
  const form = useRef();
  const [email, setEmail] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [user] = useAuthState(auth);
  const toast = useToast();
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    // window.location.reload();
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_17wxkco",
        "template_gvwroxp",
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
      title: "Message sent to SSG mail",
      description: `Please wait for the feedback ${email}.`,
      status: "success",
      duration: "5000",
      position: "top",
      isClosable: true,
    });
  };

  useEffect(() => {
    if (user) {
      setIsAuth(user.email === "ashley.rodriguez@ctu.edu.ph");
    }
  }, [user]);

  return (
    <Box
      className=" font-bebos"
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      bgImage={bgFooter}
      bgSize={"cover"}
      bgRepeat={"no-repeat"}
    >
      <Container
        as={Stack}
        maxW={"5xl"}
        py={10}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <div className="text-center font-quicksand ">
          <Text fontWeight={"bold"}>Connect with us.</Text>
          <Text w={80}>
            For more information, Follow Supreme Student Government and stay up
            to date for our campus activities and events work.
          </Text>
          <br />
          <Text>0909 948 3719</Text>
        </div>

        <div className="text-center font-quicksand ">
          <Text fontWeight={"bold"}>Want to get involved?</Text>
          <Text>Partake student council's activities.</Text>
          <Stack direction={"row"} spacing={3} pt={3} px={3}>
            <Button bg={"white"} px={28} onClick={firstModal.onOpen}>
              <TbHeartHandshake />
              <Text px={2}>Let me in</Text>
            </Button>

            <a href="https://www.facebook.com/SSGDANAO" target="_blank">
              <Button bg={"white"} label={"Facebook"} href={"#"}>
                <FaFacebookSquare />
              </Button>
            </a>
            <Button
              bg={"white"}
              label={"Gmail"}
              href={"#"}
              onClick={secondModal.onOpen}
            >
              <BiLogoGmail />
            </Button>
          </Stack>
        </div>
      </Container>
      <Modal
        blockScrollOnMount={false}
        isOpen={firstModal.isOpen}
        onClose={firstModal.onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-center">Sign in to Google.</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={10} className="text-center">
            <Box>
              <Button
                size="lg"
                background={"teal.200"}
                onClick={signInWithGoogle}
              >
                <FaGoogle size={30} color="teal" />
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        blockScrollOnMount={false}
        isOpen={secondModal.isOpen}
        onClose={secondModal.onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-center">Send a Message.</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={5}>
            <form ref={form} className="grid " onSubmit={sendEmail}>
              <label>Name:</label>
              <input
                className="py-3 px-3 border-solid border-2 rounded-md"
                type="text"
                name="to_name"
                placeholder="name"
                required
              />
              <label>Email</label>
              <input
                className="py-3 px-3 border-solid border-2 rounded-md"
                type="email"
                name="from_name"
                placeholder="@email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Message</label>
              <textarea
                className="py-3 px-3 border-solid border-2 rounded-md mb-5"
                name="message"
                required
              />

              <Button type="submit">Submit</Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Container
        as={Stack}
        maxW={"5xl"}
        pb={6}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Text>
          © 2022 - 2023 SSG <b>DANAO CTU - SABANG</b>
        </Text>
      </Container>
    </Box>
  );
}

export default Footer;
