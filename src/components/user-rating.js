import React from "react";
import Rating from "./rating";

export default function UserRating(props) {
  return (
    <div className="user-rating">
      <Rating clickable={false} defaultValue={props.rating}></Rating>
      <span>{props.review}</span>
    </div>
  );
}
