import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateBook from "./page/AddBook";
import Home from "./page/Home";
import EditBook from "./page/EditBook";
import DeleteBook from "./page/DeleteBook";
import ShowBook from "./page/ShowBook";
import { useState } from "react";

const App = () => {
  const [showType, setShowType] = useState("table");

  return (
    <Routes>
      <Route
        path="/"
        element={<Home showType={showType} setShowType={setShowType} />}
      />
      <Route path="/books/create" element={<CreateBook />} />
      <Route path="/books/details/:id" element={<ShowBook />} />
      <Route path="/books/edit/:id" element={<EditBook />} />
      <Route path="/books/delete/:id" element={<DeleteBook />} />
    </Routes>
  );
};

export default App;
