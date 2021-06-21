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


//QUERIES

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
        noteCategories {
          _id
          categoryName
          sequence
          createdBy {
            _id
            name
            email
            photo
          }
          notes {
            _id
            description
            createdBy {
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



export const PROJECT_INFO = gql`
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
      noteCategories {
        _id
        categoryName
        sequence
        createdBy {
          _id
          name
          email
          photo
        }
        notes {
          _id
          description
          createdBy {
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

// export const PROJECT_NOTES = gql`
// query projectInfo(
//     $projectId: ID!
// ) {
//   projectInfo(projectId: $projectId) {
//     _id
//     projectName
//     description
//     icon
//     status
//     techStacks
//     createdBy {
//       _id
//       name
//       photo
//     }
//     confirmedMembers {
//         _id
//         name
//         email
//         photo
//     }
//     unconfirmMembers {
//       _id
//       name
//       photo
//     }
//     noteCategories {
//         _id
//         categoryName
//         sequence
//         createdBy {
//           _id
//           name
//           email
//           photo
//         }
//         notes {
//           _id
//           description
//           createdBy {
//             _id
//             name
//             email
//             photo
//           }
//           createdAt
//           updatedAt
//         }
//       }
//     createdAt
//     updatedAt
//     }
// }

// `

//MUTATIONS

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


//SUBSCRIPTIONS

export const NEW_PROJECT_SUBSCRIPTION = gql`
  subscription onNewProject($userId: ID!) {
    newProject(userId: $userId) {
        _id
        projectName
        description
        techStacks
        createdBy {
          _id
          email
          name
          photo
        }
        createdAt
        updatedAt
    }
  }
`;