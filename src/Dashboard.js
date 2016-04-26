import React from 'react';
import {Link} from 'react-router';
import { firebaseRoot } from './utils/firebase-utils';
import ReactFireMixin from 'reactfire';
import './dashboard.scss';

const App = React.createClass({
    mixins: [ReactFireMixin],
    componentWillMount: function () {
        this.bindAsArray(firebaseRoot, "players");
    },
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-xs-3 new" role="group" aria-label="...">
                            <button activeStyle={{color:'green'}} type="button" className="btn btn-info col-xs-6" data-toggle="modal" data-target=".bs-example-modal-sm">New Game</button>
                            <button activeStyle={{color:'green'}} type="button" className="btn btn-info col-xs-6">New Match</button>
                        </div>
                    <div className="btn-group col-xs-9" role="group" aria-label="...">

                        <Link activeStyle={{color:'green'}} to="configure" type="button" className="btn btn-warning col-xs-4">Configure</Link>
                        <Link activeStyle={{color:'green'}} to="/" type="button" className="btn btn-warning col-xs-4">Dashboard</Link>
                        <Link activeStyle={{color:'green'}} to="history" type="button" className="btn btn-warning col-xs-4">History</Link>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th><span className="glyphicon glyphicon-user" aria-hidden="true"></span> Players</th>
                                <th><span className="glyphicon glyphicon-king" aria-hidden="true"></span> Winning</th>
                                <th><span className="glyphicon glyphicon-star" aria-hidden="true"></span> Total V</th>
                                <th><span className="glyphicon glyphicon-heart" aria-hidden="true"></span> Life</th>
                                <th><span className="glyphicon glyphicon-ice-lolly-tasted" aria-hidden="true"> </span> Poison</th>
                                <th><span className="glyphicon glyphicon-flash" aria-hidden="true"></span> Commander</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.players.map((player,i) => {
                                return (
                                    <tr>
                                        <td>{player.name}</td>
                                        <td>{player.winning}</td>
                                        <td>{player.totalWinning}</td>
                                        <td>{player.life}</td>
                                        <td>{player.poison}</td>
                                        <td>{player.commander}</td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                    </table>
                </div>
                <div className="col-xs-12">
                    <input type='number' max='0' className="btn btn-danger col-xs-2" />
                    <button type="button" className="btn btn-danger col-xs-2">-5</button>
                    <button type="button" className="btn btn-danger col-xs-2">-1</button>
                    <button type="button" className="btn btn-success col-xs-2">+1</button>
                    <button type="button" className="btn btn-success col-xs-2">+5</button>
                    <input type='number' min='0' className="btn btn-success col-xs-2" />
                </div>
                <div className="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
                    <div className="modal-dialog modal-sm">
                        <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                    <h4 className="modal-title">Choose a winner</h4>
                                </div>
                                <div className="modal-body">
                                    <div className="panel panel-default">

                                      <ul className="list-group">
                                        <li className="list-group-item" data-dismiss="modal" aria-label="Close">Player1</li>
                                        <li className="list-group-item" data-dismiss="modal" aria-label="Close">Player2</li>
                                        <li className="list-group-item" data-dismiss="modal" aria-label="Close">Player3</li>
                                        <li className="list-group-item" data-dismiss="modal" aria-label="Close">Player4</li>
                                      </ul>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default App;


