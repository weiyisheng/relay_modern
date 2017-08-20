import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import moment from 'moment'
import EnvironmentManager from 'App/environment/EnvironmentManager'
//components
import {
  Col,
  Calendar,
  Card
} from 'antd'

class Schedules extends React.Component {


  render() {
    console.log(" schedules_1 : ", this.props.viewer.schedules_1);
    return (
      <div style={{padding: 30}}>

      </div>
    )
  }
}

export default createFragmentContainer(
  Schedules,
  graphql.experimental`
    fragment Schedules_viewer on Viewer
      @argumentDefinitions(first: {type: "Float", defaultValue: 3}) {
      id
      schedules_1: schedules(first: $first) @connection(key: "Schedules_schedules_1") {
        edges {
          node {
            members
            subject
            startDate
          }
        }
      }
    }
  `
)
