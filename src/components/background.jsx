import React from "react";
import { Parallax } from "react-parallax";
import bckImage from "../assets/ctu.jpg";
import { Box, Text } from "@chakra-ui/react";
import FancyText from "@carefully-coded/react-text-gradient";
function background() {
  return (
    <div>
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
            <FancyText
              className="text-5xl  font-bebas tracking-widest md:text-5xl ssm:text-4xl"
              gradient={{ from: "#ff7300", to: "#d6bc33" }}
              animate
              animateDuration={600}
            >
              SUPREME STUDENT GOVERNMENT
            </FancyText>
            <Text fontSize="2xl" className="text-white">
              CEBU TECHNOLOGICAL UNIVERSITY
            </Text>
          </Box>
        </Parallax>
      </Box>
    </div>
  );
}

export default background;
