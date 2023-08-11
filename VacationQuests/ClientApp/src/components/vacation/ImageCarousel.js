import Carousel from 'react-bootstrap/Carousel';
import { useEffect } from 'react';

function ImageCarousel({ data }) {
    useEffect(() => {
        //console.log('data in carousel component:', data)
    }, [])
    if (data) {
        return (
            <>
                <h3 className='text-center'>Images of Location</h3>
                <Carousel fade data-bs-theme="dark">
                    {
                        data.map((imageData, index) => (
                            <Carousel.Item key={index} interval={4000}>
                                <center className='mb-5'>
                                    <img src={imageData.assets.preview_1000.url} />
                                    <p className='mb-5'>{imageData.description}</p>
                                </center>
                            </Carousel.Item>
                        ))
                    }
                </Carousel>
            </>
        );
    }
    else {
        return(<></>)
    }
   
}

export default ImageCarousel;