(function() {
	'use strict';
  function vm() { return require('./viewmodel'); }
  var eventEmitter = require('event.service.js');
  var projectService = require('project.service');
  var key = 1;
	module.exports = React.createClass({
		getInitialState: function() {
      return vm()({},{type: 'init', data: this.props.location});
    },
    dispatch: function(action) {
      this.setState(vm()(this.state, action));
    },
    updateComments: function(data) {
      this.dispatch({ type: 'update_comments', data: data });
    },
    voteCheck: function(data) {
      this.dispatch({ type: 'update_vote_check', data: data });
    },
    getComment: function() {
      console.log('get comment');
      projectService.getComments(this.state.group.group_name,this.state._id);
    },
    componentDidMount: function() {
      $('html').css({'height': "auto"});
      projectService.voteCheck(this.state._id);
      projectService.getVoted(this.state._id, this.updateVoteBox);
      this.getComment();
      eventEmitter.getInstance().on(eventEmitter.event.project.voteCheck, this.voteCheck);
			eventEmitter.getInstance().on(eventEmitter.event.comments.update, this.updateComments);
    },
    componentWillUnmount: function() {
      $('html').css({'height': "100%"});
      eventEmitter.getInstance().off(eventEmitter.event.project.voteCheck, this.voteCheck);
			eventEmitter.getInstance().off(eventEmitter.event.comments.update, this.updateComments);
    },
    updateVoteBox: function(data) {
      this.dispatch({type: 'update_voted', data: data.vote});
    },
    isShowVoteBox: function() {
      var isShow = false;
      _.values(this.state.voteChecker).map(function(result, i) {
        isShow = isShow || result;
      });
      return isShow;
    },
		render: function() {
			/* Components */
			var ContentBox = require('./content-box.jsx');
			var VoteBox = require('../vote-box/wrapper.jsx');
			var Navbar = require('../../../nav-bar/NavigationBar.jsx');
      var Comments = require('../comments/wrapper.jsx');
			var Col = ReactBootstrap.Col;
      var user = require('auth.service').getUser();
      var voteBoxView;
        voteBoxView = <VoteBox checker={this.state.voteChecker} voted={this.state.voted} projectId={this.state._id}/>;
      var commentView;
      if(!_.isEmpty(this.state.comments) || user.teacher){
        commentView = <Comments comments={this.state.comments} dispatch={this.dispatch} projectId={this.state._id} callback={this.getComment} isShowCommentBox={this.state.isShowCommentBox}/>;
      }
			/* JSX */
			return (
				<div className="full-height">
					<Navbar/>
					<div className="full-height" style={{ paddingTop: 50 }}>
						<div className="full-width" style={{ padding: 15 }}>
              <div id="content-container" className="full-width">
                <div className="full-width center" style={{position: 'relative'}}>
                  <p style={{fontSize: "1.7em"}}>{this.state.name}</p>
                  <p>{this.state.group.group_name}</p>
                  <div className="flex-center-x">
                    <img src={this.state.image_url} className="img-responsive"/>
                  </div>
                </div>
                {
                  this.state.content.map(function(result, i) {
                    return <ContentBox {...result}/>;
                  })
                }
                {
                  voteBoxView
                }
                {
                  commentView
                }
              </div>
						</div>
					</div>
				</div>
			);
		},
	});
}());
