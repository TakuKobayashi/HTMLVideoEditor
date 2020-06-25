import React from 'react'
import { Link } from 'gatsby'
import { Layout } from '../components/Layout'

import ReactPlayer from 'react-player'

interface VideoProps {
  showVideoFlag: boolean;
  videoUrl: string;
}

export class IndexPage extends React.Component<VideoProps> {
  private canvas: HTMLCanvasElement | undefined;
  private context: CanvasRenderingContext2D | undefined;
  private reactPlayer: ReactPlayer | undefined;
  private videoRef: HTMLVideoElement | undefined;

  constructor(props: any) {
    super(props)
    this.state = {
      showVideoFlag: true,
      videoUrl: 'https://github.com/intel-iot-devkit/sample-videos/raw/master/car-detection.mp4',
    }
    this.update = this.update.bind(this)
    this.onCanvasLoaded = this.onCanvasLoaded.bind(this)
    this.onVideoPlayReady = this.onVideoPlayReady.bind(this)
    this.onVideoProgress = this.onVideoProgress.bind(this);
  }

  update(){
    if(this.context && this.videoRef){
      this.context.drawImage(this.videoRef, 0, 0, this.context.canvas.width, this.context.canvas.height);
    }
    window.requestAnimationFrame(this.update);
  }

  onCanvasLoaded(canvasRef: HTMLCanvasElement) {
    if (!canvasRef) {
      return
    }
    this.canvas = canvasRef;
    this.context = canvasRef.getContext("2d");
  }

  onVideoPlayReady(reactPlayer: ReactPlayer) {
    if (!reactPlayer) {
      return
    }
    this.reactPlayer = reactPlayer;
    this.videoRef = this.reactPlayer.getInternalPlayer();
    this.context.canvas.width = parseInt(this.reactPlayer.props.width, 10)
    this.context.canvas.height = parseInt(this.reactPlayer.props.height, 10)
    this.videoRef.play();
    this.state.showVideoFlag = false;
    this.update();
  }

  onVideoProgress(buf: any){
    if (!buf) {
      return
    }
    console.log(buf)
  }

  render():
  | React.ReactElement<any, string | React.JSXElementConstructor<any>>
  | string
  | number
  | {}
  | React.ReactNodeArray
  | React.ReactPortal
  | boolean
  | null
  | undefined {
  return (
    <>
      <h2>Hi people</h2>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <canvas id="canvas" ref={this.onCanvasLoaded} ></canvas>
      <ReactPlayer
        url={this.state.videoUrl}
        playing={true}
        onReady={this.onVideoPlayReady}
        onProgress={this.onVideoProgress}
        style={{ display: this.state.showVideoFlag ? 'none' : '' }}
      />
      <p>
        <Link to="/another-page/">Go to another page</Link>
      </p>
      <p>
        <Link to="/all/">See content generated from Markdown files</Link>
      </p>
    </>
    )
  }
}

const LayoutIndexPage = () => (
  <Layout>
    <IndexPage />
  </Layout>
)

export default LayoutIndexPage
