import React from 'react'
import twitterIcon from './assets/Icon/twitter.svg'
import facebookIcon from './assets/Icon/facebook.svg'
import instagramIcon from './assets/Icon/instagram.svg'
import githubIcon from './assets/Icon/github.svg'

const Footer = () => {
  return (
    <footer>
      <img src={twitterIcon} alt="twitter-icon" />
      <img src={facebookIcon} alt="facebook-icon" />
      <img src={instagramIcon} alt="instagram-icon" />
      <img src={githubIcon} alt="github-icon" />
    </footer>
  )
}

export default Footer
