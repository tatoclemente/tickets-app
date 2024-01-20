import React from 'react'
import { RouterPage } from './pages/RouterPage'
import { UiProvider } from './context/UiConntext'

export const TicketApp = () => {
  return (
    <UiProvider>
      <RouterPage /> 
    </UiProvider>
  )
}
