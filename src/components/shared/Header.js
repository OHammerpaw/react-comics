import React, { Fragment } from "react"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { NavDropdown } from "react-bootstrap"
import { Link } from "react-router-dom"
import { library } from "@fortawesome/fontawesome-svg-core"

const linkStyle = {
	color: "white",
	textDecoration: "none",
}
const authenticatedOptions = (
	<>
		<Nav.Link>
			<Link to="/discover" style={linkStyle}>
				Discover
			</Link>
		</Nav.Link>
		<Nav.Link>
			<Link to="/mypage" style={linkStyle}>
				My Page
			</Link>
		</Nav.Link>

		<NavDropdown
			bg="dark"
			title={<i class="plus circle icon"></i>}
			menuVariant="dark"
		>
			<NavDropdown.Item>
				<Nav.Link>
					<Link to="/add-comic" style={linkStyle}>
						Add Comic
					</Link>
				</Nav.Link>
			</NavDropdown.Item>
			<NavDropdown.Item>
				<Nav.Link>
					<Link to="/add-author" style={linkStyle}>
						Add Author
					</Link>
				</Nav.Link>
			</NavDropdown.Item>
			<NavDropdown.Item>
				<Nav.Link>
					<Link to="/add-character" style={linkStyle}>
						Add Character
					</Link>
				</Nav.Link>
			</NavDropdown.Item>
			<NavDropdown.Item>
				<Nav.Link>
					<Link to="/add-illustrator" style={linkStyle}>
						Add Illustrator
					</Link>
				</Nav.Link>
			</NavDropdown.Item>
			<NavDropdown.Item>
				<Nav.Link>
					<Link to="/add-publisher" style={linkStyle}>
						Add Publisher
					</Link>
				</Nav.Link>
			</NavDropdown.Item>
		</NavDropdown>

		<NavDropdown
			bg="dark"
			title={<i class="user icon"></i>}
			menuVariant="dark"
		>
			<NavDropdown.Item>
				<Nav.Link>
					<Link to="change-password" style={linkStyle}>
						Change Password
					</Link>
				</Nav.Link>
			</NavDropdown.Item>
			<NavDropdown.Item>
				<Nav.Link>
					<Link to="sign-out" style={linkStyle}>
						Sign Out
					</Link>
				</Nav.Link>
			</NavDropdown.Item>
		</NavDropdown>
	</>
)

const unauthenticatedOptions = (
	<>
		<Nav.Link>
			<Link to="sign-up" style={linkStyle}>
				Sign Up
			</Link>
		</Nav.Link>
		<Nav.Link>
			<Link to="sign-in" style={linkStyle}>
				Sign In
			</Link>
		</Nav.Link>
	</>
)

const alwaysOptions = <></>

const Header = ({ user }) => (
	<Navbar bg="dark" variant="dark" expand="md">
		<Navbar.Brand>
			<Link to={user ? "/mypage" : "/"} style={linkStyle}>
				<div className="comic">Bam Pow</div>
			</Link>
		</Navbar.Brand>
		<Navbar.Toggle aria-controls="basic-navbar-nav" />
		<Navbar.Collapse id="basic-navbar-nav">
			<Nav className="ml-auto">
				{user && (
					<span className="navbar-text mr-2">
						Welcome, {user.email}
					</span>
				)}
				{user ? authenticatedOptions : unauthenticatedOptions}
				{alwaysOptions}
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)

export default Header
