import React from 'react';

class HomeComponent extends React.Component {

  constructor(props){
    super(props)
    this.state = {
        display: '...',
    }

    this.handleKey = this.handleKey.bind(this)
    this.handleButton = this.handleButton.bind(this)
  }

  handleKey(e){
      let audio = e.target.tagName === 'DIV'? e.target.children[1] : e.target.nextSibling;
      audio.play();

      this.setState({
        display: audio.id.replace('-', ' ')
      })
  }

  handleButton(e){
    let audio = e.children[1];
    audio.play();
    this.setState({
      display: audio.id.replace('-', ' ')
    })
  }

  componentDidMount(){
    document.addEventListener('keydown', (e) => {
      Array.from(document.getElementById('keyboard').children).forEach(el => {
        if(parseInt(el.id) === e.keyCode)  this.handleButton(el)
      });
    })
  }

  render(){

    const keys = this.props.data.map(el => {
      return (
        <div key={ el.code } id={el.code} onClick={ this.handleKey } className="drum-pad">
          <span>{ el.key }</span>
          <audio id={ el.key } className="clip" src={ el.url } />
        </div>
      )
    });

    return (
      <div className="card mt-3">
        <h1>Drum Machine</h1>
        <div id="drum-machine">
          <div id="display"><h3>{ this.state.display }</h3></div>
          <div id="keyboard">
            { keys }
          </div>
        </div>
      </div>
    )
  }
}

export default HomeComponent
