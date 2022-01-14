import React, { Component } from 'react'
import { parseISO, format } from 'date-fns'
import Loading from './Loading'

class NextLaunch extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      nextLaunch: [],
      rocket: [],
      launchpad: [],
    }
  };

  componentDidMount() {
    fetch('https://api.spacexdata.com/latest/launches/next')
      .then(results => {
        return results.json();
      }).then(data => {
        this.setState({
          isLoaded: true,
          nextLaunch: data
        });
        fetch(`https://api.spacexdata.com/latest/rockets/${data.rocket}`)
          .then(results => {
            return results.json();
          }).then(data => {
            this.setState({
              rocket: data
            })
          });
        fetch(`https://api.spacexdata.com/latest/launchpads/${data.launchpad}`)
          .then(results => {
            return results.json();
          }).then(data => {
            this.setState({
              launchpad: data
            })
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
      const badge = this.state.nextLaunch.links.patch.large;
      return (
        <div className="next-launch">
          <div className="launch-time">
            <p className="next-launch-day">
              {format(parseISO(this.state.nextLaunch.date_local), 'EEEE')}
            </p>
            <h2 className="next-launch-date">
              {format(parseISO(this.state.nextLaunch.date_local), 'MMMM d, yyyy')}
            </h2>
            <p className="next-launch-time">
              {format(parseISO(this.state.nextLaunch.date_local), 'h:mm a')} (your time)
            </p>
            {watch &&
              <div className="launch-video">
                <a href={watch}>Watch</a>
              </div>
            }
          </div>
          <div className="launch-details">
            <ul className="launch-detail">
              <li><span className="detail-title">Mission</span> {this.state.nextLaunch.name}</li>
              <li><span className="detail-title">Flight Number</span> {this.state.nextLaunch.flight_number}</li>
              <li><span className="detail-title">Rocket</span> {this.state.rocket.name}</li>
              <li><span className="detail-title">Launchpad</span> {this.state.launchpad.full_name}</li>
              <li><span className="detail-title">Location</span> {this.state.launchpad.locality}, {this.state.launchpad.region}</li>
            </ul>
            {this.state.nextLaunch.details &&
              <p>{this.state.nextLaunch.details}</p>
            }
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
