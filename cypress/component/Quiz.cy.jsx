import React from 'react';
import Quiz from '../../client/src/components/Quiz';

const mockQuestions = [
  {
    question: 'What is 2 + 2?',
    answers: [
      { text: '3', isCorrect: false },
      { text: '4', isCorrect: true },
    ],
  },
  {
    question: 'What is the capital of France?',
    answers: [
      { text: 'Berlin', isCorrect: false },
      { text: 'Paris', isCorrect: true },
    ],
  },
];

describe('<Quiz />', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/questions/random', { body: mockQuestions }).as('getQuestions');
  });

  it('should render the Quiz component', () => {
    cy.mount(<Quiz />);
    cy.get('button').should('have.text', 'Start Quiz');
  });

  it('should start the quiz and display questions on button click', () => {
    cy.mount(<Quiz />);

    // Click the "Start Quiz" button
    cy.get('button').click();

    // Assert that the first question is displayed
    cy.get('h2').should('have.text', 'What is 2 + 2?');

    // Assert that two answer buttons are rendered
    cy.get('button').should('have.length', 2);
  });

  it('should display the next question after answering', () => {
    cy.mount(<Quiz />);
    // Starts the quiz
    cy.get('button').click();

    // Checks the first button value and answer
    cy.get('button').contains('1').should('have.text', '1');
    cy.get(':nth-child(1) > .alert').should('have.text', '3');

    // Checks the second button value and answer
    cy.get('button').contains('2').should('have.text', '2');
    cy.get(':nth-child(2) > .alert').should('have.text', '4');

    // Clicks the second button which is the correct answer of 4.
    cy.get('button').contains('2').click();

    // Asserts that the next question is displayed
    cy.get('h2').should('have.text', 'What is the capital of France?');
  });

  it('should display the completion screen after all questions are answered', () => {
    //Starts the quiz
    cy.mount(<Quiz />);
    cy.get('button').click();

    // Checks the first button exist and answer matches
    cy.get('button').contains('1').should('exist', '1');
    cy.get(':nth-child(1) > .alert').should('have.text', '3');

    // Checks the second button exists and answer matches
    cy.get('button').contains('2').should('exist');
    cy.get(':nth-child(2) > .alert').should('have.text', '4');

    // Clicks the second button which is the correct answer of 4.
    cy.get('button').contains('2').click();

    // Asserts that the next question is displayed
    cy.get('h2').should('have.text', 'What is the capital of France?');


    // Checks the first button exist and answer
    cy.get('button').contains('1').should('exist');
    cy.get(':nth-child(1) > .alert').should('have.text', 'Berlin');

    // Checks the second button exists and answer
    cy.get('button').contains('2').should('have.text', '2');
    cy.get(':nth-child(2) > .alert').should('have.text', 'Paris');

    // Clicks the second button which is the correct answer of Paris.
    cy.get('button').contains('2').click();

    // Asserts that the quiz is completed
    cy.get('h2').should('have.text', 'Quiz Completed');
    cy.get('.alert').should('have.text', 'Your score: 2/2');
    cy.get('button').contains('Take New Quiz').should('exist');

    // Start new quiz and verify questions are displayed
    cy.get('button').click();
    cy.get('h2').should('have.text', 'What is 2 + 2?');
  });

  it('should start a new quiz after first quiz completion', () => {
    //Starts the quiz
    cy.mount(<Quiz />);
    cy.get('button').click();

    // Checks the first button exist and answer matches
    cy.get('button').contains('1').should('exist', '1');
    cy.get(':nth-child(1) > .alert').should('have.text', '3');

    // Checks the second button exists and answer matches
    cy.get('button').contains('2').should('exist');
    cy.get(':nth-child(2) > .alert').should('have.text', '4');

    // Clicks the second button which is the correct answer of 4.
    cy.get('button').contains('2').click();

    // Asserts that the next question is displayed
    cy.get('h2').should('have.text', 'What is the capital of France?');


    // Checks the first button exist and answer
    cy.get('button').contains('1').should('exist');
    cy.get(':nth-child(1) > .alert').should('have.text', 'Berlin');

    // Checks the second button exists and answer
    cy.get('button').contains('2').should('have.text', '2');
    cy.get(':nth-child(2) > .alert').should('have.text', 'Paris');

    // Clicks the second button which is the correct answer of Paris.
    cy.get('button').contains('2').click();

    // Asserts that the quiz is completed
    cy.get('h2').should('have.text', 'Quiz Completed');
    cy.get('.alert').should('have.text', 'Your score: 2/2');
    cy.get('button').contains('Take New Quiz').should('exist');

    // Start new quiz and verify questions are displayed
    cy.get('button').click();
    cy.get('h2').should('have.text', 'What is 2 + 2?');
  });
});