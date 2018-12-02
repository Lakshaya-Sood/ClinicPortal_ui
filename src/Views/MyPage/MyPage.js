import React from 'react';
import styles from './MyPage.css';
import { connect } from "react-redux";
import { addArticle } from "./action";
import ClippedDrawer from './SideMenu'
const mapStateToProps = state => {
    return { articles: state.reducer1.articles };
  };

  const mapDispatchToProps = dispatch => {
    return {
      addArticle: article => dispatch(addArticle(article))
    };
  };
class MyPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            articles: props.articles
        }
        this.renderList = this.renderList.bind(this)
    }
    componentWillReceiveProps(newProps){
        this.setState({articles:newProps.articles})
    }
    renderList(){
        let {articles} = this.state;
        return articles.map( item => {
            return(<li key={Math.random(0,10000)}>{item}</li>)
        })
    }
    render() {
        return (
            <div>
                <ClippedDrawer />
            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MyPage);
