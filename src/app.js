import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRoot from './App/AppRoot';
import { AppContainer } from 'react-hot-loader';
import configureStore from './App/configureStore';

import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

// Read the state sent with markup
const state = window.__STATE__;

// delete the state from global window object
delete window.__STATE__;

// reproduce the store used to render the page on server
const store = configureStore(state)
class Main extends React.Component {
	// Remove the server-side injected CSS.
	componentDidMount() {
	  const jssStyles = document.getElementById('jss-server-side');
	  if (jssStyles && jssStyles.parentNode) {
		jssStyles.parentNode.removeChild(jssStyles);
	  }
	}
  
	render() {
	  return <AppRoot />
	}
  }
// Create a theme instance.
const theme = createMuiTheme({
	palette: {
	  primary: green,
	  accent: red,
	  type: 'light',
	},
  });
  
  // Create a new class name generator.
const generateClassName = createGenerateClassName();

function render(Component) {
	ReactDOM.hydrate(
		<Provider store={store}>
			<AppContainer>
			<JssProvider generateClassName={generateClassName}>
    			<MuiThemeProvider theme={theme}>
					<Component />
					</MuiThemeProvider>
				</JssProvider>
			</AppContainer>
		</Provider>,
		document.getElementById('react-root')
	);
}
render(AppRoot);

if (module.hot) {
	module.hot.accept('./App/AppRoot.js', () => {
		const NewAppRoot = require('./App/AppRoot.js').default;
		render(NewAppRoot);
	});
}
