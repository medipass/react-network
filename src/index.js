import { Component } from "react"

export default class Network extends Component {
  static defaultProps = {
    render: () => null,
    onChange: () => {}
  }

  state = {
    online: typeof window !== 'undefined' ? window.navigator.onLine : true
  }

  componentDidMount() {
    window.addEventListener("offline", this.handleChange)
    window.addEventListener("online", this.handleChange)
    this.props.onChange(this.state)
  }

  componentWillUnmount() {
    window.removeEventListener("offline", this.handleChange)
    window.removeEventListener("online", this.handleChange)
  }

  handleChange = () => {
    const online = window.navigator.onLine
    this.props.onChange({ online })
    this.setState({ online })
  }

  render() {
    return this.props.render(this.state)
  }
}
