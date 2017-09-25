# React Network

![logo](./logo.png)

What?
-----

Notifies your app when the network connection goes online or offline.

Why?
----

Because the next billion users of the internet will have a decent device but a spotty connection. Having a component to help you declaratively deal with that is super fantastic.

Installation
------------

```bash
npm install react-network
# or
yarn add react-network
```

And then import it:

```js
// using es modules
import Network from 'react-network'

// common.js
const Network = require('react-network').default

// AMD
// I've forgotten but it should work.
```

Or use script tags and globals.

```html
<script src="https://unpkg.com/react-network"></script>
```

And then grab it off the global like so:

```js
const Network = ReactNetwork.default
```


How?
----

```jsx
// import Network from 'react-network'
const Network = ReactNetwork.default

ReactDOM.render((
  <Network
    onChange={({ online }) => {
      if (online && window.cornify_add) {
        window.cornify_add()
      }
    }}
    render={({ online }) =>
      <div style={{ textAlign: 'center' }}>
        <p>Every time you go back online, a unicorn is born!</p>
        <p>
          You can open up the devtools to simulate losing the
          network, or actually turn off your wifi to see these demos.
        </p>
        <h1>
          {online
            ? "You are online."
            : "You are at a hotel."
          }
        </h1>
      </div>
    }
  />
), DOM_NODE)
```

Props
-----

### `render`

Whatever you'd like to render in response to changes in the network.

```jsx
// import Network from 'react-network'
const Network = ReactNetwork.default
ReactDOM.render((
  <Network render={({ online }) =>
    <p>You are online: {online ? 'Yep' : 'Nope'}.</p>
  }/>
), DOM_NODE)
```

### `onChange`

Called whenever the network goes on or offline. This is useful to fire off some imperative code, like adding unicorns to the page or more practically, avoiding resource fetching until the network comes back online.

```jsx
// import Network from 'react-network'
const Network = ReactNetwork.default

class App extends React.Component {
  state = {
    image: null
  }

  handleNetworkChange = ({ online }) => {
    if (online) {
      this.fetch()
    } else {
      clearTimeout(this.timeout)
    }
  }

  fetch = () => {
    fetch('https://unsplash.it/640/400/?random')
      .then(res => res.blob())
      .then(blob => {
        var image = URL.createObjectURL(blob)
        this.setState({ image })
        this.timeout = setTimeout(this.fetch, 5000)
      })
  }

  render() {
    return (
      <div style={{ position: 'relative' }}>
        {this.state.image ? (
          <img src={this.state.image} width="100%"/>
        ) : (
          <p>Loading first image</p>
        )}
        <Network
          onChange={this.handleNetworkChange}
          render={({ online }) => (
            online ? null : (
              <p style={{ color: 'red' }}>
                You are offline, images will continue when you get back online.
              </p>
            )
          )}
        />
      </div>
    )
  }
}

ReactDOM.render(<App/>, DOM_NODE)
```

Legal
-----

Released under MIT license.

Copyright &copy; 2017-present React Training LLC
