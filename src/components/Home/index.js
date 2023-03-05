import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import Menu from '../Menu'

import './index.css'

class Home extends Component {
  componentDidMount() {
    this.getInfo()
  }

  getInfo = async () => {
    const url = 'https://apis.ccbp.in/videos/all?search='
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
  }

  render() {
    return (
      <div className="home-app-container">
        <Header />
        <div className="home-container">
          <Menu />
          <h1>hi</h1>
        </div>
      </div>
    )
  }
}

export default Home
