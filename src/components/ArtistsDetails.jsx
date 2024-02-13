import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import wavs from '../../public/wavs.gif'

const ArtistsDetails = () => {
  const navigate = useNavigate();
  let location = useLocation();
  let id = location.pathname;
  let newid = id.split("/");
  let finalid = newid[3];

  const [details, setdetails] = useState([]);
  const [songlink, setsonglink] = useState([]);
  var [index, setindex] = useState("");
  var [page, setpage] = useState(1);

  const Getdetails = async () => {
    try {
      const { data } = await axios.get(
        `https://saavn.dev/artists/${finalid}/songs?page=${page}`
      );
      setdetails((prevState) => [...prevState, ...data.data.results]);
    } catch (error) {
      console.log("error", error);
    }
  };

  function audioseter(i) {
    setindex(i);
    setsonglink([details[i]]);
  }

  function next() {
    if (index < details.length - 1) {
      setindex(index++);
      audioseter(index);
    } else {
      setindex(0);
      setsonglink([details[0]]);
    }
  }
  function pre() {
    if (index > 0) {
      setindex(index--);
      audioseter(index);
    } else {
      setindex(details.length - 1);
      setsonglink([details[details.length - 1]]);
    }
  }

  const handleDownloadSong = async (url, name, img) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${name}.mp3`;

      const image = document.createElement("img");
      image.src = `${img}`;
      link.appendChild(image);

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
    } catch (error) {
      console.log("Error fetching or downloading files", error);
    }
  };

  function seccall() {
    const intervalId = setInterval(() => {
      if (details.length >= 0 && page<20) {
        setpage(page+1);
        Getdetails();
      }
    }, 5000);
    return intervalId;
  }

  useEffect(() => {
    var interval = seccall();

    return () => clearInterval(interval);
  }, [details,page]);



  var title = songlink[0]?.name;
  document.title = `${title ? title : "THE ULTIMATE SONGS"}`;
  

  return details.length ? (
    <div className=" w-full  bg-slate-700">
      <div className="w-full flex items-center gap-3 sm:h-[5vh]  h-[10vh]">
        <i
          onClick={() => navigate(-1)}
          className="text-3xl cursor-pointer ml-5 bg-green-500 rounded-full ri-arrow-left-line"
        ></i>
        <h1 className="text-xl text-zinc-300 font-black">THE ULTIMATE SONGS</h1>
      </div>

      <div className="w-full text-white p-10 sm:p-3 sm:gap-3 h-[70vh] overflow-y-auto flex sm:block flex-wrap gap-7 justify-center ">
        {details?.map((d, i) => (
          <Link
            key={i}
            onClick={() => audioseter(i)}
            className="relative hover:scale-110 duration-150 w-[15vw] sm:mb-3 sm:w-full sm:flex sm:items-center sm:gap-3  rounded-md h-[20vw] sm:h-[15vh]  "
          >
            <img
              className="w-full h-[15vw] sm:h-[15vh] sm:w-[15vh] rounded-md"
              src={d.image[2].link}
              alt=""
            />
            <img
              className={`absolute top-0 w-[20%] sm:w-[10%] rounded-md ${
                i === index ? "block" : "hidden"
              } `}
              src={wavs}
              alt=""
            />
            <h3 className={`text-sm sm:text-xs  font-semibold ${i === index && "text-green-300"}`}>{d.name}</h3>
          </Link>
        ))}

        <div className="flex gap-3 text-2xl  ">
          <h1>MADE BY ❤️ HARSH PATEL</h1>
          <a
            target="_blank"
            href="https://www.instagram.com/harsh_patel_80874/"
          >
            <i className=" ri-instagram-fill"></i>
          </a>
        </div>
      </div>
      <div className="flex  gap-3 items-center  w-full min-h-[20vh] sm:min-h-[25vh] bg-slate-600  ">
        {songlink?.map((e, i) => (
          <div
            key={i}
            className="flex sm:block w-[70%] sm:w-full sm:h-full items-center justify-center gap-3"
          >
            <div className="w-[25vw] sm:w-full  flex gap-3 items-center sm:justify-center rounded-md  h-[7vw] sm:h-[30vw]">
              <img
                className="rounded-md h-[7vw] sm:h-[25vw]"
                src={e.image[2]?.link}
                alt=""
              />
              <h3 className=" sm:w-[30%] text-white text-sm font-semibold">
                {e.name}
              </h3>
              <i
                onClick={() =>
                  handleDownloadSong(
                    e.downloadUrl[4].link,
                    e.name,
                    e.image[2].link
                  )
                }
                className=" flex cursor-pointer  items-center justify-center bg-green-700 sm:w-[9vw] sm:h-[9vw] w-[3vw] h-[3vw]   rounded-full text-2xl ri-download-line"
              ></i>
            </div>
            <div className="w-[55%]  sm:w-full h-[10vh] flex gap-3 sm:gap-1 items-center justify-center">
              <i
                onClick={pre}
                className="text-3xl text-white bg-zinc-800 cursor-pointer rounded-full ri-skip-back-mini-fill"
              ></i>
              <audio
                className="w-[80%] "
                controls
                autoPlay
                onEnded={next}
                src={e.downloadUrl[4]?.link}
              ></audio>
              <i
                onClick={next}
                className=" text-3xl text-white bg-zinc-800 cursor-pointer rounded-full ri-skip-right-fill"
              ></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default ArtistsDetails;
