import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { Form, Container, Button } from "semantic-ui-react"
import { publisherCreate } from "../api/publisher"

const PublisherCreate = ({ user, msgAlert }) => {
   
    const navigate = useNavigate()
    const defaultPublisher = {
        publisher_name: ''
    }

    const [publisher, setPublisher] = useState(defaultPublisher)

    const handleChange = (e, target) => {
        setPublisher(prevPublisher => {
            const { name, value } = target
            const updatedName = name
            let updatedValue = value

            const updatedPublisher = { [updatedName]: updatedValue }

            return { ...prevPublisher, ...updatedPublisher }

        })
    }
    const handleCreatePublisher = (e) => {
        e.preventDefault()

        publisherCreate(publisher, user)
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: 'Created Publisher',
                    variant: 'success'
                })
            })
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Create Publisher Failure' + error,
                    variant: 'danger'
                })
            })
    }

    return (
        <Container>
            <div className="comic-panel">
                <Form size="big">
                    <h1 className="comic-panel-font">
                        Add a publisher to the database!
                    </h1>
                    <Form.Input
                        required
                        fluid
                        label="Publisher Name"
                        placeholder="Publisher"
                        onChange={handleChange}
                        name="publisher_name"
                        value={publisher.publisher_name}
                    />
                   <Form.Button onClick={handleCreatePublisher}>
                        Add
                   </Form.Button>
                </Form>
            </div>
        </Container>
    )
}

export default PublisherCreate