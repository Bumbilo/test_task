import React from 'react';
import {Button, Input} from 'reactstrap';
import {Icon} from 'react-fa';

class EditContactInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgSrc: '',
            name: '',
            phone: ''
        }
    }

    handleImgSrcChange(event) {
        this.setState({imgSrc: event.target.value});

    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    handlePhoneChange(event) {
        this.setState({phone: event.target.value});
    }

    handleContactAdd() {
        const ava = 'https://s-media-cache-ak0.pinimg.com/originals/b1/bb/ec/b1bbec499a0d66e5403480e8cda1bcbe.png';
        const newContact = {
            id: Date.now(),
            name: this.state.name,
            phoneNumber: this.state.phone,
            image: this.state.imgSrc == '' ? ava : this.state.imgSrc
        };
        this.props.onContactAdd(newContact);
        this.setState({imgSrc: '', name: '', phone: ''});
    }

    render() {
        return (
            <tr>
                <td scope="row">
                    <Input value={this.state.imgSrc}
                           onChange={this.handleImgSrcChange.bind(this)}
                           placeholder="Image src"/>
                </td>
                <td>
                    <Input value={this.state.name}
                           onChange={this.handleNameChange.bind(this)}
                           placeholder="Name"/>
                </td>
                <td>
                    <Input value={this.state.phone}
                           onChange={this.handlePhoneChange.bind(this)}
                           placeholder="Phone"/>
                </td>
                <td>
                    <Button color="success" onClick={this.handleContactAdd.bind(this)}><Icon name="send-o"/></Button>
                </td>
            </tr>
        )
    }
}

export default EditContactInfo;
