import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import BooksCard from "../../components/home/BooksCard";
import BooksTable from "../../components/home/BooksTable";

const Home = ({ showType, setShowType }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((res) => {
        console.log(res.data);
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="min-h-screen bg-gray-400">
      <div className="p-4">
        <div className="flex justify-center items-center gap-x-4">
          <button
            className="bg-gray-300 hover:bg-gray-600 px-4 hover:text-white py-1 hover:scale-125 rounded-lg"
            onClick={() => setShowType("table")}
          >
            Table
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-600 hover:scale-125 hover:text-white px-4 py-1 rounded-lg"
            onClick={() => setShowType("card")}
          >
            Card
          </button>
        </div>
        <div>
          <div className="grid grid-cols-3 items-center">
            <div></div>
            <h1 className="text-center text-3xl my-8">Books List</h1>
            <Link to="/books/create">
              <MdOutlineAddBox className="text-sky-800 text-4xl ml-auto" />
            </Link>
          </div>
          {loading ? (
            <Spinner />
          ) : showType == "card" ? (
            <BooksCard books={books} />
          ) : (
            <BooksTable books={books} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
