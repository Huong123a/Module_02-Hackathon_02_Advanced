// import React from 'react';
import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import Store from "./store";
import { ListData, Product } from "./model/data";
import MyCart from "./mycart";

function App() {
  const [listData,setListData]=useState<Product[]>(ListData)
  return (
    <>
    <MyCart />
    <Store data={listData}/>
    </>
  );
}

export default App;
