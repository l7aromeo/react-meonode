import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import lightTheme from '@src/constants/themes/lightTheme'
import darkTheme from '@src/constants/themes/darkTheme'
import Cookies from 'js-cookie'

export interface ThemeState {
  mode: 'light' | 'dark'
  colors: typeof lightTheme | typeof darkTheme
}

const initialState: ThemeState = {
  mode: 'light',
  colors: lightTheme,
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setInitialTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.mode = action.payload
      state.colors = action.payload === 'light' ? lightTheme : darkTheme
    },
    toggleTheme: state => {
      const newMode = state.mode === 'light' ? 'dark' : 'light'
      state.mode = newMode
      state.colors = newMode === 'light' ? lightTheme : darkTheme
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newMode)
        Cookies.set('theme', newMode, { expires: 365 })
      }
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.mode = action.payload
      state.colors = action.payload === 'light' ? lightTheme : darkTheme
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', action.payload)
        Cookies.set('theme', action.payload, { expires: 365 })
      }
    },
  },
})

export const { toggleTheme, setTheme, setInitialTheme } = themeSlice.actions
export default themeSlice.reducer
