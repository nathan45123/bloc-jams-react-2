import React, { Component } from 'react';
import albumData from './../data/albums';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      isPlaying: false,

    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  play() {
    this.audioElement.play();
    this.setState({
      isPlaying: true,
      dynamicClass: 'icon-ion-ios-pause'
    });
  }


  pause() {
    this.audioElement.pause();
    this.setState({
      isPlaying: false,
      dynamicClass: 'icon ion-ios-play'
    });
  }


  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song) }
      this.play();
    }
  }





  mouseEnter(e) {
    console.log(e.target.id);
    if (e.target !== this.state.currentSong && !this.state.isPlaying) {
      this.setState({
        dynamicClass: 'icon ion-ios-play',
        targetId: e.target.id
      });
    }
  }


mouseLeave(e) {
  console.log(e.target.id);
  if (!this.state.currentSong || !this.state.isPlaying) {
    this.setState({
      dynamicClass: 'song-number',
      targetId: e.target.id
    });
  }
  else if (this.state.currentSong) {
    this.setState({
      dynamicClass: 'icon ion-ios-pause',
      targetId: e.target.id
    });
  }
}





  render() {
    return (
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
          <div className="album-details">
            <h5>ALBUM</h5>
            <h1 id="album-title">{this.state.album.title}</h1>
            <h5>ARTIST</h5>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody>
            {this.state.album.songs.map( (song, index) =>
              <tr className="song" key={index} onClick={() => this.handleSongClick(song)} >
                <td className="song-actions">
                  <button>
                    <span className={(this.state.isPlaying && (this.state.currentSong === song)) ?'hidden-number' : 'song-number'}>{index + 1}</span>
                    <span className={(this.state.isPlaying && (this.state.currentSong === song)) ? 'icon ion-ios-pause' : ''}></span>
                    <span className={(this.state.isPlaying && (this.state.currentSong === song)) ? '' : 'icon ion-ios-play'}></span>
                  </button>
                </td>
                <td className="song-title">{song.title}</td>

              </tr>
            )}
          </tbody>
        </table>
  </section>
   );
 }
}

export default Album;
