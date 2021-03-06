var timerObject = React.createClass({
    getDefaultProps: function(){
        return {timerLength: 100}
    },
    getInitialState: function(){
        return {secondsRemaining: 0}
    },
    tick: function(){
        this.setState({
            secondsRemaining: this.state.secondsRemaining - 1
        });
        if (this.state.secondsRemaining <= 0){
            clearInterval(this.interval)
        };
    },
    componentDidMount: function(){
        this.setState({
            secondsRemaining: this.props.timerLength
        })
        this.interval = setInterval(this.tick, 1000);
    },
    componentWillUnmount: function(){
        clearInterval(this.interval);
    },
    callback: function(){
        console.log('hi');
        this.props.seconds = 100;
    },
    render: function(){
        return React.createElement('div', {},
                React.createElement(CountdownTimer, {className: 'timer', startSeconds: this.props.seconds}),
                React.createElement(ResetButton, {callback: this.callback}))
    }
});


var ResetButton = React.createClass({
    render: function() {
        return React.createElement('button', {className: 'resetbutton', type: 'reset', onClick: this.props.callback}, "Reset")
    }
})

var CountdownTimer = React.createClass({
    
    render: function() {
        return (React.createElement('p', {className: 'timer'}, 
                "Seconds Remaining: " + this.state.secondsRemaining)
        );
    },
    reset: function() {
        this.setState({
            secondsRemaining: this.props.startSeconds
        });
    }
});

// var Timer = React.createClass({
//     getDefaultProps: function() {
//         return {ticks: '100'}},
//     render: function(){
//         return React.createElement('p', {className: 'timer'}, this.props.ticks
//     )}
// });

// props should contain start time. State should contain current time?

// function timer(minutes){
//     return minutes
// }

var rootElement = React.createElement('div', {}, 
    React.createElement('h1', {className: 'header'}, "Pomodoro Timer"),
    React.createElement(timerObject)
    )

ReactDOM.render(rootElement, document.getElementById('react-app'))
