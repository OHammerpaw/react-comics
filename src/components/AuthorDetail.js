import React, { useEffect, useState } from "react"

import { useParams, useNavigate, Link } from "react-router-dom"

import { Card, Container, Image, Button, Form } from "semantic-ui-react"
import { authorShow, authorUpdate, authorDelete } from "../api/author"

const AuthorDetail = (props) => {
	const { user , msgAlert } = props
	const [written, setWritten] = useState([])
	const [author, setAuthor] = useState([])
	const { id } = useParams()
	const [deleted, setDeleted] = useState(false)

	useEffect(() => {

		authorShow(user, id)
			.then((res) => {
				// console.log("written", res.data.written)
				// console.log(res.data.author)
				setAuthor(res.data.author)
				setWritten(res.data.written)
			})

			.catch((error) => {
				msgAlert({
					heading: "Failure",
					message: "Detail Authors Failure" + error,
					variant: "danger",
				})
			})
	}, [])

	const navigate = useNavigate()

    let allWritten
    let authorName

	if (written === []) {
        allWritten = <>nothing</>
	} else {
		allWritten = written.map((titles) => (
			// console.log(titles.title)
			<Card>
				<h1>{titles.title}</h1>
			</Card>
		))
	}
    if (author === null) {
        authorName = "no such author"
    } else {
        authorName = ` ${author.first_name}  ${author.last_name}`
    }

	const handleDeleteAuthor = () => {
        authorDelete(user, id)
        .then(() => {
            setDeleted(true)
            msgAlert({
                heading: 'Success',
                message: 'Deleting an Author',
                variant: 'success'
            })
            
        })
		.then(() => {navigate('/authors')})
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Deleting an Author Failure' + error,
                variant: 'danger'
            })
        })
    }

	const handleChange = (e) => {
		setAuthor((prevAuthor) => {
			
			const updatedName = e.target.name
			let updatedValue = e.target.value
			
			console.log('this is the updatedName', updatedName)
			console.log('this is the updatedValue', updatedValue)


			const updatedAuthor = { [updatedName]: updatedValue }
			console.log('this is the updatedAuthor', updatedAuthor)
			return { ...prevAuthor, ...updatedAuthor}
			
		})
		console.log('this is author after set', author)
	}

	const handleUpdateAuthor =  (e) => {
		e.preventDefault()
		console.log(author)
		authorUpdate(author, user, author.id)
		
			.then(() => {
				msgAlert({
					heading: 'Success',
					message: 'Updated Author',
					variant: 'success'
				})
			})
			.catch((error) => {
				msgAlert({
					heading: 'Failure',
					message: 'Updated Author' + error,
					variant: 'danger'
				})
			})
	}
console.log(author)
	return (
<>
		<Container className="comic-panel">
            <Link to='/authors'> <Button>Back to All Authors</Button></Link>
			<h1 className="comic-panel-font">
				Titles written by
				{authorName}
			</h1>
			{allWritten}
		</Container>
    <>
			{
				user !== null
				?
					user.staff === true
					?
					<>
						<Container className = "comic-panel">
							<Form size="big">
								<h1 className="comic-panel-font">
									Update Author
								</h1>
								<Form.Input
									required
									fluid
									label="First Name"
									placeholder="First Name"
									onChange={handleChange}
									name="first_name"
									value={author.first_name}
									
								/>
								<Form.Input
									required
									fluid
									label="Last Name"
									placeholder="Last Name"
									onChange={handleChange}
									name="last_name"
									value={author.last_name}
									
								/>
								<Form.Button 
									color="green" 
									onClick={handleUpdateAuthor}
									>Update
								</Form.Button>
							</Form>
						</Container>
						<Container className = "comic-panel">
							<h1 className="comic-panel-font">Delete this Author</h1>
							<Button 
								color="red" 
								onClick={handleDeleteAuthor}
								>Delete Author
							</Button>
						</Container>					
					</>
					:
					null
				:
				null
			}
		</>
        </>
	)
}

export default AuthorDetail
