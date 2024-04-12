import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import wavs from "../../public/wavs.gif";
import {
  animate,
  circIn,
  circInOut,
  circOut,
  easeIn,
  easeInOut,
  easeOut,
  motion,
} from "framer-motion";
import { useAnimate, stagger } from "framer-motion";
import { Bounce, Expo, Power4, Sine } from "gsap/all";
import { Circ } from "gsap/all";
import toast, { Toaster } from "react-hot-toast";

const Songs = () => {
  const navigate = useNavigate();
  const [query, setquery] = useState("");
  const [requery, setrequery] = useState("");
  const [search, setsearch] = useState([]);
  var [index, setindex] = useState("");
  const [songlink, setsonglink] = useState([]);
  var [page, setpage] = useState(1);
  const [searchclick, setsearchclick] = useState(false);
  const [like, setlike] = useState(false);
  const [like2, setlike2] = useState(false);
  const [existingData, setexistingData] = useState(null);
  const audioRef = useRef();

  const Getsearch = async () => {
    try {
      const { data } = await axios.get(
        `https://jiosaavan-api-2-harsh-patel.vercel.app/api/search/songs?query=${query}&page=${page}&limit=10`
        // `https://jiosaavan-harsh-patel.vercel.app/search/songs?query=${query}&page=${page}&limit=10`
      );

      setsearch((prevState) => [...prevState, ...data.data.results]);
    } catch (error) {
      console.log("error", error);
    }
  };

  // function setdata() {
  //   setsearch([]);
  //   setsonglink([]);
  //   setindex("");
  //   setpage(1);
  // }
  function searchClick() {
    if (query !== requery) {
      toast.success(`Searching ${query} , Wait For Results`);
      setsearch([]);
      setsonglink([]);
      setindex("");
      setpage(1);
      setrequery(query);
      setsearchclick(!searchclick);
      
    }
    else{
      toast.error(`Please Check Your Search Query , Its Same As Before `);
    }
  }

  function audioseter(i) {
    setindex(i);
    setsonglink([search[i]]);
  }

  function likeset(e) {
    // console.log(e);
    var tf =
      localStorage.getItem("likeData") &&
      JSON.parse(localStorage.getItem("likeData")).some(
        (item) => item.id == e?.id
      );
    // console.log(tf);
    // console.log(e?.id);
    setlike(tf);
    // console.log(like);
  }

  function likehandle(i) {
    // Retrieve existing data from localStorage
    let existingData = localStorage.getItem("likeData");

    // Initialize an array to hold the updated data
    let updatedData = [];

    // If existing data is found, parse it from JSON
    if (existingData) {
      updatedData = JSON.parse(existingData);
    }

    // Check if the new data already exists in the existing data
    let exists = updatedData.some((item) => item.id === i.id);

    if (!exists) {
      // If not, add the new data
      updatedData.push(i);
      // Store the updated data back into localStorage
      localStorage.setItem("likeData", JSON.stringify(updatedData));
      setlike(true);
      toast.success(`Song (${i?.name}) added to Likes section ✅`);
    } else {
      // setlike(true);
      // Otherwise, inform the user that the song is already liked
      // console.log("You've already liked this song.");
      // toast.error("You've already liked this song.");

      setlike(false);
      let existingData = localStorage.getItem("likeData");

      // If no data exists, there's nothing to remove
      if (!existingData) {
        console.log("No data found in localStorage.");
        return;
      }
      // Parse the existing data from JSON
      let updatedData = JSON.parse(existingData);

      // Find the index of the song with the given ID in the existing data
      const indexToRemove = updatedData.findIndex((item) => item.id === i.id);

      // If the song is found, remove it from the array
      if (indexToRemove !== -1) {
        updatedData.splice(indexToRemove, 1);

        // Store the updated data back into localStorage
        localStorage.setItem("likeData", JSON.stringify(updatedData));
        //   console.log("Song removed successfully.");
        toast.success(`Song (${i?.name}) removed successfully. 🚮`);

        // if (index>0 && details.length>=0) {
        //     setrerender(!rerender)
        //     var index2 = index-1
        //     setindex(index2);
        //     setsonglink([details[index2]]);
        // }
        // else{
        //     setrerender(!rerender)
        // }
      } else {
        toast.error("Song not found in localStorage.");
        //   console.log("Song not found in localStorage.");
      }
    }
  }

  function likehandle2(i) {
    // Retrieve existing data from localStorage
    let existingData = localStorage.getItem("likeData");

    // Initialize an array to hold the updated data
    let updatedData = [];

    // If existing data is found, parse it from JSON
    if (existingData) {
      updatedData = JSON.parse(existingData);
    }

    // Check if the new data already exists in the existing data
    let exists = updatedData.some((item) => item.id === i.id);

    if (!exists) {
      // If not, add the new data
      updatedData.push(i);
      // Store the updated data back into localStorage
      localStorage.setItem("likeData", JSON.stringify(updatedData));
      setlike2(!like2);
      toast.success(`Song (${i?.name}) added to Likes section. ✅`);
    } else {
      // setlike(true);
      // Otherwise, inform the user that the song is already liked
      // console.log("You've already liked this song.");
      // toast.error("You've already liked this song.");

      setlike2(!like2);
      let existingData = localStorage.getItem("likeData");

      // If no data exists, there's nothing to remove
      if (!existingData) {
        console.log("No data found in localStorage.");
        return;
      }
      // Parse the existing data from JSON
      let updatedData = JSON.parse(existingData);

      // Find the index of the song with the given ID in the existing data
      const indexToRemove = updatedData.findIndex((item) => item.id === i.id);

      // If the song is found, remove it from the array
      if (indexToRemove !== -1) {
        updatedData.splice(indexToRemove, 1);

        // Store the updated data back into localStorage
        localStorage.setItem("likeData", JSON.stringify(updatedData));
        //   console.log("Song removed successfully.");
        toast.success(`Song (${i?.name}) removed successfully. 🚮`);

        // if (index>0 && details.length>=0) {
        //     setrerender(!rerender)
        //     var index2 = index-1
        //     setindex(index2);
        //     setsonglink([details[index2]]);
        // }
        // else{
        //     setrerender(!rerender)
        // }
      } else {
        toast.error("Song not found in localStorage.");
        //   console.log("Song not found in localStorage.");
      }
    }
  }


  
  // const initializeMediaSession = () => {
  //   const isIOS = /(iPhone|iPod|iPad)/i.test(navigator.userAgent);
  
  //   if (!isIOS && "mediaSession" in navigator) {
  //     navigator.mediaSession.metadata = new MediaMetadata({
  //       title: songlink[0]?.name || "",
  //       artist: songlink[0]?.album?.name || "",
  //       // artist: songlink[0]?.artists?.primary?.map((e)=>e.name) || "",
  //       artwork: [
  //         {
  //           src: songlink[0]?.image[2]?.url || "",
  //           sizes: "512x512",
  //           type: "image/jpeg",
  //         },
  //       ],
  //     });
  
  //     navigator.mediaSession.setActionHandler("play", function () {
  //       // Handle play action
  //       if (audioRef.current) {
  //         audioRef.current.play().catch((error) => {
  //           console.error("Play error:", error);
  //         });
  //       }
  //     });
  
  //     navigator.mediaSession.setActionHandler("pause", function () {
  //       // Handle pause action
  //       if (audioRef.current) {
  //         audioRef.current.pause().catch((error) => {
  //           console.error("Pause error:", error);
  //         });
  //       }
  //     });
  
  //     navigator.mediaSession.setActionHandler("previoustrack", function () {
  //       pre();
  //     });
  
  //     navigator.mediaSession.setActionHandler("nexttrack", function () {
  //       next();
  //     });
  //   } else {
  //     console.warn("MediaSession API is not supported or the device is iOS.");
  //   }
  // };

  // const initializeMediaSession = () => {
  //   const isIOS = /(iPhone|iPod|iPad)/i.test(navigator.userAgent);
  
  //   if ("mediaSession" in navigator) {
  //     navigator.mediaSession.metadata = new MediaMetadata({
  //       title: songlink[0]?.name || "",
  //       artist: songlink[0]?.album?.name || "",
  //       artwork: [
  //         {
  //           src: songlink[0]?.image[2]?.url || "",
  //           sizes: "512x512",
  //           type: "image/jpeg",
  //         },
  //       ],
  //     });
  
  //     navigator.mediaSession.setActionHandler("play", function () {
  //       // Handle play action
  //       if (audioRef.current) {
  //         audioRef.current.play().catch((error) => {
  //           console.error("Play error:", error);
  //         });
  //       }
  //     });
  
  //     navigator.mediaSession.setActionHandler("pause", function () {
  //       // Handle pause action
  //       if (audioRef.current) {
  //         audioRef.current.pause().catch((error) => {
  //           console.error("Pause error:", error);
  //         });
  //       }
  //     });
  
  //     navigator.mediaSession.setActionHandler("previoustrack", function () {
  //       pre();
  //     });
  
  //     navigator.mediaSession.setActionHandler("nexttrack", function () {
  //       next();
  //     });
  //   } else {
  //     console.warn("MediaSession API is not supported.");
  //   }
  
  //   if (isIOS) {
  //     // Enable background audio playback for iOS
  //     document.addEventListener("visibilitychange", () => {
  //       if (document.visibilityState === "visible") {
  //         if (audioRef.current && audioRef.current.paused) {
  //           audioRef.current.play().catch((error) => {
  //             console.error("Play error:", error);
  //           });
  //         }
  //       } else {
  //         if (audioRef.current && !audioRef.current.paused) {
  //           audioRef.current.pause().catch((error) => {
  //             console.error("Pause error:", error);
  //           });
  //         }
  //       }
  //     });
  //   }
  // };

  const initializeMediaSession = () => {
    const isIOS = /(iPhone|iPod|iPad)/i.test(navigator.userAgent);
  
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: songlink[0]?.name || "",
        artist: songlink[0]?.album?.name || "",
        artwork: [
          {
            src: songlink[0]?.image[2]?.url || "",
            sizes: "512x512",
            type: "image/jpeg",
          },
        ],
      });
  
      navigator.mediaSession.setActionHandler("play", () => {
        audioRef.current.play().catch((error) => {
          console.error("Play error:", error);
        });
      });
  
      navigator.mediaSession.setActionHandler("pause", () => {
        audioRef.current.pause().catch((error) => {
          console.error("Pause error:", error);
        });
      });
  
      navigator.mediaSession.setActionHandler("previoustrack", () => {
        pre();
      });
  
      navigator.mediaSession.setActionHandler("nexttrack", () => {
        next();
      });
    } else {
      console.warn("MediaSession API is not supported.");
    }
  
    if (isIOS) {
      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          if (audioRef.current && audioRef.current.paused) {
            audioRef.current.play().catch((error) => {
              console.error("Play error:", error);
            });
          }
        } else {
          if (audioRef.current && !audioRef.current.paused) {
            audioRef.current.pause().catch((error) => {
              console.error("Pause error:", error);
            });
          }
        }
      };
  
      document.addEventListener("visibilitychange", handleVisibilityChange);
  
      return () => {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    }
  };
  

  
  

  
  

  

  function next() {
    if (index < search.length - 1) {
      setindex(index++);
      audioseter(index);
    } else {
      setindex(0);
      setsonglink([search[0]]);
    }
  }
  function pre() {
    if (index > 0) {
      setindex(index--);
      audioseter(index);
    } else {
      setindex(search.length - 1);
      setsonglink([search[search.length - 1]]);
    }
  }

  const handleDownloadSong = async (url, name) => {
    try {
      toast.success(`Song ${name} Downloading...`);
      const res = await fetch(url);
      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${name}.mp3`;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      toast.success("Song Downloaded ✅");
    } catch (error) {
      console.log("Error fetching or downloading files", error);
    }
  };

  function seccall() {
    const intervalId = setInterval(() => {
      if (
        (search.length >= 0 && page < 20) ||
        query.length !== requery.length
      ) {
        setpage(page + 1);
        Getsearch();
        // setrequery(query);
      }
    }, 1000);
    return intervalId;
  }

  useEffect(() => {
    if (query.length > 0) {
      var interval = seccall();
    }

    return () => clearInterval(interval);
  }, [searchclick, search, page]);

  useEffect(() => {
    likeset(songlink[0]);
  }, [search, like, songlink, like2, existingData]);

  useEffect(() => {
    // Retrieve all data from localStorage
    const allData = localStorage.getItem("likeData");

    // Check if data exists in localStorage
    if (allData) {
      // Parse the JSON string to convert it into a JavaScript object
      const parsedData = JSON.parse(allData);

      // Now you can use the parsedData object
      setexistingData(parsedData);
    } else {
      console.log("No data found in localStorage.");
    }
  }, [search, like, songlink, like2]);

  // useEffect(() => {
  //   if (query !== "") {
  //     setdata();
  //   }
  // }, [query]);

  // useEffect(() => {
  //   const isIOS = /(iPhone|iPod|iPad)/i.test(navigator.userAgent);
  
  //   if (!isIOS && songlink.length > 0) {
  //     audioRef.current.play();
  //     initializeMediaSession();
  //   }
  // }, [songlink]);

  // useEffect(() => {
  //   const isIOS = /(iPhone|iPod|iPad)/i.test(navigator.userAgent);
  
  //   if (songlink.length > 0) {
  //     if (!isIOS) {
  //       // For non-iOS devices, autoplay and initialize media session
  //       audioRef.current.play();
  //       initializeMediaSession();
  //     } else {
  //       // For iOS devices, wait for user interaction to start playback
  //       const handleUserInteraction = () => {
  //         audioRef.current.play().catch(error => {
  //           console.error('Play error:', error);
  //         });
  //         initializeMediaSession();
  //         // Remove event listener after the first user interaction
  //         document.removeEventListener('click', handleUserInteraction);
  //       };
  //       document.addEventListener('click', handleUserInteraction);
  //     }
  //   }
  // }, [songlink]);

  // useEffect(() => {
  //   initializeMediaSession();
  // }, [songlink]);

  useEffect(() => {
    initializeMediaSession();
  }, [songlink]);
  
  useEffect(() => {
    if (songlink.length > 0) {
      if (!/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
        audioRef.current.play().catch((error) => {
          console.error("Autoplay error:", error);
        });
      }
    }
  }, [songlink]);

  





  
  
  

  var title = songlink[0]?.name;

  document.title = `${title ? title : "THE ULTIMATE SONGS"}`;
  console.log(search);
  // console.log(searchclick);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
      className="w-full h-screen bg-slate-700 "
    >
      <Toaster position="top-center" reverseOrder={false} />
      <motion.div
        initial={{ y: -50, scale: 0 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ ease: Circ.easeIn, duration: 0.7, delay: 0.7 }}
        className="search gap-3 w-full sm:w-full pt-[3vh] sm:h-[5vh] h-[10vh] flex items-center justify-center "
      >
        <i
          onClick={() => navigate(-1)}
          className="ml-5 cursor-pointer text-3xl bg-green-500 rounded-full ri-arrow-left-line"
        ></i>
        {/* <i className=" text-2xl ri-search-2-line"></i> */}

        <input
          className=" bg-black  rounded-md p-3 sm:text-sm text-white border-none outline-none w-[50%] sm:w-[50%] sm:h-[5vh] h-[8vh]"
          onChange={(e) => setquery(e.target.value)}
          placeholder="Search Songs"
          type="search"
          name=""
          id=""
        />
        <h3
          onClick={() => searchClick()}
          className="duration-300 cursor-pointer hover:text-slate-400 text-base  bg-slate-400 p-2 rounded-md hover:bg-slate-600 hover:scale-90"
        >
          Search <i className="  ri-search-2-line"></i>
        </h3>
      </motion.div>
      {/* <div className="w-full text-white mt-[3vh] p-10 sm:p-3 sm:gap-3 h-[64vh] overflow-y-auto flex sm:block flex-wrap gap-7 justify-center ">
        {search?.map((d, i) => (
          <div
            key={i}
            onClick={() => audioseter(i)}
            className=" relative hover:scale-90 sm:hover:scale-100 duration-150 w-[15vw] sm:mb-3 sm:w-full sm:flex sm:items-center sm:gap-3  rounded-md h-[20vw] sm:h-[15vh] cursor-pointer  "
          >
            <motion.img
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ ease: Circ.easeIn, duration: 0.3 }}
              className=" w-full h-[15vw] sm:h-[15vh] sm:w-[15vh] rounded-md"
              src={d.image[2].url}
              alt=""
            />
            <img
              className={`absolute top-0 w-[20%] sm:w-[10%] rounded-md ${
                i === index ? "block" : "hidden"
              } `}
              src={wavs}
              alt=""
            />
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ ease: Circ.easeIn, duration: 0.3 }}
              className="flex flex-col"
            >
              <h3
                className={`text-sm sm:text-xs  font-bold ${
                  i === index && "text-green-300"
                }`}
              >
                {d.name}
              </h3>
              <h4 className="text-xs sm:text-[2.5vw] text-zinc-300 ">
                {d.album.name}
              </h4>
            </motion.div>
          </div>
        ))}
        {search.length > 0 && (
          <div className="flex gap-3 text-2xl  ">
            <h1>MADE BY ❤️ HARSH PATEL</h1>
            <a
              target="_blank"
              href="https://www.instagram.com/harsh_patel_80874/"
            >
              <i className=" ri-instagram-fill"></i>
            </a>
          </div>
        )}
      </div> */}

      <div className="flex w-full mt-[3vh]  text-white p-10 sm:p-3 sm:gap-3 h-[64vh] overflow-y-auto  sm:block flex-wrap gap-5 justify-center ">
        {search?.map((d, i) => (
          <div
            title="click on song image or name to play the song"
            key={i}
            className="items-center justify-center relative hover:scale-95 sm:hover:scale-100 duration-150 w-[40%] flex mb-3 sm:mb-3 sm:w-full sm:flex sm:items-center sm:gap-3  rounded-md h-[10vw] sm:h-[15vh] cursor-pointer bg-slate-600  "
          >
            <div
              onClick={() => audioseter(i)}
              className="flex w-[80%] items-center"
            >
              <motion.img
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7 }}
                viewport={{ once: true }}
                className="w-[10vw] h-[10vw] sm:h-[15vh] sm:w-[15vh] rounded-md"
                src={d.image[2].url}
                alt=""
              />
              <img
                className={`absolute top-0 w-[8%] sm:w-[10%] rounded-md ${
                  d.id === songlink[0]?.id ? "block" : "hidden"
                } `}
                src={wavs}
                alt=""
              />
              <div className="ml-3 sm:ml-3 flex justify-center items-center gap-5 mt-2">
                <div className="flex flex-col">
                  <h3
                    className={`text-sm sm:text-xs leading-none  font-bold ${
                      d.id === songlink[0]?.id && "text-green-300"
                    }`}
                  >
                    {d.name}
                  </h3>
                  <h4 className="text-xs sm:text-[2.5vw] text-zinc-300 ">
                    {d.album.name}
                  </h4>
                </div>
              </div>
            </div>

            {existingData?.find((element) => element?.id == d?.id) ? (
              <i
                onClick={() => likehandle2(d)}
                className={`text-xl m-auto flex w-[3vw] sm:w-[9vw] rounded-full justify-center items-center h-[3vw] sm:h-[9vw]    duration-300 cursor-pointer text-red-500  ri-heart-3-fill`}
              ></i>
            ) : (
              <i
                onClick={() => likehandle2(d)}
                className={`text-xl m-auto flex w-[3vw] sm:w-[9vw] rounded-full justify-center items-center h-[3vw] sm:h-[9vw]   duration-300 cursor-pointer text-zinc-300  ri-heart-3-fill`}
              ></i>
            )}

            {/* <i
                onClick={() => likehandle(d)}
                className={`text-xl m-auto flex w-[3vw] sm:w-[9vw] rounded-full justify-center items-center h-[3vw] sm:h-[9vw]  bg-red-500   text-zinc-300 hover:scale-150 sm:hover:scale-100 duration-300 cursor-pointer ${
                  like ? "text-red-500" : "text-zinc-300"
                }  ri-heart-3-fill`}
              ></i> */}

            {/* <i
              title="Remove Song "
              onClick={() => removehandle(d.id)}
              className="m-auto flex w-[3vw] sm:w-[9vw] rounded-full justify-center items-center h-[3vw] sm:h-[9vw] text-xl bg-red-500  duration-300 cursor-pointer text-zinc-300 ri-dislike-fill"
            ></i> */}
          </div>
        ))}

        {/* <div className="flex gap-3 text-2xl  ">
          <h1>MADE BY ❤️ HARSH PATEL</h1>
          <a
            target="_blank"
            href="https://www.instagram.com/harsh_patel_80874/"
          >
            <i className=" ri-instagram-fill"></i>
          </a>
        </div> */}
      </div>
      <motion.div
        className={
          songlink.length > 0
            ? ` duration-700 flex rounded-full sm:rounded-none sm:rounded-t-[30%]  gap-3 items-center justify-center  w-full min-h-[20vh] sm:min-h-[28vh] bg-slate-600 `
            : "block"
        }
      >
        {songlink?.map((e, i) => (
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            key={i}
            className="flex sm:block w-full sm:w-full sm:h-full items-center justify-center gap-3"
          >
            <motion.div
              initial={{ x: -50, opacity: 0, scale: 0 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              className="w-[25vw] sm:w-full  flex gap-3 items-center sm:justify-center rounded-md  h-[7vw] sm:h-[30vw]"
            >
              <motion.img
                initial={{ x: -50, opacity: 0, scale: 0 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                className="rounded-md h-[7vw] sm:h-[25vw]"
                src={e?.image[2]?.url}
                alt=""
              />
              <h3 className=" sm:w-[30%] text-white text-xs font-semibold">
                {e?.name}
              </h3>
              <i
                onClick={() =>
                  handleDownloadSong(e?.downloadUrl[4].url, e.name)
                }
                className="hidden sm:flex cursor-pointer  items-center justify-center bg-green-700 sm:w-[9vw] sm:h-[9vw] w-[3vw] h-[3vw]   rounded-full text-2xl ri-download-line"
              ></i>

              <i
                onClick={() => likehandle(e)}
                className={`text-xl hover:scale-150 sm:hover:scale-100 duration-300 cursor-pointer ${
                  like ? "text-red-500" : "text-zinc-300"
                }  ri-heart-3-fill`}
              ></i>
              {/* <i onClick={()=>navigate(`/songs/details/${e.id}`)} className="text-zinc-300 text-xl hover:scale-150 sm:hover:scale-100 duration-300 cursor-pointer ri-information-fill"></i> */}
              {/*               
              {localStorage.getItem("likeData") &&
                JSON.parse(localStorage.getItem("likeData")).some(
                  (item) => item.id === e.id) ? <i
                    onClick={() => likehandle(e)}
                    className={`text-xl cursor-pointer text-red-500 ri-heart-3-fill`}
                  ></i> :  <i
                  onClick={() => likehandle(e)}
                  className={`text-xl cursor-pointer text-zinc-300 ri-heart-3-fill`}
                ></i> } */}

              {/* {like ? (
                <i
                  onClick={() => likehandle(e)}
                  className="text-xl cursor-pointer ri-heart-3-fill"
                ></i>
              ) : (
                <i
                  onClick={() => likehandle(e)}
                  className="text-xl cursor-pointer text-zinc-300  ri-heart-3-fill"
                ></i>
              )} */}
            </motion.div>
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              className="w-[35%]  sm:w-full h-[10vh] flex gap-3 sm:gap-1 items-center justify-center"
            >
              <button
                onClick={pre}
                className="text-3xl text-white bg-zinc-800 cursor-pointer rounded-full"
              >
                <i className="ri-skip-back-mini-fill"></i>
              </button>
              <audio
                className="w-[80%]"
                ref={audioRef}
                controls
                autoPlay
                onEnded={next}
                src={e?.downloadUrl[4]?.url}
              ></audio>
              <button
                onClick={next}
                className="text-3xl text-white bg-zinc-800 cursor-pointer rounded-full"
              >
                <i className="ri-skip-right-fill"></i>
              </button>
            </motion.div>
            <div className="sm:hidden flex flex-col text-[1vw] items-center  gap-2">
              <div>
                <h3 className="font-bold text-sm text-slate-400">
                  Download Options
                </h3>
              </div>
              <div className="flex flex-row-reverse gap-2 ">
                <p
                  onClick={() =>
                    handleDownloadSong(e.downloadUrl[0].url, e.name + " 12kbps")
                  }
                  className="duration-300 cursor-pointer hover:text-slate-400 hover:bg-slate-600 hover:scale-90 w-fit p-1 font-semibold rounded-md shadow-2xl bg-slate-400 flex flex-col items-center"
                >
                  12kbps <br />
                  <p className="text-xs">Very low quality</p>
                </p>
                <p
                  onClick={() =>
                    handleDownloadSong(e.downloadUrl[1].url, e.name + " 48kbps")
                  }
                  className="duration-300 cursor-pointer  hover:text-slate-400 hover:bg-slate-600 hover:scale-90 w-fit p-1 font-semibold rounded-md shadow-2xl bg-slate-400 flex flex-col items-center"
                >
                  48kbps <br />
                  <p className="text-xs">Low quality</p>
                </p>
                <p
                  onClick={() =>
                    handleDownloadSong(e.downloadUrl[2].url, e.name + " 96kbps")
                  }
                  className="duration-300 cursor-pointer  hover:text-slate-400 hover:bg-slate-600 hover:scale-90 w-fit p-1 font-semibold rounded-md shadow-2xl bg-slate-400 flex flex-col items-center"
                >
                  96kbps <br />
                  <p className="text-xs">Fair quality</p>
                </p>
                <p
                  onClick={() =>
                    handleDownloadSong(
                      e.downloadUrl[3].url,
                      e.name + " 160kbps"
                    )
                  }
                  className="duration-300 cursor-pointer  hover:text-slate-400 hover:bg-slate-600 hover:scale-90 w-fit p-1 font-semibold rounded-md shadow-2xl bg-slate-400 flex flex-col items-center"
                >
                  160kbps <br />
                  <p className="text-xs">Good quality</p>
                </p>
                <p
                  onClick={() =>
                    handleDownloadSong(
                      e.downloadUrl[4].url,
                      e.name + " 320kbps"
                    )
                  }
                  className="duration-300 cursor-pointer  hover:text-slate-400 hover:bg-slate-600 hover:scale-90 w-fit p-1 font-semibold rounded-md shadow-2xl bg-slate-400 flex flex-col items-center"
                >
                  320kbps <br />
                  <p className="text-xs"> High quality</p>
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Songs;
