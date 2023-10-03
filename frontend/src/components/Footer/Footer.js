import './Footer.css'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <div className="footer">
      <p>&copy; {year} Zach Smith, All rights reserved</p>
      <a href="https://github.com/Lemelisk271" target="_blank" rel="noreferrer" className="footer-github">
        <i className="fa-brands fa-square-github"></i>
        <p>GitHub</p>
      </a>
      <a href="https://www.linkedin.com/in/zwsmith27" target="_blank" rel="noreferrer" className="footer-github">
        <i className="fa-brands fa-linkedin"></i>
        <p>LinkedIn</p>
      </a>
      <a href="https://portfolio-sugg.onrender.com/" target="_blank" rel="noreferrer" className="footer-github">
        <i className="fa-solid fa-house"></i>
        <p>Portfolio</p>
      </a>
    </div>
  )
}

export default Footer
