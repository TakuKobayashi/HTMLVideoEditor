import React from 'react'
import { Link } from 'gatsby'
import { Layout } from '../components/Layout'

interface VideoProps {
}

export class IndexPage extends React.Component<VideoProps> {
  private canvas: HTMLCanvasElement | undefined;
  private context: CanvasRenderingContext2D | undefined;
  private video: HTMLVideoElement | undefined;

  constructor(props: any) {
    super(props)
    this.update = this.update.bind(this)
    this.onCanvasLoaded = this.onCanvasLoaded.bind(this)
    this.onVideoLoaded = this.onVideoLoaded.bind(this)
  }

  update(){
    if(this.context && this.video){
      this.context.drawImage(this.video, 0, 0, 200, 400);
    }
    window.requestAnimationFrame(this.update);
  }

  onCanvasLoaded(canvasRef: HTMLCanvasElement) {
    if (!canvasRef) {
      return
    }
    console.log("canvas")
    console.log(canvasRef);
    this.canvas = canvasRef;
    this.context = canvasRef.getContext("2d");
  }

  onVideoLoaded(videoRef: HTMLVideoElement) {
    if (!videoRef) {
      return
    }
    console.log("Video")
    this.video = videoRef;
    videoRef.pause();
    const self = this;
    videoRef.addEventListener('loadeddata', function() {
      videoRef.play();
      self.update();
    });
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
      <div class="wrapper">
        <canvas id="canvas" ref={this.onCanvasLoaded} ></canvas>
        <video id="video" src="https://github.com/intel-iot-devkit/sample-videos/raw/master/car-detection.mp4" playsInline autoPlay controls controlslist="nodownload nofullscreen" ref={this.onVideoLoaded} />
      </div>
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
