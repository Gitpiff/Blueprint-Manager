import './Footer.css';

const Footer = () => {
    return (
        <footer style={{position: 'fixed', bottom: '0', width: '100%', height:'5%', backgroundColor: '#001f3f', color: 'white', textAlign: 'center'}} className='footer'>
            <p>
                2024 Blueprint Manager. All rights reserved.
            </p>
        </footer>
    )
}

export default Footer;