import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./routes/Layout";
import Home from "./routes/Home";
import HitList from "./routes/HitList";
import NoRoute from "./routes/NoRoute";
import Axios from "axios";
const serverURL = process.env.REACT_APP_SERVER;

Axios.defaults.baseURL = serverURL;

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/:guildId" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/:guildId/hitlist/:id" element={<HitList />} />
            <Route path="/:guildId/*" element={<NoRoute />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
