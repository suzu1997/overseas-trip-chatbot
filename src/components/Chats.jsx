import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import { Chat } from './index';

const useStyles = makeStyles(() => ({
  chats: {
    height: 400,
    padding: 0,
    overflow: 'auto',
  },
}));

export const Chats = memo((props) => {
  const classes = useStyles();
  return (
    <List className={classes.chats} id={'scroll-area'}>
      {props.chats.map((chat, index) => (
        <Chat text={chat.text} type={chat.type} key={index.toString()} />
      ))}
    </List>
  );
});
