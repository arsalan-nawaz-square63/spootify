import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import Authorize from './Authorize';
import InpageLoader from './inpageLoader';

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: []
    };
  }

  setStates = (newR, play, cat) => {
    this.setState({newReleases: newR});
    this.setState({playlists: play});
    this.setState({categories: cat});
  }

  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className="discover">
        <Authorize setStates = { this.setStates } />
        {this.state.newReleases.length > 0 ? <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} /> : <InpageLoader title="New Releases" />}
        {this.state.playlists.length > 0 ?<DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} /> : <InpageLoader title="Featured Playlists" />}
        {this.state.categories.length > 0 ?<DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" /> : <InpageLoader title="Categories" />}
      </div>
    );
  }
}
