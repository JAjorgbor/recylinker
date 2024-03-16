import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import sidebarSlice from './sidebarSlice'

export const store = configureStore({
    reducer: { sidebar: sidebarSlice },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export const useAppDispatch: () => typeof store.dispatch = useDispatch
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export const useAppSelector: TypedUseSelectorHook<
    ReturnType<typeof store.getState>
> = useSelector