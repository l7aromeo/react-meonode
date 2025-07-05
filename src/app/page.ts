'use client'
import { Center, Column, Component, H1, P, Node, Root, Row } from '@meonode/ui'
import { useTheme } from '@src/hooks/useTheme'
import { Button, TextField } from '@meonode/mui'
import { buttonSX, buttonTextSX } from '@src/constants/button.const'
import MuiSwitch from '@src/components/MuiSwitch'
import { setTheme } from '@src/redux/slice/theme.slice'
import { useAppDispatch } from '@src/redux/store'
import { Modal } from '@src/components/portals'
import { textFieldSX } from '@src/constants/field.const'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import JSXSample from '@src/components/JSXSample'
import { ViewList } from '@mui/icons-material'

export default Component(function Home() {
  const dispatch = useAppDispatch()
  const theme = useTheme()

  const [isShowMore, setShowDetails] = useState(false)

  const showModal = () => {
    const modal = Modal({
      children: Column({
        width: '100%',
        maxWidth: 500,
        borderRadius: 10,
        padding: 10,
        background: 'theme.background.paper',
        gap: 10,
        boxShadow: 'theme.shadow.lg',
        children: [
          H1('Modal', { fontWeight: 'bold', textAlign: 'center' }),
          TextField({ sx: textFieldSX, fullWidth: true, placeholder: 'Write something', label: 'Label A' }),
          TextField({ sx: textFieldSX, fullWidth: true, placeholder: 'Write something', label: 'Label B' }),
          Row({
            justifyContent: 'flex-end',
            gap: 10,
            children: [
              Button({
                sx: buttonTextSX.primary,
                onClick: () => modal?.unmount(),
                children: 'Cancel',
              }),
              Button({
                sx: buttonSX.secondary,
                variant: 'contained',
                onClick: () => {
                  modal?.unmount()
                  enqueueSnackbar('Submitted!', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'right' } })
                },
                children: 'Submit',
              }),
            ],
          }),
        ],
      }),
    })
  }

  return Root({
    theme: theme.colors,
    background: 'theme.background',
    color: 'theme.secondary',
    children: Column({
      flex: 1,
      padding: 10,
      gap: 10,
      children: [
        Node(JSXSample, { name: 'Romeo' }), // Example of wrapping JSX component with Node instance
        Center({
          children: MuiSwitch({
            checked: theme.mode === 'dark',
            onChange: () => dispatch(setTheme(theme.mode === 'dark' ? 'light' : 'dark')),
          }),
        }),
        Button({
          sx: buttonSX.primary,
          variant: 'contained',
          onClick: showModal,
          children: 'Show Modal',
          endIcon: Node(ViewList).render(),
        }),
        Button({
          sx: buttonSX.success,
          variant: 'contained',
          onClick: () => setShowDetails(prevState => !prevState),
          children: isShowMore ? 'Close' : 'Expand',
        }),
        /**
         * Component rendering examples demonstrating theme context propagation:
         * - Direct Node instance rendering
         * - Rendered Node instances
         * - ReactNode components
         * - HOC usage patterns
         */
        DetailComponent({
          info: 'Detail 1: Rendering a component that returns a @meonode/ui Node instance directly. The internal Row component correctly receives theme context from the parent Column.',
        }),

        DetailComponent({
          info: 'Detail 2: Rendering a component that returns a @meonode/ui Node instance, then calling .render(). The internal Row component also correctly receives theme context.',
        }).render(),

        // ❌ Fails: The Node HOC expects the wrapped function to return a ReactNode, not a @meonode/ui Node instance.
        // Node(DetailComponent, { info: 'Detail 3: Attempting to wrap a component returning a Node instance with Node HOC.' }),

        ReturnRenderedDetailComponent({
          info: 'Detail 4: Rendering a component that explicitly returns a ReactNode (.render() is called internally). The internal Row component correctly receives theme context from the parent Column.',
        }),

        Node(ReturnRenderedDetailComponent, {
          info: "Detail 5: Wrapping a component returning ReactNode with Node HOC (without .render()). Renders successfully. However, the Node HOC does NOT propagate theme context to the wrapped component's children.",
        }),

        Node(ReturnRenderedDetailComponent, {
          info: 'Detail 6: Wrapping a component returning ReactNode with Node HOC, then calling .render(). Renders successfully. Theme context is NOT propagated by the Node HOC.',
        }).render(),

        WrappedDetailComponent({
          info: 'Detail 7: Using Component HOC with Node instance returns. Theme context is correctly propagated.',
        }),

        /**
         * Conditional rendering examples (visible when isShowMore is true)
         * Demonstrates:
         * - Inline function wrappers
         * - Component HOC usage
         * - Theme context propagation patterns
         */
        isShowMore &&
          (() =>
            DetailComponent({
              info: 'Detail 8: Conditional rendering of a Node instance component using inline function wrapper. Theme context is correctly received.',
            })),

        isShowMore &&
          (() =>
            DetailComponent({
              info: 'Detail 9: Conditional rendering of a Node instance component with .render() call. Theme context is correctly propagated.',
            }).render()),

        isShowMore &&
          WrappedDetailComponent({
            info: 'Detail 10: Conditional rendering using Component HOC with Node instance. Theme context is correctly propagated.',
          }),

        isShowMore &&
          (() =>
            ReturnRenderedDetailComponent({
              info: 'Detail 11: Conditional rendering of ReactNode component using inline function. Theme context is properly propagated.',
            })),

        isShowMore &&
          Component(() =>
            ReturnRenderedDetailComponent({
              info: 'Detail 12: Conditional rendering with Component HOC wrapping ReactNode component. Theme context is NOT propagated.',
            }),
          ),

        // isShowMore && ReturnRenderedDetailComponent({
        //   info: 'Detail 15: Direct component call violates Rules of Hooks!'
        // }), // ❌ Fails: Direct call to a component function using hooks inside render logic without a React-aware wrapper.
      ],
    }),
  })
})

/**
 * Styled detail section component returning a Node instance.
 * Uses useEffect for lifecycle logging.
 * Theme context is received from parent @meonode/ui components.
 */
const DetailComponent = ({ info }: { info: string }) => {
  useEffect(() => {
    console.log('DetailComponent mounted:', info)
    return () => {
      console.log('DetailComponent unmounted:', info)
    }
  }, [info])

  return Row({
    alignItems: 'center',
    gap: 10,
    padding: 4,
    border: '2px solid theme.accent',
    borderRadius: 6,
    backgroundColor: 'theme.warning',
    color: 'theme.danger',
    children: [P(info, { flex: 1, padding: '0 20px' }), TextField({ flex: 1, sx: { background: 'theme.primary' } })],
  })
}

/**
 * Styled detail section component wrapped with Component HOC.
 * Similar to DetailComponent but demonstrates HOC pattern.
 * Theme context is correctly propagated through the HOC.
 */
const WrappedDetailComponent = Component<{ info: string }>(({ info }) => {
  useEffect(() => {
    console.log('DetailComponent mounted')
    return () => {
      console.log('DetailComponent unmounted')
    }
  }, [info])

  return Row({
    alignItems: 'center',
    gap: 10,
    padding: 4,
    border: '2px solid theme.accent',
    borderRadius: 6,
    backgroundColor: 'theme.warning',
    color: 'theme.danger',
    children: [P(info, { flex: 1, padding: '0 20px' }), TextField({ flex: 1, sx: { background: 'theme.primary' } })],
  })
})

/**
 * Alternative detail component implementation returning ReactNode.
 * Explicitly calls .render() for React compatibility.
 * Demonstrates theme context usage with standard React patterns.
 */
const ReturnRenderedDetailComponent = ({ info }: { info: string }) => {
  useEffect(() => {
    console.log('ReturnRenderedDetailComponent mounted')
    return () => {
      console.log('ReturnRenderedDetailComponent unmounted')
    }
  }, [info])

  return Row({
    alignItems: 'center',
    gap: 10,
    padding: 4,
    border: '2px solid theme.accent',
    borderRadius: 6,
    backgroundColor: 'theme.warning',
    color: 'theme.danger',
    children: [P(info, { flex: 1, padding: '0 20px' }), TextField({ flex: 1, sx: { background: 'theme.primary' } })],
  }).render()
}
