import React from "react";
import Star from "./star";

class Stars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starColor: this.emptyStars
    };
  }
  emptyStars = ["#E2E2E2", "#E2E2E2", "#E2E2E2", "#E2E2E2", "#E2E2E2"];

  shouldComponentUpdate(prevProps, prevState) {
    return (
      JSON.stringify(prevState.starColor) !==
      JSON.stringify(this.state.starColor)
    );
  }

  handleMouseEnter = rating => {
    this.setStarColor(rating);
  };

  handleClick = rating => {
    this.setStarColor(rating);
    this.props.handleClick(rating);
  };

  handleMouseLeave = () => {
    this.setStarColor(this.props.rating);
  };

  setStarColor = rating => {
    this.setState({
      starColor: [...this.emptyStars].fill("#FFA805", 0, rating)
    });
  };

  renderRating = () => {
    return this.state.starColor.map((color, i) => {
      return (
        <Star
          index={i}
          color={color}
          handleMouseEnter={this.handleMouseEnter}
          handleClick={this.handleClick}
        />
      );
    });
  };

  render() {
    return (
      <div onMouseLeave={this.handleMouseLeave} className="review__stars">
        {this.renderRating()}
      </div>
    );
  }
}

export default Stars;
