import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
function UserEdit() {
  const serverURL = import.meta.env.VITE_SERVER_URL;
  const [userForm, setUserForm] = useState({
    to_name: "",
    quantity: "",
    prices: "",
    from_name: "",
    date: "",
    total: "",
    department: "",
    name: "",
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
      .get(`${serverURL}/api/merchpurchaseds/${id}`)
      .then((result) => {
        setUserForm({
          to_name: result.data.to_name,
          quantity: result.data.quantity,
          prices: result.data.prices,
          from_name: result.data.from_name,
          date: result.data.date,
          total: result.data.total,
          department: result.data.department,
          name: result.data.name,
        });
      })
      .catch((err) => {
        console.log("Error fetch: ", err);
      });
  }, [id]);

  const userPost = (e) => {
    e.preventDefault();

    const data = {
      quantity: userForm.quantity,
      total: userForm.prices * userForm.quantity,
    };
    axios
      .put(`${serverURL}/api/merchpurchaseds/${id}`, data)
      .then((result) => {
        alert("Updated.");
        navigate("/Cart");
      })
      .catch((err) => {
        console.log("Error updating.", err);
      });
  };
  return (
    <div>
      <main className="bg-cover bg-gradient-to-br from-[#233d52] via-[#173955] to-[#051431]">
        <article className="max-w-md mx-auto max-h-full h-96 rounded-xl overflow-hidden md:max-w-7xl">
          <form noValidate onSubmit={userPost}>
            <p className="text-2xl py-14 text-teal-50">
              Update Quantity:
              <input
                className="text-white bg-transparent uppercase px-2"
                type="text"
                name="name"
                value={userForm.quantity}
                disabled
              ></input>
            </p>
            <input
              className="my-2 px-5 p-2 pr-5 py-5 rounded-sm w-21"
              type="number"
              placeholder="Input quantity: "
              name="quantity"
              value={userForm.quantity}
              onChange={(event) => {
                setUserForm({
                  ...userForm,
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

export default UserEdit;
