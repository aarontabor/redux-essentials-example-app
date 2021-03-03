import React from 'react'
import { useDispatch } from 'react-redux'

import { reactionAdded } from './postsSlice'


const reactions = {
  upvote: '^',
  downvote: 'v',
}

export const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch()


  const reactionButtons = Object.entries(reactions).map(([name, icon]) => {
    return (
      <button
        key={name}
        type="button"
        className="muted-button reaction-button"
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: name }))
        }
      >
        {icon} {post.reactions[name]}
      </button>
    )
  })

  return <div>{reactionButtons}</div>
}
