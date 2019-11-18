import React from 'react';
import './App.css';
import { CSSTransition } from "react-transition-group";



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      albums: [],
      photos: [],
    };
  }
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/albums')
      .then(res => res.json())
      .then(albums => {
        this.setState({ albums })
        console.log(albums)
      })
  }
  getPhotos(event) {
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${event.target.value}`)
      .then(res => res.json())
      .then(photos => {
        this.setState({ photos });
        console.log(photos)
      });
  }


  render() {
    return (
      <div className="App">
        <h1 className="app-title">Select an album:</h1>
        <select onChange={this.getPhotos.bind(this)} >
          {this.state.albums.map(item => {
            return <option value={item.id} key={item.id}>{item.title}</option>
          })}
        </select>
        <div className="app-photos">
          {this.state.photos.map(photo => {
            return <CSSTransition
              key={photo.id}
              in={true}
              appear={true}
              timeout={1000}
              classNames="fade">
              <img src={photo.thumbnailUrl} alt={photo.title} key={photo.id} />
            </CSSTransition>
          })}
        </div>

      </div>
    );
  }

}

export default App;
