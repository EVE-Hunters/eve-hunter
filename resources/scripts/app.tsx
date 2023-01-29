/// <reference types="vite/client" />

import React from 'react'
import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/inertia-react'
import { resolvePageComponent } from './helpers'
import ApplicationLayout from '../views/Layouts/default/ApplicationLayout'

createInertiaApp({
  resolve: (name) =>
    resolvePageComponent(
      name,
      import.meta.glob('../views/**/*.tsx'),
      ApplicationLayout
    ),
  setup({ el, App, props }) {
    const root = createRoot(el)
    root.render(<App {...props} />)
  },
})
