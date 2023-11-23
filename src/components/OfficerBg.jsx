import React from "react";
import { Box } from "@chakra-ui/react";
import { Parallax } from "react-parallax";
import BoardBg from "../assets/SSG-Board.png";
function OfficerBg() {
  return (
    <div>
      <Box>
        <Parallax blur={{ min: -14, max: 15 }} bgImage={BoardBg} strength={300}>
          <Box
            style={{
              justifyItems: "center",
              textAlign: "center",
              margin: "40%",
            }}
          ></Box>
        </Parallax>
      </Box>
    </div>
  );
}

export default OfficerBg;
