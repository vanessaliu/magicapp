import React from 'react';
import {Link} from 'react-router';
import { firebaseRoot } from './utils/firebase-utils';
import ReactFireMixin from 'reactfire';
import './dashboard.scss';
import _ from 'lodash';

const App = React.createClass({
    mixins: [ReactFireMixin],
    getInitialState() {
        return {
            chosenPlayer: '',
            chosenCategory: '',
            showPoints: false,
            chosenCommanderAttacker:'',
            disable: false,
            theAttackerArray: []
        }
    },
    componentWillMount: function () {
        this.bindAsArray(firebaseRoot, "players");
        console.log('componentWillMount');
    },
    render() {
        console.log(this.state.chosenPlayer, this.state.chosenCategory);
        // console.log(this.state.players);
        return (
            <div id="dashboard">
                <div className="row">
                    <div className="col-xs-3 new" role="group" aria-label="...">
                            <button activeStyle={{backgroundColor:'green'}} type="button" className="btn btn-info col-xs-6" data-toggle="modal" data-target=".modal-new-game">New Game</button>
                            <button activeStyle={{backgroundColor:'green'}} type="button" className="btn btn-info col-xs-6" onClick={this.handleNewMatch}>New Match</button>
                        </div>
                    <div className="btn-group col-xs-9" role="group" aria-label="...">

                        <Link activeStyle={{backgroundColor:'green'}} to="configure" type="button" className="btn btn-warning col-xs-4">Configure</Link>
                        <Link activeStyle={{backgroundColor:'green'}} to="/" type="button" className="btn btn-warning col-xs-4">Dashboard</Link>
                        <Link activeStyle={{backgroundColor:'green'}} to="history" type="button" className="btn btn-warning col-xs-4">History</Link>
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
                                    <tr key={i}>
                                        <td className={ player.disable ? 'disable': null }>{player.name}</td>
                                        <td>{player.winning}</td>
                                        <td>{player.totalWinning}</td>
                                        <td onClick={this.handleChosen.bind(this, player['.key'], 'life')} className={this.state.chosenPlayer === player['.key'] && this.state.chosenCategory === "life" ? 'chosen': "pointer" }>{player.life}</td>
                                        <td onClick={this.handleChosen.bind(this, player['.key'], 'poison')} className={this.state.chosenPlayer === player['.key'] && this.state.chosenCategory === "poison" ? 'chosen': "pointer" }>{player.poison}</td>
                                        <td onClick={this.handleChosen.bind(this, player['.key'], 'commander')} data-toggle="modal" data-target=".modal-commander" className="pointer">{player.commander.totalpoints}</td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                    </table>
                </div>
                {
                    this.state.showPoints && <div className="col-xs-12">
                    <button type="button" className="btn btn-danger col-xs-2" onClick={this.handlePoints.bind(this, -10)} >-10</button>
                    <button type="button" className="btn btn-danger col-xs-2" onClick={this.handlePoints.bind(this, -5)} >-5</button>
                    <button type="button" className="btn btn-danger col-xs-2" onClick={this.handlePoints.bind(this, -1)} >-1</button>
                    <button type="button" className="btn btn-success col-xs-2" onClick={this.handlePoints.bind(this, 1)} >+1</button>
                    <button type="button" className="btn btn-success col-xs-2" onClick={this.handlePoints.bind(this, 5)} >+5</button>
                    <button type="button" className="btn btn-success col-xs-2" onClick={this.handlePoints.bind(this, 10)} >+10</button>
                </div>
                }

                <div className="modal fade modal-new-game" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
                    <div className="modal-dialog modal-sm">
                        <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                    <h4 className="modal-title">Choose a winner</h4>
                                </div>
                                <div className="modal-body">
                                    <div className="panel panel-default">
                                      <ul className="list-group">
                                      {
                                        this.state.players.map((player, i) => {
                                            return (
                                                <li key={i} className="list-group-item pointer" data-dismiss="modal" aria-label="Close" onClick={this.handleChooseWinner.bind(this, player['.key'])}>{player.name}</li>
                                            );
                                        })
                                    }
                                      </ul>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade modal-commander" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
                    <div className="modal-dialog modal-sm">
                        <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Attack receiver: {this.state.chosenPlayer}</h4>
                                </div>
                                <div className="modal-body">

                                        <div className="row">
                                            <div className="col-xs-12 players">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th><span className="glyphicon glyphicon-user" aria-hidden="true"></span> Attackers</th>
                                                            <th><span className="glyphicon glyphicon-flash" aria-hidden="true"></span> Attacked points</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                        _.toArray(this.state.theAttackerArray).map((attacker, i) => {
                                                            return (
                                                                <tr key={i} onClick={this.handleChosenCommanderAttacker.bind(this, attacker.attacker.toLowerCase())} className={this.state.chosenCommanderAttacker === attacker.attacker.toLowerCase() ? 'chosen': "pointer" }>
                                                                    <td> {attacker.attacker}</td>
                                                                    <td>{attacker.attackedPoints}</td>
                                                                </tr>

                                                            );
                                                        })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-12 points">
                                                <button type="button" className="btn btn-danger col-xs-2" onClick={this.handleCommanderPoints.bind(this, -10)} >-10</button>
                                                <button type="button" className="btn btn-danger col-xs-2" onClick={this.handleCommanderPoints.bind(this, -5)} >-5</button>
                                                <button type="button" className="btn btn-danger col-xs-2" onClick={this.handleCommanderPoints.bind(this, -1)} >-1</button>
                                                <button type="button" className="btn btn-success col-xs-2" onClick={this.handleCommanderPoints.bind(this, 1)} >+1</button>
                                                <button type="button" className="btn btn-success col-xs-2" onClick={this.handleCommanderPoints.bind(this, 5)} >+5</button>
                                                <button type="button" className="btn btn-success col-xs-2" onClick={this.handleCommanderPoints.bind(this, 10)} >+10</button>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-12 confirm">
                                                <button type="button" data-dismiss="modal" aria-label="Close" className="btn btn-lg btn-warning col-xs-4 col-xs-push-4">OK,close!</button>
                                            </div>
                                        </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    handleChosen(thePlayer, category) {
        this.setState({
            chosenPlayer: thePlayer,
            chosenCategory: category,
            showPoints: true
        });
        if (category === 'commander') {
            firebaseRoot.child(thePlayer).child('commander/attackers').once('value', (dataSnapshot) => {
                let data = dataSnapshot.val();
                console.log(data);
                this.setState({
                    theAttackerArray: data
                });
            }, (err) => {
              console.log(err);
            });
        }
    },
    handleCommanderPoints(points) {
        //update total points
        firebaseRoot.child(this.state.chosenPlayer).child(this.state.chosenCategory).child('totalpoints').once('value', (dataSnapshot) => {
            let data = dataSnapshot.val();
            firebaseRoot.child(this.state.chosenPlayer).child(this.state.chosenCategory).child('totalpoints').set(data+points).then(null, window.alert);
        }, (err) => {
          console.log(err);
        });
        //update life points
        firebaseRoot.child(this.state.chosenPlayer).child('life').once('value', (dataSnapshot) => {
            let data = dataSnapshot.val();
            firebaseRoot.child(this.state.chosenPlayer).child('life').set(data-points).then(null, window.alert);
        }, (err) => {
          console.log(err);
        });
        // save this attack under attackers
        firebaseRoot.child(this.state.chosenPlayer).child(this.state.chosenCategory).child('attackers').child(this.state.chosenCommanderAttacker).once('value', (dataSnapshot) => {
            let data = dataSnapshot.val();
            // console.log("data", data);
            firebaseRoot.child(this.state.chosenPlayer).child(this.state.chosenCategory).child('attackers').child(this.state.chosenCommanderAttacker).update({
                attackedPoints: data.attackedPoints + points
            }).then(null, window.alert);
        }, (err) => {
          console.log(err);
        });
        // update theAttackerArray
        firebaseRoot.child(this.state.chosenPlayer).child('commander/attackers').once('value', (dataSnapshot) => {
                let data = dataSnapshot.val();
                console.log(data);
                this.setState({
                    theAttackerArray: data
                });
            }, (err) => {
              console.log(err);
            });
    },
    handlePoints(points) {
        firebaseRoot.child(this.state.chosenPlayer).child(this.state.chosenCategory).once('value', (dataSnapshot) => {
            let data = dataSnapshot.val();
            firebaseRoot.child(this.state.chosenPlayer).child(this.state.chosenCategory).set(data+points).then(null, window.alert);
            if (this.state.chosenCategory === 'poison' && (data+points) >= 15) {
                firebaseRoot.child(this.state.chosenPlayer).child('disable').set(true).then(null, window.alert);
            }
            if (this.state.chosenCategory === 'poison' && (data+points) < 0) {
                firebaseRoot.child(this.state.chosenPlayer).child(this.state.chosenCategory).set(0).then(null, window.alert);
            }
        }, (err) => {
          console.log(err);
        });
    },
    handleChosenCommanderAttacker(theAttacker) {
        // console.log(theAttacker);
        this.setState({
            chosenCommanderAttacker: theAttacker
        });
    },
    handleChooseWinner(winner) {
        // console.log("winner", winner);
        firebaseRoot.child(winner).child('winning').once('value', (dataSnapshot) => {
            let data = dataSnapshot.val();
            // console.log("data",data);
            firebaseRoot.child(winner).child('winning').set(data+1).then(null, window.alert);
        }, (err) => {
          console.log(err);
        });
        firebaseRoot.child(winner).child('totalWinning').once('value', (dataSnapshot) => {
            let data = dataSnapshot.val();
            // console.log("data",data);
            firebaseRoot.child(winner).child('totalWinning').set(data+1).then(null, window.alert);
        }, (err) => {
          console.log(err);
        });
        this.state.players.map(async (player, i) => {
            await firebaseRoot.child(player['.key']).update({
                life: 40,
                poison: 0,
                commander: {
                    totalpoints: 0
                },
                historyPoints: 0,
                disable: false
                }).then(null, window.alert);
        });
        this.state.players.map((onePlayer) => {
            this.state.players.map(async (player) => {
                await firebaseRoot.child(onePlayer['.key']).child('commander/attackers').child(player['.key']).set({
                    attackedPoints:0,
                    attacker: player.name
                    }).then(null, window.alert);
            })
        })
    },
    handleNewMatch() {
        this.state.players.map(async (player, i) => {
            await firebaseRoot.child(player['.key']).update({
                winning: 0,
                life: 40,
                poison: 0,
                commander: {
                    totalpoints: 0
                },
                historyPoints: 0,
                disable: false
                }).then(null, window.alert);
        });
        this.state.players.map((onePlayer) => {
            this.state.players.map(async (player) => {
                await firebaseRoot.child(onePlayer['.key']).child('commander/attackers').child(player['.key']).set({
                    attackedPoints:0,
                    attacker: player.name
                    }).then(null, window.alert);
            })
        })
    }
});

export default App;


