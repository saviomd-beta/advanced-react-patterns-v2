// Higher Order Components

import React, {Fragment} from 'react'
// eslint-disable-next-line
import hoistNonReactStatics from 'hoist-non-react-statics'
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
  state = {on: false, toggle: this.toggle}
  render() {
    const {children} = this.props
    const ui =
      typeof children === 'function' ? children(this.state) : children
    return (
      <ToggleContext.Provider value={this.state}>
        {ui}
      </ToggleContext.Provider>
    )
  }
}

function withToggle(Component) {
  const Wrapper = (props, ref) => (
    <Toggle.Consumer>
      {toggleContext => (
        <Component toggle={toggleContext} ref={ref} {...props} />
      )}
    </Toggle.Consumer>
  )
  Wrapper.displayName = `withToggle(${Component.displayName || Component.name})`
  return hoistNonReactStatics(React.forwardRef(Wrapper), Component)
}

const Layer1 = () => <Layer2 />
const Layer2 = withToggle(function Layer2({toggle: {on}}) {
  return (
    <Fragment>
      {on ? 'The button is on' : 'The button is off'}
      <Layer3 />
    </Fragment>
  )
})
const Layer3 = () => <Layer4 />
const Layer4 = () => (
  <Toggle.Consumer>
    {({on, toggle}) => <Switch on={on} onClick={toggle} />}
  </Toggle.Consumer>
)
// const Layer4 = () => withToggle(function Layer4({toggle: {on, toggle}}) {
//   return (
//     <Switch on={on} onClick={toggle} />
//   )
// })

function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return (
    <Toggle onToggle={onToggle}>
      <Layer1 />
    </Toggle>
  )
}
Usage.title = 'Higher Order Components'

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
