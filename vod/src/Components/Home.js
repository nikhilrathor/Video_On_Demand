import axios from 'axios';
import { useState, useEffect } from 'react';
import Carousal from './Carousal';
import Tags from './Tags';

const Home = () => {

    const [videos, setVideos] = useState(null);
    const [items, setItems] = useState([]);
    const [tags, setTags] = useState([]);
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
                const arr1 = arr.map(({ tags }) => tags);
                const arr2 = arr1.reduce((a, b) => {
                    a = [...new Set([...a, ...b])]
                    return a;
                }, ["Favourites"])
                setTags(arr2);
            })
            .catch(err => {
                console.log("Something went wrong");
            })
    },[])

    return (
        <div>
            <Carousal items={items} />
            <Tags tags={tags} videos={videos} />
        </div>
    )
}

export default Home;