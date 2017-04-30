import {Input, Table, Jumbotron, Container, Button} from 'reactstrap';
import React, {Component} from 'react';
import localProvider from './localProvider';
import EditContactInfo from './editContact';
import ItemContactInfo from './itemContact';
import data from '../shared/data';
import {Icon} from 'react-fa';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stateContacts: data
        };
        this.handlerContactDelete = this.handlerContactDelete.bind(this);
        this.handleContactAdd = this.handleContactAdd.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleUndo = this.handleUndo.bind(this);
    }

    handleContactAdd(newContact) {
        const newContacts = this.state.stateContacts.slice();
        newContacts.unshift(newContact);
        data.unshift(newContact);
        this.setState({stateContacts: newContacts});
        this.props.saveToLocalUndo(this.state);
    }

    handleSearch(event) {
        clearInterval(this.time);
        const searchQuery = event.target.value.toLowerCase();
        const showContact = data.filter((el) => {
            const searchValue = el.name.toLowerCase();
            return searchValue.indexOf(searchQuery) !== -1;
        });
        this.time = setTimeout(() => this.setState({stateContacts: showContact}), 1000);
        this.props.saveToLocalUndo(this.state);
    }

    handleUndo(e) {
        e.preventDefault();
        this.setState(this.props.getLastState);
    }

    handlerContactDelete(contact) {
        const contactId = contact.id;
        const newContacts = this.state.stateContacts.filter((contact) => contact.id !== contactId);
        this.setState({stateContacts: newContacts});
        this.props.saveToLocalUndo(this.state);
    }

    render() {
        return (
            <Container>
                {this.props.prop}
                <Jumbotron >
                    <p className="lead">Search heroes star wars</p>
                    <Input
                        type="text"
                        className="search"
                        onChange={this.handleSearch.bind(this)}
                        placeholder="Search name"
                    />
                    <br/>
                    <Button
                        color="success"
                        onClick={this.handleUndo}
                    >
                        <Icon name="reply"/> Undo
                    </Button>
                </Jumbotron>
                <Table hover>
                    <thead>
                        <tr>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                    <EditContactInfo onContactAdd={this.handleContactAdd.bind(this)}/>
                    {this.state.stateContacts.map(contact => {
                        return (
                            <ItemContactInfo
                                key={contact.id}
                                contact={contact}
                                onDeleteContact={this.handlerContactDelete.bind(this)}
                            />
                        )
                    })}
                    </tbody>
                </Table>
            </Container>
        );
    }
}

App = localProvider(App);

export default App;
