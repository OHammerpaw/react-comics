import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authorCreate } from '../api/author.js'
import AuthorForm from './shared/AuthorForm'

const AuthorCreate = ({user, msgAlert}) => {
	
	const navigate = useNavigate()
	const defaultAuthor ={
		first_name:'',
		last_name:'',
	}
	const [author, setAuthor] = useState(defaultAuthor)
	
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
	
		const handleCreateAuthor =  (e) => {
			e.preventDefault()
			console.log(author)
			authorCreate(author, user)
			
				.then(() => {
					msgAlert({
						heading: 'Success',
						message: 'Created Author',
						variant: 'success'
					})
				})
				.catch((error) => {
					msgAlert({
						heading: 'Failure',
						message: 'Create Author' + error,
						variant: 'danger'
					})
				})
		}
	return (
		<AuthorForm
			author={author}
			handleChange = {handleChange}
			handleSubmit={handleCreateAuthor}
			heading='Create an Author'
	/>
)
    
}

export default AuthorCreate