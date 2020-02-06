'use babel'

var fs = require('fs');
import p5lib from 'p5'
import 'p5/lib/addons/p5.dom'

getPath = (name) => {
  var path = atom.project.getPaths()+`/Visuals/videos/${name}.`;
  if (fs.existsSync(path+'mp4')) {
    return path+'mp4';
  }else{
    return path+'mov';
  }
}

export default class P5 extends p5lib{
  constructor ({
    width = window.innerWidth,
    height = window.innerHeight,
    mode = 'P2D'
  } = {}) {

    super(( p ) => {
      p.setup = () => { p.createCanvas(width, height, p[mode]) }
      p.draw = () => { }
    })
    this.width = width
    this.height = height
    this.mode = mode
    this.canvas.style.position = "absolute"
    this.canvas.style.top = "0px"
    this.canvas.style.left = "0px"
    this.canvas.style.zIndex = -1
    console.log('p5', this)
  //  return this.p5
  }

  show() {
    this.canvas.style.zIndex = -1
  }

  hide() {
    this.canvas.style.zIndex = -10
  }

  loadVideo(hydra_src, video_name){

    console.log(getPath(video_name));
    var vid = this.createVideo(getPath(video_name));
    vid.loop()

    this.draw = () => {
        this.clear()
        this.image(vid, 0, 0, this.width, this.height)
      }

    this.hide()
    hydra_src.init({src: this.canvas})

  }

  OSC2video(hydra_src){
    msg.on('/video', (args) => {
      console.log(args[0])
      this.loadVideo(hydra_src, args[0])
    })
  }

}
