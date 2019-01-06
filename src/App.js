import React, { Component } from 'react';
import './App.css';
import diacritics from 'diacritics';
import KeyboardKey from './KeyboardKey';

const WORDS = ["adresse", "appartement", "ascenseur", "balcon", "boucherie", "boulanger", "boulangerie", "boutique", "bus", "caniveau", "caravane", "carrefour", "cave", "charcuterie", "cinéma", "cirque", "cloche", "clocher", "clown", "coiffeur", "courrier", "croix", "église", "embouteillage", "endroit", "enveloppe", "essence", "facteur", "fleuriste", "foire", "hôpital", "hôtel", "immeuble", "incendie", "laisse", "magasin", "manège", "médicament", "moineau", "monde", "monument", "ouvrier", "palais", "panneau", "paquet", "parc", "passage", "pharmacie", "pharmacien", "piscine", "place", "police", "policier", "pompier", "poste", "promenade", "quartier", "square", "timbre", "travaux", "usine", "village", "ville", "voisin", "volet"]
const ASCII_CODE_A = 65;

class App extends Component {
  state = {
    alphabet: this.generateAlphabet(),
    currentWord: this.selectWord(),
    selectedLetters: new Set(),
    displayedWord: null
  }

  // Génère un tableau contenant l'alphabet de A à Z
  generateAlphabet() {
    const alphabet = []
    for (var i = 0 ; i < 26 ; i++) {
      alphabet.push(String.fromCharCode(ASCII_CODE_A + i))
    }
    return alphabet
  }

  // Sélectionne un mot au hasard et le retoune sans accents et en majuscules
  selectWord() {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    return diacritics.remove(randomWord).toUpperCase();
  }

  // Produit une représentation textuelle de l’état de la partie,
  // chaque lettre non découverte étant représentée par un _underscore_.
  // (CSS assurera de l’espacement entre les lettres pour mieux
  // visualiser le tout).
  computeDisplay(phrase, usedLetters) {
    return phrase.replace(/\w/g,
      (letter) => (usedLetters.has(letter) ? letter : ' _ ')
    )
  }

  isLetterSelected(letter, usedLetters) {
    return usedLetters.has(letter)
  }

  // Binding fleché
  handleKeyClick = letter => {
    const {selectedLetters, currentWord} = this.state
    if (!this.isLetterSelected(letter, selectedLetters)) {
      // La lettre n'a pas déjà été sélectionnée
      selectedLetters.add(letter)
      this.setState({displayedWord : this.computeDisplay(currentWord, selectedLetters)})
    }
    console.log(letter, selectedLetters)
  }

  render() {
    const { alphabet, currentWord, selectedLetters, displayedWord } = this.state
    return (
      <div className="hangman">
        <div className="word">
          {displayedWord == null ? this.computeDisplay(currentWord, selectedLetters) : displayedWord}
        </div>
        <div className="keyboard">
          {alphabet.map((letter, index) => (
            <KeyboardKey 
              letter={letter}
              isSelected={this.isLetterSelected(letter, selectedLetters)}
              onClick={this.handleKeyClick}
            />
          ))}

        </div>
      </div>
    );
  }
}

export default App;
