import "./App.css";
import RetailLogin from "./features/retail/components/login";
import RetailIndex from "./features/retail/components/index";
import RetailSignUp from "./features/retail/components/signup";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import NavBar from "./navbar";
import { useSelector } from "react-redux";
import { selectUserActivity } from "./features/retail/slice";
import { RetailSnackBar } from "./features/retail/components/retail-snackbar";

//Render Props means -> to pass a Component as a prop to another Component.

//PrivateRoute is HOC (Higher Order Component) -> It takes some simple component and adds a new functionality.

//Render props ->

//a function which returns some jsx is a component.
function PrivateRoute(props) {
  //children is <PrivateRoute/> component
  const { children, loggedIn, ...rest } = props;

  return (
    //Time: 1:05.46
    <Route
      {...rest}
      render={({ location }) =>
        loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function App() {
  const userActivity = useSelector(selectUserActivity);

  return (
    <>
      <NavBar />
      <Switch>
        <PrivateRoute exact path="/" loggedIn={userActivity.loggedIn}>
          <RetailIndex />
        </PrivateRoute>

        <Route path="/login">
          <RetailLogin />
        </Route>

        <Route path="/signup">
          <RetailSignUp />
        </Route>
      </Switch>
      <RetailSnackBar />
    </>
  );
}

export default App;
