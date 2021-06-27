import { useState, useEffect } from "react";
import ReactPlayer from 'react-player'
import { Container, Button } from 'reactstrap';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import './GridView.css';

const GridView = (props) => {
    const [videos, setVideos] = useState(props.videos);

    useEffect(() => {
        setVideos(props.videos)
    }, [props.videos])


    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const [videoTitle, setVideoTitle] = useState('');
    const [videoDescription, setVideoDescription] = useState('');
    const [videoTags, setVideoTags] = useState([]);
    const [videoUrl, setVideoUrl] = useState('');

    const videoModal = (v) => {
        setVideoTitle(v.title);
        setVideoDescription(v.description);
        setVideoTags(v.tags);
        setVideoUrl(v.videolink);
        onOpenModal()
    }

    const favouriteClicked = (v) => {
        if (localStorage.getItem(v.title))
        {
            alert(v.title+" Removed from Favourites")
            localStorage.removeItem(v.title);
        }
        else
        {
            alert(v.title+" Added to Favourites")
            localStorage.setItem(v.title, "favourite")
        }
    }

    return (
        <div>
            <Container>
                {videos && videos.map((v) => (
                    <div className="card" key={v.title}>
                        <div className="imgBx" >
                            <img src={v.thumbnailUrl} alt={v.title}></img>
                        </div>
                        <div className="details" onClick={() => videoModal(v)}>
                            <h2>{v.title}</h2>
                            <p>{v.description}</p>
                        </div>
                        <div className="go-corner"
                            onClick={() => favouriteClicked(v)}>
                                <a href="/" onClick={(e)=>e.preventDefault()}><i className="fa fa-heart"></i></a>
                        </div>

                    </div>
                ))}
            </Container>
            <Modal open={open} onClose={onCloseModal} center>
                <ReactPlayer url={videoUrl} playing={true} controls={true} />
                <h2 className="mt-5">{videoTitle}</h2>
                {videoTags.map((t) => (
                    <Button outline color="primary" className="m-5" key={t}>{t}</Button>
                ))}
                <p>{videoDescription}</p>
            </Modal>
        </div>
    );
}

export default GridView;