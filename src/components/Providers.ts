'use client'
import { Node, type NodeElement } from '@meonode/ui'
import { initializeStore, ReduxProviderWrapper, RootState } from '@src/redux/store'
import { lazy, StrictMode, useEffect, useMemo } from 'react'
import { setInitialTheme } from '@src/redux/slice/theme.slice'
const SnackbarProvider = lazy(() => import('notistack').then(module => ({ default: module.SnackbarProvider })))

export const ProvidersWrapper = ({ reduxPreloadedStore, children }: { reduxPreloadedStore: RootState; children: NodeElement }) => {
  const initialStore = useMemo(() => initializeStore(reduxPreloadedStore), [reduxPreloadedStore])

  useEffect(() => {
    const initialThemeMode = reduxPreloadedStore.theme.mode
    initialStore.dispatch(setInitialTheme(initialThemeMode))
    const localTheme = localStorage.getItem('theme') as 'light' | 'dark'
    if (localTheme && localTheme !== initialThemeMode) {
      initialStore.dispatch(setInitialTheme(localTheme))
    } else if (!localTheme) {
      localStorage.setItem('theme', initialThemeMode)
    }
  }, [reduxPreloadedStore])

  return Node(StrictMode, {
    children: ReduxProviderWrapper({ store: initialStore, children: Node(SnackbarProvider, { children }) }),
  }).render()
}

export const PortalProviders = Node(StrictMode, {
  children: ReduxProviderWrapper({
    store: initializeStore(),
  }),
})
