/**
 * @flow
 * @relayHash 73feed76884d4814ac40725a9ea3c29d
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type AddScheduleMutationVariables = {|
  input: {
    members?: ?$ReadOnlyArray<?string>;
    subject: string;
    startDate?: ?any;
    clientMutationId: string;
  };
|};

export type AddScheduleMutationResponse = {|
  +addSchedule: ?{|
    +addedScheduleEdge: ?{|
      +node: ?{|
        +id: string;
        +members: ?$ReadOnlyArray<?string>;
        +subject: string;
        +startDate: ?any;
      |};
    |};
  |};
|};
*/


/*
mutation AddScheduleMutation(
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
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "AddScheduleInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AddScheduleMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "AddScheduleInput!"
          }
        ],
        "concreteType": "AddSchedulePayload",
        "name": "addSchedule",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "ScheduleEdge",
            "name": "addedScheduleEdge",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "Schedule",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "id",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "members",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "subject",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "startDate",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "RootMutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "AddScheduleMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "AddScheduleInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "AddScheduleMutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "AddScheduleInput!"
          }
        ],
        "concreteType": "AddSchedulePayload",
        "name": "addSchedule",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "ScheduleEdge",
            "name": "addedScheduleEdge",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "Schedule",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "id",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "members",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "subject",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "startDate",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation AddScheduleMutation(\n  $input: AddScheduleInput!\n) {\n  addSchedule(input: $input) {\n    addedScheduleEdge {\n      node {\n        id\n        members\n        subject\n        startDate\n      }\n    }\n  }\n}\n"
};

module.exports = batch;
