import React from 'react';
import { Redirect } from 'react-router-dom'
//import styles from './Login.css';
import {Row,Col,Panel,Button,FormGroup,FormControl,ControlLabel,HelpBlock} from 'react-bootstrap';
import { AlertList } from "react-bs-notifier";

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password: '',
            errorMsg: false,
            alertList: [],
            redirect: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.OnLoginClick = this.OnLoginClick.bind(this);
        this.onAlertDismissed = this.onAlertDismissed.bind(this)
        this.renderRedirect = this.renderRedirect.bind(this)
        
    }
    handleChange(key,val){
        this.setState({[key]:val})
    }
    OnLoginClick(){
        let {username,password} = this.state
        console.log(username,password)
        if( username === 'admin' && password === 'admin' ) {
            this.setState({redirect: true})
        } else {
            const newAlert ={
                id: (new Date()).getTime(),
                type: 'danger',
                headline: `Error`,
                message: `Username and Password don not match!`
            };
            this.setState({alertList: [...this.state.alertList,newAlert]})
        }
    }
    onAlertDismissed(){
        this.setState({alertList: []})
    }
    renderRedirect(){
        return this.state.redirect ? (<Redirect to='/' />) : ('');
    }
    render() {
        return (
            <div>
                {this.renderRedirect()}
                <AlertList
					position={"bottom-right"}
					alerts={this.state.alertList}
                    timeout={2000}
                    onDismiss={this.onAlertDismissed}
				/>
                <Row style={{position:"relative",top:'30px'}}>
                    <Col md={4}/>
                    <Col md={4}>
                        <Panel style={{height:'350px'}}>
                            <Panel.Heading style={{textAlign:'center'}}>
                                <Panel.Title ><span style={{fontSize:'24px'}}>Login</span></Panel.Title>
                            </Panel.Heading>
                            <Panel.Body style={{position:"relative",top:'15px'}}>
                                <FormGroup>
                                    <Row>
                                        <Col md={5} mdOffset={2}>
                                            <ControlLabel>Username</ControlLabel>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={8} mdOffset={2}>
                                            <FormControl
                                                type="text"
                                                value={this.state.username}
                                                placeholder="Enter username"
                                                onChange={(evt) => this.handleChange('username',evt.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={8} mdOffset={2}>
                                            <HelpBlock>Must be 5 character long</HelpBlock>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={5} mdOffset={2}>
                                            <ControlLabel>Password</ControlLabel>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={8} mdOffset={2}>
                                            <FormControl
                                                type="password"
                                                value={this.state.password}
                                                placeholder="Enter password"
                                                onChange={(evt) => this.handleChange('password',evt.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={8} mdOffset={2}>
                                            <HelpBlock>Must be 5 character long and alphanumeric</HelpBlock>
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <Row>
                                    <Col md={4} mdOffset={4}> 
                                        <Button style={{width:'100%'}} bsStyle="primary" onClick={()=>this.OnLoginClick()}>
                                            Login
                                        </Button>
                                    </Col>
                                    <Col md={4}/>
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

export default Login;
