
import {Switch, Route,BrowserRouter as Router} from 'react-router-dom'
import { createBrowserHistory } from "history";
import { Container } from 'react-bootstrap';
import MainPage from './components/MainPage'
import ContestPage from './components/ContestPage';

const history =createBrowserHistory();

function App() {
  return (
    <Container>
    <Router history={history}>
      <Switch>
      <Route path='/contest?address=:address' component={ContestPage} />
      <Route exact path='/' component={MainPage} />
        
      </Switch>
    </Router>  
    </Container>
  );
}

export default App;
