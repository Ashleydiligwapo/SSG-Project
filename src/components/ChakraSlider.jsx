import React from "react";
import Slider from "react-slick";
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
} from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { useState } from "react";
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};
function ChakraSlider() {
  const [slider, setSlider] = useState(0);

  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "40px" });
  const cards = [
    {
      title: "Services and Leaderships",
      text: "The CTU Danao - SSG is the highest governing council, dedicated to serving the student body's collective interests by organizing programs, projects, and activities, as well as serving as a liaison between the school administration and the student body to meet the needs of a better campus life. ",
      image: "https://f005.backblazeb2.com/file/MERN-Project/OFFICERS/ssg1.jpg",
    },
    {
      title: "Services and Leaderships",
      text: "The CTU Danao - SSG is the highest governing council, dedicated to serve the collective interests of the student body through the organization of programs, initiatives, and events, as well as acting as a bridge between the school administration and the student population to satisfy the demands of a better campus life. ",
      image:
        "https://f005.backblazeb2.com/file/MERN-Project/395346655_1383285495632752_8937385563233366527_n.jpg",
    },
    {
      title: "Services and Leaderships",
      text: "The CTU Danao - SSG is the highest governing council, dedicated to serve the collective interests of the student body by planning programs, projects, and activities, as well as acting as a liaison between the school administration and the student body in order to meet the needs of a better campus life. ",
      image: "https://f005.backblazeb2.com/file/MERN-Project/OFFICERS/ssg3.jpg",
    },
  ];
  return (
    <Box
      position={"relative"}
      height={"600px"}
      width={"full"}
      overflow={"hidden"}
    >
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        variant="ghost"
        position="absolute"
        background={"blackAlpha.600"}
        color={"white"}
        left={side}
        px={2}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt size="40px" />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        background={"blackAlpha.600"}
        px={2}
        color={"white"}
        right={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt size="40px" />
      </IconButton>
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map((card, index) => (
          <Box
            className=" font-quicksand"
            key={index}
            height={"1xl"}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`url(${card.image})`}
          >
            {/* This is the block you need to change, to customize the caption */}
            <Container size="container.lg" height="600px" position="relative">
              <Stack
                spacing={7}
                w={"full"}
                maxW={"4xl"}
                position="absolute"
                top="50%"
                transform="translate(0, -50%)"
              >
                <Heading
                  fontSize={{ base: "3xl", md: "4xl", lg: "4xl" }}
                  color="gold"
                >
                  <Text className=" font-bebas tracking-wider">
                    {card.title}
                  </Text>
                </Heading>
                <Text
                  className=" font-montserrat tracking-normal"
                  fontSize={{ base: "lg", lg: "2xl" }}
                  w={{ base: "sm", md: "3xl" }}
                  color="white"
                >
                  {card.text}
                </Text>
              </Stack>
            </Container>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}

export default ChakraSlider;
