import { configureStore, Store, UnknownAction } from '@reduxjs/toolkit'
import { Provider, useDispatch, useSelector } from 'react-redux'
import themeSlice, { setInitialTheme, ThemeState } from '@src/redux/slice/theme.slice'
import { Node, type NodeProps } from '@meonode/ui'
import { setupListeners } from '@reduxjs/toolkit/query'

export interface RootState {
  theme: ThemeState
}

let globalStore: Store<RootState, UnknownAction> | undefined

export const initializeStore = (preloadedState?: RootState): Store<RootState, UnknownAction> => {
  if (!globalStore) {
    globalStore = configureStore({
      reducer: {
        theme: themeSlice,
      },
      preloadedState,
    })
    setupListeners(globalStore.dispatch)
  } else if (preloadedState) {
    globalStore.dispatch(setInitialTheme(preloadedState.theme.mode))
  }

  return globalStore
}

export type AppDispatch = ReturnType<typeof initializeStore>['dispatch']

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export const ReduxProviderWrapper = ({ store, ...props }: Omit<NodeProps<typeof Provider>, 'store'> & { store: Store }) => Node(Provider, { ...props, store })
