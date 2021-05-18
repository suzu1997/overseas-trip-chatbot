import React, { memo } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import NoProfile from '../assets/image/no-profile.png';
import Woman from '../assets/image/woman.jpg';

export const Chat = memo((props) => {
  const isQuestion = props.type === 'question';
  //チャットが質問なら左から吹き出し/回答なら右から吹き出し
  const classes = isQuestion ? 'p-chat__row' : 'p-chat__reverse';

  return (
    <ListItem className={classes}>
      <ListItemAvatar>
        {isQuestion ? (
          <Avatar alt='icon' src={Woman} />
        ) : (
          <Avatar alt='icon' src={NoProfile} />
        )}
      </ListItemAvatar>
      <div className='p-chat__bubble'>{props.text}</div>
    </ListItem>
  );
});
