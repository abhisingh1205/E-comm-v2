import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import { Alert } from 'react-bootstrap'

function Message() {
    const messageDetails = useSelector((state) => state.messageDetails)

    const {message, error, variant} = messageDetails
    return (
        <Alert variant={variant}>
            {message}
        </Alert>
    )
}

export default Message
