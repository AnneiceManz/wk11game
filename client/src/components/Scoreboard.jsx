import React, { useState, useEffect } from "react";
import { Icon, Grid, Header } from "semantic-ui-react";
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

  const deleteScore = (scores) => {
    return fetch(`http://localhost:8080/api/scoreboard/${scores.player_id}`, {
      method: "DELETE",
    }).then((response) => {
      //console.log(response);
      if (response.ok) {
        loadScores();
      }
    });
  };

  return (
    <div className="scoreboardDiv">
      <Header className="scoreheader">Scoreboard</Header>
      <Grid celled='internally' columns={3} centered>
        {scores.map((score) => {
          return (
            <Grid.Row key={score.player_id}>
              <Grid.Column width={2}>
                <Icon
                circular
                inverted
                  name="gamepad"
                  color="yellow"
                />
              </Grid.Column>
              <Grid.Column width={9} textAlign='center'>
                Gamer: <span>{score.gamertag}</span> | Score:{" "}
                <span> {score.score}</span>
              </Grid.Column>
              <Grid.Column width={2}>
                <Icon
                  circular
                  inverted
                  color="blue"
                  name="erase"
                  size="small"
                  onClick={() => {
                    deleteScore(score);
                  }}
                />
              </Grid.Column>
            </Grid.Row>
          );
        })}
      </Grid>
    </div>
  );
};

export default Scoreboard;
