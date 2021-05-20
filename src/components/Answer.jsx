import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
  button: {
    color: '#b681ee',
    backgroundColor: '#eadcfa',
    fontWeight: 600,
    marginBottom: '8px',
    '&:hover': {
      borderColor: '#dcc1fa',
      backgroundColor: '#dcc1fa',
      color: '#fff',
    },
  },
}));

export const Answer = memo((props) => {
  const classes = useStyles();

  return (
    <>
      <Button
        className={classes.button}
        variant='contained'
        onClick={() => props.select(props.content, props.nextId)}
      >
        {props.content}
      </Button>
    </>
  );
});
