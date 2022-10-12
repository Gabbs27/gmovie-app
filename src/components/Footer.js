import React from "react";

export default function Footer(props) {
  return (
    <div className={`footer--container ${props.darkMode ? "dark" : ""}`}>
      <a
        rel='noreferrer'
        href='https://github.com/Gabbs27'
        target='_blank'
        className='footer--github__link'>
        <span>
          <ion-icon name='logo-github'></ion-icon>
        </span>
        <span>GitHub</span>
      </a>
    </div>
  );
}
