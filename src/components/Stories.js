import React from 'react';
import { connect } from 'react-redux';
import { fetchStories } from '../actions';


function Stories(props) {
  return (
    <div>
      <button type="button" onClick={props.loadStories}> Load 3 stories </button>
      {/* <button type="button" onClick={props.clearStories}> Clear Stories </button> */}
      <StoryList {...props} />
    </div>
  )
}

function StoryList(props) {
  if (props.stories.length === 0) {
    return null;
  }
  return (
    <div>
      { props.stories.map(item => <Story {...item} key={item.id} />)}
    </div>
  )
}

function Story (props) {
  return (
    <p>
      {props.title}
    </p>
  )
}

function mapState(state) {
  return state;
}
function mapDispatchToState(dispatch) {
  return {
    loadStories: () => dispatch(fetchStories()),
    // clearStories: () => dispatch(clearStories())
  }
}
export default connect(mapState, mapDispatchToState)(Stories);