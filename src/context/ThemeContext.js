import React from 'react'

const ThemeContext = React.createContext({
  isDark: false,
  activeTab: 'HOME',
  changeTheme: () => {},
  changeActiveTab: () => {},
  saveVideosList: () => {},
  savedVideos: [],
})

export default ThemeContext
