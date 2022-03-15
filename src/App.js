import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";
import * as XLSX from "xlsx";
import React, { useState } from "react";
import axios from 'axios';

import Navbar from "./components/navbar.component"

function App() {
  const [items, setItems] = useState([]);
  //const {MangoClient} = require('mangodb');

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
       console.log(d);
      for (var i = 0; i < d.length; i++) {
        const Orders = {
          Oid: d[i].Oid,
          OrdreDate : d[i].Category,
      Region : d[i].Region,
      City : d[i].City,
      Category : d[i].Region,
      Product : d[i].Product,
      Quantity : Number(d[i].Quantity),
      UnitPrice : Number(d[i].UnitPrice),
      TotalPrice : Number(d[i].TotalPrice)
       }
       axios.post('http://localhost:5000/orders/add', Orders)
       .then(res => console.log(res.data));
    } 
      
    });
  };
  return (
    
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />
      </div>
    </Router>
  )
}

export default App;
