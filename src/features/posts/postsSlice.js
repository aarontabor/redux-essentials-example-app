import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'


const initialState = [
  { 
    id: '1',
    title: 'First Post!',
    content: 'Hello World :)',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: { upvote: 0, downvote: 0 },
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'Boo - missed out on first :(',
    date: sub(new Date(), {minutes: 5 }).toISOString(),
    reactions: { upvote: 0, downvote: 0 },
  },
]


const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
            reactions: { upvote: 0, downvote: 0 },
          }
        }
      },
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload
      const existingPost = state.find(post => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const post = state.find(post => post.id === postId)
      if (post) {
        post.reactions[reaction]++
      }
    },
  },
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer


export const selectAllPosts = state => state.posts

export const selectPostById = (state, postId) =>
  state.posts.find(post => post.id === postId)
