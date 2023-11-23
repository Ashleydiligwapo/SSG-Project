import { useState, React, useEffect } from "react";
import axios from "axios";
import {
  ref,
  uploadString,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db, auth, storage } from "../firebase";

function CreateBoard({ isAuth }) {
  const [lists, setLists] = useState([]);
  const [datainForm, setDatainForm] = useState({
    title: "",
    Date: "",
    HreF: "",
    PostText: "",
  });

  const [imageUpload, setImageUpload] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const apiURL = "http://localhost:8001/api/lists";
  //to fetch data from mongoodb api
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

  //FORM POST SUBMIT FOR MONGODB
  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataSend = new FormData();
      formDataSend.append("title", datainForm.title);
      formDataSend.append("Date", datainForm.Date);
      formDataSend.append("HreF", datainForm.HreF);
      formDataSend.append("PostText", datainForm.PostText);

      const response = await axios.post(
        "http://localhost:8001/api/lists",
        formDataSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setLists([...lists, response.data]);
      setDatainForm({
        title: "",
        Date: "",
        HreF: "",
        PostText: "",
      });
    } catch (e) {
      console.error("Error creating: ", e);
    }
  };

  return (
    <div className="Lists">
      <form onSubmit={formSubmit}>
        <p>Title:</p>
        <input
          type="text"
          value={datainForm.title}
          onChange={(event) =>
            setDatainForm({ ...datainForm, title: event.target.value })
          }
          required
        />
        <p>Date:</p>
        <input
          type="date"
          value={datainForm.Date}
          onChange={(event) =>
            setDatainForm({ ...datainForm, Date: event.target.value })
          }
          required
        />
        <p>Link: </p>
        <input
          type="text"
          value={datainForm.HreF}
          onChange={(event) =>
            setDatainForm({ ...datainForm, HreF: event.target.value })
          }
          required
        />
        <p>Post Text: </p>
        <input
          type="textarea"
          value={datainForm.PostText}
          onChange={(event) =>
            setDatainForm({ ...datainForm, PostText: event.target.value })
          }
          required
        />
        <label>Image File: </label>
        <input
          className="my-2 pr-5 rounded-sm"
          type="file"
          onChange={(event) => {
            setImageUpload(event.target.files[0]);
          }}
        />

        <button type="submit">DONE</button>
      </form>

      {isLoading ? <p>Loading...</p> : <p>put the entire code here later...</p>}
      <ul>
        {lists.map((items) => (
          <li key={items._id}>
            <a href={items.HreF} target="_blank">
              <p>{items.title}</p>
              <p>{items.Date}</p>
              <p>{items.PostText}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CreateBoard;
