import React from "react";
import stevensShirt from "../assets/stevensShirt";

const GameCard = ({
  onClick,
  card,
  index,
  isInactive,
  isFlipped,
  isDisabled,
}) => {
  const handleClick = () => {
    !isFlipped && !isDisabled && onClick(index);
  };

  return (
    <div
      className={classnames("card", {
        "is-flipped": isFlipped,
        "is-inactive": isInactive,
      })}
      onClick={handleClick}
    >
      <div className="card-face card-front-face">
        <img src={stevensShirt} alt="stevens star shirt" />
      </div>
      <div className="card-face card-back-face">
        <img src={card.image} alt="" />
      </div>
    </div>
  );
};

export default GameCard;
