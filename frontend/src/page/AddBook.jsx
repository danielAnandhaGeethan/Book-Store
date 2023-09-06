import React, { useState } from "react";
import { useNavigate } from "react-router";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useSnackbar } from "notistack";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState();
  const [publishYear, setPublishYear] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .post("http://localhost:5555/books", data)
      .then((res) => {
        setLoading(false);
        enqueueSnackbar("Book created successfully", { variant: "success" });
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
        <h1 className="text-3xl my-4 flex justify-center">Add Book</h1>
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
            className="p-2 bg-gray-500 text-lg m-8 focus:outline-white"
            onClick={handleSaveBook}
          >
            SAVE
          </button>
        </div>
      </div>
    </section>
  );
};

export default CreateBook;
