import React, { Component } from "react";
import classNames from "classnames";

class Filter extends Component {
  render() {
    const { forWhom, optionList, onChange } = this.props;
    const renderForWhom = () => {
      return optionList.map((option) => {
        return (
          <button
            key={option}
            className={classNames({
              _active: option === forWhom,
              for_whom_btn: true,
            })}
            onClick={() => {
              onChange(option);
            }}
          >
            {option}
          </button>
        );
      });
    };
    return <div className="for_whom_container">{renderForWhom()}</div>;
  }
}

export default Filter;
