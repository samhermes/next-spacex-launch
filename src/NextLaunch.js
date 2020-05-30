import React, { Component } from 'react';
import format from 'date-fns/format';
import Loading from './Loading';

class NextLaunch extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      nextLaunch: [],
    }
  };

  componentDidMount() {
    fetch('https://api.spacexdata.com/v2/launches/next')
      .then(results => {
        return results.json();
      }).then(data => {
        this.setState({
          isLoaded: true,
          nextLaunch: data
        });
      });
  }

  render() {
    const { isLoaded } = this.state;
    if (!isLoaded) {
      return (
        <Loading />
      )
    } else {
      const watch = this.state.nextLaunch.links.video_link;
      return (
        <div className="next-launch">
          <div className="launch-time">
            <h2 className="next-launch-date">
              {format(this.state.nextLaunch.launch_date_local, 'MMMM DD, YYYY')}
            </h2>
            <p className="next-launch-time">
              {format(this.state.nextLaunch.launch_date_local, 'h:mm a')} (your time)
            </p>
          </div>
          <div className="launch-details">
            <ul className="launch-detail">
              <li><span className="detail-title">Mission</span> {this.state.nextLaunch.mission_name}</li>
              <li><span className="detail-title">Flight Number</span> {this.state.nextLaunch.flight_number}</li>
              <li><span className="detail-title">Rocket</span> {this.state.nextLaunch.rocket.rocket_name}</li>
              <li><span className="detail-title">Launch Site</span> {this.state.nextLaunch.launch_site.site_name_long}</li>
            </ul>
          </div>
          {watch &&
            <div className="video-link">
              <a href={watch}>Watch</a>
            </div>
          }
        </div>
      )
    }
  }
}

export default NextLaunch;
