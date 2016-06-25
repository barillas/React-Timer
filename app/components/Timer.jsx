var React = require('react');
var Clock = require('Clock');
var Controls = require('Controls');

var Timer = React.createClass({
  //Create initial state for props
  getInitialState: function() {
    return {
      count: 0,
      timerStatus: 'paused'
    };
  },

  //Updating components if state changed
  componentDidUpdate: function(prevProps, prevState) {
    if (this.state.timerStatus !== prevState.timerStatus) {
      switch (this.state.timerStatus){
        case 'started':
          this.startTimer();
          break;
        case 'stopped':
          this.setState({
            count:0,
            timerStatus: 'paused'
          });
        case 'paused':
          clearInterval(this.timer)
          this.timer = undefined;
          break;
      }
    }
  },
  handleStatusChange: function (newStatus) {
    this.setState({timerStatus: newStatus});
  },

  startTimer: function () {
    this.timer = setInterval(() => {
      var newCount = this.state.count + 1;
      this.setState({
        count: newCount >= 0 ? newCount : 0
      });

      if (newCount === 0) {
        this.setState({timerStatus: 'stopped'});
      }
    }, 1000);
  },

  render: function(){
    var {count, timerStatus} = this.state;
    return(

      <div>
        <h1 className="page-title">Timer App</h1>
        <Clock totalSeconds = {count} />
        <Controls status = {timerStatus} onStatusChange = {this.handleStatusChange} />

      </div>
    )
  }

});

module.exports = Timer;
