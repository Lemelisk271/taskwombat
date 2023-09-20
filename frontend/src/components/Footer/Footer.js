import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <div className="footer">
      <a href="https://github.com/Lemelisk271" target="_blank" className="footer-github">
        <i className="fa-brands fa-github"></i>
        <p>GitHub Profile</p>
      </a>
    </div>
  )
}

export default Footer
