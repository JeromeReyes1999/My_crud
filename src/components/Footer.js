import React from 'react'
import {FaFacebookSquare} from 'react-icons/fa'

const Footer = () => {
    return (
        <footer>
            <a className='footer-link' href="https://www.facebook.com/jerome.reyes.3133">
                <FaFacebookSquare/> Made by <div style={{display:'inline-block', fontWeight:'bold'}}> Jerome Reyes </div>
                </a>
        </footer>
    )
}

export default Footer
