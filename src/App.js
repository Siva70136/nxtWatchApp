import {Route, Switch} from 'react-router-dom'
import {Component} from 'react'
import ThemeContext from './context/ThemeContext'
import Gaming from './components/Gaming'
import Login from './components/Login'
import Home from './components/Home'
import VideoItem from './components/VideoItem'
import Trending from './components/Trending'
import ProtectedRoute from './components/PotectedRoute'
import './App.css'

// Replace your code here
class App extends Component {
  state = {isDark: false, activeTab: 'HOME'}

  changeTheme = () => {
    this.setState(prevState => ({
      isDark: !prevState.isDark,
    }))
  }

  changeActiveTab = id => {
    this.setState({
      activeTab: id,
    })
  }

  render() {
    const {isDark, activeTab} = this.state

    return (
      <ThemeContext.Provider
        value={{
          isDark,
          activeTab,
          changeTheme: this.changeTheme,
          changeActiveTab: this.changeActiveTab,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/games" component={Gaming} />
          <ProtectedRoute exact path="/videos/:id" component={VideoItem} />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
