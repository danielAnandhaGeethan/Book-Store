import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const BooksTable = ({ books }) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
        <thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3 rounded-lg">No</th>
            <th className="px-6 py-3 rounded-lg">Title</th>
            <th className="px-6 py-3 rounded-lg">Author</th>
            <th className="px-6 py-3 rounded-lg">Publish Year</th>
            <th className="px-6 py-3 rounded-lg">Operations</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr
              key={book.id}
              className="bg-white dark:bg-white rounded dark:text-gray-800"
            >
              <td className="px-6 py-4 text-md font-medium text-black whitespace-nowrap rounded-lg">
                {index + 1}
              </td>
              <td className="px-6 py-4 rounded-lg">{book.title}</td>
              <td className="px-6 py-4 rounded-lg">{book.author}</td>
              <td className="px-6 py-4 rounded-lg">{book.publishYear}</td>
              <td className="px-6 py-4 rounded-lg">
                <div className="flex justify-center gap-x-7">
                  <Link to={`/books/details/${book.id}`}>
                    <BsInfoCircle className="text-2xl text-green-800" />
                  </Link>
                  <Link to={`/books/edit/${book.id}`}>
                    <AiOutlineEdit className="text-2xl text-yellow-600" />
                  </Link>
                  <Link to={`/books/delete/${book.id}`}>
                    <MdOutlineDelete className="text-2xl text-red-600" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;
