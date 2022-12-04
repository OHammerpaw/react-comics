import React, { useEffect, useState } from "react";
import { Card, Icon, Image, Container, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { publisherIndex } from "../api/publisher";
import { favoritesPublisherPost } from "../api/favorites";

const PublisherIndex = ({ user, msgAlert }) => {
  const [allPublishers, setAllPublishers] = useState([]);
  const [liked, setLiked] = useState(false);
  console.log(user);

  useEffect(() => {
    publisherIndex(user)
      .then((res) => {
        setAllPublishers(res.data.publishers);
      })
      .catch((error) => {
        msgAlert({
          heading: "Failure",
          message: "Index Publishers Failure" + error,
          variant: "danger",
        });
      });
  }, []);

  const postFave = (id, user) => {
	// console.log("this is the id", id)
	// console.log("this is the user", user)
	let fav = { favorite_publishers: id }
	favoritesPublisherPost(fav, user).catch((error) => {
		msgAlert({
			heading: "Failure",
			message: "favorite Author Failure" + error,
			variant: "danger",
		})
	})
}
  const handleLike = () => {
    setLiked(true);
    console.log("liked");
  };
  let heart;

  if (liked === true) {
    heart = <Icon className="heart"></Icon>;
  } else {
    heart = <Icon className="heart outline"></Icon>;
  }

  const PublisherCards = allPublishers.map((Publisher) => (
    <Card>
      <Image src={Publisher.cover} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{Publisher.publisher_name}</Card.Header>
      </Card.Content>

      {/* extra content for the bottom to link to just that line of publishers or something */}
      {/* Maybe we should have a main character listed so we can say "Iron man appears in 'x' other issues" */}
      {/* <Card.Content extra>
                <a>
                    <Icon name='user' />
                    {Publisher.name} appears in {Publisher.editions} editions
                </a>
            </Card.Content> */}
      <Card.Content>
        <div className="ui two buttons">
          <Button.Group>
            <Button icon link onClick={() => postFave(Publisher.id, user)}>
              {heart}
            </Button>
            <Link to={`/publishers/${Publisher.id}`}>
              <Button primary>View Publisher</Button>
            </Link>
          </Button.Group>
        </div>
      </Card.Content>
    </Card>
  ));

  return (
    <>
      <Link to="/discover">
        <Button color="orange" className="back-button">
          <i class="left arrow icon"></i>
          Back to Discover
        </Button>
      </Link>
      <h1 className="index-header">Publishers</h1>
      <Container className="comic-panel">
        <Card.Group centered>{PublisherCards}</Card.Group>
      </Container>
    </>
  );
};

export default PublisherIndex;
