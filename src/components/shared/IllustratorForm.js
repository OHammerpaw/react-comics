import React from 'react'
import {Form, Container} from 'semantic-ui-react'


const IllustratorForm = ({user, msgAlert, heading, illustrator, handleChange, handleSubmit}) => {
	
	
	return (
	<Container>
		<div className="comic-panel">
			<Form size="big">
				<h1 className="comic-panel-font">
					{heading}
				</h1>
				<Form.Input
					required
					fluid
					label="First Name"
					placeholder="First Name"
					onChange={handleChange}
					name="first_name"
					value={illustrator.first_name}
					
				/>
				<Form.Input
					required
					fluid
					label="Last Name"
					placeholder="Last Name"
					onChange={handleChange}
					name="last_name"
					value={illustrator.last_name}
					
				/>
				<Form.Button onClick={handleSubmit}>Add</Form.Button>
			</Form>
		</div>
	</Container>
)
    
}

export default IllustratorForm