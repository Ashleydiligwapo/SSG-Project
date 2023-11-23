import React, { useEffect, useState } from "react";
import Background from "../components/background";
import ChakraSlider from "../components/ChakraSlider";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { listAll, getDownloadURL, ref } from "firebase/storage";
import Footer from "../components/Footer";
import bg from "../assets/building.png";
function FreedomCode({ isAuth }) {
  const [postLists, setPostLists] = useState([]);
  const [imageLists, setImageLists] = useState([]);
  const imagesListRef = ref(storage, "FreedomCodeImages/");

  useEffect(() => {
    const postsCollectionRef = collection(db, "FreedomCode");
    const getPosts = async () => {
      try {
        const data = await getDocs(postsCollectionRef);
        setPostLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error("Error firebase:", error);
      }
    };
    getPosts();
  });

  useEffect(() => {
    listAll(imagesListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageLists();
        });
      });
    });
  });

  return (
    <div>
      <main className="max-w-full max-h-full m-0 bg-gradient-to-br  from-[#224866] via-[#073255] to-[#051431]">
        <article className="container mx-auto  py-8">
          <figure className="grid grid-cols-1 ssm:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 ">
            {postLists.map((post) => {
              return (
                <a href={post.FcHref} target="_blank">
                  <figure
                    className=" rounded-xl bg-gradient-to-r from-[#eec64d] via-[#ebd650] to-[#ce9b02] hover:bg-[#fff]  font-quicksand my-10 ssm:grid ssm:max-h-full ssm:pb-3 sm:pb-5 sm:text-center md:pb-2 md:flex md:text-left md:h-32 md:pr-20 md:ml-5 "
                    key={post.id}
                  >
                    <img
                      className="max-h-full object-cover ssm:rounded-t-lg ssm:rounded-none ssm:h-40 ssm:mx-0 ssm:mt-0 ssm:bg-black  ssm:w-full h-full sm:grid sm:w-full md:w-64 md:mx-1 md:mt-1 md:rounded-xl "
                      src={bg}
                    />
                    <div className="font-poppins ssm:p-5 sm:text-left md:p-5">
                      <p className="font-bold">{post.FcTitle} </p>
                      <p className="text-xs font-thin italic mb-4">
                        {post.FcDate}
                      </p>

                      <p className="font-quicksand">" {post.FcPostText} "</p>
                    </div>
                  </figure>
                </a>
              );
            })}
          </figure>
        </article>
      </main>
      <Footer />
    </div>
  );
}

export default FreedomCode;
