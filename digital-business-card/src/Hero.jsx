import profileImage from "./assets/profile-image.png";
import mailIcon from "./assets/Icon/mail.svg";
import linkedinIcon from "./assets/Icon/linkedin.svg";

function Hero() {
  return (
    <section className="hero">
      <img
        src={profileImage}
        alt="profile-image"
        className="profile-image"
      />

      <div className="info">
        <h1>Mahmoud Reda</h1>
        <h2>Frontend Developer</h2>
        <a href="https://github.com/jrreda">jrreda.github.io</a>

        <div className="buttons">
          <button className="email-button">
            <img src={mailIcon} alt="email-icon" />
            Email
          </button>
          <button className="linkedin-button">
            <img src={linkedinIcon} alt="linkedin-icon" />
            LinkedIn
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
