import axios from "axios";
import React, { FormEvent, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Perks from "../components/Perks";
import PhotosUploader from "../components/PhotosUploader";

export default function PlacesPage() {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState("");

  function inputHeader(text: string) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text: string) {
    return <p className="text-gray-500 text-sm">{text} </p>;
  }

  function preInput(header: string, description: string) {
    const [fsdf, sdfsdf] = useState();
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  const addNewPlace = async (e: FormEvent) => {
    e.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    };
    await axios.post("/places", placeData);
    setRedirect("/account/places");
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            to={"/account/places/new"}
            className="bg-primary text-white py-2 px-6 rounded-full inline-flex gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new Place
          </Link>
        </div>
      )}
      {action === "new" && (
        <div>
          <form onSubmit={addNewPlace}>
            {preInput(
              "Title",
              "Title for your place should be short and catchy as in advertisement."
            )}
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="title, for example: My lovely apt"
            />
            {preInput("Address", "Address to your place.")}
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              placeholder="address"
            />
            {preInput("Photos", "more = better")}
            <PhotosUploader
              addedPhotos={addedPhotos}
              onChange={setAddedPhotos}
            />
            <h2 className="text-2xl mt-4">Description</h2>
            <p className="text-gray-500 text-sm">description of the place</p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <h2 className="text-2xl mt-4">Perks</h2>
            <p className="text-gray-500 text-sm">
              select all the perks of your place
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mt-2">
              <Perks selected={perks} onChange={setPerks} />
            </div>
            <div></div>
            <h2 className="text-2xl mt-4">Extra info</h2>
            <p className="text-gray-500 text-sm">house rules, etc</p>
            <textarea
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
            />
            <h2 className="text-2xl mt-4">Check in & out times, max guests</h2>
            <p className="text-gray-500 text-sm">
              add check in and out times, remember to have some time window to
              cleaning room for guests
            </p>
            <div className="grid gap-2 sm:grid-cols-3">
              <div>
                <h3 className="mt-2 -mb-1">Check in time</h3>
                <input
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  type="text"
                  placeholder="14"
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Check out time</h3>

                <input
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  type="text"
                  placeholder="11"
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Max number of guests</h3>

                <input
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
                  type="number"
                />
              </div>
            </div>
            <button className="primary my-4">Save</button>
          </form>
        </div>
      )}
    </div>
  );
}
