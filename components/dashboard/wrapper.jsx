var React = require("react");
var ReactDOM = require("react-dom");
var Rb = require('react-bootstrap');

(function() {
    'use strict';
    /* Services */
    var http = require('../../lib/http.service');
    var vm = require('./viewmodel');
    /* React */
    module.exports = React.createClass({
        getInitialState: function() {
            return vm({}, {type: 'init'});
        },
        dispatch: function(action) {
            this.setState(vm(this.state, action));
        },
        componentDidMount: function() {
            var self = this;
            http.post('http://128.199.135.164:8080/api/login',{
              username: "b5710501531",
              password: "1q2w3e4r"
            }).success(function(data) {
                console.log(data);
                self.dispatch({type: 'update_user', data: data});
            }).error(function(error) {});
            http.get('http://128.199.135.164:8080/api/project').success(function(data) {
                console.log(data);
                self.dispatch({type: 'update_contents', data: data});
            }).error(function(error) {});
        },
        render: function() {
            /* Functions */
            var dispatch = _.bind(this.dispatch, this);
            /* Components */
            var NavBar = require('./nav-bar/NavigationBar.jsx');
            var UserPanel = require('./user-panel/wrapper.jsx');
            var CircularProgressBar = require('./circular-progressbar/wrapper.jsx');
            var Thumbnails = require('./contents/thumbnails/wrapper.jsx');
            var SingleContent = require('./contents/single-content/wrapper.jsx');
            var Col = Rb.Col;
            var contentView;
            // switch (this.state.pane) {
            //     case 'thumbnails':
            //         contentView = <Thumbnails dispatch={dispatch} vote={this.state.vote} contents={this.state.contents}/>;
            //         break;
            //     case 'single_content':
            //         contentView = <SingleContent dispatch={dispatch} vote={this.state.vote} quota={this.state.user.quota} content={this.state.contents[this.state.content_id]}/>;
            // }
            // console.log(this.state.user.quota);
            return (
                <div className="full-height">
                    <NavBar {...this.state.user}/>
                    <div className="full-height" style={{ paddingTop: 50 }}>
                      <div className="full-height full-width" style={{padding: 15}}>
                        <div id="content-container" className="full-width full-height">
                          <Thumbnails dispatch={dispatch} contents={this.state.contents}/>
                        </div>
                      </div>
                        {/*<Col xs={6} sm={4} md={3} className="full-height user-panel" style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <UserPanel vote={this.state.vote} {...this.state.user}/>
                        </Col>
                        <Col className="full-height contents-panel" style={{overflowY: "scroll"}} xs={6} sm={8} md={9}>
                            {contentView}
                        </Col>*/}
                    </div>
                </div>
            );
        }
    });

}());
