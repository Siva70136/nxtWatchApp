import React from 'react'

const ThemeContext = React.createContext({
  isDark: false,
  activeTab: 'HOME',
  changeTheme: () => {},
  changeActiveTab: () => {},
})

export default ThemeContext
