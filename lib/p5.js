'use babel'

var fs = require('fs');
import p5lib from 'p5'
import 'p5/lib/addons/p5.dom'

getVideoPath = (name) => {
  var path = atom.project.getPaths()+`/resources/videos/${name}.`;
  if (fs.existsSync(path+'mp4')) {
    return path+'mp4';
  }else{
    return path+'mov';
  }
}

export default class P5 extends p5lib{

    static WEBGL() {
        return {height: window.innerHeight,
         width: window.innerWidth,
         mode:  "WEBGL"}
    }

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
    this.mod = null;
    this.orientation=1;
      console.log('p5', this)
    this.angle = 0;
  //  return this.p51
  }

    let(name,value){
    // Defines instance variables
    this[name]=value;
  }

  show() {
    this.canvas.style.zIndex = -1
  }

  hide() {
    this.canvas.style.zIndex = -10
  }

  loadVideo(hydra_src=s0, video_name){
    console.log(getVideoPath(video_name));
    var vid = this.createVideo(getVideoPath(video_name));
    vid.loop()

    this.draw = () => {
        this.clear()
        this.image(vid, 0, 0, this.width, this.height)
     }

    this.hide()
    hydra_src.init({src: this.canvas})

  }

   preloadModel(hydra_src=s0, model_name){

       this.mod  = this.loadModel(atom.project.getPaths()+`/resources/model/${model_name}.obj`,true);

       console.log(this.mod)

       this.draw = () => {
           this.background(0);
           this.ambientLight(200, 0, 0);
           this.ambientMaterial(100);
           this.fill(0)
           this.normalMaterial()
           this.directionalLight(250, 200, 100, 0, -1.5, -1.5);
           this.translate(this.orientation*200,0, 0);
           this.rotateY(3*this.angle);
           this.rotateZ(this.angle * 0.7);
           this.rotateX(91);
           this.angle += 0.03
           this.model(this.mod);
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

  OSC2Model(name){
    msg.on('/modelo', (args) => {
      console.log(args[0])
      this.mod = this.loadModel(proj_path + args[0]+".obj",true)
    })
  }

  OSCRotate(){
    msg.on('/rotar', (args) => {
      console.log(args[0])
      this.orientation = args[0]
    })
  }
}
