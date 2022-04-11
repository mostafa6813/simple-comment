import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import axios from "axios";
import './Post.css';

export default function Post() {
    const [data, setData] = useState([]);
    const [isLoding, setIsLoding] = useState(false);
    const url = 'http://localhost:4000/post'

    useEffect(() => {
        setIsLoding(true);
        axios.get(url)
            .then(res => {
                setIsLoding(false);
                setData(res.data);
            })
    }, [])

    return <div className='post'>
        <div className="data">
            {
                isLoding ? <div>Loading...</div> :
                    data.map(item =>
                        <div key={item.id}>
                            <div className="title">{item.title}</div>
                            <div className="body">{item.body}</div>
                        </div>
                    )
            }
        </div>
        <Comment/>
    </div >
}