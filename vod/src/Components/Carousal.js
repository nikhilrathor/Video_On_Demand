import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import { useState, useEffect } from 'react';

const Carousal = (props) =>{
    const [items, setItems] = useState(props.items);

    useEffect(() => {
        setItems(props.items)
    }, [props.items])
    
    return (
        <UncontrolledCarousel items={items} />
    )
}
export default Carousal;