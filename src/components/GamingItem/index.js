import {Link} from 'react-router-dom'
// import './index.css'

const GamingItem = props => {
  const {item} = props
  const {title, thumbnailUrl, viewCount, id} = item

  return (
    <div className="video-item">
      <Link to={`videos/${id}`} className="nav-link">
        <img src={thumbnailUrl} alt={title} className="thumbnail" />
      </Link>
      <div className="profile-container">
        <div className="data-container">
          <p className="title">{title}</p>

          <div className="count-container">
            <p className="view-count">{viewCount} Watching Worldwide</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GamingItem
