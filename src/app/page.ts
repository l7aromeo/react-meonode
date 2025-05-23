'use client'
/**
 * This file showcases the integration of React hooks with `@meonode/ui` components
 * for building declarative user interfaces. It demonstrates different rendering
 * approaches, the use of Higher-Order Components (HOCs), and how theme context
 * is managed and propagated within the @meonode/ui component tree.
 */
import { Button, Center, Column, Component, Fixed, Node, type NodeInstance, P, Portal, Row, type Theme } from '@meonode/ui'
import { useState, useEffect, ReactElement, ReactNode } from 'react'
import { CssBaseline, FormControlLabel, TextField } from '@meonode/mui'
import MUISwitch from '@src/components/MUISwitch.ts'

/**
 * Light theme configuration containing color palette values.
 * Used by `@meonode/ui` components when resolving theme references in light mode.
 */
const lightTheme: Theme = {
  mode: 'light',
  colors: {
    primary: '#2563eb',
    secondary: '#64748b',
    accent: '#10b981',
    background: '#ffffff',
    foreground: '#0f172a',
    border: '#e2e8f0',
    muted: '#f8fafc',
    success: '#16a34a',
    warning: '#eab308',
    danger: '#dc2626',
  },
}

/**
 * Dark theme configuration containing color palette values.
 * Used by `@meonode/ui` components when resolving theme references in dark mode.
 */
const darkTheme: Theme = {
  mode: 'dark',
  colors: {
    primary: '#3b82f6',
    secondary: '#94a3b8',
    accent: '#34d399',
    background: '#0f172a',
    foreground: '#f8fafc',
    border: '#334155',
    muted: '#1e293b',
    success: '#22c55e',
    warning: '#facc15',
    danger: '#ef4444',
  },
}

/**
 * Main page component using React hooks for state management.
 * Manages theme mode and visibility of additional content sections.
 * Wrapped by `Component` HOC to ensure React compatibility and SSR/CSR support.
 */
export default Component(() => {
  const [showMore, setShowDetails] = useState(false)
  const [mode, setMode] = useState<'dark' | 'light'>('light')
  const theme = mode === 'dark' ? darkTheme : lightTheme

  return Column({
    theme: theme.colors,
    padding: 20,
    gap: 15,
    minHeight: '100vh',
    backgroundColor: 'theme.background',
    color: 'theme.foreground',
    children: [
      CssBaseline,
      Center({
        children: FormControlLabel({
          control: Node(MUISwitch).render() as ReactElement,
          alignItems: 'center',
          label: mode === 'dark' ? 'Dark Mode' : 'Light Mode',
          labelPlacement: 'start',
          checked: mode === 'dark',
          onChange: () => setMode(prev => (prev === 'dark' ? 'light' : 'dark')),
        }),
      }),
      Button('Show Modal', {
        onClick: () => Modal({ theme: theme.colors }),
        cursor: 'pointer',
        userSelect: 'none',
        padding: '10px 20px',
        backgroundColor: 'theme.primary',
        borderRadius: 5,
        fontWeight: 'bold',
        color: 'white',
      }),
      Button(showMore ? 'Hide Details' : 'Show More Details', {
        onClick: () => setShowDetails(prev => !prev),
        cursor: 'pointer',
        userSelect: 'none',
        padding: '10px 20px',
        backgroundColor: 'theme.accent',
        borderRadius: 5,
        fontWeight: 'bold',
        color: 'white',
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
       * Conditional rendering examples (visible when showMore is true)
       * Demonstrates:
       * - Inline function wrappers
       * - Component HOC usage
       * - Theme context propagation patterns
       */
      showMore &&
        (() =>
          DetailComponent({
            info: 'Detail 8: Conditional rendering of a Node instance component using inline function wrapper. Theme context is correctly received.',
          })),

      showMore &&
        (() =>
          DetailComponent({
            info: 'Detail 9: Conditional rendering of a Node instance component with .render() call. Theme context is correctly propagated.',
          }).render()),

      showMore &&
        WrappedDetailComponent({
          info: 'Detail 10: Conditional rendering using Component HOC with Node instance. Theme context is correctly propagated.',
        }),

      showMore &&
        (() =>
          ReturnRenderedDetailComponent({
            info: 'Detail 11: Conditional rendering of ReactNode component using inline function. Theme context is properly propagated.',
          })),

      showMore &&
        Component(() =>
          ReturnRenderedDetailComponent({
            info: 'Detail 12: Conditional rendering with Component HOC wrapping ReactNode component. Note that theme context is not propagated in this case.',
          }),
        ),

      // showMore && ReturnRenderedDetailComponent({
      //   info: 'Detail 15: Direct component call violates Rules of Hooks!'
      // }), // ❌ Fails: Direct call to a component function using hooks inside render logic without a React-aware wrapper.
    ],
  })
})

/**
 * Styled detail section component returning a Node instance.
 * Uses useEffect for lifecycle logging.
 * Theme context is received from parent @meonode/ui components.
 */
const DetailComponent = ({ info }: { info: string }): NodeInstance => {
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
const WrappedDetailComponent = Component(({ info }): NodeInstance => {
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
const ReturnRenderedDetailComponent = ({ info }: { info: string }): ReactNode => {
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

/**
 * Modal component using Portal HOC for DOM placement.
 * Demonstrates theme-aware content rendering outside main hierarchy.
 * Includes nested modal support and Material UI integration.
 */
const Modal = Portal(({ theme, portal }) => {
  useEffect(() => {
    console.log('Modal mounted')
    return () => {
      console.log('Modal unmounted')
    }
  }, [])

  return Fixed({
    theme,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    onClick: e => {
      if (e.target === e.currentTarget) {
        portal.unmount()
      }
    },
    children: Column({
      width: '50%',
      height: '80%',
      backgroundColor: 'theme.background',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: 10,
      gap: 10,
      color: 'theme.foreground',
      children: [
        Button('More Modal', {
          onClick: () => Modal({ theme }),
          cursor: 'pointer',
          userSelect: 'none',
          padding: '10px 20px',
          backgroundColor: 'theme.primary',
          borderRadius: 5,
          fontWeight: 'bold',
          color: 'white',
        }),
        Center({ fontWeight: 'bold', children: 'Modal' }),
        Center({ children: Math.random() * 1000 }),
        TextField({
          sx: {
            '& .MuiFormLabel-root': {
              color: 'theme.foreground',
              '&.Mui-focused': {
                color: 'theme.foreground',
              },
            },
            '& .MuiOutlinedInput-root': {
              color: 'theme.foreground',
              '& fieldset': {
                borderColor: 'theme.foreground',
              },
              '&:hover fieldset': {
                borderColor: 'theme.foreground',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'theme.foreground',
              },
              borderRadius: 2,
            },
          },
          label: 'Hello',
          fullWidth: true,
        }),
      ],
    }),
  })
})
