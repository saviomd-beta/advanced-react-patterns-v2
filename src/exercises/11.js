// Provider Pattern

import React, {Fragment} from 'react'
import {Switch} from '../switch'

const ToggleContext = React.createContext({
  on: false,
  toggle: () => {},
})

class Toggle extends React.Component {
  static Consumer = ToggleContext.Consumer
  toggle = () =>
    this.setState(
      ({on}) => ({on: !on}),
      () => this.props.onToggle(this.state.on),
    )
  state = {
    on: false,
    toggle: this.toggle,
  }
  render() {
    return <ToggleContext.Provider value={this.state} {...this.props} />
  }
}
/**/

//*
const Layer1 = () => <Layer2 />
const Layer2 = () => (
  <Toggle.Consumer>
    {({on}) => (
      <Fragment>
        {on ? 'The button is on' : 'The button is off'}
        <Layer3 />
      </Fragment>
    )}
  </Toggle.Consumer>
)
const Layer3 = () => <Layer4 />
const Layer4 = () => <Toggle.Consumer>
    {({on, toggle}) => (
      <Switch on={on} onClick={toggle} />
    )}
  </Toggle.Consumer>

function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return (
    <Toggle onToggle={onToggle}>
      <Layer1 />
    </Toggle>
  )
}
Usage.title = 'Provider Pattern'

export {Toggle, Usage as default}

/* eslint
"no-unused-vars": [
  "warn",
  {
    "argsIgnorePattern": "^_.+|^ignore.+",
    "varsIgnorePattern": "^_.+|^ignore.+",
    "args": "after-used"
  }
]
 */
