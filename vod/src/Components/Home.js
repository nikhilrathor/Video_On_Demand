import axios from 'axios';
import { useState, useEffect } from 'react';
import Carousal from './Carousal';

const Home = () => {

    const [videos, setVideos] = useState(null);
    const [items, setItems] = useState([]);
    useEffect(() => {
        axios.post("https://videoapi-dot-virtualeventdemo.el.r.appspot.com/")
            .then(res => {
                let arr = res.data.result;
                setVideos(arr);
                let count = 1;
                const img = arr.map(({ thumbnailUrl, title }) => {
                    return {
                        src: thumbnailUrl,
                        altText: title,
                        caption: "",
                        header: title,
                        key: count++
                    }
                })
                setItems(img);
            })
            .catch(err => {
                console.log("Something went wrong");
            })
    })

    return (
        <div>
            <Carousal items={items} />
        </div>
    )
}

export default Home;