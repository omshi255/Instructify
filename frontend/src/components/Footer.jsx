import React, { useState } from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faFacebook,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleEmailSubmit = () => {
    if (email) {
      console.log("Email submitted:", email);
      setEmail("");
    }
  };

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="social-links">
          <span
            className="social-icon"
            onClick={() => openInNewTab("https://github.com/omshi255")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              e.key === "Enter" && openInNewTab("https://github.com/omshi255")
            }
          >
            <FontAwesomeIcon icon={faGithub} />
          </span>
          <span
            className="social-icon"
            onClick={() =>
              openInNewTab("https://www.facebook.com/your-facebook-username")
            }
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              openInNewTab("https://www.facebook.com/your-facebook-username")
            }
          >
            <FontAwesomeIcon icon={faFacebook} />
          </span>
          <span
            className="social-icon"
            onClick={() =>
              openInNewTab("https://www.linkedin.com/in/swati-sen-137aa8269/")
            }
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              openInNewTab("https://www.linkedin.com/in/swati-sen-137aa8269/")
            }
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </span>
        </div>
        <div className="email-contact">
          <input
            type="email"
            placeholder="Contact us via email..."
            className="email-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="email-submit" onClick={handleEmailSubmit}>
            Submit
          </button>
        </div>
        <p>
          Made with <span className="heart">❤️</span> by{" "}
          <span className="name">Swati Sen</span>
        </p>
      </div>
    </footer>
  );
}
