import "./App.css";
import "react-slidedown/lib/slidedown.css";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { SlideDown } from "react-slidedown";

import UserRating from "./components/user-rating";
import Rating from "./components/rating";
import { submitRating } from "./api/submitRating";
import { getRating } from "./api/getRating";
import { selectRatingList, selectTotalScore } from "./reducer/ratingSlice";
import { add } from "./reducer/ratingSlice";

function App() {
  const dispatch = useDispatch();
  const rows = useSelector(selectRatingList);
  const totalScore = useSelector(selectTotalScore);
  const average = (totalScore / rows.length).toFixed(1);
  const [close, setClose] = useState(true);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);

  const io = require("socket.io-client");
  const socket = io("http://localhost:3000", { transports: ["websocket"] });

  useEffect(() => {
    dispatch(getRating());
  }, [dispatch]);

  const handleOpen = () => {
    setClose(!close);
    setReview("");
    setRating(5);
  };

  const handleSubmitRating = () => {
    dispatch(submitRating({ review, rating }));
    socket.emit("rating", {
      review,
      rating,
      productId: "6245b0414bb8b70aff189bc1",
    });

    setClose(!close);
  };

  const handleClickedRating = (score) => {
    setRating(score);
  };

  socket.on("newRating", (data) => {
    console.log("Message: ", data);
    // dispatch(add({ payload: data }));
  });

  return (
    <div className="App">
      <header className="App-header">
        <div className="review-header">
          <div className="title">The Minimalist Entrepreneur</div>
          <div className="review-header-wrapper">
            <div>{rows.length > 0 && average}</div>
            <div>
              <button className="flat-button" onClick={handleOpen}>
                Add Review
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="App-body">
        <div className="review-body">
          <div className="title">Reviews</div>
          <div className="user-review-list">
            {rows.map((value, index) => {
              return (
                <UserRating
                  key={"rating-" + index}
                  rating={value.score}
                  review={value.review}
                ></UserRating>
              );
            })}
          </div>
        </div>
        <SlideDown className={"my-dropdown-slidedown"} closed={close}>
          <div className="review-container">
            <div className="title">What's your rating?</div>
            <span className="subheading">Rating</span>
            <span>
              <Rating
                precision={0.5}
                clickable={true}
                defaultValue={rating}
                onChange={handleClickedRating}
              ></Rating>
            </span>
            <span className="subheading">Review</span>
            <textarea
              type="text"
              placeholder="Start typing ..."
              value={review}
              onChange={(evt) => {
                setReview(evt.target.value);
              }}
            ></textarea>
            <button className="flat-button" onClick={handleSubmitRating}>
              Add Review
            </button>
          </div>
        </SlideDown>
      </div>
    </div>
  );
}

export default App;
