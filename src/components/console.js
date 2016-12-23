import React from 'react';
import PromptList from './prompt_list';


class Console extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        inputHistoryNumber: 0,
        historyIndex: -1,
        promptHistory: []
      };
    }

    onInputChange = (input) => {
      this.setState({input: input});
      this.props.setPrompt(input);
    }

    handleSubmit = (e) => {
      e.preventDefault();
      this.setState({promptHistory: this.state.promptHistory.concat([this.props.prompt])})
      this.props.pushHistory({data: this.props.prompt, type: "prompt"}, () => this.handleInput(this.props.prompt));
    }

    handleInput(input) {
      let outputValue = this.props.evalCallback(this.props.prompt);
      this.props.pushHistory({data:'> ' + outputValue, type: "output"}, () => this.props.setPrompt(''));
    }

    setInputHistory = (cb) => {
      this.setState({inputHistoryNumber: this.state.inputHistoryNumber + 1, historyIndex: this.state.historyIndex + 1}, cb)
    }


    handleKeyUp = (e) => {
      if(e.shiftKey && e.key === 'Enter') {
        e.preventDefault();
        this.props.setPrompt(this.props.prompt.concat('\n'))
        return;
      }
      switch(e.key) {
        case 'Enter':
          e.preventDefault();
          this.setInputHistory(() => this.handleSubmit(e))
          break;
        case 'ArrowUp':
          e.preventDefault();
          this.handleScrollUp()
          break;
        case 'ArrowDown':
          e.preventDefault();
          this.handleScrollDown()
          break;
      }
    }

    handleScrollUp = () => {
      if(this.state.historyIndex === -1) {
        return;
      }
      this.props.setPrompt(this.state.promptHistory[this.state.historyIndex], () => this.setState({historyIndex: this.state.historyIndex - 1}));
    }

    handleScrollDown = () => {
      if(this.state.historyIndex === this.state.inputHistoryNumber) {
        this.props.setPrompt(' ', this.setState({historyIndex: this.state.inputHistoryNumber - 1}));
      } else {
        this.props.setPrompt(this.state.promptHistory[this.state.historyIndex + 1], () => this.setState({historyIndex: this.state.historyIndex + 1}));
      }
    }


    render() {
        return (
          <div>
            <PromptList history={this.props.history} />
            <textarea autoFocus rows='1' value={this.props.prompt} onChange={(e) => this.onInputChange(e.target.value)} onKeyUp={this.handleKeyUp}></textarea>
          </div>

        );
      }

};

export default Console;
