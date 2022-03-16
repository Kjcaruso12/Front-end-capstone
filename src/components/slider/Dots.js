import React from "react"

export default ({ slider, onclick, currentSlide }) => {
    return (
        <div className="dots">
            {slider.map((slide, index) => (
                <span
                    key={slide}
                    className={`${index === currentSlide ? "current_dot" : "dot"}`}
                    onClick={() => onclick(index)}
                ></span>
            ))}
        </div>
    )
}