import * as React from 'react';
import './App.css';

import { Provider } from "react-redux";
import { BrowserRouter, Route} from 'react-router-dom';

import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers/combine'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

//Components
import Home from "./components/pages/Home";
import Statuses from "./components/pages/Statuses";

import Cnc from "./components/pages/CurrentC";
import Fnc from "./components/pages/CurrentF";

import ArchiveC from "./components/pages/ArchiveC";
import ArchiveF from "./components/pages/ArchiveF";

import Pdk from "./components/pages/Pdk";

import MonthReport from "./components/pages/MonthReport";
import YearReport from "./components/pages/YearReport";

import Layout from "./components/Layout";

//

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

store.subscribe( () => {  });

class App extends React.Component {  

  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <BrowserRouter>
              <Layout >
                  <Route exact path="/" component={Home}/>
                  <Route exact path="/home" component={Home}/>
                  {/* <Route exact path='/' render={(props) => <Home {...props} />}/>  */}                  
                  <Route exact path="/current/cnc" component={Cnc}/>
                  <Route exact path="/current/fnc" component={Fnc}/>
                  <Route exact path="/archive/cnc" component={ArchiveC}/>
                  <Route exact path="/archive/fnc" component={ArchiveF}/>                 
                  <Route path="/pdk/" component={Pdk}/> 
                  <Route path="/statuses/" component={Statuses}/> 
                  <Route path="/reports/month" component={MonthReport}/> 
                  <Route path="/reports/year" component={YearReport}/>                              
              </Layout>            
          </BrowserRouter>           
        </Provider>
        
      </div>
    );
  }
}

export default App;
