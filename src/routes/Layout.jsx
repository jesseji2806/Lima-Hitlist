import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom'
import Axios from "axios";


const Layout = () => {
    const [data, setData] = useState();

    useEffect(() => {
      Axios.get("https://immense-taiga-72357.herokuapp.com/").then((res) => {
          setData(Math.max.apply(null, res.data));
      });
    }, []);
    

    return (
        <>
            <h1>Aquarium Hit List</h1>
            <nav>
                <div className="btn-group btn-group-lg btn-group-justified">
                    <Link to="/">
                        <button className="btn btn-success button">Home</button>
                    </Link>
                    {(data) && (
                        <Link to={"hitlist/" + data}>
                            <button className="btn btn-success button">Current CB</button>
                        </Link>
                    ) 
                    }
                </div>
            </nav>

            <Outlet />
        </>
    )
};

export default Layout;