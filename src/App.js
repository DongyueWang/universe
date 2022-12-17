import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap"
import Filters from './components/Filters/Filters';
import Cards from './components/Cards/Cards';
import Pagination from './components/Pagination/Pagination';
import Search from './components/Search/Search';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import CardDetails from './components/Cards/CardDetails';
import Sun from './Pages/Sun'
import Earth from './Pages/Earth';
import { changeToDate } from './Tools/tools'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:title/:startDate/:endDate' element={<CardDetails />} />
        <Route path='/sun' element={<Sun />} />
        <Route path='/earth' element={<Earth />} />
      </Routes>
    </Router>
  );
}

const Home = () => {

  let today = new Date();
  today.setHours(0, 0, 0, 0);
  let day = today.getDate();
  let month = today.getMonth() + 1 //January is 0!
  let year = today.getFullYear();
  let initEndDate = `${year}-${month}-${day}`;

  let start = new Date(today.getTime() - (10 * 24 * 60 * 60 * 1000))
  let stday = start.getDate();
  let stmonth = start.getMonth() + 1 //January is 0!
  let styear = start.getFullYear();
  const initStartDate = `${styear}-${stmonth}-${stday}`

  let [pageNumber, setPageNumber] = useState(1);
  let [search, setSearch] = useState("");
  let [mediaType, setMediaType] = useState("");
  let [results, setResults] = useState([]);
  let [startDate, setStartDate] = useState(initStartDate);
  let [endDate, setEndDate] = useState(initEndDate);
  let [pageCount, setPageCount] = useState(0)
  let [pageSize, setPageSize] = useState(4)

  const [isLoading, setLoading] = useState(true);

  /* let api = `https://api.nasa.gov/planetary/apod/?api_key=M3QhqmdhPfnkgx0bXtrbGNj2CJ6LLhGqP7Wn15rL&start_date=${startDate}&end_date=${endDate}&thumbs=true`
 */

  let apiBase = `https://api.nasa.gov/planetary/apod/?api_key=M3QhqmdhPfnkgx0bXtrbGNj2CJ6LLhGqP7Wn15rL`;

  useEffect(() => {
    let api = apiBase;
    (async function () {
      setLoading(true);
      let stD = changeToDate(startDate);
      let edD = changeToDate(endDate);
      if (stD > edD) {
        api += `&start_date=${endDate}&end_date=${startDate}&thumbs=true`;
      } else {
        api += `&start_date=${startDate}&end_date=${endDate}&thumbs=true`
      }

      let data = await fetch(api).then(res => {
        return res.json();
      });
      if ((search && search.trim().length) ||
        (mediaType && mediaType.length)
      ) {

        if (search && search.trim().length) {
          data = data.filter(x => x.title.toLowerCase().indexOf(search.toLowerCase()) >= 0);
        }

        if (mediaType && mediaType.length) {
          data = data.filter(x => x.media_type.toLowerCase().indexOf(mediaType.toLowerCase()) >= 0);
        }
      }

      let count = data && data.length ? (Math.floor(data.length / pageSize) +
        (data.length % pageSize > 0 ? 1 : 0)) : 1;
      setPageCount(count);

      let skipPage = pageNumber - 1;
      if (data.length >= skipPage * pageSize) {
        data.splice(0, skipPage * pageSize)
      }

      if (data.length >= pageSize)
        data.splice(pageSize)

      setResults(data);
      setLoading(false);

    })();

  },
    [apiBase, search, mediaType, pageNumber, pageSize, startDate, endDate]);

  return (
    <div>
      <div id='spinner1' style={isLoading ? { display: 'block' } : { display: 'none' }} className="loader-container">
        <div className="loader"></div>
      </div>
      <div id='divhome' style={isLoading ? { display: 'none' } : { display: 'block' }} className="Homme">
        <h1 className="text-center mb-4">The Best Pictures of the Days</h1>
        <Search setPageNumber={setPageNumber} search={search} setSearch={setSearch} />
        <div className="container">
          <div className="row">
            <Filters setLoading={setLoading} initStartDate={initStartDate} initEndDate={initEndDate} setMediaType={setMediaType}
              setEndDate={setEndDate}
              setStartDate={setStartDate} setPageNumber={setPageNumber} endDate={endDate} startDate={startDate} />
            <div className="col-lg-8 col-12">
              <div className="row">
                <Cards page="/" results={results}
                  startDate={startDate}
                  endDate={endDate}
                />
              </div>
            </div>
          </div>
        </div>
        <Pagination pageCount={pageCount} setPageNumber={setPageNumber}
          pageNumber={pageNumber} />
      </div>
    </div>
  );
}


export default App;
