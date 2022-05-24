import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import Helmet from "react-helmet";
import Axios from "axios";

class Hit {
    constructor(IGN) {
        this.IGN = IGN;
        this.hits = [0, 0, 0, 0, 0];
    }

    add_hit(hit, day) {
        this.hits[day - 1] = hit;
    }
};

const HitList = () => {
    const [cbData, setCbData] = useState([]);
    const [cbFound, setCbFound] = useState(false);
    const { id } = useParams();


    const sortData = (hits) => {
        if (hits.length === 0) return [];
        const sortedData = [];
        const players = [];
        let index = 0;
        for (const hit in hits) {
            const { IGN, hitsDone, day } = hits[hit];
            if (players.includes(IGN)) {
                let playerIndex = players.findIndex((element) => element === IGN);
                sortedData[playerIndex].add_hit(hitsDone, day);
            } else {
                let player = new Hit(IGN);
                players[index] = IGN;
                player.add_hit(hitsDone, day);
                sortedData[index] = player;
                ++index;
            }
        }
        return sortedData;

    };

    useEffect(() => {
        Axios.get("https://immense-taiga-72357.herokuapp.com/hitlist/"+id).then((res) => {
            setCbData(sortData(res.data.data));
            setCbFound(true);
        });
      }, [id]);
    
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
                                {cbData.map(({ IGN, hits }) => {
                                    return (
                                        <tr key={"hits" + IGN}>
                                            <th key={IGN}>{IGN}</th>
                                            {hits.map((item, index) => <th key={IGN + index}>{item}</th>)}
                                        </tr>)
                                })}
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