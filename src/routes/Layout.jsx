import React, { useState, useEffect } from 'react';
import { Outlet, Link, useParams } from 'react-router-dom'
import Axios from "axios";


const Layout = () => {
    const [data, setData] = useState();
    const [clan, setClan] = useState();
    const { guildId } = useParams();

    useEffect(() => {
        Axios.get(guildId).then((res) => {
            setClan(res.data.clan);
            setData(Math.max.apply(null, res.data.cbIds));
        });
    }, [guildId]);
    

    return (
        <>
            <h1>{clan} Hit List</h1>
            <nav>
                <div className="btn-group btn-group-lg btn-group-justified">
                    <Link to="">
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