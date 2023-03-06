import React from "react";

export default function Title(prop) {
  return (
    <div className="title">
      <div className="title__container">
        <h1>{prop.title}</h1>
        <p>{prop.parag}</p>
      </div>
    </div>
  );
}
