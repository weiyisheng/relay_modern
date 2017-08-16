import React from 'react'
import moment from 'moment'

//components
import {
  Button,
  Row,
  Col,
  Modal,
  Form,
  Input,
  TimePicker,
  Tag
} from 'antd'
const FormItem = Form.Item
//mutation
import AddScheduleMutation from 'App/mutations/AddScheduleMutation'

class AddScheduleModal extends React.Component {

  state = {
    members: [],
    tagInputVisible: false,
    tagInputValue: '',
    loading: false
  }


  handleSubmit = e => {
    e.preventDefault()
    const { members } = this.state
    const { selectedDate } = this.props
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      } else {
        this.setState({
          addLoading: true
        })

        fieldsValue.startDate.set({
          'year': selectedDate.get('year'),
          'month': selectedDate.get('month'),
          'date': selectedDate.get('date')
        })
        const inputs = {
          ...fieldsValue,
          members,
          startDate: fieldsValue.startDate.format()
        }
        AddScheduleMutation.commit(
          this.props.viewerId,
          inputs,
          response => {
            this.close()
          },
          err => {
            this.close()
          }
        )
      }
    })
  }

  close() {
    const { onCancel } = this.props
    this.setState({
      addLoading: false,
      members: [],
      tagInputVisible: false,
      tagInputValue: ''
    }, () => {
      onCancel ? onCancel() : void 0
    })
  }

  showTagInput = () => {
    this.setState({
      tagInputVisible: true
    }, () => this.tagInput.focus())
  }

  handleInputConfirm = (e) => {
    e.preventDefault()
    const { tagInputValue, members } = this.state
    if (tagInputValue && members.indexOf(tagInputValue) === -1) {
      members.push(tagInputValue)
    }

    this.setState({
      members,
      tagInputValue: ''
    })
  }

  handleInputBlur = () => {
    this.setState({
      tagInputVisible: false,
      tagInputValue: ''
    })
  }

  handleInputChange = (e) => {
    this.setState({ tagInputValue: e.target.value });
  }

  handleTagClose(removedTag) {
    const members = this.state.members.filter(tag => tag !== removedTag)
    this.setState({ members });
  }

  render() {
    const { tagInputVisible, tagInputValue, members } = this.state
    const { visible, onCancel, selectedDate, loading } = this.props
    const { getFieldDecorator } = this.props.form
    return (
      <Modal
        title={moment(selectedDate).format('YYYY年MM月DD日 ddd')}
        visible={visible}
        footer={null}
        onCancel={onCancel}
      >
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            label="主题"
            required={true}
            hasFeedback
          >
            {getFieldDecorator('subject', {
               rules: [{ required: true, message: '请输入主题' }],
             })(
               <Input />
             )}
          </FormItem>
          <FormItem
            label="开始时间"
            required={true}
            hasFeedback
          >
            {getFieldDecorator('startDate', {
               rules: [{ required: true, message: '请输入开始时间' }],
             })(
               <TimePicker />
             )}
          </FormItem>
          <FormItem
            label="人员"
            required={true}
            hasFeedback
          >
            {getFieldDecorator('members', {
              //  rules: [{ required: true, message: '请输入人员' }],
             })(
               <div>
                 {
                   members.map((member, index) => {
                     return (
                       <Tag
                        key={member}
                        closable={index !== 0}
                        afterClose={() => this.handleTagClose(member)}
                       >
                         {member}
                       </Tag>
                     )
                   })
                 }
                 {
                   tagInputVisible ? (
                     <Input
                       ref={e => this.tagInput = e}
                       type="text"
                       size="small"
                       style={{ width: 78 }}
                       value={tagInputValue}
                       onChange={this.handleInputChange}
                       onBlur={this.handleInputBlur}
                       onPressEnter={this.handleInputConfirm}
                     />
                   ) : (
                     <Button
                       size="small"
                       type="dashed"
                       onClick={this.showTagInput}
                     >
                       + New Tag
                     </Button>
                   )
                 }
               </div>
             )}
          </FormItem>
          <FormItem>
            <Row>
             <Col
              span={4}
              offset={20}
             >
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
              >
                提交
              </Button>
             </Col>
            </Row>
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(AddScheduleModal)
