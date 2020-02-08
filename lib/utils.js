'use babel'

export default class Utils {
  constructor() {
//Set audio config
    this.osc = {};
  }

  setOscListener(name, ret){
    msg.on('/'+ name, (args) => {
      console.log( "Listening on: ", name, args);
       this.osc[name] = args[0];
    })
  }

  derretir(p5,hydra_src){
    msg.on('/derretir', (args) => {
      console.log(args)
      if (args[0] == 1){
        p5.loadVideo(hydra_src, args[1])
      }else{
        hydra_src.initScreen(0)
      }
    })
  }

  audioFi(bin=0,controlFactor=100,min=0.001, max=v) {
    return () =>  Math.min( min + a.fft[bin]*controlFactor,max)
  }


  fftAvg(){
    return () => ([0,1,2,3,4].reduce((acum,i) => i+acum,0) / 5)
  }
}
