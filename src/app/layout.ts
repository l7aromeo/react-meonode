import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'
import { Body, Html, Node } from '@meonode/ui'
import { ProvidersWrapper } from '@src/components/Providers'
import { cookies } from 'next/headers'
import darkTheme from '@src/constants/themes/darkTheme'
import lightTheme from '@src/constants/themes/lightTheme'

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'React MeoNode',
  description: 'Example usage with NextJS',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const cookieStore = await cookies()
  const initialThemeMode = (cookieStore.get('theme')?.value as 'light' | 'dark') || 'light'

  return Html({
    lang: 'en',
    children: Body({
      className: poppins.className,
      children: Node(ProvidersWrapper, {
        reduxPreloadedStore: {
          theme: {
            mode: initialThemeMode,
            colors: initialThemeMode === 'dark' ? darkTheme : lightTheme,
          },
        },
        children,
      }),
    }),
  }).render()
}
