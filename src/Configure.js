import React from 'react';
import {Link} from 'react-router';
import { firebaseRoot } from './utils/firebase-utils';
import ReactFireMixin from 'reactfire';
import './configure.scss';

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
            commander: {
                totalpoints: 0,
                attackers: null
            },
            historyPoints: 0,
            disable: false
        }).then(
            this.setState({name: ''}), window.alert
        );
        this.state.players.map((onePlayer) => {
            this.state.players.map(async (player) => {
                await firebaseRoot.child(onePlayer['.key']).child('commander/attackers').child(player['.key']).set({
                    attackedPoints:0,
                    attacker: player.name
                    }).then(null, window.alert);
            })
        })
    },
    handleDelete(thePlayer) {
        firebaseRoot.child(thePlayer).remove().then(
            null, window.alert
        );
        this.state.players.map((onePlayer) => {
            firebaseRoot.child(onePlayer['.key']).child('commander/attackers').remove();
            this.state.players.map(async (player) => {
                await firebaseRoot.child(onePlayer['.key']).child('commander/attackers').child(player['.key']).set({
                    attackedPoints:0,
                    attacker: player.name
                    }).then(null, window.alert);
            })
        })
    },
    render() {
        return (
            <div id="configure">
                <div className="btn-group col-xs-12" role="group" aria-label="...">
                    <Link activeStyle={{backgroundColor:'green'}} to="configure" type="button" className="btn btn-warning col-xs-4">Configure</Link>
                    <Link activeStyle={{backgroundColor:'green'}} to="/" type="button" className="btn btn-warning col-xs-4">Dashboard</Link>
                    <Link activeStyle={{backgroundColor:'green'}} to="history" type="button" className="btn btn-warning col-xs-4">History</Link>
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
                                    <li className="list-group-item" key={i}>{player.name} <span className="glyphicon glyphicon-trash pull-right pointer" aria-hidden="true" onClick={this.handleDelete.bind(this, player['.key'])}></span></li>
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
