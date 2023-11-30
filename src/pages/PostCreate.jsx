import React, { useEffect } from "react";
import { Text } from "@chakra-ui/react";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth, storage } from "../firebase";
import { useNavigate } from "react-router-dom";
import login from "./login";
import axios from "axios";
import {
  ref,
  uploadString,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import FreedomCode from "./FreedomCode";

function PostCreate({ isAuth }) {
  const [lists, setLists] = useState([]);
  const [datainForm, setDatainForm] = useState({
    title: "",
    Date: "",
    HreF: "",
    PostText: "",
    images: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const apiURL = "http://localhost:8001/api/lists";

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [postText, setPostText] = useState("");
  const [imageUpload, setImageUpload] = useState(null);

  const [FcTitle, setFcTitle] = useState("");
  const [FcDate, setFcDate] = useState("");
  const [FcPostText, setFcPostText] = useState("");
  const [FcImageUpload, setFcImageUpload] = useState(null);
  const [FcHref, setFcHref] = useState("");

  const freedomCodeCollectionRef = collection(db, "FreedomCode");
  const postsCollectionRef = collection(db, "Posts");
  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiURL);
        setLists(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("Error to fetch", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const createPost = async (event) => {
    event.preventDefault();
    try {
      const formDataSend = new FormData();
      formDataSend.append("title", datainForm.title);
      formDataSend.append("Date", datainForm.Date);
      formDataSend.append("HreF", datainForm.HreF);
      formDataSend.append("PostText", datainForm.PostText);
      formDataSend.append("images", datainForm.images);

      const response = await axios.post(
        "http://localhost:8001/api/lists",
        formDataSend,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setLists([...lists, response.data]);
      setDatainForm({
        title: "",
        Date: "",
        HreF: "",
        PostText: "",
        images: "",
      });
      alert("Successful upload");
      navigate("/");
    } catch (e) {
      console.error("Error creating: ", e);
      console.log("Error creating: ", e);
    }
  };

  const createFcPost = async (event) => {
    if (FcImageUpload == null) return;
    const FcimageRef = ref(storage, "FreedomCodeImages/" + FcImageUpload.name);
    const FcimageFileData = new FormData();
    FcimageFileData.append("image", FcImageUpload);
    try {
      uploadBytes(FcimageRef, FcImageUpload).then(() => {
        alert("Successfully Uploaded.");
      });
      const FcImageUrl = await getDownloadURL(FcimageRef);

      await addDoc(freedomCodeCollectionRef, {
        FcTitle,
        FcDate,
        FcPostText,
        FcImageUrl,
        FcHref,
        author: {
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid,
        },
      });
      navigate("/FreedomCode");
    } catch (error) {
      console.error("Error uploading:", error);
    }
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  return (
    <main className="font-poppins max-w-full max-h-full bg-gradient-to-br from-[#224866] via-[#073255] to-[#051431]">
      <article className="py-10 mx-auto ssm:max-w-md sm:max-w-1xl md:max-w-2xl lg:max-w-5xl">
        <figure className="rounded-md bg-gradient-to-br from-[#f0e550] via-[#e0be42] to-[#d8c944] max-h-full pt-5 pb-5 px-10 my-5 mx-auto">
          <Text className="text-center text-[#972c2c] py-2 m-5 font-quicksand font-semibold">
            Only member of SSG can post.
          </Text>
        </figure>
      </article>
      <article className="py-10 mx-auto ssm:max-w-md sm:max-w-1xl md:max-w-2xl lg:max-w-5xl">
        <figure className="rounded-md bg-gradient-to-br from-[#f0e550] via-[#e0be42] to-[#d8c944] max-h-full pt-5 pb-5 px-10 my-5 mx-auto">
          <Text className="text-center text-[#183258] py-2 m-5 font-poppins font-semibold">
            Post Events.
          </Text>
          <Text className="text-center text-[#183258] m-2 font-poppins">
            Home Page Events uploader, upload events and happenings within of
            ssg. <br /> Please input Title and Date of the event and caption and
            image below of the event.
          </Text>

          <input
            className="my-2 px-5 p-2 pr-5 rounded-sm w-full"
            placeholder=" Input Title"
            type="text"
            value={datainForm.title}
            onChange={(event) =>
              setDatainForm({ ...datainForm, title: event.target.value })
            }
            required
          ></input>
          <br />

          <input
            className="my-2 px-5 p-2 pr-5 rounded-sm w-full"
            placeholder=" Date: 01/01/01"
            type="date"
            value={datainForm.Date}
            onChange={(event) =>
              setDatainForm({ ...datainForm, Date: event.target.value })
            }
            required
          ></input>
          <br />

          <input
            className="my-2 px-5 p-2 pr-5 rounded-sm w-full"
            placeholder=" Google Drive Link:"
            type="text"
            value={datainForm.HreF}
            onChange={(event) =>
              setDatainForm({ ...datainForm, HreF: event.target.value })
            }
          />
          <label>Image File: </label>
          <input
            className="my-2 px-5 p-2 pr-5 rounded-sm w-full"
            placeholder=" Image Upload Link:"
            type="text"
            value={datainForm.images}
            onChange={(event) =>
              setDatainForm({ ...datainForm, images: event.target.value })
            }
          />
          <br />
          <label>Caption:</label>
          <textarea
            className="h-40 w-full rounded-md"
            placeholder=" Input Caption"
            type="textarea"
            value={datainForm.PostText}
            onChange={(event) =>
              setDatainForm({ ...datainForm, PostText: event.target.value })
            }
            required
          ></textarea>
          <br />
          <button
            className="my-1 p-2 rounded-md bg-[#3fcf76] cursor-pointer hover:bg-[#4cdba4] transition-colors text-[#184f57]"
            onClick={createPost}
          >
            Submit
          </button>
        </figure>
      </article>

      <article className="py-10 mx-auto ssm:max-w-md sm:max-w-1xl md:max-w-2xl lg:max-w-5xl">
        <figure className="rounded-md bg-gradient-to-br from-[#f0e550] via-[#e0be42] to-[#d8c944] max-h-full pt-5 pb-5 px-10 my-5 mx-auto">
          <Text className="text-center text-[#183258] py-2 m-5 font-poppins font-semibold">
            Post Freedome Code.
          </Text>
          <Text className="text-center text-[#183258] m-2 font-poppins">
            Freedom code uploader, to upload minutes and meeting records from
            google drive. <br></br> Please input title, Date and google drive
            link and caption of the meeting with image below.
          </Text>

          <input
            className="my-2 px-5 p-2 pr-5 rounded-sm w-full"
            placeholder=" Input Title"
            onChange={(event) => {
              setFcTitle(event.target.value);
            }}
          ></input>
          <br />

          <input
            className="my-2 px-5 p-2 pr-5 rounded-sm w-full"
            type="date"
            placeholder=" Date: 01/01/01"
            onChange={(event) => {
              setFcDate(event.target.value);
            }}
          ></input>
          <br />

          <input
            className="my-2 px-5 p-2 pr-5 rounded-sm w-full"
            placeholder=" Google Drive Link:"
            onChange={(event) => {
              setFcHref(event.target.value);
            }}
          ></input>
          <br />
          <label>Caption:</label>
          <textarea
            className="h-40 w-full rounded-md"
            placeholder=" Input Caption"
            onChange={(event) => {
              setFcPostText(event.target.value);
            }}
          ></textarea>
          <br />

          <br />
          <button
            className="my-1 p-2 rounded-md bg-[#3fcf76] cursor-pointer hover:bg-[#4cdba4] transition-colors text-[#184f57]"
            onClick={createFcPost}
          >
            Submit
          </button>
        </figure>
      </article>
    </main>
  );
}

export default PostCreate;
