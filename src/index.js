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


   escapeHtml = (string) => {
     //escaping to prevent some basic XXS attacks
     const entityMap = {
       "&": "&amp;",
       "<": "&lt;",
       ">": "&gt;",
       '"': '&quot;',
       "'": '&#39;',
       "/": '&#x2F;',
       "a": '/a',
       "A": '/A'
     };

     return String(string).replace(/[&<>"'\/a|A]/g, function (s) {
       return entityMap[s];
     });
   }

   evalCallback = (str) => {
     let safeStr = this.escapeHtml(str);
     console.log(safeStr)
     try {
       eval(safeStr);
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
