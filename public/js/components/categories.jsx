import React from 'react'
import Category from './category.js'

class Categories extends React.Component {
  render () {
    return (
      <ul className="list-unstyled">
      {
        this.props.categories.map(function (cat) {
          return <Category key={ cat._id } id={cat._id} name={ cat.name } />
        })
      }
    </ul>
    )
  }
}

export default Categories;
