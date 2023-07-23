import React from "react";
import Header from "../header";
import List from "../list";
import AddItem from "../add-item";

function App() {
  return (
    <div>
      <Header />
      <AddItem />
      <hr />
      <List />
    </div>
  );
}

export default App;
