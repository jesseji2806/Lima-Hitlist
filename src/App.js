import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./routes/Layout";
import Home from "./routes/Home";
import HitList from "./routes/HitList";
import NoRoute from "./routes/NoRoute";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/hitlist/:id" element={<HitList />} />
            <Route path="/*" element={<NoRoute />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
