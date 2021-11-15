import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import styled, {ThemeProvider} from "styled-components";
import {Navbar} from "./components/Navbar";
import {Home} from "./pages/Home";
import AboutUs from "./pages/AboutUs";

const theme = {
    blue: "#21A2FF",
    black: "#232323",
    grey: "#F5F5F5",
};

const WebContainer = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');
`;

function App() {
  return (
      <WebContainer>
          <ThemeProvider theme={theme}>
              <BrowserRouter className="App">
                  <Navbar/>
                  <Switch>
                      <Route exact path="/">
                          <Home/>
                      </Route>
                      <Route exact path="/aboutUs">
                          <AboutUs/>
                      </Route>
                  </Switch>
              </BrowserRouter>
          </ThemeProvider>
      </WebContainer>


  );
}

export default App;
