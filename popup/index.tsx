import logo from "../assets/icon128.png"

import "./index.css"

function IndexPopup() {
  return (
    <div className="popup-wrapper">
      <div className="popup-content">
        <h1>Developer Navigation</h1>
        <img
          src={logo}
          alt="logo"
          className="logo"
          height="52px"
          width="52px"
        />
        <div className="curve"></div>
      </div>
      <div className="ocean">
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
    </div>
  )
}

export default IndexPopup
