import React, { useState, useEffect } from 'react';
import './App.css';
import { ApiClient, fromCatalog } from '@opendatasoft/api-client';

const client = new ApiClient({
  domain: "https://public.opendatasoft.com/",

});


function App() {
  const [state, setState] = useState("loading...");

  useEffect(() => {
    client.get(fromCatalog().aggregates().select("count(*) as nb_dataset"))
      .then(response => {
        setState(`There are ${response.aggregations?.[0]["nb_dataset"]} datasets on public.`)
      });
  });

  return (
    <div className="App">
      {state}
    </div>
  );
}

export default App;
