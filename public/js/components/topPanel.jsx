import React from 'react'

class TopPanel extends React.Component {
  render() {
    return(
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">
              <img alt="Brand" src="/img/logo.png" style={{ height: "30px" }}/>
            </a>
          </div>
          <form className="navbar-form navbar-left" role="search">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Поиск" />
            </div>
          </form>
        </div>
      </nav>
    )
  }
}

export default TopPanel;
