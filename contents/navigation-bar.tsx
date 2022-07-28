import cssText from "data-text:~/contents/navigation-bar.css"
import type { PlasmoContentScript } from "plasmo"

export const config: PlasmoContentScript = {
  matches: ["https://github.com/*", "https://app.circleci.com/pipelines/github/*"],
  css: ["font.css"]
}

// Idea for an UI API, for popup, notification badge, or mounting UI
// Idea for static mount
// Idea for styling injection support (inline or with custom emotion cache)

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const currentUrl = window.location.href
const resourceArray = currentUrl.split('/')
const organization = resourceArray[resourceArray.length - 2] || ''
const project = resourceArray[resourceArray.length - 1] || ''

const NavigationBar = () => {
  return (
    <div className="navigation-bar" style={{}}>
      <Button name="Github"  href={"https://github.com/" + organization + "/" + project} className="github button" />
      <Button name="CircleCI" href={"https://app.circleci.com/pipelines/github/" + organization + "/" + project} className="circleci button" />
    </div>
  )
}

const Button = (props) => {
  return (
    <a href={props.href} className={props.className}>{props.name}</a>
  )
}

export default NavigationBar
