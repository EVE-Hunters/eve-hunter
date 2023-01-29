import React from 'react'
import { Router } from 'ziggy-js'

import { Ziggy } from '../js/ziggy'
import AppWrapper from '../views/Layouts/AppWrapper'

export async function resolvePageComponent(
  name: string,
  pages: Record<string, any>,
  defaultLayout?: any,
  providerWrap?: React.ReactNode
) {
  const path = Object.keys(pages)
    .sort((a, b) => a.length - b.length)
    .find((path) => path.endsWith(`${name.split('.').join('/')}.tsx`))

  if (!path) {
    throw new Error(`Page component "${name}" could not be found.`)
  }

  let component =
    typeof pages[path] === 'function' ? await pages[path]() : pages[path]

  component = component.default ?? component

  if (!component.layout && defaultLayout) {
    component.layout = (page) =>
      React.createElement(AppWrapper, { Layout: defaultLayout }, page)
  }

  return component
}

type Route = keyof typeof Ziggy['routes']

type Bindings = {
  [k: string]: string | number
}
export function route(route: Route, bindings?: Bindings) {
  const routeObject = Ziggy['routes'][route]
  let uri = routeObject.uri
  if (routeObject.bindings && bindings != null) {
    const keys = Object.keys(routeObject.bindings)
    keys.forEach((key) => {
      uri = uri.replace(`{${key}}`, String(bindings[key] ?? key))
    })
  }
  return `/${uri}`
}
