import React, { useEffect, useState } from "react";
import OfficerBg from "../components/OfficerBg";
import JSONFile from "../components/JSON/data.file.officers.json";
import { AttachmentIcon } from "@chakra-ui/icons";
import { Text } from "@chakra-ui/react";
function Board() {
  const [electedItems, setElectedItems] = useState([]);
  const [governorsItems, setGovernorsItems] = useState([]);
  const [appointedItems, setAppointedItems] = useState([]);
  const [executiveItems, setExecutiveItems] = useState([]);

  useEffect(() => {
    const executiveData = JSONFile.filter((item) => item.isExecutive === true);
    const electedData = JSONFile.filter((item) => item.isElected === true);
    const governorsData = JSONFile.filter((item) => item.isGovernors === true);
    const appointedData = JSONFile.filter((item) => item.isAppointed === true);
    setExecutiveItems(executiveData);
    setElectedItems(electedData);
    setGovernorsItems(governorsData);
    setAppointedItems(appointedData);
  }, []);

  return (
    <main className=" bg-gradient-to-br from-[#224866] via-[#073255] to-[#051431]">
      <OfficerBg />
      <figure className=" ">
        <h1 className="py-14 text-2xl text-center uppercase text-amber-300 font-bebos ">
          SUPREME STUDENT GOVERNMENT
        </h1>
        <Text className="py-1 px-4 text-1xl text-center text-white font-quicksand ">
          The Cebu Technological University - Danao Campus Supreme Student
          Government is the highest governing body dedicated to serving
          students. body's collective interests by organizing programs,
          projects, and activities, as well as acting as a liaison between the
          school and the community administration and the student body to meet
          the needs of a better Campus life. The SSG has come to represent the
          pinnacle of leadership as It has been at the heart of several key
          reforms that have transformed CTU is what it is.
        </Text>
      </figure>
      <h1 className="py-20 text-4xl text-center uppercase text-white font-quicksand ">
        EXECUTIVE HEAD
      </h1>
      <article class="container mx-auto py-0">
        <figure
          data-aos="fade-down"
          className="flex justify-center sm:grid-cols-1 md:grid-cols-1 "
        >
          {executiveItems.map((item) => (
            <a href={item.link} target="_blank">
              <div
                //data-aos="fade-up"
                class="text-center place-content-center font-quicksand pb-3 mb-10 max-h-full max-w-full shadow-lg rounded-lg bg-gradient-to-br from-[#fcf9d0] via-[#fae7a3] to-[#ffd467]"
                key={item.Ex_id}
              >
                <img
                  className="max-h-96 bg-cover rounded-lg"
                  src={item.imageUrl}
                  alt={item.name}
                />

                <p className="text-lg font-bold uppercase pb-1 pt-4">
                  {item.name}
                </p>
                <p className="text-sm font-thin uppercase pb-1">
                  {item.position}
                </p>
              </div>
            </a>
          ))}
        </figure>
      </article>
      <h1 className="py-20 text-4xl text-center uppercase text-white font-quicksand ">
        ELECTED OFFICERS
      </h1>
      <article className=" container mx-auto py-8">
        <figure
          // data-aos="fade-up"
          className="grid  grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4"
        >
          {electedItems.map((item) => (
            <a href={item.link} target="_blank">
              <div
                class="text-center font-quicksand pb-3 mb-10 max-h-full max-w-full shadow-lg rounded-lg bg-gradient-to-br from-[#fcf9d0] via-[#fae7a3] to-[#ffd467] border border-[#11283b]"
                key={item.E_id}
              >
                <img
                  className="bg-cover rounded-lg"
                  src={item.imageUrl}
                  alt={item.name}
                />

                <a href={item.link} target="_blank">
                  <p className="text-lg font-bold uppercase pb-1 pt-4">
                    {item.name}
                  </p>
                </a>

                <p className="text-sm font-thin uppercase pb-1">
                  {item.position}
                </p>
              </div>
            </a>
          ))}
        </figure>
      </article>

      <h1 className="py-20 text-4xl text-center uppercase text-white font-quicksand ">
        GOVERNORS
      </h1>
      <article class="container mx-auto py-8">
        <figure
          // data-aos="fade-down"
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
        >
          {governorsItems.map((item) => (
            <a href={item.link} target="_blank">
              <div
                class="text-center font-quicksand pb-3 mb-10 max-h-full max-w-full shadow-lg rounded-lg bg-gradient-to-br from-[#fcf9d0] via-[#fae7a3] to-[#ffd467]"
                key={item.G_id}
              >
                <img
                  className="bg-cover rounded-lg"
                  src={item.imageUrl}
                  alt={item.name}
                />
                <a href={item.link} target="_blank">
                  <p className="text-lg font-bold uppercase pb-1 pt-4">
                    {item.name}
                  </p>
                </a>
                <p className="text-sm font-thin uppercase pb-1">
                  {item.position}
                </p>
              </div>
            </a>
          ))}
        </figure>
      </article>

      <h1 className="py-20 text-4xl text-center uppercase text-white font-quicksand ">
        APPOINTED OFFICERS
      </h1>
      <article class="container mx-auto py-8">
        <figure
          // data-aos="fade-up"
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
        >
          {appointedItems.map((item) => (
            <a href={item.link} target="_blank">
              <div
                class="text-center font-quicksand pb-3 mb-10 max-h-full max-w-full shadow-lg rounded-lg bg-gradient-to-br from-[#fcf9d0] via-[#fae7a3] to-[#ffd467]"
                key={item.A_id}
              >
                <img
                  className="bg-cover rounded-lg"
                  src={item.imageUrl}
                  alt={item.name}
                />
                <a href={item.link} target="_blank">
                  <p className="text-lg font-bold uppercase pb-1 pt-4">
                    {item.name}
                  </p>
                </a>
                <p className="text-sm font-thin uppercase pb-1">
                  {item.position}
                </p>
              </div>
            </a>
          ))}
        </figure>
      </article>
    </main>
  );
}
export default Board;
