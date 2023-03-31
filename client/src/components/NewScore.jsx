import React, { useState, useReducer } from "react";
import { Form, Button, Modal } from "semantic-ui-react";

const initialState = {
  gamertag: "",
  score: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "editGamertag":
      return { ...state, gamertag: action.value };

    case "editScore":
      return { ...state, score: action.value };

    case "wipe":
      return { ...initialState };

    default:
      return state;
  }
}

const NewScore = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = state;
      const response = await fetch("http://localhost:8080/api/scoreboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      dispatch({ type: "wipe", value: { initialState } });
      window.location = "/";
    } catch (error) {
      console.log(error.message);
    }
  };

  state.score=props.newScore
  //   const [showModal, setShowModal] = useState(false);

  return (

    <Modal
      onClose={() => props.setShowModal(false)}
      onOpen={() => props.setShowModal(true)}
      open={props.showModal}
      size="mini"
    >
      <Modal.Content>
        <Modal.Header as="h2">Good Game! Add your socre!</Modal.Header>
      </Modal.Content>
      <Modal.Content>
        <Form
          id="userSubmission"
          action="#userSubmission"
          onSubmit={onSubmitForm}
        >
          <Form.Input
            required
            label="Gamertag"
            type="text"
            value={state.gamertag}
            onChange={(e) => {
              dispatch({ type: "editGamertag", value: e.target.value });
            }}
          />
          <Form.Input
            label="Score"
            type="text"
            value={state.score}
            readOnly
          />
        <br />
        <Button fluid type='submit' color="blue" id="submitScore">
          Submit
        </Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default NewScore;
