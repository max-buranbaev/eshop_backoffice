import React from 'react'
import FindingForm from './findingForm.jsx'
import store from '../../store.js'
import { syncGoods } from '../../actions/goods.js'
import { Link } from 'react-router'

class TopPanel extends React.Component {
    handleClick() {
        store.dispatch(syncGoods());
    }

    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container">
                    <div className="navbar-header hidden-xs">
                        <a className="navbar-brand " href="/">
                            <img alt="Brand" src="/img/logo.png" style={{
                                height: "30px"
                            }}/>
                        </a>
                    </div>
                    <ul className="nav navbar-nav">
                        <li>
                            <Link to="/">Каталог</Link>
                        </li>
                        <li>
                            <Link to="/sales">Продажи</Link>
                        </li>
                    </ul>
                    <FindingForm/>
                    <button type="button" className="btn btn-default navbar-btn navbar-right hidden-xs" style={{
                        "marginRight": 0
                    }} onClick={this.handleClick}>
                        <span className="glyphicon glyphicon-refresh"></span>
                    </button>
                </div>
            </nav>
        )
    }
}

export default TopPanel;
