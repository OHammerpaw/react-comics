import React, { useEffect, useState } from "react";
import { Card, Icon, Image, Container, Button } from "semantic-ui-react";
import { favoritesIllustratorPost } from "../api/favorites";
import { Link } from "react-router-dom";
import { illustratorIndex } from "../api/illustrator";

const IllustratorIndex = ({ user, msgAlert }) => {
  const [allIllustrators, setAllIllustrators] = useState([]);
  const [liked, setLiked] = useState(false);
  console.log(user);

  useEffect(() => {
    illustratorIndex(user)
      .then((res) => {
        setAllIllustrators(res.data.illustrators);
      })
      .catch((error) => {
        msgAlert({
          heading: "Failure",
          message: "Index Illustrators Failure" + error,
          variant: "danger",
        });
      });
  }, []);

  const postFave = (id, user) => {
    // console.log("this is the id", id)
    // console.log("this is the user", user)
    let fav = { favorite_illustrators: id };
    favoritesIllustratorPost(fav, user).catch((error) => {
      msgAlert({
        heading: "Failure",
        message: "favorite Author Failure" + error,
        variant: "danger",
      });
    });
  };

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

  const IllustratorCards = allIllustrators.map((Illustrator) => (
    <Card>
      <Image src={Illustrator.cover} wrapped ui={false} />
      <Card.Content>
        <Card.Header>
          {Illustrator.first_name} {Illustrator.last_name}
        </Card.Header>
      </Card.Content>

      {/* extra content for the bottom to link to just that line of illustrators or something */}
      {/* Maybe we should have a main character listed so we can say "Iron man appears in 'x' other issues" */}
      {/* <Card.Content extra>
                <a>
                    <Icon name='user' />
                    {Illustrator.name} appears in {Illustrator.editions} editions
                </a>
            </Card.Content> */}
      <Card.Content>
        <div className="ui two buttons">
          <Button.Group>
            <Button icon link onClick={() => postFave(Illustrator.id, user)}>
              {heart}
            </Button>
            <Link to={`/illustrators/${Illustrator.id}`}>
              <Button primary>View Illustrator</Button>
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
      <h1 className="index-header">Illustrators</h1>
      <Container className="comic-panel">
        <Card.Group >{IllustratorCards}</Card.Group>
      </Container>
    </>
  );
};

export default IllustratorIndex;
