var Timer = React.createClass({
  getInitialState: function() {
    return {secondsElapsed: 0};
  },
  tick: function() {
    this.setState({secondsElapsed: this.state.secondsElapsed + 1});
  },
  componentDidMount: function() {
    this.interval = setInterval(this.tick, 1000);
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  render: function () {
    return (
      <div>Seconds Elapsed: {this.state.secondsElapsed}</div>
    ); 
  }
});

ReactDOM.render(<Timer />, mountNode);

var React = require('react'); // ESLint thinks it's unused, but in in fact *is* used (and needed!)
var Table = require('Table.jsx');

module.exports = (
  <Table />
);
