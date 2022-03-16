import React, { useState, useEffect } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import { getPhotos } from "../ApiManager";
import Dots from "./Dots";
import "./Slider.css"

export const Slider = (props) => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [currentImg, setCurrentImg] = useState([])
    const [slider, setSlider] = useState([])


    useEffect(
        () => {
            getPhotos()
                .then((data) => {
                    setSlider(data)
                })
        }, []
    )

    useEffect(
        () => {
            if (autoScroll) {
                auto()
            }
            return () => clearInterval(slideInterval)
        }, [currentSlide]
    )

    const autoScroll = false
    let slideInterval;
    let intervalTime = 10000

    const slideRight = () => {
        setCurrentSlide((currentSlide + 1) % slider.length) // increases index by 1
    }

    const slideLeft = () => {
        const nextIndex = currentSlide - 1;
        if (nextIndex < 0) {
            setCurrentSlide(slider.length - 1); // returns last index of images array if index is less than 0
        } else {
            setCurrentSlide(nextIndex);
        }
    }

    const auto = () => {
        slideInterval = setInterval(slideRight, intervalTime)
    }

    return (
        slider ?
            <div className="slider">
                <AiOutlineArrowLeft className="arrow left" onClick={slideLeft} />
                <AiOutlineArrowRight className="arrow right" onClick={slideRight} />
                {slider.map((slide, index) => {
                    return <div className={index === currentSlide ? "current_slide" : "slide"} key={index} >
                        {index === currentSlide && (
                            <img className="landing_image" src={slide.imgPath} alt="travel image" />
                        )
                        }
                    </div>
                })}
                <div className="dots">
                    <Dots
                        slider={slider}
                        currentSlide={currentSlide}
                        onclick={(index) => setCurrentSlide(index)}
                    />
                </div>
            </div>
            : ""
    )
}
