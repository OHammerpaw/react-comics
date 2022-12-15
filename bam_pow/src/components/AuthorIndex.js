import React, { useEffect, useState } from "react";
import { Card, Icon, Image, Container, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { authorIndex } from "../api/author";
import { favoritesAuthorPost } from "../api/favorites";

const AuthorIndex = ({ user, msgAlert }) => {
  const [allAuthors, setAllAuthors] = useState([]);
  const [liked, setLiked] = useState(false);
  const [allFavorites, setAllFavorites] = useState([]);
  console.log("user in author index", user);

  useEffect(() => {
    authorIndex(user)
      .then((res) => {
        setAllAuthors(res.data.authors);
        console.log(res.data);
      })
      .catch((error) => {
        msgAlert({
          heading: "Failure",
          message: "Index Authors Failure" + error,
          variant: "danger",
        });
      });
  }, []);

  const postFave = (id, user) => {
    // console.log("this is the id", id)
    // console.log("this is the user", user)
    let fav = { favorite_authors: id };
    favoritesAuthorPost(fav, user).catch((error) => {
      msgAlert({
        heading: "Failure",
        message: "favorite Author Failure" + error,
        variant: "danger",
      });
    });
  };

  // console.log("mapped",favorited.favorite_authors)

  const handleLike = () => {
    // setLiked(true)
    console.log("liked");
  };
  let heart;

  if (liked === true) {
    heart = <Icon className="heart"></Icon>;
  } else {
    heart = <Icon className="heart outline"></Icon>;
  }

  /// set like function for the heart handle like posts

  const AuthorCards = allAuthors.map((Author) => (
    <Card center>
      <Image src={Author.cover} wrapped ui={false} />
      <Card.Content>
        <Card.Header>
          {Author.first_name} {Author.last_name}
        </Card.Header>
        <Card.Description></Card.Description>
      </Card.Content>
      <Card.Content>
        <div className="ui two buttons">
          <Button.Group>
            <Button icon link onClick={() => postFave(Author.id, user)}>
              {/* setLiked */}
              {heart}
            </Button>
            <Link to={`/authors/${Author.id}`}>
              <Button primary>View author</Button>
            </Link>
          </Button.Group>
        </div>
      </Card.Content>

      {/* extra content for the bottom to link to just that line of authors or something */}
      {/* Maybe we should have a main character listed so we can say "Iron man appears in 'x' other issues" */}
      {/* <Card.Content extra>
                <a>
                    <Icon name='user' />
                    {Author.name} appears in {Author.editions} editions
                </a>
            </Card.Content> */}
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
      <h1 className="index-header">Authors</h1>
      <Container className="comic-panel">
        <Card.Group 
          centered
          stackable
          itemsPerRow={5} 
          >
            {AuthorCards}
        </Card.Group>
      </Container>
    </>
  );
};

export default AuthorIndex;
