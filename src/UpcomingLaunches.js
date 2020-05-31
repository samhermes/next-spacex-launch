import React, { Component } from 'react'
import { parseISO, format } from 'date-fns'
import Loading from './Loading'

class UpcomingLaunches extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      upcomingLaunches: [],
    }
  };

  componentDidMount() {
    fetch('https://api.spacexdata.com/v2/launches/upcoming')
      .then(results => {
        return results.json();
      }).then(data => {
        this.setState({
          isLoaded: true,
          upcomingLaunches: data
        });
      });
  }

  render() {
    const { isLoaded } = this.state;
    if (!isLoaded) {
      return (
        <div>
          <h2>Upcoming Launches</h2>
          <Loading />
        </div>
      )
    } else {
      return (
        <div>
          <h2>Future Launches</h2>
          <div className="upcoming-launches">
            <ul className="launches">
              {this.state.upcomingLaunches.slice(0, 5).map(function (mission, index) {
                if (index === 0) {
                  return false
                } else {
                  const watch = mission.links.video_link;
                  return <li key={index}>
                    <div className="launch-datetime">
                      <h3 className="launch-date">
                        {format(parseISO(mission.launch_date_local), 'MMMM d, yyyy')}
                      </h3>
                      <p className="launch-time">
                        {format(parseISO(mission.launch_date_local), 'h:mm a')} (your time)
                      </p>
                    </div>
                    <div className="launch-details">
                      <ul className="launch-detail">
                        <li><span className="detail-title">Mission</span> {mission.mission_name}</li>
                        <li><span className="detail-title">Flight Number</span> {mission.flight_number}</li>
                        <li><span className="detail-title">Rocket</span> {mission.rocket.rocket_name}</li>
                        <li><span className="detail-title">Launch Site</span> {mission.launch_site.site_name_long}</li>
                      </ul>
                    </div>
                    {watch &&
                      <div className="launch-video">
                        <a href={watch}>Watch</a>
                      </div>
                    }
                  </li>;
                }
              })}
            </ul>
          </div>
        </div>
      )
    }
  }
}

export default UpcomingLaunches;
