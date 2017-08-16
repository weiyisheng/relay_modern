import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import moment from 'moment'

//components
import {
  Col,
  Modal,
  Collapse
} from 'antd'
const Panel = Collapse.Panel

class ScheduleDetailModal extends React.Component {
  render() {
    const { onCancel, onOk, visible, selectedDate, currentSchedules } = this.props
    return (
      <Modal
        title={moment(selectedDate).format('YYYY年MM月DD日 ddd')}
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        okText="添加"
      >
        <Collapse>
          {
            currentSchedules.map((s, index) => {
              return (
                <Panel
                  header={s.subject}
                  key={index}
                >
                  <p>{moment(s.date).format('HH:mm:ss')}</p>
                  <p>{(s.members || []).join('、')}</p>
                </Panel>
              )
            })
          }
        </Collapse>
      </Modal>
    )
  }
}

export default ScheduleDetailModal

// export default createFragmentContainer(
//   ScheduleDetailModal,
//   graphql`
//     fragment ScheduleDetailModal_schedule on Schedule {
//       members
//       startDate
//       subject
//     }
//   `
// )
