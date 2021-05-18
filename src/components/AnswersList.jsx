import React, { memo } from 'react';

import { Answer } from './index';

export const AnswersList = memo((props) => {
  return (
    <div className='c-grid__answer '>
      {props.answers.map((answer, index) => (
        <Answer
          key={index.toString()}
          content={answer.content}
          nextId={answer.nextId}
          select={props.select}
        />
      ))}
    </div>
  );
});
