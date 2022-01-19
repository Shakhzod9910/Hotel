import './App.scss';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home'
import HomeMedium from './Components/Home/HomeMedium';
import HomeLux from './Components/Home/HomeLux';
import { Route, Switch } from 'react-router-dom';
function App() {
  return (
   <>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/medium' component={HomeMedium} />
        <Route exact path='/lux' component={HomeLux} />
        <Route exact path='/login' component={Login} />
      </Switch>
   </>
  );
}

export default App;
