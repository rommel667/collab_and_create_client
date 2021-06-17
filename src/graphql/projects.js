import { gql } from '@apollo/client';

// export const PROJECTS_BY_USER = gql`
// query projectsByUser {
//     projectsByUser {
//       _id
//       projectName
//       description
//       icon
//       status
//       techStacks
//       createdBy {
//         _id
//         name
//         photo
//       }
//       confirmedMembers {
//           _id
//           name
//           email
//           photo
//       }
//       unconfirmMembers {
//         _id
//         name
//         photo
//       }
//       taskColumns {
//           _id
//           tasks {
//             _id
//           }
//         }
//       createdAt
//       updatedAt
//     }
//   }
// `


export const PROJECTS_BY_USER = gql`
query projectsByUser {
    projectsByUser {
      _id
      projectName
      description
      icon
      status
      techStacks
      createdBy {
        _id
        name
        photo
      }
      confirmedMembers {
          _id
          name
          email
          photo
      }
      unconfirmMembers {
        _id
        name
        photo
      }
      taskColumns {
          _id
          columnName
          sequence
          createdBy {
            _id
            name
            email
            photo
          }
          tasks {
            _id
            description
            createdBy {
              _id
              name
              email
              photo
            }
            inCharge {
              _id
              name
              email
              photo
            }
            createdAt
            updatedAt
          }
        }
      createdAt
      updatedAt
    }
  }
`



export const PROJECT_TASKS = gql`
query projectInfo(
    $projectId: ID!
) {
  projectInfo(projectId: $projectId) {
    _id
    projectName
    description
    icon
    status
    techStacks
    createdBy {
      _id
      name
      photo
    }
    confirmedMembers {
        _id
        name
        email
        photo
    }
    unconfirmMembers {
      _id
      name
      photo
    }
    taskColumns {
        _id
        columnName
        sequence
        createdBy {
          _id
          name
          email
          photo
        }
        tasks {
          _id
          description
          createdBy {
            _id
            name
            email
            photo
          }
          inCharge {
            _id
            name
            email
            photo
          }
          createdAt
          updatedAt
        }
      }
    createdAt
    updatedAt
    }
}

`


export const NEW_PROJECT = gql`
mutation newProject(
    $projectName: String!
    $description: String!
    $icon: String!
    $unconfirmMembers: [ID]!
    $techStacks: [String]!
) {
    newProject(
        projectInput: {
            projectName: $projectName
            description: $description
            icon: $icon
            unconfirmMembers: $unconfirmMembers
            techStacks: $techStacks
        }) {
          _id
          projectName
          description
          icon
          status
          techStacks
          createdBy {
                _id
                name
                photo
            }
          unconfirmMembers {
                _id
                name
                photo
            }
          confirmedMembers {
              _id
              name
              photo
            }
          taskColumns {
              _id
            }
          createdAt
          updatedAt
    }
}

`