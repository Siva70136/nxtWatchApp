import {Route, Switch} from 'react-router-dom'
import {Component} from 'react'
import ThemeContext from './context/ThemeContext'
import Gaming from './components/Gaming'
import Login from './components/Login'
import Home from './components/Home'
import VideoItem from './components/VideoItem'
import Trending from './components/Trending'
import NotFound from './components/NotFound'
import SavedVideos from './components/SavedVideos'
import ProtectedRoute from './components/PotectedRoute'
import './App.css'

// Replace your code here
class App extends Component {
  state = {isDark: false, activeTab: 'HOME', savedVideos: []}

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

  savedVideoList = item => {
    this.setState(prevState => ({
      savedVideos: [...prevState.savedVideos, item],
    }))
  }

  render() {
    const {isDark, activeTab, savedVideos} = this.state

    return (
      <ThemeContext.Provider
        value={{
          isDark,
          activeTab,
          savedVideos,
          changeTheme: this.changeTheme,
          changeActiveTab: this.changeActiveTab,
          saveVideosList: this.savedVideoList,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute exact path="/videos/:id" component={VideoItem} />
          <Route component={NotFound} />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
