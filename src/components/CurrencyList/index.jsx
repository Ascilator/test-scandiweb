import React, { Component } from 'react';
import classNames from 'classnames';

import arrow from './arrow.svg';

class CurrencyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(e) {
    if (!e.target.closest('.drop_down_cont')) {
      this.setState({ open: false });
    }
  }
  render() {
    const { currencyList, activeCurrency, onChange } = this.props;

    const { open } = this.state;

    //methot to render options
    const renderOptions = () => {
      return currencyList.map((curr) => {
        return (
          <div
            key={curr.curr}
            className="drop_item"
            onClick={() => {
              this.setState({
                open: false,
              });
              onChange(curr);
            }}
          >
            {curr.icon + ' ' + curr.curr}
          </div>
        );
      });
    };
    //show or close popup currency
    const clickHandler = () => {
      this.setState((state) => ({
        open: !state.open,
      }));
    };

    return (
      <div className="drop_down_cont" ref={this.wrapperRef}>
        <div className="drop_down_title" onClick={clickHandler}>
          <div className="text">{activeCurrency ? activeCurrency.icon : null}</div>
          <div
            className={classNames({
              arrow: true,
              _active: open,
            })}
          >
            <img src={arrow} alt="" />
          </div>
        </div>
        <div className="drop_down_body">{open && renderOptions()}</div>
      </div>
    );
  }
}

export default CurrencyList;
