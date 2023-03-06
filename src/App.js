import {Route, Switch} from 'react-router-dom'
import {Component} from 'react'
import ThemeContext from './context/ThemeContext'
import Login from './components/Login'
import Home from './components/Home'
import VideoItem from './components/VideoItem'
import ProtectedRoute from './components/PotectedRoute'
import './App.css'

// Replace your code here
class App extends Component {
  state = {isDark: false}

  changeTheme = () => {
    this.setState(prevState => ({
      isDark: !prevState.isDark,
    }))
  }

  render() {
    const {isDark} = this.state

    return (
      <ThemeContext.Provider
        value={{
          isDark,
          changeTheme: this.changeTheme,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/videos/:id" component={VideoItem} />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
