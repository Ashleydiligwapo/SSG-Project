import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { Parallax } from "react-parallax";
import bckImage from "../assets/ctu.jpg";
function Clubs() {
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
            <Text className="text-5xl  font-bebas tracking-widest md:text-5xl ssm:text-4xl">
              CAMPUS - CLUBS
            </Text>
          </Box>
        </Parallax>
      </Box>
    </div>
  );
}

export default Clubs;
