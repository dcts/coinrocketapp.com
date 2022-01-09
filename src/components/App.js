import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./pages/Landing.js";
import Error404 from "./pages/Error404.js";
import User from './pages/User.js';
import UserContext from '../utils/context/UserContext.js';

// firebase SDK
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFunctions, httpsCallable } from "firebase/functions";

const dotenv = require("dotenv");
dotenv.config();

// Initialize Firebase Functions
const app = initializeApp({
  apiKey: "AIzaSyAEygIG7B48mvxkm13bcHIzn3kJZqTK1kY",
  authDomain: "shillcoin.firebaseapp.com",
  projectId: "shillcoin",
  appId: "1:265713696512:web:b57aac094610a4ea09fde5",
  messagingSenderId: "265713696512",
});
const analytics = getAnalytics(app); // initialize analytics
const functions = getFunctions(app); // all your callable functions are now accessible fron your frontend

// LOAD ALL BACKEND API FUNCTIONS
const getCoinrocketUserData = httpsCallable(functions, 'getCoinrocketUserData');

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route exact path="/user/:userId">
          <UserContext getCoinrocketUserData={getCoinrocketUserData}>
            <User/>
          </UserContext>
        </Route>
        <Route exact path="/404">
          <Error404 />
        </Route>
        <Route path="*">
          <Error404 />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
