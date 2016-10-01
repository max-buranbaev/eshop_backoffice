import React from 'react'
import store from '../../store.js'
import _ from 'loDash'

class FindingForm extends React.Component {
  handleChange(e) {
      store.dispatch({ type: "FILTER_GOODS", filterString: e.target.value });
  }

  render() {
    return (
      <form className="navbar-form navbar-left" role="search">
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Поиск" onChange={ this.handleChange }/>
        </div>
      </form>
    )
  }
}

export default FindingForm;
