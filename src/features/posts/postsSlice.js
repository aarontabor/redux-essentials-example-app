import { createSlice } from '@reduxjs/toolkit'


const initialState = [
  { id: '1', title: 'First Post!', content: 'Hello World :)' },
  { id: '2', title: 'Second Post', content: 'Boo - missed out on first :(' },
]


const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
})


export default postsSlice.reducer
