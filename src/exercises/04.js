// render props

import React from 'react'
import {Switch} from '../switch'

class Toggle extends React.Component {
  state = {on: false}
  toggle = () =>
    this.setState(
      ({on}) => ({on: !on}),
      () => {
        this.props.onToggle(this.state.on)
      },
    )
  render() {
    return this.props.children({
      on: this.state.on,
      toggle: this.toggle,
    })
  }
}

function CommonToggle(props) {
  return (
    <Toggle {...props}>
      {({on, toggle}) => <Switch on={on} onClick={toggle} />}
    </Toggle>
  )
}

function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return <CommonToggle onToggle={onToggle} />
  return (
    <Toggle onToggle={onToggle}>
      {({on, toggle}) => (
        <div>
          {on ? 'The button is on' : 'The button is off'}
          <Switch on={on} onClick={toggle} />
          <hr />
          <button aria-label="custom-button" onClick={toggle}>
            {on ? 'on' : 'off'}
          </button>
        </div>
      )}
    </Toggle>
  )
}
Usage.title = 'Render Props'

export {Toggle, Usage as default}
