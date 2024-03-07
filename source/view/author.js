import React, { Component } from 'react';
import {
  View,
  RefreshControl
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as AuthorAction from '../action/author';
import SingleButton from '../component/button/single';
import AuthorRender from '../component/header/author';
import AuthorPostList from '../component/listview/authorPostList';
import refreshControlConfig from '../config/refreshControl';
import { ComponentStyles } from '../style';

class AuthorPage extends Component {

  constructor (props) {
    super(props);
    this.state = {
      hasFocus: false
    };
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentDidFocus() {
    this.setState({
      hasFocus: true
    });
  }

  componentDidMount(){
    const { authorAction, blogger } = this.props;
    authorAction.getAuthorDetail(blogger).then(()=>{
      authorAction.getAuthorPosts(blogger);
    });
  }

  onListEndReached(){
		const { authorAction, ui, blogger } = this.props;
    if (ui && ui.postPageEnabled) {
      authorAction.getAuthorPostsWithPage(blogger, {
        pageIndex: ui.postPageIndex + 1
      });
    }
	}
	
	renderListRefreshControl(){
		const { authorAction, blogger, ui } = this.props;
    if(ui && typeof ui.postPageEnabled !== "undefined"){
      return (
        <RefreshControl { ...refreshControlConfig }
          refreshing={ ui.refreshPending }
          onRefresh={ ()=>{ authorAction.getAuthorPosts(blogger) } } />
      );
    }
	}

  renderAuthorContent(){
    const { author, ui } = this.props;

    if (this.state.hasFocus === false || (ui && ui.refreshPending !== false)) {
      return null;
    }

    if (author && author.posts) {
      return (
         <AuthorPostList 
            avatar = { this.props.avatar }
            blogger={ this.props.blogger } 
            router = { this.props.router } />
      )
    }
  }

  render() {
    return (
      <View style={ ComponentStyles.container }>
          <AuthorRender 
            author={ this.props.author } 
            avatar = { this.props.avatar }
            router = { this.props.router }
            refreshControl={ this.renderListRefreshControl() }
					  onListEndReached = { ()=>this.onListEndReached() } >
            { this.renderAuthorContent() }
          </AuthorRender>

          <SingleButton onPress = { ()=>this.props.router.pop() }/>
      </View>
    );
  }
}

export default connect((state, props) => ({
  author: state.author[props.blogger],
  ui: state.authorUI[props.blogger]
}), dispatch => ({ 
  authorAction : bindActionCreators(AuthorAction, dispatch)
}), null, {
  withRef: true
})(AuthorPage);