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
            localStorage.removeItem(v.title);
        else
            localStorage.setItem(v.title, "favourite")
    }

    return (
        <div>
            <Container>
                {videos && videos.map((v) => (
                    <div className="card" key={v.title}>
                        <div className="imgBx" onClick={() => videoModal(v)}>
                            <img src={v.thumbnailUrl} alt={v.title}></img>
                        </div>
                        <h5 className="m-2">{v.title}</h5>
                        <p className="small m-2">{v.description}</p>
                        <button className="go-corner" 
                        onClick={() => favouriteClicked(v)}>
                            <i className="fa fa-heart"></i>
                        </button>

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