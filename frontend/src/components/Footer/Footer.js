import './Footer.css'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <div className="footer">
      <a href="https://github.com/Lemelisk271" target="_blank" rel="noreferrer" className="footer-github">
        <i className="fa-brands fa-github"></i>
        <p>GitHub</p>
      </a>
      <p>&copy; {year} Zach Smith, All rights reserved</p>
      <a href="www.linkedin.com/in/zwsmith27" target="_blank" rel="noreferrer" className="footer-github">
        <i className="fa-brands fa-linkedin"></i>
        <p>LinkedIn</p>
      </a>
    </div>
  )
}

export default Footer
