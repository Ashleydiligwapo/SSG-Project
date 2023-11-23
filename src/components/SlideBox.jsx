import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { Box, Center, Text } from "@chakra-ui/react";

function SlideBox() {
  const images = [
    "https://imageupload.io/ib/35cQv3sSpWHLURB_1693666452.png",
    "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  ];

  return (
    <div>
      <Text>Sample</Text>
      <Fade>
        <div className="each-slide">
          <div>
            <img src={images[0]} />
          </div>
        </div>

        <div className="each-slide">
          <div>
            <img src={images[1]} />
          </div>
        </div>

        <div>
          <div className="each-slide">
            <img src={images[2]} />
          </div>
        </div>
      </Fade>
    </div>
  );
}

export default SlideBox;
