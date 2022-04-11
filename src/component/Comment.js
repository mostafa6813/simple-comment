import React, { useState, useEffect } from "react";
import axios from "axios";
import './Comment.css';

export default function Comment() {
    const [data, setData] = useState([]);
    const [isLoding, setIsLoding] = useState(false);
    const url = 'http://localhost:4000/comment'
    useEffect(() => {
        setIsLoding(true);
        axios.get(url)
            .then(res => {
                setIsLoding(false);
                setData(res.data);
            })
    }, [])

    const fetch = () => {
        setIsLoding(true);
        axios.get(url)
            .then(res => {
                setIsLoding(false);
                setData(res.data);
            })
    }

    const Formhandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        axios.post(url, {
            id: Date.now().toString(),
            name: formData.get('name'),
            body: formData.get('title')
        })
            .then(res => {
                if (res.status >= 200 && res.status <= 299) {
                    alert('ok');
                    fetch();
                    e.target.reset();
                }
            })

    }
    return <div>
        <form className="form" onSubmit={Formhandler}>
            name:<br />
            <input name='name' autoComplete="off"/><br />
            body:<br />
            <input name='title' autoComplete="off"/><br />
            <button type="submit">Send</button>
        </form>
        <div >
            {
                isLoding ? <div>Loading...</div> :
                    data.map(item =>
                        <div className="comment" key={item.id}>
                            <div className="name">{item.name}</div>
                            <div className="body">{item.body}</div>
                        </div>
                    )
            }
        </div>
    </div>
}