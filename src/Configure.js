import React from 'react';
import {Link} from 'react-router';
import { firebaseRoot } from './utils/firebase-utils';
import ReactFireMixin from 'reactfire';

const Configure = React.createClass({
    mixins: [ReactFireMixin],
    getInitialState() {
        return {
            name: ''
        }
    },
    componentWillMount: function () {
        this.bindAsArray(firebaseRoot, "players");
    },
    handleOnChange(event) {
        this.setState({name: event.target.value});
    },
    handleAdd() {
        firebaseRoot.child(this.state.name.toLowerCase()).set({
            name: this.state.name,
            winning: 0,
            totalWinning: 0,
            life: 40,
            poison: 0,
            commander: 0,
            historyPoints: 0
        }).then(
            this.setState({name: ''}), window.alert
        );
    },
    handleDelete(thePlayer) {
        firebaseRoot.child(thePlayer).remove().then(
            null, window.alert
        );
    },
    render() {
        console.log("players", this.state.players);
        return (
            <div>
                <div className="btn-group col-xs-12" role="group" aria-label="...">
                    <Link activeStyle={{color:'green'}} to="configure" type="button" className="btn btn-warning col-xs-4">Configure</Link>
                    <Link activeStyle={{color:'green'}} to="/" type="button" className="btn btn-warning col-xs-4">Dashboard</Link>
                    <Link activeStyle={{color:'green'}} to="history" type="button" className="btn btn-warning col-xs-4">History</Link>
                </div>
                <div className="row">
                    <div className="col-xs-8 col-xs-push-2">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Write the player name" value={this.state.name} onChange={this.handleOnChange}/>
                            <span className="input-group-btn">
                                <button className="btn btn-default" type="button" onClick={this.handleAdd}>Add</button>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="panel panel-default col-xs-8 col-xs-push-2">
                        <ul className="list-group">
                        {
                            this.state.players.map((player,i) => {
                                return (
                                    <li className="list-group-item" key={i}>{player.name} <button type="button" className="btn btn-default pull-right" onClick={this.handleDelete.bind(this, player['.key'])}>Delete</button></li>
                                );
                            })
                        }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
});

export default Configure;
