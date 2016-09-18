import React from 'react'
import FindingForm from './findingForm.jsx'

class TopPanel extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">
              <img alt="Brand" src="/img/logo.png" style={{ height: "30px" }}/>
            </a>
          </div>
          <FindingForm />
        </div>
      </nav>
    )
  }
}

export default TopPanel;
