import React from "react"
import "./App.css"
import Fuzzle from "./animations/Fuzzle"
import animationStyles from "./animation-stage.module.css"

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <AnimationStage />
      </header>
    </div>
  )
}

export const FLYING_RECTS = "flyingRects"

class AnimationStage extends React.Component<any, any> {
  public canvasRef: any
  public animation: any

  constructor(props: any) {
    super(props)

    this.canvasRef = React.createRef()
    this.animation = null
  }

  componentDidMount() {
    this.animation = Fuzzle(this.canvasRef.current, window)
  }

  componentWillUnmount() {
    this.animation.unmount()
    this.animation = null
  }

  render() {
    return (
      <canvas
        className={animationStyles.component}
        width={640}
        height={400}
        ref={this.canvasRef}
      />
    )
  }
}

export default App
