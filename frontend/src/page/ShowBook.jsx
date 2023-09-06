import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((res) => {
        console.log(res.data[0]);
        setBook(res.data[0]);
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
        <BackButton />
        <h1 className="text-center text-3xl my-8">Show Book</h1>
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex justify-center">
            <div className="flex flex-col border-2 border-gray-300 rounded-xl w-fit p-4">
              <div className="my-4">
                <span className="text-xl mr-4 text-black">Id</span>
                <span className="text-xl text-gray-500">{book.id}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-black">Title</span>
                <span className="text-xl text-gray-500">{book.title}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-black">Author</span>
                <span className="text-xl text-gray-500">{book.author}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-black">Publish Year</span>
                <span className="text-xl text-gray-500">
                  {book.publishYear}
                </span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-black">Create Time</span>
                <span className="text-xl text-gray-500">
                  {new Date(book.createdAt).toString()}
                </span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-black">
                  Last Update Time
                </span>
                <span className="text-xl text-teal-800">
                  {new Date(book.updatedAt).toString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ShowBook;
