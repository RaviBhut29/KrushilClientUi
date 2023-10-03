import React, { useEffect, useState } from "react";
import { getAboutApi } from "../../FlysesApi/About";
import { setLoadingStatus } from "../../FlysesApi";
import { toastError } from "../../FlysesApi/FlysesApi";
import RatingsAndReviews from "../../Layout/RatingsAndReviews";
import Footer from "../../Layout/Footer";
import Header from "../../Layout/Header";
import BreadCrub from "../../Layout/BreadCrub";

export const NewAboutUs = () => {
    return (
        <>
            <div id="some-box">
                <h1>Section Heading</h1>
                <article className="row" id="idea-one">
                    <div>
                        <img src="/ui/Images/card-1.svg" />
                    </div>
                    <div>
                        <h3>Idea 1</h3>
                        <p>
                            Here's your descriptive text for your idea to sell people on the thing
                            after the image gets their attention. This type of section looks best
                            when there's enough text to take up most of the height of the adjacent
                            image.
                        </p>
                        <a href="#">Link to read more</a>
                    </div>
                </article>
                <article className="row" id="idea-two">
                    <div>
                        <h3>Idea 2</h3>
                        <p>
                            Alternating images and text works with the natural flow of your user's
                            eyes as they scan the page, allowing their eyes to catch on each of the
                            images in turn. If the user's eyes catch on an image, they'll likely
                            read the accompanying text.
                        </p>
                        <a href="#">Link to read more</a>
                    </div>
                    <div>
                        <img src="/ui/Images/card-2.svg" />
                    </div>
                </article>
                <article className="row" id="idea-three">
                    <div>
                        <img src="/ui/Images/card-3.svg" />
                    </div>
                    <div>
                        <h3>Idea 3</h3>
                        <p>
                            Be careful not to let your text sections become too wordy, however; if
                            you write too much your users may choose not to read the content.
                        </p>
                        <a href="#">Link to read more</a>
                    </div>
                </article>
            </div>
        </>
    )
}