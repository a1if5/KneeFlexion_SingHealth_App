import React, { Component } from 'react'
import { WebView } from 'react-native-webview'

class Form extends Component {
  render() {
    const { params } = this.props.navigation.state

    return <WebView source={{ uri: params.link }} />
  }
}

export default Form