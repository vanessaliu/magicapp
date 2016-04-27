import React from 'react';
import {Link} from 'react-router';
import { firebaseRoot } from './utils/firebase-utils';
import ReactFireMixin from 'reactfire';
import _ from 'lodash';

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

    render() {
        return (
             <div>
                <div className="row">
                    <div className="btn-group col-xs-12" role="group" aria-label="...">
                        <Link activeStyle={{backgroundColor:'green'}} to="configure" type="button" className="btn btn-warning col-xs-4">Configure</Link>
                        <Link activeStyle={{backgroundColor:'green'}} to="/" type="button" className="btn btn-warning col-xs-4">Dashboard</Link>
                        <Link activeStyle={{backgroundColor:'green'}} to="history" type="button" className="btn btn-warning col-xs-4">History</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="panel panel-default col-xs-10 col-xs-push-1">
                      <div className="panel-heading">
                        <h3 className="panel-title">Commander data</h3>
                      </div>
                      <div className="panel-body">
                        {
                            this.state.players.map((player, i) => {
                                console.log(_.toArray(player.commander.attackers));
                                return (
                                    <div className="list-group">
                                        <h5 className="list-group-item-heading">Attack receiver: {player.name}</h5>
                                        {
                                            _.toArray(player.commander.attackers).map((attacker,i) => {
                                                return (
                                                    <li className="list-group-item">Attacked by: {attacker.attacker} ({attacker.attackedPoints} points)</li>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                      </div>
                    </div>
                    <div className="panel panel-default col-xs-10 col-xs-push-1">
                      <div className="panel-heading">
                        <h3 className="panel-title">Other</h3>
                      </div>
                      <div className="panel-body">
                        Panel content
                      </div>
                    </div>
                </div>
            </div>
        )
    }
});

export default Configure;
