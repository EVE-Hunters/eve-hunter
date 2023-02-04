import { Box, createStyles, Flex, Text } from '@mantine/core'
import { calcPosFromAngles } from '@react-three/drei'
import { IconRotate } from '@tabler/icons'
import React, { HTMLAttributes } from 'react'

interface FullPageLoaderProps extends React.PropsWithChildren {}

const useStyle = createStyles({
  ring: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '150px',
    height: '150px',
    background: 'transparent',
    border: '3px solid #3c3c3c',
    borderRadius: '50%',
    textAlign: 'center',
    fontSize: '20px',
    color: '#fff000',
    letterSpacing: '4px',
    textTransform: 'uppercase',
    textShadow: '0 0 10px #fff000',
    boxShadow: '0 0 20px rgba(0,0,0,.5)',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: '-3px',
      left: '-3px',
      width: '100%',
      height: '100%',
      border: '3px solid transparent',
      borderTop: '3px solid #fff000',
      borderRight: '3px solid #fff000',
      borderRadius: '50%',
      animation: 'animateC 2s linear infinite',
    },
    '@keyframes animateC': {
      '0%': {
        transform: 'rotate(0deg)',
      },
      '100%': {
        transform: 'rotate(360deg)',
      },
    },
  },
  span: {
    display: 'block',
    position: 'absolute',
    top: 'calc(50% - 2px)',
    left: '50%',
    width: '50%',
    height: '4px',
    background: 'transparent',
    transformOrigin: 'left',
    animation: 'animateT 2s linear infinite',
    '&:before': {
      content: '""',
      position: 'absolute',
      width: 16,
      height: 16,
      borderRadius: '50%',
      background: '#fff000',
      top: -6,
      right: -8,
      boxShadow: '0 0 20px #fff000',
    },
    '@keyframes animateT': {
      '0%': {
        transform: 'rotate(45deg)',
      },
      '100%': {
        transform: 'rotate(405deg)',
      },
    },
  },
  loadingText: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    animation: 'animateY 2s linear infinite',
    '@keyframes animateY': {
      '0%': {
        opacity: 0.5,
      },
      '50%': {
        opacity: 1,
      },
      '100%': {
        opacity: 0.5,
      },
    },
  },
})

const FullPageLoader: React.FC<FullPageLoaderProps> = ({ ...props }) => {
  const { classes } = useStyle()
  return (
    <Box component="div" className={classes.ring}>
      <div className={classes.loadingText}>Loading</div>
      <span className={classes.span}></span>
    </Box>
  )
}
export default FullPageLoader
