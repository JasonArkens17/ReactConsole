import React from 'react';
import PromptListItem from './prompt_list_item';

const PromptList = (props) => {
  const promptItems = props.history.map((prompt, i) => {
    return(
      <PromptListItem
        key={i}
        prompt={prompt.data} />
    );
  });

  return (
    <ul class="custom-bullet">
      {promptItems}
    </ul>
  );
};

export default PromptList;
