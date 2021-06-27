import axios from 'axios';
import {useState, useEffect} from 'react';

const Home = () =>{

    const [videos, setVideos] = useState(null);

    useEffect(()=>{
        axios.post("https://videoapi-dot-virtualeventdemo.el.r.appspot.com/")
        .then(res=>{
            let arr = res.data.result;
            setVideos(arr);
        })
        .catch(err=>{
            console.log("Something went wrong");
        })
    })

    return(
        <div>
            Home
        </div>
    )
}

export default Home;