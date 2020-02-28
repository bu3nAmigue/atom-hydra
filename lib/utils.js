'use babel'

export default class Utils {
  constructor() {
//Set audio config
    this.osc = {};
  }

    setOscListener(name, def=1.0){
    this.osc[name] = def;
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



  audioFi(bin=0,controlFactorMult=100, controlFactorSum=0.,min=0.001, max=controlFactorMult+controlFactorSum) {
    return  (() => controlFactorSum + Math.min( min + a.fft[bin]*controlFactorMult,max))
  }


  fftAvg(){
    var res=0;
    for (var i = 0; i < a.fft.length; i++) {
      res += a.fft[i]
   }
    return (res / a.fft.length)
  }

  fractales(f=0.000001, buf=o0) {
      //forma and scale should be defined in instance
      //           eg. setOSCListener("forma",3)
      //               setOSCListener("scale"),1)

      shape(() => this.osc.forma,0.000000001,0.5).color(1,0.4,0,0.02)
          .scale(() => a.fft[0]*2+0.99,() => a.fft[0]*1+0.4)
          .contrast([1,1.02,0.99])
          .colorama(0.2)
          .diff(buf)
          .repeat(2,2)
          .rotate(0.000000001, 0.00000008)
          .scrollX(()=>Math.tan(time) * f)
          .scrollY(() =>Math.cos(time)*f)
          .scale(()=> 1 + this.osc.scale/1000)
          .out(buf)
   }