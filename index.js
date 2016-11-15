var React = require('react');
var ReactDOM = require('react-dom');
var marked = require('marked');


// initialText
const initialText = 
'# This is markdown.\
\r\r## Here\'s a subsection.\
\r\rThis is a paragraph.\
\r\rLeaving two spaces at the end makes a  \rnewline.\
\r\rTest attributes: *italics*, **bold**,  \r`monospace`, ~~strikethrough~~\
\r\rUnordered list:\
\r* apples\r * fuji apples\r* pears\
\r\rOrdered list:\
\r1. Eggs\r 1. Scrambled\r2. Bacon\r3. Ham\
\r\rFor more markdown tips visit [here]\(https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet\)';

// Main renders the document
function Main() {
  return (
  	<div className="container">
      <Title text={'Markdown Previewer'} />
      <App />
      <Footer />
    </div>
  );
}

// App holds the top level state
class App extends React.Component {
  constructor() {
    super();
    this.state = {value: initialText};

    this.handleChange = this.handleChange.bind(this);
    this.updateText = this.updateText.bind(this);
  }
  // function that updates stored value when text added
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  // function that updates output from stored value
  updateText() {
    return {__html: marked(this.state.value, {sanitize: true})};
  }
  render() {
  	const output = this.updateText();
    return (
      <div className="row site-content">        
        <TextInput value={this.state.value} onChange={(event) => this.handleChange(event)} />
        <TextOutput output={output} />
      </div>
    );
  }
}

function Title(props) {
  return <h1 className="text-center title">{props.text}</h1>;
}

// TextInput, for entering markdown
function TextInput(props) {
  return (
    <div className="col-xs-6">
      <form>
        <textarea value={props.value} onChange={(event) => props.onChange(event)} />
      </form>
    </div>
  );
}

// TextOutput, for displaying markdown
function TextOutput(props) {
  return (
    <div className="col-xs-6">
      <div dangerouslySetInnerHTML={props.output} />
    </div>
  );
}

function Footer() {
  return <footer className="text-center footer">Cobbled together by Yu Dong Hee.</footer>;
}

// render App
ReactDOM.render(
  <Main />,
  document.getElementById('root')
);

