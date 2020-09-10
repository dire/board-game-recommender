import React from 'react';
import Box from '@material-ui/core/Box'

export default function GameDetail(props) {
  return (
    <Box className="game-detail" py={1} px={2}>
      <Box fontWeight={700}>{props.title}</Box> {props.detail}
    </Box>
    )
}
