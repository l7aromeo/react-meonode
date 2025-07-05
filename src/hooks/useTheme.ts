'use client'
import { useAppSelector } from '@src/redux/store'
import { useEffect } from 'react'

export const useTheme = () => {
  const theme = useAppSelector(state => state.theme)

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme')
    if (currentTheme && currentTheme !== theme.mode) {
      localStorage.setItem('theme', theme.mode)
    }
  }, [theme.mode])

  return theme
}
