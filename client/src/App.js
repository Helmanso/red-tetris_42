
import Home from './Components/Home'
import Looby from './Components/Looby';
import  store  from './redux/store/store';
import { Provider } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom'


const App = () => {

  return (
    <HashRouter hashType='noslash' basename='/'>
      <Provider store={store}>
        <Route exact path='/:roomid' component={Home} />
        <Route exact path='/' component={Home} />
      </Provider>
    </HashRouter>
  )
}
export default App;
