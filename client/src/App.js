import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/landingPage/LandingPage";
import Home from "./components/home/Home.jsx";
import Form from "./components/form/Form.jsx";
import Detail from "./components/detail/Detail.jsx";
import NotFound from "./components/error404/Error404";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route path="/recipes" component={Form} />
          <Route path="/detail/:id" component={Detail} />
          <Route component={() => <NotFound />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
