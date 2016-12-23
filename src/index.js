import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Console from './components/Console';



class App extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        prompt: ' ',
        history: []
      };
    }

   pushHistory = ({ data, type }, cb) => {
     this.setState({ history: this.state.history.concat([{ type, data }]) }, cb);
   }

   evalCallback = (str) => {
     try {
       eval(str);
     } catch(e) {
       return "Uncaught ReferenceError: " + str + " is not defined";
     }
     return eval(str);
   }

   setPrompt = (str, cb) => {
     this.setState({ prompt: str }, cb);
   }

   render() {
     return (
            <Console
              setPrompt={this.setPrompt}
              evalCallback={this.evalCallback}
              history={this.state.history}
              pushHistory={this.pushHistory}
              prompt={this.state.prompt} />
      )
    }

};

ReactDOM.render(<App />, document.querySelector('.container'));
