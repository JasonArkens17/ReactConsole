// import React from 'react';
//
// class ConsoleInput extends React.Component {
//   constructor(props) {
//       super(props);
//
//       this.state = {
//         prompt: this.props.prompt,
//       };
//     }
//
//     onInputChange = (input) => {
//       // console.log(input.which)
//       // this.setState({prompt: input});
//       this.props.setPrompt(input);
//     }
//
//     // handleKeyUp = (e) => {
//     //   console.log(e.key)
//     //   //Enter Key
//     //   if(e.which === 13) {
//     //     console.log();
//     //     // this.handleSubmit(e);
//     //   }
//     //
//     //   //Up Arrow
//     //   if(e.which === 38){
//     //     //TODO: prompt becomes prev item in history
//     //     console.log('UP');
//     //   }
//     //
//     //   //Down Arrow
//     //   if(e.which === 40) {
//     //     //TODO: prompt becomes next item in history
//     //   }
//     //
//     // }
//
//     handleSubmit = (e) => {
//       e.preventDefault();
//       this.props.pushHistory({data: this.props.prompt, type: "prompt"});
//       // let outputValue = this.props.evalCallback(this.props.prompt);
//       // this.props.pushHistory({data: outputValue, type: "output"});
//       this.props.setPrompt("");
//     }
//
//
//     render() {
//         return (
//           <div>
//             <form onSubmit={this.handleSubmit}>
//               <textarea value={this.props.prompt} onChange={(e) => this.onInputChange(e.target.value)}> >> </textarea>
//               <input type='submit' value="Submit" />
//             </form>
//           </div>
//         );
//       }
//
// };
//
// export default ConsoleInput;
