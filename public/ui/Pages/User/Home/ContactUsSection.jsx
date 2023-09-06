import React, { useState } from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
} from 'reactstrap';

const items = [
    {
        src: 'https://picsum.photos/id/123/1200/400',
        altText: 'Slide 1',
        caption: 'Slide 1',
        key: 1,
    },
    {
        src: 'https://picsum.photos/id/456/1200/400',
        altText: 'Slide 2',
        caption: 'Slide 2',
        key: 2,
    },
    {
        src: 'https://picsum.photos/id/678/1200/400',
        altText: 'Slide 3',
        caption: 'Slide 3',
        key: 3,
    },
];


const ContactUsSection = () => {

    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    };

    const slides = items.map((item) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.src}
            >
                {/* You have to desgin here for each slide */}
                <img src={item.src} alt={item.altText} className="img-w-100" />
                <CarouselCaption
                    captionText={item.caption}
                    captionHeader={item.caption}
                />
            </CarouselItem>
        );
    });

    return (
        <>
        <div className='carousel-sec mt-5'>
            <div>
                <h3 className='gradient-text head'>Trusted by leading brands and startups</h3>
                <p></p>
            </div>
            <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
                // pause="hover"
                className='mt-3'
            >
                {/* <CarouselIndicators
                    items={items}
                    activeIndex={activeIndex}
                    onClickHandler={goToIndex}
                /> */}
                {slides}
                <CarouselControl
                    direction="prev"
                    directionText="Previous"
                    onClickHandler={previous}
                />
                <CarouselControl
                    direction="next"
                    directionText="Next"
                    onClickHandler={next}
                />
            </Carousel>

        </div>
            <div className="contact-us-section">
                <div className='container sub-section'>
                    <div className='row text-center'>
                        <div className="col-md-4">
                            <h3 className='contact-head'>126</h3>
                            <h6>Projects Done</h6>
                        </div>
                        <div className="col-md-4">
                            <h3 className='contact-head'>4+</h3>
                            <h6> Years Experience</h6>
                        </div>
                        <div className="col-md-4">
                            <h3 className='contact-head'>98%</h3>
                            <h6>Happy Customers</h6>
                        </div>
                    </div>
                    <div className='contact-text'>
                        <h3>Want to start a Project With us?</h3>
                        <p>Enter your email address to receive all news from our
                            awesome services and offers.</p>
                        <button className='blue-btn btn btn-secondary mt-1' >Contact Us</button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ContactUsSection