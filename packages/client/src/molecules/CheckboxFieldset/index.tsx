import './style.css'

import React from 'react'

import { ErrorBoundary } from '../../layout/compounds/ErrorBoundary'
import Loading from './Loading'
import { DefaultComponent } from './types'

const DefaultInner = React.lazy(() => import('./CheckboxFieldSet'))

const Default: DefaultComponent = (props) => (
  <ErrorBoundary>
    <React.Suspense fallback={<Loading {...props} />}>
      <DefaultInner {...(props as any)} />
    </React.Suspense>
  </ErrorBoundary>
)
export default Default
