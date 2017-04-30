import React from 'react';
import { Button } from 'reactstrap';
import { Icon } from 'react-fa';


function ItemContactInfo({contact, onDeleteContact}) {
    return (
        <tr>
            <td scope="row"><img src={contact.image} alt={contact.name}/></td>
            <td>{contact.name}</td>
            <td>{contact.phone}</td>
            <td>
                <Button
                    color="danger"
                    onClick={() => onDeleteContact(contact)}>
                    <Icon name="trash-o"/>
                </Button>
            </td>
        </tr>

    )
}

export default ItemContactInfo;