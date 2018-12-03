import React from 'react';
import {Tab,Row,Col,Nav,NavItem,Panel,Button} from 'react-bootstrap';
class PatientDashbord extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            key: 1
          };
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(key) {
        this.setState({ key });
    }

    render(){
        return(
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row className="clearfix" style={{width:"100%"}}>
                <Col md={2}>
                <Nav bsStyle="pills" stacked>
                    <NavItem eventKey="first">DashBoard</NavItem>
                    <NavItem eventKey="second">Book Appointment</NavItem>
                    <NavItem eventKey="third">History</NavItem>
                    <NavItem eventKey="fourth">Settings</NavItem>
                </Nav>
                </Col>
                <Col md={10}>
                <Tab.Content animation>
                    <Tab.Pane eventKey="first">Tab 1 content</Tab.Pane>
                    <Tab.Pane eventKey="second">
                        <Panel style={{height:'250px'}}>
                            <Panel.Heading style={{textAlign:'center'}}>
                                <Panel.Title ><span style={{fontSize:'24px'}}>Book Appointment</span></Panel.Title>
                            </Panel.Heading>
                            <Panel.Body style={{position:"relative",top:'25px'}}>
                                <Row>
                                <Col md={1}/>
                                <Col md={4}>
                                    <Button style={{width:'100%'}} bsStyle="primary" bsSize="large">
                                        For Consulting
                                    </Button>
                                </Col>
                                <Col md={2}/>
                                <Col md={4}>
                                    <Button style={{width:'100%'}} bsStyle="primary" bsSize="large">
                                        For Test
                                    </Button>
                                </Col>
                                <Col md={1}/>
                                </Row>
                            </Panel.Body>
                        </Panel>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">Tab 3 content</Tab.Pane>
                    <Tab.Pane eventKey="fourth">Tab 4 content</Tab.Pane>
                </Tab.Content>
                </Col>
            </Row>
            </Tab.Container>
        )
    }
}
export default PatientDashbord;