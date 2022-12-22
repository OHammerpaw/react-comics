import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { Form, Container, Button } from "semantic-ui-react"
import { characterCreate } from "../api/character"

const CharacterCreate = ({ user, msgAlert }) => {
   
    const navigate = useNavigate()
    const defaultCharacter = {
        real_name: '',
        alias: '',
        details: ''
    }

    const [character, setCharacter] = useState(defaultCharacter)

    const handleChange = (e, target) => {
        setCharacter(prevCharacter => {
            const { name, value } = target
            const updatedName = e.target.name
            let updatedValue = e.target.value

            const updatedCharacter = { [updatedName]: updatedValue }

            return { ...prevCharacter, ...updatedCharacter }
            

        })
    }
    const handleCreateCharacter = (e) => {
        e.preventDefault()

        characterCreate(character, user)
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: 'Created Character',
                    variant: 'success'
                })
            })
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Create Character Failure' + error,
                    variant: 'danger'
                })
            })
    }

    return (
        <Container>
            <div className="comic-panel">
                <Form size="big">
                    <h1 className="comic-panel-font">
                        Add a character to the database!
                    </h1>
                    <Form.Input
                        required
                        fluid
                        label="Real Name"
                        placeholder="Real Name"
                        onChange={handleChange}
                        name="real_name"
                        value={character.real_name}
                    />
                    <Form.Input 
                        required
                        fluid
                        label="Alias"
                        placeholder="Alias"
                        onChange={handleChange}
                        name="alias"
                        value={character.alias}
                    />
                    <Form.Input
                        required
                        fluid
                        label="Details"
                        placeholder="Details"
                        onChange={handleChange}
                        name="details"
                        value={character.details}
                    />
                    <Form.Input
                        required
                        fluid
                        label="Profile Picture"
                        placeholder="Profile Picture"
                        onChange={handleChange}
                        name="profile_picture"
                        value={character.profile_picture}
                    />
                   <Form.Button onClick={handleCreateCharacter}>
                        Add
                   </Form.Button>
                </Form>
            </div>
        </Container>
    )
}

export default CharacterCreate