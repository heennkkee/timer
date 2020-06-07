import React from 'react';
import './App.css';

interface Exercise {
  title: string,
  icon: string
}

const Exercises = {
  SQUATS: {
    title: 'Squats',
    icon: ''
  },
  RYGGLYFT: {
    title: 'Rygglyft',
    icon: ''
  },
  SITUPS: {
    title: 'Sit-ups',
    icon: ''
  },
  BURPEES: {
    title: 'Burpees',
    icon: ''
  },
  PLANKAN: {
    title: 'Plankan',
    icon: ''
  },
  HANTELRODD: {
    title: 'Hantelrodd',
    icon: ''
  }
}

interface AppState {
  laps: number,
  activeTime: number,
  pause: number,
  exercies: Exercise[],
  currState: AppStates
}

type AppProps = {

}

enum AppStates {
  STARTPAGE,
  ADD_EXERCISE,
  RUNNING,
  PAUSED
}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    const defEx = [
      { icon: 'SQUAT', title: 'Squats' }
    ]

    this.state = {
      laps: 3,
      pause: 15,
      activeTime: 45,
      exercies: defEx,
      currState: AppStates.STARTPAGE
    }
  }

  renderAddExercisesList() {
    let ret = (
      <div className="exercise-list">
        {
          this.state.exercies.map((exercise, index) => 
          <div className="exercise-list-row" key={index}>
            {exercise.title} <i className="fas fa-minus pointer" onClick={() => this.removeExercise(index)}></i>
          </div>)
        }
        <div key="add-exercise" className="exercise-list-row pointer" onClick={() => this.setState({ currState: AppStates.ADD_EXERCISE })}>
          Add exercise <i className="fas fa-plus"></i>
        </div>
      </div>
    )

    return ret;
  }

  removeExercise(removeIndex: number) {
    const list = this.state.exercies.filter((exercise, index) => (index !== removeIndex));
    this.setState({ exercies: list });
  }

  addExercise(exercise: Exercise) {
    const items = this.state.exercies.concat(exercise);
    this.setState({exercies: items, currState: AppStates.STARTPAGE });
  }

  renderAllExercises() {
    return (
      <div className="all-exercises">
        {
          Object.values(Exercises).map(
            (exercise, index) => {
              return (
              <div className="add-exercise-card" key={index} onClick={() => this.addExercise(exercise)}>
                {exercise.title}
              </div>
              );
            }
          )
        }
      </div>
    )
  }

  render() {
    let exerciseList;

    switch (this.state.currState) {
      case AppStates.STARTPAGE:
        exerciseList = this.renderAddExercisesList();
        return (
          <div className="wrapper">
            <div className="input_wrapper">
              <div className="input_button left" onClick={() => this.setState({ laps: Math.max(0, this.state.laps - 1) })}><i className="fas fa-minus"></i></div>
              <div className="input">
                <span>Laps</span><input id="laps" type="number" value={this.state.laps} />
              </div>
              <div className="input_button right" onClick={() => this.setState({ laps: this.state.laps + 1 })}><i className="fas fa-plus"></i></div>
            </div>
            <div className="input_wrapper">
              <div className="input_button left" onClick={() => this.setState({ activeTime: Math.max(0, this.state.activeTime - 5) })}><i className="fas fa-minus"></i></div>
              <div className="input">
                <span>Active (s)</span><input id="activeTime" type="number" value={this.state.activeTime} />
              </div>
              <div className="input_button right" onClick={() => this.setState({ activeTime: this.state.activeTime + 5 })}><i className="fas fa-plus"></i></div>
            </div>
            <div className="input_wrapper">
              <div className="input_button left" onClick={() => this.setState({ pause: Math.max(0, this.state.pause - 5) })}><i className="fas fa-minus"></i></div>
              <div className="input">
                <span>Pause (s)</span><input id="pauseTime" type="number" value={this.state.pause} />
              </div>
              <div className="input_button right" onClick={() => this.setState({ pause: this.state.pause + 5 })}><i className="fas fa-plus"></i></div>
            </div>
            {exerciseList}
          </div>
        );
      case AppStates.ADD_EXERCISE:
        exerciseList = this.renderAllExercises();
        return (
          <div className="wrapper">
            <div className="top-bar">
              Add an exercise
              <span className="pointer" onClick={() => { this.setState({currState: AppStates.STARTPAGE })}}>Cancel <i className="fas fa-times"></i></span>
            </div>
            {exerciseList}
          </div>
        );
    }
  }
}
