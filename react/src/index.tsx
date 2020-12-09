import './index.css'

import React from 'react'

import { ErrorBoundary } from './layout/compounds/ErrorBoundary'
import LoadingLayout from './layout/LoadingLayout'

const App = React.lazy(() => import('./App'))

export default function Index() {
  return (
    <ErrorBoundary showBack>
      <React.Suspense fallback={<LoadingLayout variant="outer" percentLoaded={1}/>}>
        <App/>
      </React.Suspense>
    </ErrorBoundary>
  )
}