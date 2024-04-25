import React, { useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Import = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const uploadedSongs = JSON.parse(e.target.result);
        const existingSongs =
          JSON.parse(localStorage.getItem("likeData")) || [];

        // Filter out songs that already exist in local storage
        const newSongs = uploadedSongs.filter(
          (song) =>
            !existingSongs.some((existingSong) => existingSong.id === song.id)
        );

        // Merge new songs with existing data
        const mergedData = [...existingSongs, ...newSongs.reverse()]; // Reverse order

        // Store merged data in local storage
        localStorage.setItem("likeData", JSON.stringify(mergedData));

        alert("Songs imported successfully!");
        navi();
      } catch (error) {
        alert("Error parsing file. Please make sure the file is valid JSON.");
      }
    };

    reader.readAsText(file);
  };

  function navi() {
    navigate("/likes");
  }
  return (
    <div className=" w-full h-screen  bg-slate-700">
      <div className="w-full  flex items-center gap-3  h-[10vh]">
        <i
          onClick={() => navigate(-1)}
          className="text-3xl cursor-pointer ml-5 bg-green-500 rounded-full ri-arrow-left-line"
        ></i>
        <h1 className="text-xl text-zinc-300 font-black">THE ULTIMATE SONGS</h1>
      </div>
      <div className="w-full flex flex-col gap-10  items-center h-[90vh] ">
        <h1 className="text-4xl font-black text-zinc-400 ">Import Songs</h1>
        <input
          ref={fileInputRef}
          className="hidden"
          type="file"
          accept=".json"
          onChange={handleFileUpload}
        />
        <div className="flex flex-col items-center justify-center w-[30%] sm:w-[80%] p-10 rounded-lg bg-neutral-600">
          <i onClick={() => fileInputRef.current.click()} className="ri-import-fill text-[10vw] sm:text-[30vw] cursor-pointer hover:scale-90 duration-300 text-zinc-400 hover:text-zinc-800 "></i>
          <button
            onClick={() => fileInputRef.current.click()}
            className="w-fit h-fit p-2 sm:px-6 sm:py-3 font-bold text-zinc-300 hover:scale-90 sm:hover:scale-100 duration-300 bg-slate-500 rounded-md hover:bg-red-400 "
          >
            Select File
          </button>
        </div>
      </div>
    </div>
  );
};

export default Import;
