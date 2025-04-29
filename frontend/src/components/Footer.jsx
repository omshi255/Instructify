import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <div>
      {/* <!-- Footer Section --> */}
<footer class="footer">
  <div class="footer-content">
    
    <div class="social-links">
      <a href="https://github.com/omshi255" target="_blank" class="social-icon">
        <i class="fab fa-github"></i>
      </a>
      <a href="https://www.facebook.com/your-facebook-username" target="_blank" class="social-icon">
        <i class="fab fa-facebook"></i>
      </a>
      <a href="https://www.linkedin.com/in/swati-sen-137aa8269/" target="_blank" class="social-icon">
      <i class="fab fa-linkedin"></i>
      </a>
    </div>
    <div class="email-contact">
      <input type="email" placeholder="Contact us via email..." class="email-input" />
      <button class="email-submit">Submit</button>
    </div>
    <p>
      Made with <span class="heart">❤️</span> by <span class="name">Swati Sen</span>
    </p>
  </div>
</footer>

    </div>
  )
}
