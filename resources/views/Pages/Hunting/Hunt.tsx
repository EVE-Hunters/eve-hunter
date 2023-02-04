import React, { lazy, Suspense } from 'react'
import { IntertiaPage } from '../../../scripts/types'
import AppWrapper from '../../Layouts/AppWrapper'
import HunterLayout from '../../Layouts/hunter/HunterLayout'
import FullPageLoader from './FullPageLoader'

interface HuntProps extends React.PropsWithChildren {}

const HuntingPage = lazy(() => import('./HuntingApp'))

const HuntWrapper: IntertiaPage<HuntProps> = ({ ...props }) => {
  return (
    <Suspense fallback={<FullPageLoader />}>
      <HuntingPage {...props} />
    </Suspense>
  )
}

HuntWrapper.layout = (page) => (
  <AppWrapper Layout={HunterLayout}>{page}</AppWrapper>
)
export default HuntWrapper
