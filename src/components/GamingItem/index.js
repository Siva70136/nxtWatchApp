import {Link} from 'react-router-dom'
import './index.css'

const GamingItem = props => {
  const {item} = props
  const {title, thumbnailUrl, viewCount, id} = item

  return (
    <li className="gaming-video-item">
      <Link to={`videos/${id}`} className="nav-link">
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="gaming-thumbnail"
        />
      </Link>
      <div className="profile-container">
        <div className="data-container">
          <p className="title">{title}</p>

          <div className="count-container">
            <p className="view-count">{viewCount} Watching Worldwide</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default GamingItem
