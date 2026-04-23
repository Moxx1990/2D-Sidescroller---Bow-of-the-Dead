/**
 * Represents the state of user inputs from the keyboard or touch controls.
 * This class acts as a data structure to store boolean flags for specific actions.
 */
class Keyboard {

/** @type {boolean} State of the move-left action (e.g., Left Arrow or touch button). */
    left = false;
    /** @type {boolean} State of the move-right action (e.g., Right Arrow or touch button). */
    right = false;
    /** @type {boolean} State of the jump action (e.g., Up Arrow or touch button). */
    up = false;
    /** @type {boolean} State of the crouch/down action (e.g., Down Arrow). */
    down = false;
    /** @type {boolean} State of the shoot/action key (e.g., Space Bar or touch button). */
    space = false;

    /**
     * Creates an instance of the Keyboard class.
     * All input states are initialized to false by default.
     */
    constructor() {
    }

}