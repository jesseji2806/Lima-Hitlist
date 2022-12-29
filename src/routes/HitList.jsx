import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import Helmet from "react-helmet";
import Axios from "axios";

const HitList = () => {
    const [cbData, setCbData] = useState([]);
    const [cbFound, setCbFound] = useState(false);
    const [cbTotal, setCbTotal] = useState([]);
    const { guildId, id } = useParams();


    const sortData = (CB) => {
        const { hitList } = CB;
        if (hitList.length === 0) return [];
        
        return hitList.filter(player => player.nbAcc > 0);
    };

    useEffect(() => {
        Axios.get(guildId + "/hitlist/" + id).then((res) => {
            const data = res.data.data;
            setCbData(sortData(data));
            setCbFound(true);
            setCbTotal(data.hitsDone);
        });
      }, [guildId, id]);
    
    return (
        <>
            <Helmet>
                <title>Hit List CB{id}</title>
            </Helmet>
            <h1>Hit List CB{id}</h1>
            <div>
                {(cbFound) ? (
                    (cbData.length) > 0 ? (
                        <table className="table table-hover table-striped">
                            <thead>
                                <tr>
                                    <th>Player</th>
                                    <th>Day 1</th>
                                    <th>Day 2</th>
                                    <th>Day 3</th>
                                    <th>Day 4</th>
                                    <th>Day 5</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cbData.map((player) => {
                                    return (
                                        <tr key={"hits" + player.IGN}>
                                            <th key={player.IGN}>{player.IGN}</th>
                                            {player.hits.map(hit => <th key={player.IGN + hit.day}>{hit.hitsDone}</th>)}
                                        </tr>)
                                })}
                            </tbody>
                            <tbody>
                                <tr>
                                    <th>Total</th>
                                    {cbTotal.map((hits, index) => {
                                        return (
                                            <th key={`total${index}`}>{hits}</th>
                                        )
                                    })}
                                </tr>
                            </tbody>
                        </table>
                    ) : (
                        <div>No CB data found.</div>
                    )
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
)};

export default HitList;