import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <ul style={{ display: 'flex', listStyle: 'none', margin: '0px', padding: '0px', alignItems: 'center' }}>
        <li style={{ margin: '0px', padding: '0px 20px' }}>
          <Link
            to="/about-me"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            About Me
        </Link></li>
        <li style={{ margin: '0px', padding: '0px 20px' }}>
          <Link
            to="/portfolio"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            Portfolio
        </Link></li>
      </ul>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
