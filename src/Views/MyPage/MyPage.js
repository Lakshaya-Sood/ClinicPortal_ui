import React from 'react';
import styles from './MyPage.css';
import { connect } from "react-redux";
import { addArticle } from "./action";
import {Row,Col,Panel,Button} from 'react-bootstrap';
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
                <Row style={{position:"relative",top:'100px',width:"100%"}}>
                    <Col md={4}/>
                    <Col md={4}>
                        <Panel style={{height:'170px'}}>
                            <Panel.Heading style={{textAlign:'center'}}>
                                <Panel.Title ><span style={{fontSize:'24px'}}>You are Welcome!</span></Panel.Title>
                            </Panel.Heading>
                            <Panel.Body style={{position:"relative",top:'25px'}}>
                                <Row>
                                <Col md={1}/>
                                <Col md={4}>
                                    <Button style={{width:'100%'}} bsSize="large">
                                    <a href="/login">Login</a>
                                    </Button>
                                </Col>
                                <Col md={2}/>
                                <Col md={4}><Button style={{width:'100%'}} bsStyle="primary" bsSize="large">Register</Button></Col>
                                <Col md={1}/>
                                </Row>
                            </Panel.Body>
                        </Panel>
                    </Col>
                    <Col md={4}/>
                </Row>
            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MyPage);
