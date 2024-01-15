import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';

function Footer(): JSX.Element {
    const date = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="item">
                    <p>Visit us at: 123 Main Street, Cityville, Country</p>
                    <p>Email us at: info@example.com</p>
                </div>
                <div className="item">
                    <div className="social-icons">
                        <a
                            href="https://www.instagram.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faInstagram} size="2x" />
                        </a>
                        <a
                            href="https://www.facebook.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faFacebook} size="2x" />
                        </a>
                    </div>
                    <div className="copyright">
                        <p style={{ marginLeft: '-130px' }}>
                            Copyright &copy; {date} Sweet Delights. All rights reserved.
                        </p>
                    </div>
                </div>
                <div className="item">
                    <p>Contact us: +1 (555) 123-4567</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
