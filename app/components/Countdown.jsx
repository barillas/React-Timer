var React = require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');

var Countdown = React.createClass({
  getInitialState: function() {
    return {
      count: 0,
      countdownStatus: 'stopped'
    };
  },
  handleSetCountdown: function (seconds){
    this.setState({
      count: seconds,
      countdownStatus: 'started'
    });

  },

  componentDidUpdate: function(prevProps, prevState) {
    if (this.state.countdownStatus != prevState.countdownStatus) {
      switch (this.state.countdownStatus){
        case 'started':
        this.startTimer();
        break;
      }
    }
  },

  startTimer: function () {
    this.timer = setInterval(() => {
      var newCount = this.state.count - 1;
      this.setState({
        count: newCount >= 0 ? newCount : 0
      })
    }, 1000);
  }
  ,
  render: function(){
    var {count} = this.state;

    return(
      <div>
        <Clock totalSeconds = {count} />
        <CountdownForm onSetCountdown = {this.handleSetCountdown} />
        <p>Countdown</p>
      </div>
    )
  }
});

module.exports = Countdown;
