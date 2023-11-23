import React from "react";
import { Parallax } from "react-parallax";
import bckImage from "../assets/ctu-bg.jpg";
import { Box, Text } from "@chakra-ui/react";
function background() {
  return (
    <div>
      <Box>
        <Parallax
          blur={{ min: -12, max: 14 }}
          bgImage={bckImage}
          strength={300}
        >
          <Box
            style={{
              justifyItems: "center",
              textAlign: "center",
              margin: "11%",
            }}
          >
            <Text
              fontSize="4xl"
              as="b"
              className="text-white font-bebos font-bold"
            >
              SUPREME STUDENT GOVERNMENT
            </Text>
            <Text fontSize="1xl">CEBU TECHNOLOGICAL UNIVERSITY</Text>
          </Box>
        </Parallax>
      </Box>
    </div>
  );
}

export default background;
