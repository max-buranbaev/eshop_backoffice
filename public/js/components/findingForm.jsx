import React from 'react'

class FindingForm extends React.Component {
  render() {
    return (
      <form className="navbar-form navbar-left" role="search">
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Поиск" />
        </div>
      </form>
    )
  }
}

export default FindingForm;
