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
    fetch('https://api.spacexdata.com/latest/launches/upcoming')
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
    return (
      <div>
        <h2>Future Launches</h2>
        {!isLoaded ?
          <Loading />
        :
          <div className="upcoming-launches">
            <ul className="launches">
              {this.state.upcomingLaunches.slice(0, 5).map(function (mission, index) {
                if (index === 0) {
                  return false
                } else {
                  const watch = mission.links.webcast;
                  return <li key={index}>
                    <div className="launch-datetime">
                      <h3 className="launch-date">
                        {format(parseISO(mission.date_local), 'MMMM d, yyyy')}
                      </h3>
                      <p className="launch-time">
                        {format(parseISO(mission.date_local), 'h:mm a')} (your time)
                      </p>
                    </div>
                    <div className="launch-details">
                      <ul className="launch-detail">
                        <li><span className="detail-title">Mission</span> {mission.name}</li>
                        <li><span className="detail-title">Flight Number</span> {mission.flight_number}</li>
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
        }
      </div>
    )
  }
}

export default UpcomingLaunches;
