import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
function MerchUpdate() {
  const [merchLists, setMerchLists] = useState([]);
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
  const navigate = useNavigate();
  const { id } = useParams();
  const [isAuth, setIsAuth] = useState(false);
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (user) {
      setIsAuth(user.email === "ashley.rodriguez@ctu.edu.ph");
    }
  }, [user]);

  useEffect(() => {
    axios
      .get(`http://localhost:8001/api/merches/${id}`)
      .then((result) => {
        setMerchForm({
          price: result.data.price,
          name: result.data.name,
          type: result.data.type,
          stock: result.data.stock,
          image: result.data.image,
          material: [],
          variation: [],
          plusSize: [],
          color: [],
          Tprint: [],
        });
      })
      .catch((err) => {
        console.log("Error fetch Data.", err);
      });
  }, [id]);

  const merchPost = (e) => {
    e.preventDefault();
    const data = {
      stock: merchForm.stock,
    };
    axios
      .put(`http://localhost:8001/api/merches/${id}`, data)
      .then((result) => {
        alert("Item stocks updated:");
        navigate("/Merch");
      })
      .catch((err) => {
        console.log("Error creating: ", err);
      });
  };
  return (
    <div>
      <main className="bg-cover bg-gradient-to-br from-[#233d52] via-[#173955] to-[#051431]">
        <article className="max-w-md mx-auto max-h-full h-96 rounded-xl overflow-hidden md:max-w-7xl">
          <form noValidate onSubmit={merchPost}>
            <p className="text-2xl py-14 text-teal-50">
              Update item stocks:
              <input
                className="text-white bg-transparent uppercase px-2"
                type="text"
                name="name"
                value={merchForm.name}
                disabled
              ></input>
            </p>
            <input
              className="my-2 px-5 p-2 pr-5 py-5 rounded-sm w-21"
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
            <button
              className="px-2 bg-teal-500 m-5 p-5 rounded-md"
              type="submit"
            >
              Submit
            </button>
          </form>
        </article>
      </main>
    </div>
  );
}

export default MerchUpdate;
