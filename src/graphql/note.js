import gql from "graphql-tag";

//QUERIES



//MUTATIONS

export const NEW_NOTE_CATEGORY = gql`
mutation newNoteCategory(
    $categoryName: String!
    $projectId: ID!
) {
    newNoteCategory( categoryName: $categoryName, projectId: $projectId ) {
      _id
      categoryName
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
        columnId
        createdBy {
          _id
          name
          email
          photo
        }
        createdAt
        updatedAt
      }
      createdAt
    	updatedAt
    }
}

`

export const NEW_NOTE = gql`
mutation newNote(
    $description: String!
    $categoryId: ID!
    $projectId: ID!
) {
    newNote( description: $description, categoryId: $categoryId, projectId: $projectId ) {
        _id
        description
        categoryId
        projectId,
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

`

//SUBSCRIPTIONS