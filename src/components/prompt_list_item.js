import React from 'react';

const PromptListItem = ({prompt}) => {

  return (
    <li>
        <div className='media-left'>
        <p>{prompt} <span class="glyphicon glyphicon-console"></span></p>
        </div>
    </li>
  );
};

export default PromptListItem;
