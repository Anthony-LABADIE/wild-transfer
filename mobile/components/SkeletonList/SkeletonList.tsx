import React from 'react'
import { Skeleton } from '@rneui/themed'
import { Stack } from 'native-base'

const SkeletonListItem = () => {
  return (
    <Stack direction="row" alignItems="center">
      <Skeleton animation="pulse" width={80} height={40} />
      <Skeleton animation="wave" width={80} height={40} />
      <Skeleton animation="none" width={80} height={40} />
    </Stack>
  )
}

export default SkeletonListItem
