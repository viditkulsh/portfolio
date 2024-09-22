import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <h2 className="contact-title">Contact</h2>
      <p className="contact-description">Feel free to connect with me through the following platforms:</p>
      <footer className="contact-footer">
        <a href="mailto:viditkul08@gmail.com?subject=Regarding%20Selection%20for%20an%20Internship&body=Dear%20[Recipient's%20Name],%0A%0AWe%20are%20pleased%20to%20inform%20you%20that%20you%20have%20been%20selected%20as%20an%20intern%20at%20our%20esteemed%20company.%20Your%20skills%20and%20qualifications%20impressed%20us%20greatly,%20and%20we%20are%20excited%20to%20have%20you%20join%20our%20team.%0A%0AWe%20look%20forward%20to%20your%20contributions%20and%20are%20confident%20that%20this%20internship%20will%20be%20a%20valuable%20experience%20for%20you.%0A%0ACongratulations%20once%20again,%20and%20welcome%20aboard!%0A%0ABest%20regards,%0A[Your%20Name]%0A[Your%20Position]%0A[Company%20Name]" target="_blank" rel="noopener noreferrer">
          <img src="https://pngimg.com/uploads/email/email_PNG48.png" alt="Email Icon" className="contact-icon" />
        </a>
        <a href="https://www.instagram.com/vidit_kulshrestha/" target="_blank" rel="noopener noreferrer">
          <img src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/instagram.svg" alt="Instagram Icon" className="contact-icon" />
        </a>
        <a href="https://github.com/viditkulsh" target="_blank" rel="noopener noreferrer">
          <img src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/github.svg" alt="GitHub Icon" className="contact-icon" />
        </a>
        <a href="https://x.com/vidit_kulsh" target="_blank" rel="noopener noreferrer">
          <img src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/twitter.svg" alt="Twitter Icon" className="contact-icon" />
        </a>
        <a href="https://www.linkedin.com/in/vidit-kulshrestha/" target="_blank" rel="noopener noreferrer">
          <img src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="LinkedIn Icon" className="contact-icon" />
        </a>
      </footer>
    </section>
  );
};

export default Contact;