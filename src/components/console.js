import React from 'react';
import PromptList from './prompt_list';


class Console extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        input: '',
        inputHistoryNumber: 0,
        historyIndex: 0,
        promptHistory: []
      };
    }

    onInputChange = (input) => {
      this.setState({input: input});
      this.props.setPrompt(input);
    }

    handleSubmit = (e) => {
      e.preventDefault();
      this.setState({promptHistory: this.state.promptHistory.concat([this.props.prompt]), inputHistoryNumber: this.state.inputHistoryNumber + 1, historyIndex: this.state.inputHistoryNumber - 1})
      this.props.pushHistory({data: this.props.prompt, type: "prompt"}, () => this.handleInput(this.props.prompt));
    }

    handleInput(input) {
      let outputValue = this.props.evalCallback(this.props.prompt);
      this.props.pushHistory({data:'> ' + outputValue, type: "output"}, () => this.props.setPrompt(''));
    }

    handleKeyUp = (e) => {
      if(e.shiftKey && e.key === 'Enter') {
        e.preventDefault();
        this.props.setPrompt(this.props.prompt.concat('\n'))
        return;
      }
      console.log(e.key)
      switch(e.key) {
        case 'Enter':
          this.setState({inputHistoryNumber: this.state.inputHistoryNumber + 1, historyIndex: this.state.inputHistoryNumber - 1})
          this.handleSubmit(e)
          break;
        case 'ArrowUp':
          this.handleScrollUp()
          break;
        case 'ArrowDown':
          this.handleScrollDown()
          break;
      }
    }

    handleScrollUp = () => {
      this.props.setPrompt(this.state.promptHistory[this.state.historyIndex + 1], () => this.setState({historyIndex: this.state.historyIndex - 1}));
    }

    handleScrollDown = () => {
      if(this.state.historyIndex === (this.state.inputHistoryNumber - 1)) {
        this.props.setPrompt('', this.setState({historyIndex: this.state.inputHistoryNumber - 1}));
      } else {
        this.props.setPrompt(this.state.promptHistory[this.state.historyIndex + 2], () => this.setState({historyIndex: this.state.historyIndex + 1}));
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
