import { Button, Container, Row, Col } from 'reactstrap';
import { useState, useEffect } from 'react';
import GridView from './GridView/GridView';

const Tags = (props) => {
    const [tags, setTags] = useState(props.tags);
    const [videos, setVideos] = useState(props.videos);
    const [taggedVideos, setTaggedVideos] = useState(null);
    const [selectedTag, setSelectedTag] = useState(null);

    useEffect(() => {
        setVideos(props.videos)
    }, [props.videos])

    useEffect(() => {
        setTags(props.tags)

    }, [props.tags])

    const clickedTag = (t) => {
        setSelectedTag("Videos on " + t);
        if (t === "Favourites") {
            let x = videos.filter(({ title }) => {
                return localStorage.getItem(title)
            })
            setTaggedVideos(x);
        }
        else {
            let x = videos.filter(({ tags }) => {
                return tags.includes(t)
            })
            setTaggedVideos(x);
        }
    }
    return (
        <div>
            <Container className="m-5">
                <Row className="m-5">
                    <Col xs="auto"><h3 >Tags:</h3></Col>
                    {tags && tags.map((t) => (
                        <Col xs="auto" key={t}>
                            <Button outline color="primary"
                                onClick={() => clickedTag(t)}>{t}</Button>
                        </Col>
                    ))}
                </Row>
            </Container>
            {taggedVideos && <h3 className="m-5">{selectedTag}</h3>}
            {taggedVideos && <GridView videos={taggedVideos} />}
        </div>
    )
}
export default Tags;