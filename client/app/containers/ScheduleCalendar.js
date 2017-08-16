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
import AddScheduleModal from 'App/components/AddScheduleModal'
import ScheduleDetailModal from 'App/components/ScheduleDetailModal'

class ScheduleCalendar extends React.Component {

  state = {
    selectedValue: moment(new Date()),
    detailVisible: false,
    addVisible: false,
    currentSchedules: [],
    addLoading: false
  }

  filterDateSchedule = (schedules, targetDate) => {
    return schedules && schedules.edges ? schedules.edges.reduce(
      (acc, current) => {
        if(moment(current.node.startDate).isSame(moment(targetDate), 'day')) {
          acc.push(current.node)
        }
        return acc
      },
      []
    ) : []
  }

  dateCellRender = (value) => {
    const { schedules } = this.props.viewer
    const currentSchedules = this.filterDateSchedule(schedules, value)
    return currentSchedules.length > 0 ? (
      <div style={{width: '100%', height: '100%'}}>
        {
          currentSchedules.map((s, index) => (
            <p
              key={index}
              style={{backgroundColor: 'rgba(87,37,10,.2)', marginBottom: 2}}>
              {s.subject}
            </p>
          ))
        }
      </div>
    ) : null
  }

  onSelect = (value) => {
    const { schedules } = this.props.viewer

    this.setState({
      selectedValue: value,
      detailVisible: true,
      currentSchedules: this.filterDateSchedule(schedules, value)
    })
  }

  onPanelChange = (value) => {
    this.setState({ selectedValue: value });
  }

  handleDetailOk = () => {
    this.setState({
      detailVisible: false,
      addVisible: true
    })
  }

  handleCancel = () => {
    this.setState({
      detailVisible: false,
      addVisible: false
    })
  }

  handleAddOk = () => {

  }

  render() {
    const { selectedValue, currentSchedules, addLoading } = this.state
    return (
      <div style={{padding: 30}}>
        <Card>
          <Calendar
            value={selectedValue}
            onSelect={this.onSelect}
            onPanelChange={this.onPanelChange}
            dateCellRender={this.dateCellRender}
          />
        </Card>
        <ScheduleDetailModal
          visible={this.state.detailVisible}
          onCancel={this.handleCancel}
          onOk={this.handleDetailOk}
          selectedDate={selectedValue}
          currentSchedules={currentSchedules}
        />
        <AddScheduleModal
          visible={this.state.addVisible}
          onCancel={this.handleCancel}
          selectedDate={selectedValue}
          loading={addLoading}
          viewerId={this.props.viewer.id}
        />
      </div>
    )
  }
}

export default createFragmentContainer(
  ScheduleCalendar,
  graphql.experimental`
    fragment ScheduleCalendar_viewer on Viewer
      @argumentDefinitions(first: {type: "Float", defaultValue: 100}) {
      id
      schedules(first: $first) @connection(key: "ScheduleCalendar_schedules") {
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
