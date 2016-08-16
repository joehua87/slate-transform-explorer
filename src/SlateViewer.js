import React from 'react'
import { Raw, Editor } from 'slate'

const schema = {
  nodes: {
    'block-quote': props => <blockquote>{props.children}</blockquote>,
    'bulleted-list': props => <ul>{props.children}</ul>,
    'heading-one': props => <h1>{props.children}</h1>,
    'heading-two': props => <h2>{props.children}</h2>,
    'heading-three': props => <h3>{props.children}</h3>,
    'heading-four': props => <h4>{props.children}</h4>,
    'heading-five': props => <h5>{props.children}</h5>,
    'heading-six': props => <h6>{props.children}</h6>,
    'list-item': props => <li>{props.children}</li>,
    'paragraph': props => <p>{props.children}</p>,
    'image': props => <img src="https://pixabay.com/static/uploads/photo/2016/08/14/18/28/dahlia-1593633__180.jpg" />,
  }
}

export default class SlateViewer extends React.Component {
  static propTypes = {
    rawState: React.PropTypes.any,
  };

  render() {
    const state = Raw.deserialize(this.props.rawState, { terse: true })
    return (
      <div>
        <Editor
          readOnly
          schema={schema}
          state={state}
        />
      </div>
    )
  }
}
