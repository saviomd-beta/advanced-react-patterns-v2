// Flexible Compound Components with context

import React from 'react'
import {Switch} from '../switch'

const ToggleContext = React.createContext()

function ToggleConsumer(props) {
  return (
    <ToggleContext.Consumer>
      {context => {
        if (!context) {
          throw new Error(
            'Toggle compound components must be rendered within the Toggle component'
          )
        }
        return props.children(context)
      }}
    </ToggleContext.Consumer>
  )
}

class Toggle extends React.Component {
  static On = ({ children }) => (
    <ToggleConsumer>
      { contextValue => (contextValue.on ? children : null) }
    </ToggleConsumer>
  )
  static Off = ({ children }) => (
    <ToggleConsumer>
      { contextValue => (contextValue.on ? null : children) }
    </ToggleConsumer>
  )
  static Button = props => (
    <ToggleConsumer>
      { contextValue => (
        <Switch
          on={contextValue.on}
          onClick={contextValue.toggle}
          {...props} />
      ) }
    </ToggleConsumer>
  )
  toggle = () =>
    this.setState(
      ({on}) => ({on: !on}),
      () => this.props.onToggle(this.state.on),
    )
  state = {on: false, toggle: this.toggle}
  render() {
    return <ToggleContext.Provider value={this.state}>{ this.props.children }</ToggleContext.Provider>
  }
}

function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return (
    <Toggle onToggle={onToggle}>
      <Toggle.On>The button is on</Toggle.On>
      <Toggle.Off>The button is off</Toggle.Off>
      <div>
        <Toggle.Button />
      </div>
    </Toggle>
  )
}
Usage.title = 'Flexible Compound Components'

export {Toggle, Usage as default}
