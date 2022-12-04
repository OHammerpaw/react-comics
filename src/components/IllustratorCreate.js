import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {illustratorCreate} from '../api/illustrator'
import IllustratorForm from './shared/IllustratorForm'

const AuthorCreate = ({user, msgAlert}) => {
	
	const navigate = useNavigate()
	const defaultIllustrator ={
		first_name:'',
		last_name:'',
	}
	const [illustrator, setIllustrator] = useState(defaultIllustrator)
	
	const handleChange = (e) => {
		setIllustrator((prevIllustrator) => {
			
			const updatedName = e.target.name
			let updatedValue = e.target.value
			
			console.log('this is the updatedName', updatedName)
			console.log('this is the updatedValue', updatedValue)


			const updatedIllustrator = { [updatedName]: updatedValue }
			console.log('this is the updatedIllustrator', updatedIllustrator)
			return { ...prevIllustrator, ...updatedIllustrator}
			
		})
		console.log('this is author after set', illustrator)
	}
	
		const handleCreateIllustrator =  (e) => {
			e.preventDefault()
			console.log(illustrator)
			illustratorCreate(illustrator, user)
			
				.then(() => {
					msgAlert({
						heading: 'Success',
						message: 'Created Illustrator',
						variant: 'success'
					})
				})
				.catch((error) => {
					msgAlert({
						heading: 'Failure',
						message: 'Create Illustrator' + error,
						variant: 'danger'
					})
				})
		}
	return (
		<IllustratorForm
			illustrator = {illustrator}
			handleChange = {handleChange}
			handleSubmit={handleCreateIllustrator}
			heading='Create an Illustrator'
	/>
)
    
}

export default AuthorCreate