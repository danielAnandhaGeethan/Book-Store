import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";

import { useSnackbar } from "notistack";
import { useParams } from "react-router";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book deleted successfully", { variant: "success" });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Error", { variant: "error" });
        setLoading(false);
      });
  };

  return (
    <section className="min-h-screen bg-gray-400">
      <div className="p-4">
        <BackButton />
        <h1 className="text-3xl my-4 flex justify-center">Delete Book</h1>
        {loading ? <Spinner /> : ""}
        <div className="flex flex-col items-center border-2 border-gray-300 rounded-xl w-[600px] p-8 mx-auto">
          <h3 className="text-2xl">
            Are you sure you want to delete this book ?{" "}
          </h3>
          <button
            className="p-4 bg-gray-500 text-lg focus:outline-white text-white m-8 w-full"
            onClick={handleDeleteBook}
          >
            Yes, Delete it
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeleteBook;
