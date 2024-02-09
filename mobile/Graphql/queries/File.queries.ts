import { gql } from '@apollo/client'


export const FILEPUBLIC = gql`
query GetFilePublic {
FileListPublic {
    id
    title
    description
    format
    duration
    isPublic
    updatedAt
    author {
     email
     username
    }
  }
}
`;


export const fileByAuthor = gql`
query GetFileByAuthorId($fileListByAuthorIdId: ID!) {
  FileListByAuthorId(id: $fileListByAuthorIdId) {
    createdAt
    description
    duration
    format
    id
    isPublic
    title
  }
}
`;


export const FILELIST = gql`
  query Query {
    FileList {
      createdAt
      description
      duration
      format
      id
      isPublic
      title
      updatedAt
      url
      author {
        username
      }
    }
  }
`
