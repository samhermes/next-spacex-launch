import React, { Component } from 'react'
import { parseISO, format } from 'date-fns'
import Loading from './Loading'

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
      const badge = this.state.nextLaunch.links.mission_patch_small;
      return (
        <div className="next-launch">
          <div className="launch-time">
            <h2 className="next-launch-date">
              {format(parseISO(this.state.nextLaunch.launch_date_local), 'MMMM d, yyyy')}
            </h2>
            <p className="next-launch-time">
              {format(parseISO(this.state.nextLaunch.launch_date_local), 'h:mm a')} (your time)
            </p>
            {watch &&
              <div className="launch-video">
                <a href={watch}>Watch</a>
              </div>
            }
          </div>
          <div className="launch-details">
            <ul className="launch-detail">
              <li><span className="detail-title">Mission</span> {this.state.nextLaunch.mission_name}</li>
              <li><span className="detail-title">Flight Number</span> {this.state.nextLaunch.flight_number}</li>
              <li><span className="detail-title">Rocket</span> {this.state.nextLaunch.rocket.rocket_name}</li>
              <li><span className="detail-title">Launch Site</span> {this.state.nextLaunch.launch_site.site_name_long}</li>
            </ul>
          </div>
          <div className="launch-media">
          {badge &&
            <div className="launch-badge">
              <img src={badge} alt="" />
            </div>
          }
          </div>
        </div>
      )
    }
  }
}

export default NextLaunch;
