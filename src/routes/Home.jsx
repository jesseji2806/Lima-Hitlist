import React, { useState, useEffect } from 'react';
import { Outlet, Link, useParams } from 'react-router-dom';
import Axios from "axios";

const Home = () => {
    const [data, setData] = useState([]);
    const { guildId } = useParams();

    useEffect(() => {
      Axios.get(guildId).then((res) => {
          const cbIds = res.data.cbIds.sort().reverse();
          setData(cbIds);
      });
    }, [guildId]);

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