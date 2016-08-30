module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <div className="col-md-2">
          <ul className="nav nav-stacked">
            <li role="presentation" className="active"><a href="#">Категория 1</a></li>
            <li role="presentation"><a href="#">Категория 2</a></li>
            <li role="presentation"><a href="#">Категория 3</a></li>
            <li role="presentation"><a href="#">Без категории</a></li>
          </ul>
        </div>
        <div className="col-md-10">
          <div className="row">
            <button type="button" className="btn btn-default btn-lg">
              <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
              <span>Добавить категорию</span>
            </button>
            <button type="button" className="btn btn-default btn-lg">
              <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
              <span>Добавить товар</span>
            </button>
          </div>
          <div className="row" style={{paddingTop: "20px"}}>
            <table className="table table-hover">
              <Goods goods={ this.props.goods }/>
            </table>
          </div>
        </div>
      </div>
    )
  }
});
