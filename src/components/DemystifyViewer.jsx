import React from 'react';
import NavSwitcher from './NavSwitcher';
import Board from './Board';
import TentsBoard from './PuzzleBoards/TentsBoard';
import FileLoader from './FileLoader';

import { Container, Row, Col, Card } from 'react-bootstrap';
import Explanations from './Explanations';

class DemystifyViewer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputObject: [],
      currentStep: 0,
      highlightedLiterals: -1,
      highlightedExplanations: [],
      type: "",
    }
  }

  highlightLiteral(val) {
    this.setState((prev) => { return {highlightedLiterals: prev.highlightedLiterals === val ? -1 : val}});
  }

  highlightExplanation(val) {

    this.setState((prev) => { return {highlightedExplanations: JSON.stringify(prev.highlightedExplanations)==JSON.stringify(val) ? [] : val}});
  }

  setInput(obj) {
    this.setState({ inputObject: obj.steps, type: obj.name, params: obj.params })
  }

  setCurrentStep(step) {
    this.setState({ currentStep: step });
  }

  render = () => {
    console.log(this.state)
    return (
      <Container fluid>
        {this.state.inputObject.length === 0 && <FileLoader setInput={this.setInput.bind(this)} />}
        {this.state.inputObject.length !== 0 && <NavSwitcher setCurrentStep={this.setCurrentStep.bind(this)} maxSteps={this.state.inputObject.length - 1} />}

        {this.state.inputObject.length !== 0 &&
          <Row className="mb-4">
            <Col xs={12} md={8} lg={8} xl={6}>
              <TentsBoard
                params={this.state.params}
                highlight={this.highlightExplanation.bind(this)} 
                key={this.state.highlightedLiterals} 
                highlighted={this.state.highlightedLiterals} 
                rows={this.state.inputObject[this.state.currentStep].puzzleState.matrices[0].rows} /></Col>
            <Col>
              {this.state.inputObject[this.state.currentStep].skippedDeductions && 
                <Card className="mt-3">
                  <Card.Body>
                    <small>Skipped some obvious deductions.</small>
                  </Card.Body>
                </Card>
                }
              <Explanations 
                highlight={this.highlightLiteral.bind(this)} 
                simpleDeductions={this.state.inputObject[this.state.currentStep].simpleDeductions} 
                deductions={this.state.inputObject[this.state.currentStep].deductions}
                highlighted={this.state.highlightedExplanations} /></Col>
          </Row>

        }
      </Container>
    )
  }
}

export default DemystifyViewer
