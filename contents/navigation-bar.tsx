import cssText from "data-text:~/contents/navigation-bar.css"
import type { PlasmoCSConfig } from "plasmo"
import { useState } from "react"

export const config: PlasmoCSConfig = {
  matches: [
    "https://github.com/*",
    "https://app.circleci.com/pipelines/github/*"
  ],
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
      this.organization = this.url.pathname.split("/")[1]
      this.project = this.url.pathname.split("/")[2]
    } else if (this.url.hostname === "app.circleci.com") {
      this.organization = this.url.pathname.split("/")[3]
      this.project = this.url.pathname.split("/")[4]
    }
    return this
  }

  public isParseable(_url: string): boolean {
    const url = new URL(_url)
    let organization
    let project

    if (url.hostname === "github.com") {
      organization = url.pathname.split("/")[1]
      project = url.pathname.split("/")[2]
    } else if (url.hostname === "app.circleci.com") {
      organization = url.pathname.split("/")[3]
      project = url.pathname.split("/")[4]
    }

    return !!(organization && project)
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
    <a href={props.href} className={props.className}>
      {props.name}
    </a>
  )
}

const NavigationBar = () => {
  const [currentUrl, setCurrentUrl] = useState(location.href)

  const urlParser = new UrlParser().setUrl(currentUrl)
  const githubUrl = urlParser.getGitHubProjectHome()
  const circleCiUrl = urlParser.getCircleCiProjectHome()

  setInterval(() => {
    const newUrl = location.href
    if (newUrl !== currentUrl && urlParser.isParseable(newUrl)) {
      setCurrentUrl(newUrl)
    }
  }, 500)

  if (urlParser.isParseable(currentUrl)) {
    return (
      <div className="navigation-bar">
        <Button name="Github" href={githubUrl} className="github button" />
        <Button
          name="CircleCI"
          href={circleCiUrl}
          className="circleci button"
        />
      </div>
    )
  }
}

export default NavigationBar
