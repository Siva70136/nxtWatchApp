import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

const lightImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
const darkImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

class Login extends Component {
  state = {
    isDark: false,
    visible: 'password',
    check: false,
    name: '',
    password: '',
    errorMsg: '',
  }

  showPassword = event => {
    const condition = event.target.checked
    console.log(event.target)
    if (condition === true) {
      this.setState(prevState => ({
        visible: 'text',
        check: !prevState.check,
      }))
    } else {
      this.setState(prevState => ({
        visible: 'password',
        check: !prevState.check,
      }))
    }
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = msg => {
    this.setState({
      errorMsg: msg,
    })
  }

  onLogin = async event => {
    event.preventDefault()
    const {name, password} = this.state
    const userDetails = {
      username: name,
      password,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onNameChange = event => {
    this.setState({
      name: event.target.value,
    })
  }

  onPwdChange = event => {
    this.setState({
      password: event.target.value,
    })
  }

  render() {
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    const {isDark, visible, check, name, password, errorMsg} = this.state

    const imageUrl = isDark ? darkImage : lightImage
    const className = isDark ? 'dark' : 'light'
    const checked = check ? 'check' : 'not-check'
    return (
      <div className={`app-container ${className}`}>
        <div className="main-container">
          <div className="login-container">
            <img
              src={imageUrl}
              alt="website logo"
              className="website-logo-image"
            />
            <form className="login-form" onSubmit={this.onLogin}>
              <label htmlFor="user" className="label">
                USERNAME
              </label>
              <input
                type="text"
                className="box"
                placeholder="Username"
                id="user"
                onChange={this.onNameChange}
                value={name}
              />
              <label htmlFor="password" className="label">
                PASSWORD
              </label>
              <input
                type={visible}
                className="box"
                placeholder="Password"
                id="password"
                onChange={this.onPwdChange}
                value={password}
              />
              <div className="show-container">
                <input
                  type="checkbox"
                  id="show"
                  onChange={this.showPassword}
                  checked={check}
                  className={`${checked}`}
                />
                <label htmlFor="show" className="label">
                  Show Password
                </label>
              </div>
              <button type="submit" className="login-button">
                Login
              </button>

              <p className="error">{errorMsg}</p>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
