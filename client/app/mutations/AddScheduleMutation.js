import { commitMutation, graphql } from 'react-relay'
import EnvironmentManager from 'App/environment/EnvironmentManager'

const mutation = graphql`
  mutation AddScheduleMutation (
    $input: AddScheduleInput!
  ) {
    addSchedule(input: $input) {
      addedScheduleEdge {
        node {
          id
          members
          subject
          startDate
        }
      }
    }
  }
`

function commit(viewerId, input, onCompleted, onError) {
  const environment = EnvironmentManager.getManager().getEnvironmentInstance()
  commitMutation(
    environment,
    {
      mutation,
      variables: {
        input: {
          ...input,
          clientMutationId: "AddSchedule"
        }
      },
      onCompleted,
      onError,
      configs: [{
        type: 'RANGE_ADD',
        parentID: viewerId,
        connectionInfo: [{
          key: 'ScheduleCalendar_schedules',
          rangeBehavior: 'append'
        }, {
          key: 'Schedules_schedules_1',
          rangeBehavior: 'append'
        }],
        edgeName: 'addedScheduleEdge'
      }]
    }
  )
}

export default { commit }
