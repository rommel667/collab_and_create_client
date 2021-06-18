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
      notes {
        _id
        description
        categoryId
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

export const MOVE_NOTE_CATEGORY = gql`
mutation moveNoteCategory(
    $noteCategoryIds: [ID]!
    $projectId: ID!
) {
  moveNoteCategory(noteCategoryIds: $noteCategoryIds, projectId: $projectId) {
      newSequenceIds
    }
}

`

export const MOVE_NOTE = gql`
mutation moveNote(
    $sourceCategoryId: ID!
    $destinationCategoryId: ID!
    $noteId: ID!
    $projectId: ID!
) {
    moveNote( sourceCategoryId: $sourceCategoryId, destinationCategoryId: $destinationCategoryId, noteId: $noteId, projectId: $projectId ) {
      message
      sourceCategoryId
      destinationCategoryId
      noteId
      }
}

`

//SUBSCRIPTIONS