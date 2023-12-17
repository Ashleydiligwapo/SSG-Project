import React, { useEffect } from "react";
import { Text } from "@chakra-ui/react";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth, storage } from "../firebase";
import { useNavigate } from "react-router-dom";
import login from "./login";
import axios from "axios";
import Select from "react-select";
import {
  ref,
  uploadString,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { MultiSelect } from "primereact/multiselect";
function PostCreate({ isAuth }) {
  const serverURL = import.meta.env.VITE_SERVER_URL;
  const [lists, setLists] = useState([]);
  const [reportData, setReportData] = useState({
    title: "",
    link: "",
    image: "",
    information: "",
  });
  const [datainForm, setDatainForm] = useState({
    title: "",
    Date: "",
    HreF: "",
    PostText: "",
    images: "",
  });

  const [merchForm, setMerchForm] = useState({
    price: "",
    name: "",
    type: "",
    stock: "",
    image: "",
    material: [],
    variation: [],
    plusSize: [],
    color: [],
    Tprint: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const apiURL = `${serverURL}/api/lists`;
  const [FcTitle, setFcTitle] = useState("");
  const [FcDate, setFcDate] = useState("");
  const [FcPostText, setFcPostText] = useState("");
  const [FcImageUpload, setFcImageUpload] = useState(null);
  const [FcHref, setFcHref] = useState("");
  const freedomCodeCollectionRef = collection(db, "FreedomCode");
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

  const merchPost = (e) => {
    e.preventDefault();
    axios
      .post(`${serverURL}/api/merches`, merchForm)
      .then((result) => {
        setMerchForm({
          price: "",
          name: "",
          type: "",
          stock: "",
          image: "",
          material: [],
          variation: [],
          plusSize: [],
          color: [],
          Tprint: [],
        });
        navigate("/Merch");
      })
      .catch((err) => {
        console.log("Error creating: ", err);
      });
  };

  const reportPost = (e) => {
    e.preventDefault();
    axios
      .post(`${serverURL}/api/reports`, reportData)
      .then((result) => {
        setReportData({
          title: "",
          link: "",
          image: "",
          information: "",
        });
        navigate("/Engage");
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

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
        `${serverURL}/api/lists`,
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
  const handleMaterialChange = (selectOption) => {
    const materials = selectOption.map((option) => option.value);
    setMerchForm({ ...merchForm, material: materials });
  };
  const handleSizeChange = (selectOption) => {
    const plusSizes = selectOption.map((option) => option.value);
    setMerchForm({ ...merchForm, plusSize: plusSizes });
  };
  const handleVarChange = (selectOption) => {
    const vars = selectOption.map((option) => option.value);
    setMerchForm({ ...merchForm, variation: vars });
  };
  const handleColorChange = (selectOption) => {
    const colors = selectOption.map((option) => option.value);
    setMerchForm({ ...merchForm, color: colors });
  };
  const handlePrintChange = (selectOption) => {
    const tprints = selectOption.map((option) => option.value);
    setMerchForm({ ...merchForm, Tprint: tprints });
  };
  const materialOption = [
    { value: "Cotton", label: "Cotton" },
    { value: "Silk", label: "Silk" },
    { value: "Jersey", label: "Jersey" },
    { value: "Line In", label: "Line In" },
    { value: "Polyester", label: "Polyester" },
    // Add more options as needed
  ];
  const variationOption = [
    { value: " HENLEY ", label: "HENLEY" },
    { value: " Crewneck ", label: "Crewneck" },
    { value: " V-Neck ", label: "V-Neck" },
    { value: " Polo ", label: "Polo" },
    { value: " Jersey/Athletic ", label: "Jersey/Athletic" },
    // Add more options as needed
  ];
  const sizesOption = [
    { value: " XS ,", label: "XS" },
    { value: " S ,", label: "S" },
    { value: " M ,", label: "M" },
    { value: " L ,", label: "L" },
    { value: " XL ,", label: "XL" },
    { value: " XXL ,", label: "XXL" },
    { value: " 3XL ,", label: "3XL" },
    { value: " 4XL ,", label: "4XL" },
    { value: " 5XL ,", label: "5XL" },
    // Add more options as needed
  ];

  const colorsOption = [
    { value: "Red 🟥 ", label: "Red 🟥" },
    { value: "Blue 🟦 ", label: "Blue 🟦" },
    { value: "Green 🟩 ", label: "Green 🟩" },
    { value: "Yellow 🟨 ", label: "Yellow 🟨" },
    { value: "White ⬜ ", label: "White ⬜" },
    { value: "Black ⬛ ", label: "Black ⬛" },
    { value: "Purple 🟪 ", label: "Purple 🟪" },
    { value: "Orange 🟧 ", label: "Orange 🟧" },
    { value: "Brown 🟫 ", label: "Brown 🟫" },
    { value: "Pink 👛 ", label: "Pink 👛" },
    { value: "Teal 🧼 ", label: "Teal 🧼" },
    { value: "Dark Blue 💙 ", label: "Dark Blue 💙" },
  ];
  const printingOption = [
    { value: " Screen Print /", label: "Screen Print" },
    { value: " Dye Sublimation /", label: "Dye Sublimation" },
    { value: " Air Brushing /", label: "Air Brushing" },
    { value: " Full Sublimation /", label: "Full Sublimation" },
    { value: " Heat Press Printing /", label: "Heat Press Printing" },
    { value: " Text Tile Printing /", label: "Text Tile Printing" },
    // Add more options as needed
  ];
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
      <article className=" py-10 mx-auto ssm:max-w-md sm:max-w-1xl md:max-w-2xl lg:max-w-5xl">
        <figure className="rounded-md bg-gradient-to-br from-[#f0e550] via-[#e0be42] to-[#d8c944] max-h-full pt-5 pb-5 px-10 my-5 mx-auto">
          <Text className="text-center text-[#183258] py-2 m-5 font-poppins font-semibold">
            Add Merch Item
          </Text>
          <form onSubmit={merchPost}>
            <Text>Item Price.</Text>
            <input
              className="my-2 px-5 p-2 pr-5 rounded-sm w-21"
              type="number"
              placeholder="Input Price: "
              name="price"
              value={merchForm.price}
              onChange={(event) => {
                setMerchForm({
                  ...merchForm,
                  [event.target.name]: event.target.value,
                });
              }}
            />
            <Text>Item stock available.</Text>
            <input
              className="my-2 px-5 p-2 pr-5  rounded-sm w-21"
              type="number"
              placeholder="Input Stock available: "
              name="stock"
              value={merchForm.stock}
              onChange={(event) => {
                setMerchForm({
                  ...merchForm,
                  [event.target.name]: event.target.value,
                });
              }}
            />
            <Text>Item sex type.</Text>
            <select
              className="my-2 px-5 p-2 pr-5 rounded-sm w-21"
              type="text"
              placeholder="Input Type: "
              name="type"
              value={merchForm.type}
              onChange={(event) => {
                setMerchForm({
                  ...merchForm,
                  [event.target.name]: event.target.value,
                });
              }}
            >
              <option value="">None</option>
              <option value="Unisex">Unisex</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <Text>Item name.</Text>
            <input
              className="my-2 px-5 p-2 pr-5 rounded-sm w-full"
              type="text"
              placeholder="Input Name: "
              name="name"
              value={merchForm.name}
              onChange={(event) => {
                setMerchForm({
                  ...merchForm,
                  [event.target.name]: event.target.value,
                });
              }}
            />
            <Text>Item image.</Text>
            <input
              className="my-2 px-5 p-2 pr-5 rounded-sm w-full"
              type="text"
              placeholder="Image Link: "
              name="image"
              value={merchForm.image}
              onChange={(event) => {
                setMerchForm({
                  ...merchForm,
                  [event.target.name]: event.target.value,
                });
              }}
            />
            <Text>Item material used.</Text>
            <Select
              isMulti={true}
              options={materialOption}
              className="bg-white text-slate-800 my-2 px-5 p-2 pr-5 rounded-sm w-full"
              type="text"
              placeholder="Input Materials: "
              name="material"
              value={materialOption.filter((option) =>
                merchForm.material.includes(option.value)
              )}
              onChange={handleMaterialChange}
            />
            <Text>Item variation.</Text>
            <Select
              isMulti={true}
              options={variationOption}
              className="bg-white text-slate-800 my-2 px-5 p-2 pr-5 rounded-sm w-full"
              placeholder="Input Variation: "
              name="variation"
              value={variationOption.filter((option) =>
                merchForm.variation.includes(option.value)
              )}
              onChange={handleVarChange}
            />
            <Text>Item sizes.</Text>
            <Select
              isMulti={true}
              placeholder="Select item sizes"
              className="bg-white text-slate-800 my-2 px-5 p-2 pr-5 rounded-sm w-full"
              options={sizesOption}
              value={sizesOption.filter((option) =>
                merchForm.plusSize.includes(option.value)
              )}
              name="plusSize"
              onChange={handleSizeChange}
            />
            <Text>Item Colors.</Text>
            <Select
              isMulti={true}
              className="bg-white text-slate-800 my-2 px-5 p-2 pr-5 rounded-sm w-full"
              placeholder="Choose colors: "
              name="color"
              options={colorsOption}
              value={colorsOption.filter((option) =>
                merchForm.color.includes(option.value)
              )}
              onChange={handleColorChange}
            />
            <Text>Item printing type.</Text>
            <Select
              isMulti={true}
              className="bg-white  text-slate-800 my-2 px-5 p-2 pr-5 rounded-sm w-full"
              placeholder="Printing type:"
              name="Tprint"
              options={printingOption}
              value={printingOption.filter((option) =>
                merchForm.Tprint.includes(option.value)
              )}
              onChange={handlePrintChange}
            />
            <button
              type="submit"
              className="my-1 p-2 rounded-md bg-[#3fcf76] cursor-pointer hover:bg-[#4cdba4] transition-colors text-[#184f57]"
            >
              DONE
            </button>
          </form>
        </figure>
      </article>
      <article className=" py-10 mx-auto ssm:max-w-md sm:max-w-1xl md:max-w-2xl lg:max-w-5xl">
        <figure className="rounded-md bg-gradient-to-br from-[#f0e550] via-[#e0be42] to-[#d8c944] max-h-full pt-5 pb-5 px-10 my-5 mx-auto">
          <Text className="text-center text-[#183258] py-2 m-5 font-poppins font-semibold">
            Add Narrative Reports
          </Text>
          <form onSubmit={reportPost}>
            <input
              className="my-2 px-2 p-2 m-2 rounded-sm w-21"
              type="text"
              placeholder="Input Title"
              name="title"
              value={reportData.title}
              onChange={(event) => {
                setReportData({
                  ...reportData,
                  [event.target.name]: event.target.value,
                });
              }}
            />
            <input
              className="my-2 px-2 p-2 m-2 rounded-sm w-21"
              type="text"
              placeholder="Input GDrive Link"
              name="link"
              value={reportData.link}
              onChange={(event) => {
                setReportData({
                  ...reportData,
                  [event.target.name]: event.target.value,
                });
              }}
            />
            <input
              className="my-2 px-2 p-2 m-2 rounded-sm w-21"
              type="text"
              placeholder="Input Image"
              name="image"
              value={reportData.image}
              onChange={(event) => {
                setReportData({
                  ...reportData,
                  [event.target.name]: event.target.value,
                });
              }}
            />
            <input
              className="my-2 px-2 p-2 m-2 rounded-sm w-21"
              type="text"
              name="information"
              placeholder="Input Information here"
              value={reportData.information}
              onChange={(event) => {
                setReportData({
                  ...reportData,
                  [event.target.name]: event.target.value,
                });
              }}
            />
            <button
              type="submit"
              className="my-1  p-2 rounded-md bg-[#3fcf76] cursor-pointer hover:bg-[#4cdba4] transition-colors text-[#184f57]"
            >
              DONE
            </button>
          </form>
        </figure>
      </article>
    </main>
  );
}

export default PostCreate;
