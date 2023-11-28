import React from "react";
import { Parallax } from "react-parallax";
import bckImage from "../assets/ctu-bg.jpg";
import { Box, Text } from "@chakra-ui/react";
import FancyText from "@carefully-coded/react-text-gradient";
function background() {
  return (
    <div>
      <Box>
        <Parallax
          blur={{ min: -12, max: 15 }}
          bgImage={bckImage}
          strength={500}
        >
          <Box
            style={{
              justifyItems: "center",
              textAlign: "center",
              margin: "11%",
            }}
          >
            <FancyText
              className="text-5xl font-bold font-bebos tracking-wide "
              gradient={{ from: "#ff7300", to: "#d6bc33" }}
              animate
              animateDuration={800}
            >
              SUPREME STUDENT GOVERNMENT
            </FancyText>
            <Text fontSize="2xl">CEBU TECHNOLOGICAL UNIVERSITY</Text>
          </Box>
        </Parallax>
      </Box>
    </div>
  );
}

export default background;
