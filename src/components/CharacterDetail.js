import React, { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Card, Container, Image, Button, Form, Feed } from "semantic-ui-react"

import { characterShow, characterUpdate, characterDelete } from "../api/character"

const CharacterDetail = (props) => {
    const { user , msgAlert } = props
    const [appeared, setAppeared] = useState([])
    const [Character, setCharacter] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()

    const [deleted, setDeleted] = useState(false)

    useEffect(() => {
        characterShow(user, id)
            .then((res) => {
                setCharacter(res.data.character)
                setAppeared(res.data.appeared)
            })
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Show Character Failure' + error,
                    variant: 'danger'
                })
            })
    }, [])

    const handleChange = (e, target) => {
        setCharacter(prevCharacter => {
            const { name, value } = target
            const updatedName = e.target.name
            let updatedValue = e.target.value

            const updatedCharacter = { [updatedName]: updatedValue }

            return { ...prevCharacter, ...updatedCharacter }
        })
    }

    const handleUpdateCharacter = (e) => {
        e.preventDefault()

        characterUpdate(Character, user, Character.id)
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

    const handleDeleteCharacter = () => {
        characterDelete(user, id)
        .then(() => {
            setDeleted(true)
            msgAlert({
                heading: 'Success',
                message: 'Deleting an Character',
                variant: 'success'
            })
            
        })
		.then(() => {navigate('/characters')})
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Deleting an Character Failure' + error,
                variant: 'danger'
            })
        })
    }

    let allAppearances

	if (appeared === []) {
        allAppearances = <>nothing</>
	} else {
		allAppearances = appeared.map((titles) => (
			// console.log(titles.title)
			<Card>
				<h1>{titles.title}</h1>
			</Card>
		))
	}

console.log(user)
	return (
		<>
			<Container className = "comic-panel">
                <Card.Group>
                    {
                        Character.profile_picture !== null
                        ?
                        <>
                            <Image src={Character.profile_picture} circular size='small'/>
                        </>
                        :
                        null
                    }
                    <Card>
                        <Card.Header>
                            <h1>
                                {Character.alias}
                            </h1>
                        </Card.Header>
                        <Card.Meta>
                            <h3>
                                {Character.real_name}
                            </h3>
                        </Card.Meta>
                        <Card.Description>
                            {Character.details}
                        </Card.Description>
                    </Card>
                </Card.Group>
			</Container>
            <Container className="comic-panel">
                <Link to='/characters'> <Button>Back to All Characters</Button></Link>
			    <h1 className="comic-panel-font">
				    Appears in 
			    </h1>
			    {allAppearances}
		    </Container>

            {
				user !== null
				?
					user.staff === true
					?
					<>
                        <Container className = "comic-panel">
                            <Form size="big">
                                <h1 className="comic-panel-font">
                                    Update Character!
                                </h1>
                                <Form.Input
                                    required
                                    fluid
                                    label="Real Name"
                                    placeholder="Real Name"
                                    onChange={handleChange}
                                    name="real_name"
                                    value={Character.real_name}
                                />
                                <Form.Input 
                                    required
                                    fluid
                                    label="Alias"
                                    placeholder="Alias"
                                    onChange={handleChange}
                                    name="alias"
                                    value={Character.alias}
                                />
                                <Form.Input
                                    required
                                    fluid
                                    label="Details"
                                    placeholder="Details"
                                    onChange={handleChange}
                                    name="details"
                                    value={Character.details}
                                />
                                <Form.Input
                                    required
                                    fluid
                                    label="Profile Picture"
                                    placeholder="Profile Picture"
                                    onChange={handleChange}
                                    name="profile_picture"
                                    value={Character.profile_picture}
                                />
                            <Form.Button color="green" onClick={handleUpdateCharacter}>
                                    Update
                            </Form.Button>
                            </Form>
                        </Container>
						<Container className = "comic-panel">
							<h1 className="comic-panel-font">Delete this Character</h1>
							<Button 
								color="red" 
								onClick={handleDeleteCharacter}
								>Delete Character
							</Button>
						</Container>					
					</>
					:
					null
				:
				null
			}
		</>
	)
}

export default CharacterDetail