import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useParams } from "react-router";
import { useSnackbar } from "notistack";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState();
  const [publishYear, setPublishYear] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((res) => {
        let result = res.data[0];
        setAuthor(result.author);
        setTitle(result.title);
        setPublishYear(result.publishYear);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then((res) => {
        setLoading(false);
        navigate("/");
        enqueueSnackbar("Book edited successfully", { variant: "success" });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
      });
  };

  return (
    <section className="min-h-screen bg-gray-400">
      <div className="p-4">
        <BackButton />
        <h1 className="text-3xl my-4 flex justify-center">Edit Book</h1>
        {loading ? <Spinner /> : ""}
        <div className="flex flex-col border-2 border-gray-300 rounded-xl w-[600px] p-4 mx-auto">
          <div className="my-4">
            <label className="block mb-2 text-xl font-medium text-gray-900">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-300 text-gray-900 text-md rounded-lg focus:border-blue-500 block w-full p-2.5 focus:outline-0"
            />
          </div>
          <div className="my-4">
            <label className="block mb-2 text-xl font-medium text-gray-900">
              Author
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="bg-gray-300 text-gray-900 text-md rounded-lg focus:border-blue-500 block w-full p-2.5 focus:outline-0"
            />
          </div>
          <div className="my-4">
            <label className="block mb-2 text-xl font-medium text-gray-900">
              Publish Year
            </label>
            <input
              type="text"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className="bg-gray-300 text-gray-900 text-md rounded-lg focus:border-blue-500 block w-full p-2.5 focus:outline-0"
            />
          </div>
          <button
            className="p-2 text-lg bg-gray-500 m-8 focus:outline-white"
            onClick={handleEditBook}
          >
            SAVE
          </button>
        </div>
      </div>
    </section>
  );
};

export default EditBook;
