import React, { Component } from "react";
import CharacterCard from "./components/CharacterCard";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import characters from "./characters.json";
import "./App.css";

class App extends Component {
  // Setting this.state.characters to the characters json array
  state = {
    characters,
    score: 0,
    highscore: 0
  };

  gameOver = () => {
    if (this.state.score > this.state.highscore) {
      this.setState({highscore: this.state.score}, function() {
        console.log(this.state.highscore);
      });
    }
    this.state.characters.forEach(characters => {
      characters.isClicked = 0;
    });
    alert(`Game Over :( \nscore: ${this.state.score}`);
    this.setState({score: 0});
    return true;
  }

  clickCount = id => {
    this.state.characters.find((o, i) => {
      if (o.id === id) {
        if(!characters[i].isClicked){
          characters[i].isClicked = characters[i].isClicked + 1;
          this.setState({score : this.state.score + 1}, function(){
            if(this.state.score === 15){
              alert(`You won the game :( \nscore: ${this.state.score}`);
              this.setState({score: 0});
            }
            console.log(this.state.score);
          });
          this.state.characters.sort(() => Math.random() - 0.5)
          return true; 
        } else {
          this.gameOver();
        }
      }
      return false;
    });
  }

  // Map over this.state.characters and render a CharacterCard component for each card object
  render() {
    return (
      <Wrapper>
        <Header score={this.state.score} highscore={this.state.highscore}>Clicky Game</Header>
        {this.state.characters.map(character => (
          <CharacterCard
            clickCount={this.clickCount}
            id={character.id}
            key={character.id}
            image={character.image}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
