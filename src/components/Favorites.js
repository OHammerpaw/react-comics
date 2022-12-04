import React, { useEffect, useState } from "react";
import { Card, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { favoritesIndex } from "../api/favorites";


const Favorites = ({ user, msgAlert }) => {
  const [favorites, setFavorites] = useState(null);

  useEffect(() => {
    favoritesIndex(user)
      .then((res) => {
        setFavorites(res.data.users[0]);
      })
      .catch((error) => {
        msgAlert({
          heading: "Failure",
          message: "Index Favorites Failure" + error,
          variant: "danger",
        });
      });
  }, []);
  console.log("this is favorites in favorites", favorites);

  if (!favorites) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1 className="comic-panel-font" textAlign="center">
        My Favorites
      </h1>
      
        <Grid.Row columns={2}>
          <Card.Group>
            <Card centered>
              <Card.Header className="comic-panel-link"> Authors</Card.Header>
              <Card.Content>
                {favorites.favorite_authors.map((author) => (
					<Link to={`/authors/${author.id}`}>
                  <h2>{author.first_name} {author.last_name}</h2>
				  </Link>
                ))}
              </Card.Content>
            </Card>
            <Card centered>
              <Card.Header className="comic-panel-link"> Characters</Card.Header>
              <Card.Content>
                {favorites.favorite_characters.map((character) => (
                  <Link to={`/characters/${character.id}`}>
				  <h2>{character.alias}</h2>
				  </Link>
                ))}
              </Card.Content>
            </Card>
			<Card centered>
              <Card.Header className="comic-panel-link"> illustrators </Card.Header>
              <Card.Content>
			  {favorites.favorite_illustrators.map((illustrator) => (
					<Link to={`/illustrators/${illustrator.id}`}>
                  <h2>{illustrator.first_name} {illustrator.last_name}</h2>
				  </Link>
                ))}
              </Card.Content>
            </Card>
			<Card centered>
              <Card.Header className="comic-panel-link"> Publishers </Card.Header>
              <Card.Content>
              {favorites.favorite_publishers.map((publisher) => (
					<Link to={`/publishers/${publisher.id}`}>
                  <h2>{publisher.publisher_name}</h2>
				  </Link>
                ))}
              </Card.Content>
            </Card>
          </Card.Group>
        </Grid.Row>
      
    </>
  );
};

export default Favorites;
