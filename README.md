# React Network

![logo](./logo.png)

What?
-----

Notifies your app when the network connection goes online or offline.

Why?
----

Because the next billion users of the internet will have a decent device but a spotty connection. Having a component to help you declarative deal with that is super fantastic.

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

```render-babel
// import Network from 'react-network'
const Network = ReactNetwork.default

ReactDOM.render((
  <Network
    onChange={({ online }) => {
      if (online) {
        window.cornify_add()
      }
    }}
    render={({ online }) =>
      <div style={{ textAlign: 'center' }}>
        <p>Every time you go offline, a unicorn is born!</p>
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

```render-babel
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

```render-babel
// import Network from 'react-network'
const Network = ReactNetwork.default

class App extends React.Component {
  state = {
    gists: []
  }

  handleNetworkChange = ({ online }) => {
    if (online) {
      this.interval = setInterval(this.fetch, 2000)
      this.fetch()
    } else {
      clearInterval(this.interval)
    }
  }

  fetch = () => {
    fetch('https://api.github.com/gists')
      .then(res => res.json())
      .then(gists => this.setState({ gists }))
  }

  render() {
    return (
      <div style={{ position: 'relative' }}>
        <h1>Public Gists</h1>
        <Network
          onChange={this.handleNetworkChange}
          render={({ online }) => (
            online ? null : (
              <p>
                You are offline, data will not be updated.
              </p>
            )
          )}
        />
        <ul>
          {this.state.gists.map((gist) => (
            <li><a href={gist.html_url}>{gist.description || 'No Description'}</a></li>
          ))}
        </ul>
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
