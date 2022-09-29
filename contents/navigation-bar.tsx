import cssText from "data-text:~/contents/navigation-bar.css"
import type { PlasmoContentScript } from "plasmo"
import { useState } from "react"

export const config: PlasmoContentScript = {
  matches: ["https://github.com/*", "https://app.circleci.com/pipelines/github/*"],
  css: ["font.css"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

class UrlParser {
  private url: URL
  private organization: string
  private project: string

  public setUrl(url: string): UrlParser {
    this.url = new URL(url)
    if (this.url.hostname === "github.com") {
      this.organization = this.url.pathname.split('/')[1]
      this.project = this.url.pathname.split('/')[2]
    } else if (this.url.hostname === "app.circleci.com") {
      this.organization = this.url.pathname.split('/')[3]
      this.project = this.url.pathname.split('/')[4]
    }
    return this;
  }

  public isParseable(): boolean {
    return !!(this.organization && this.project)
  }

  public getGitHubProjectHome(): string {
    return `https://github.com/${this.organization}/${this.project}`
  }

  public getCircleCiProjectHome(): string {
    return `https://app.circleci.com/pipelines/github/${this.organization}/${this.project}?branch=main`
  }
}

const Button = (props) => {
  return (
    <a href={props.href} className={props.className}>{props.name}</a>
  )
}

const NavigationBar = () => {
  let currentUrl = location.href
  const urlParser = new UrlParser().setUrl(currentUrl)

  const [githubUrl, setGithubUrl] = useState(urlParser.getGitHubProjectHome());
  const [circleCiUrl, setCircleCiUrl] = useState(urlParser.getCircleCiProjectHome());

  setInterval(() => {
    if (location.href !== currentUrl) {
      currentUrl = location.href;
      urlParser.setUrl(currentUrl)
      setGithubUrl(urlParser.getGitHubProjectHome())
      setCircleCiUrl(urlParser.getCircleCiProjectHome())
    }
  }, 500);


  return (
    <div className="navigation-bar" style={{}}>
      <Button name="Github" href={githubUrl} className="github button" />
      <Button name="CircleCI" href={circleCiUrl} className="circleci button" />
    </div>
  )
}

export default NavigationBar
