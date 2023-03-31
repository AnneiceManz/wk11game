import React, { useState, useEffect } from "react";
import { List, Card, Image } from "semantic-ui-react";
import IMAGES from "./images";

const Scoreboard = () => {
  const [scores, setScores] = useState([]);

  const loadScores = () => {
    // A function to fetch the list of students that will be load anytime that list change
    fetch("http://localhost:8080/api/scoreboard")
      .then((response) => response.json())
      .then((scores) => {
        setScores(scores);
      });
  };

  useEffect(() => {
    loadScores();
  }, [scores]);

  return (
    <Card color="blue" centered>
      <Card.Content>
        <Card.Header className="scoreheader">Scoreboard</Card.Header>
      </Card.Content>
      <Card.Content>
        <List divided relaxed='very'>
          {scores.map((score) => {
            return (
              <List.Item>
                <Image avatar src={IMAGES.rosegem} />
                <List.Content>
                  <List.Header key={score.player_id}>
                    Gamer: <span>{score.gamertag}</span>
                    <br />
                    Score: <span> {score.score}</span>
                  </List.Header>
                </List.Content>
              </List.Item>
            );
          })}
        </List>
      </Card.Content>
    </Card>
  );
};

export default Scoreboard;
