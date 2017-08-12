import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import EnvironmentManager from 'App/environment/EnvironmentManager'

export default class ScheduleBox extends React.Component {

  renderScheduleList(schedules) {

    return (
      <div className="schedule-list">
        {
          schedules.edges.map(schedule => (
            <div>
              <p>{schedule.node.subject}</p>
              <p>{schedule.node.date}</p>
              <p>{schedule.node.users.join("，")}</p>
            </div>
          ))
        }
      </div>
    )
  }

  render() {
    return (
      <QueryRenderer
        environment={EnvironmentManager.getManager().getEnvironmentInstance()}
        query={graphql`
          query ScheduleBoxQuery($first: Float) {
            schedules(first: $first) {
              edges {
                node {
                  users
                  subject
                  date
                }
              }
            }
          }
        `}
        variables={{
          first: 10
        }}
        render={({error, props}) => {
          if(error) {
            return null
          } else if (props && props.schedules) {
            return this.renderScheduleList(props.schedules)
          }
          return null
        }}
      />
    )
  }
}
