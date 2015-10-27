/**
 * @copyright 2015, Prometheus Research, LLC
 */

import React, {PropTypes} from 'react';
import scrollIntoView     from 'dom-scroll-into-view';
import {attachStylesheet} from '@prometheusresearch/react-stylesheet';
import Result             from './Result';

let Stylesheet = {
  Root: 'ul',
  Result: Result
};

@attachStylesheet(Stylesheet)
export default class ResultList extends React.Component {

  static propTypes = {
    results: PropTypes.array,
    focusedValue: PropTypes.object,
    onSelect: PropTypes.func,
  };

  render() {
    let {results, stylesheet, ...props} = this.props;
    let {Root} = stylesheet;
    return (
      <Root {...props} tabIndex={-1}>
        {results.map(this.renderResult, this)}
      </Root>
    );
  }

  renderResult(result) {
    let focus = (
      this.props.focusedValue &&
      this.props.focusedValue.id === result.id
    );
    return (
      <this.props.stylesheet.Result
        ref={focus ? 'focus' : undefined}
        key={result.id}
        result={result}
        focus={focus}
        onClick={this.props.onSelect}
        />
    );
  }

  componentDidMount() {
    this._scrollToFocused();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.focusedValue !== this.props.focusedValue) {
      this._scrollToFocused();
    }
  }

  _scrollToFocused() {
    let focus = this.refs && this.refs.focus;
    if (focus) {
      let container = React.findDOMNode(this);
      let node = React.findDOMNode(focus);
      scrollIntoView(node, container, {onlyScrollIfNeeded: true});
      node.focus();
    }
  }
}
