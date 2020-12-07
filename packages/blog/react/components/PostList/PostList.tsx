import {gql, useQuery} from '@apollo/client'
import React from 'react'

import {Posts} from './__generated__/Posts'

export default function PostList() {
  const {loading, error, data} = useQuery<Posts>(POSTS)

  if (loading) return <p>Loading...</p>
  if (error) throw new Error(JSON.stringify(error, null, 2))

  const posts = data!.posts

  return (
    <ul>
      {posts.length ? (
        posts.map((p) => (
          <li key={p.id}>
            "{p.title}" by {p.author.name}
          </li>
        ))
      ) : (
        <li>No posts found.</li>
      )}
    </ul>
  )
}

const POSTS = gql`
  query Posts {
    posts(first: 10) {
      id
      title
      author {
        id
        name
      }
    }
  }
`
