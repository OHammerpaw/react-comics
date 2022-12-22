import React from "react"
import { Container, Grid, GridColumn } from "semantic-ui-react"
import { Navigate, Link } from "react-router-dom"

const Discover = () => {
	return (
		<>
			<Container className="comic-panel">
				<h1 className="comic-panel-font" id="center">Discover</h1>
				<Grid>
					<Grid.Row columns={3} id="center">
						<Grid.Column>
                        	<Link to='/comics' className="comic-panel-link">All Comics</Link>
						</Grid.Column>
						<Grid.Column>
                        	<Link to='/characters' className="comic-panel-link">Characters</Link>
						</Grid.Column>
						<Grid.Column>
                        	<Link to='/publishers' className="comic-panel-link">Publishers</Link>
						</Grid.Column>

					</Grid.Row>

                    <Grid.Row columns={3} id="center">
						<Grid.Column >
							<Link to='/authors' className="comic-panel-link">Authors</Link>
						</Grid.Column>
						<Grid.Column>
							<Link to='/illustrators' className="comic-panel-link">Illustrators</Link>
						</Grid.Column>
						<Grid.Column></Grid.Column>
					</Grid.Row>
				</Grid>
			</Container>
		</>
	)
}

export default Discover
