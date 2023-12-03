import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
function Merch() {
  const [merchLists, setMerchLists] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get("http://localhost:8001/api/merches")
      .then((result) => {
        setMerchLists(result.data);
      })
      .catch((err) => {
        console.log("Error fetch Data.", err);
      });
  }, []);
  return (
    <>
      <main className="bg-cover bg-gradient-to-br from-[#233d52] via-[#173955] to-[#051431]">
        {merchLists
          .map((post) => {
            return (
              <ul>
                <figure key={post._id}>
                  <p>{post.name}</p>
                  <p>{post.price}</p>
                </figure>
              </ul>
            );
          })
          .reverse()}
      </main>
    </>
  );
}

export default Merch;
