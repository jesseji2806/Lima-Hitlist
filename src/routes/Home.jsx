import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Axios from "axios";

const Home = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      Axios.get("https://immense-taiga-72357.herokuapp.com/").then((res) => {
          const cbIds = res.data;
          cbIds.sort();
          cbIds.reverse();
          setData(cbIds);
      });
    }, []);

    return (
    <>
        <h1>Home</h1>
        <div className="btn-group btn-group-vertical">
        {data.map((item) => {
            return (
                    <Link to={"hitlist/" + item} key={item}>
                        <button type="button" className="btn btn-primary btn-lg button">
                            CB{item}
                        </button>
                    </Link>)
                })
            }
        </div>
        <Outlet />
    </>
)};

export default Home;