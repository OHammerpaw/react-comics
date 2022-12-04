import logo from "../imgs/bampowlogo.png"
import { Button } from "semantic-ui-react"
import { Link } from "react-router-dom"

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log("props in home", props)

	return (
		<div
			className="home"

		>
			<div className="home-content">
				<p className="center">Welcome to</p>
				<img className="logo" src={logo} />
			<p className="center">Your comic inventory</p>
			</div>
			<div className="home-buttons">
				<Link to="/sign-in">
					<Button primary>Sign In</Button>
				</Link>
				<Link to="/sign-up">
					<Button secondary>Sign Up</Button>
				</Link>
			</div>
		</div>
	)
}

export default Home
