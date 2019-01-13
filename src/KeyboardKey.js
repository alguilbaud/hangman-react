import React from 'react'
import PropTypes from 'prop-types'

import './KeyboardKey.css'

const SELECTED = ' selected'

// Composant représentant une touche du clavier du jeu
const KeyboardKey = ( {letter, isSelected, onClick }) => (
    <div className={`key${isSelected ? SELECTED : ""}`} onClick={() => onClick(letter)}>
        {letter}
    </div>
)

KeyboardKey.propTypes = {
    letter: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
}

export default KeyboardKey