import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import EnvironmentManager from 'App/environment/EnvironmentManager'
import moment from 'moment'
import 'moment/locale/zh-cn'

import ScheduleCalendar from 'App/containers/ScheduleCalendar'
import Schedules from 'App/containers/Schedules'

moment.locale('zh-cn')

export default class Root extends React.Component {

  render() {
    console.log(EnvironmentManager.getManager().getEnvironmentInstance().getStore().getSource());
    return (
      <div className="root-container">
        <QueryRenderer
          environment={EnvironmentManager.getManager().getEnvironmentInstance()}
          query={graphql`
            query RootQuery {
              viewer {
                ...ScheduleCalendar_viewer
              }
            }
          `}
          render={({error, props}) => {
            if(props && props.viewer) {
              return (
                <div>
                  <ScheduleCalendar viewer={props.viewer}/>
                </div>
              )
            }
            return null
          }}
        />
      </div>
    )
  }
}
