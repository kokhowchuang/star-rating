import "./App.css";
import "react-slidedown/lib/slidedown.css";
import React, { useState, useEffect } from "react";
import { SlideDown } from "react-slidedown";

import UserRating from "./components/user-rating";
import { submitRating } from "./api/submitRating";

function App() {
  const [close, setClose] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");

  const handleOpen = () => {
    setClose(!close);
  };

  const handleSubmitRating = () => {
    console.log(review);
    // submitRating({ review, rating });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="review-header">
          <div className="title">The Minimalist Entrepreneur</div>
          <div className="review-header-wrapper">
            <div>3.8</div>
            <div>
              <button className="flat-button" onClick={handleOpen}>
                Add Review
              </button>
            </div>
          </div>
        </div>
      </header>
      <body className="App-body">
        <div className="review-body">
          <div className="title">Reviews</div>
          <div className="user-review-list">
            <UserRating></UserRating>
            <UserRating></UserRating>
          </div>
        </div>
        <SlideDown className={"my-dropdown-slidedown"} closed={close}>
          <div className="review-container">
            <div className="title">What's your rating?</div>
            <span className="subheading">Rating</span>
            <span className="subheading">Review</span>
            <textarea
              type="text"
              placeholder="Start typing ..."
              onChange={(evt) => {
                setReview(evt.target.value);
              }}
            ></textarea>
            <button className="flat-button" onClick={handleSubmitRating}>
              Add Review
            </button>
          </div>
        </SlideDown>
      </body>
    </div>
  );
}

export default App;
