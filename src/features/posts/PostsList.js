import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import { selectAllPosts, fetchPosts } from './postsSlice'


export const PostsList = () => {
  const dispatch = useDispatch()

  const postStatus = useSelector(state => state.posts.status)
  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])


  const posts = useSelector(selectAllPosts)
  const error = useSelector(state => state.posts.error)

  let content
  if (postStatus === 'pending') {
    content = <div className="loader">Loading...</div>

  } else if (postStatus === 'fulfilled') {
    const orderedPosts = [...posts].sort((a,b) => b.date.localeCompare(a.date))

    content = orderedPosts.map(post => (
      <article className="post-excerpt" key={post.id}>
        <h3>{post.title}</h3>
        <div>
          <ReactionButtons post={post} />
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} />
        </div>
        <p className="post-content">{post.content.substring(0, 100)}</p>
        <Link to={`/posts/${post.id}`} className="button muted-button">
          View Post
        </Link>
      </article>
    ))

  } else if (postStatus === 'rejected') {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
