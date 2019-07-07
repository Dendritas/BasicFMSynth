console.log("Basic linear-FM Synthesizer: Have Fun!");
var carrierA, carrierB, modulator , envCarA, envCarB, envMod;
var AmpASlider, AmpBSlider;
var note, oct = 0;
var modButton, modOnVal=0;
var factorButton, factorOnVal=0;
var modMinDepth = 0, modMaxDepth = 5000, modMinStep = -32, modMaxStep = 32;
var depthSlider, stepSlider, detuneSliderCoarse, detuneSliderFine;
var selCarAOsc, selCarBOsc, selModulatorOsc;
var atkCarASlider, decCarASlider, susCarASlider, relCarASlider;
var atkCarBSlider, decCarBSlider, susCarBSlider, relCarBSlider;
var atkModSlider, decModSlider, susModSlider, relModSlider;
var lpf, lpfFreqSlider, lpfResSlider;

function canvasSettings(){
}

function options(wave){
  var waves = ['sine', 'triangle', 'sawtooth', 'square'];
  for (var i = 0; i < waves.length; i++) {
    wave.option(waves[i]);
  }
}


function setup(){
  createCanvas(innerWidth,innerHeight);
  setCanvas();

  lpf = new p5.LowPass();  // Set main lpf


  carrierA = new p5.Oscillator('sine');  // Set carrier initial osc
  carrierA.amp(0);
  carrierA.disconnect();
  carrierA.connect(lpf);
  carrierA.start();

  carrierB = new p5.Oscillator('sine');  // Set carrier initial osc
  carrierB.amp(0);
  carrierB.disconnect();
  carrierB.connect(lpf);
  carrierB.start();

  modulator = new p5.Oscillator('sine');  // Set modulator initial osc
  modulator.start();
  modulator.disconnect();

  envCarA = new p5.Env();  // Set carrier envelope
  envCarA.setRange(0.25,0);

  envCarB = new p5.Env();  // Set carrier envelope
  envCarB.setRange(0.25,0);

  

  envMod = new p5.Env();  // Set modulator envelope 
  

  
}

// Set Waveforms
function oscValues(osc, carrier) {
  var carOsc = osc.value();
  carrier.setType(carOsc);
}

function carASelectOsc() {
  var carAOsc = selCarAOsc.value();

  carrierA.setType(carAOsc);
}

function carBSelectOsc() {
  var carBOsc = selCarBOsc.value();

  carrierB.setType(carBOsc);
}

function modSelectOsc() {
  var modulatorOsc = selModulatorOsc.value();

  modulator.setType(modulatorOsc);
}

function modButtonOn(){

  if (this.checked()) {
    modOnVal = 1;
    //console.log(modOnVal);
  } else {
    modOnVal = 0;
    //console.log(modOnVal);
  }
}

function factorButtonOn(){
  
    if (this.checked()) {
      factorOnVal = 1;
      //console.log(modOnVal);
    } else {
      factorOnVal = 0;
      //console.log(modOnVal);
    }
  }

function draw() {
  fill(0);


  lpf.freq(lpfFreqSlider.value());
  lpf.res(lpfResSlider.value());

  var depth = depthSlider.value();
  
  envMod.mult(depth,0); // Changes modulator envelope amp
  
  var steps = 0;

  var detuneCoarse = detuneSliderCoarse.value();
  var detuneFine = detuneSliderFine.value();

  background(map(depth,modMinDepth,modMaxDepth,255,0),map(depth,modMinDepth,modMaxDepth,255,100),255);

  carrierA.freq(midiToFreq(note));   // Set carrier root key
  carrierB.freq(midiToFreq(note + detuneCoarse + detuneFine));
  
  if(factorOnVal == 1){
    //console.log(factorOnVal);
    steps = round( map(stepSlider.value(),modMinStep,modMaxStep,1,64)) * 0.5;
    modulator.freq(midiToFreq(note) * steps);   // Set modulator note *n factor from root key    
  } else{ 
    //console.log(factorOnVal);
    steps = stepSlider.value();
    modulator.freq(midiToFreq(note + steps));   // Set modulator note +-n steps from root key  
    if(steps > 0) {
      triangle(1100,330,1080,350,1120,350);    
    } else if(steps < 0){
      triangle(1100,350,1080,330,1120,330);
    };
  };
  
  //modulator.freq(modulator);  // Set modulator feedback
  modulator.disconnect();


  carrierA.freq(modulator);    // Set carrier A modulated frequency 

  if(modOnVal == 1) {
  carrierB.freq(modulator);    // Set carrier B modulated frequency
  } else {
  carrierB.freq(midiToFreq(note + detuneCoarse + detuneFine));
  };
  envCarA.mult(AmpASlider.value());
  envCarB.mult(AmpBSlider.value());


  // Set carrier envelope to sliders values
  envCarA.setADSR(atkCarASlider.value(), decCarASlider.value(), susCarASlider.value(), relCarASlider.value());
  envCarB.setADSR(atkCarBSlider.value(), decCarBSlider.value(), susCarBSlider.value(), relCarBSlider.value());
  
  // Set modulator envelope to sliders values
  envMod.setADSR(atkModSlider.value(), decModSlider.value(), susModSlider.value(), relModSlider.value());
  textSize(16);




  // Up octave print
  if(oct == 12){
    text('1 oct Up', 10, 500);
    triangle(120,480,100,500,140,500);
  } else if(oct == 24){
    text('2 oct Up', 10, 500);
    triangle(120,480,100,500,140,500);
  } else if(oct == 36){
    text('3 oct Up', 10, 500);
    triangle(120,480,100,500,140,500);
  }else if(oct == 48){
    text('4 oct Up', 10, 500);
    triangle(120,480,100,500,140,500);
  } else if(oct == 60){
    text('5 oct Up', 10, 500);
    triangle(120,480,100,500,140,500);
  } else if(oct == 72){
    text('Exosphere reached: go down my friend', 10, 500);
  };

  //  Down octaves print
  if(oct == -12){
    text('1 oct Down', 10, 500);
    triangle(120,500,100,480,140,480);    
  } else if(oct == -24){
    text('2 oct Down', 10, 500);
    triangle(120,500,100,480,140,480);        
  } else if(oct == -36){
    text('3 oct Down', 10, 500);
    triangle(120,500,100,480,140,480);        
  } else if(oct == -48){
    text('Ninth Circle of Hell: go up my friend', 10, 500);
  };

  // Prints everything else...
  text('* Oct up: c | Oct down: z | Middle oct: x',10,innerHeight - 50)
  text('Carrier freq: ' + nfc(midiToFreq(note), 3) + ' Modulator freq: ' + nfc(midiToFreq(note + steps), 3), 30,30);

  


  text('Carrier A Osc', 0, 160);
  text('Carrier Env', 200, 160);
  text('Attack: ' + atkCarASlider.value(),100, 190);
  text('Decay: ' + decCarASlider.value(),100, 220);
  text('Sustain: ' + susCarASlider.value(),100, 250);
  text('Release: ' + relCarASlider.value(),100, 280);
  text('Amp A: ' + AmpASlider.value(), 0,320);

  text('Carrier B Osc', 390, 160);
  text('Carrier Env', 600, 160);
  text('Attack: ' + atkCarBSlider.value(),500, 190);
  text('Decay: ' + decCarBSlider.value(),500, 220);
  text('Sustain: ' + susCarBSlider.value(),500, 250);
  text('Release: ' + relCarBSlider.value(),500, 280);
  text('Amp B: ' + AmpBSlider.value(), 390,320);
  
  text('Detune', 600, 350);
  text('Coarse: ' + detuneCoarse, 500,380);
  text('Fine: ' + nfc(detuneFine,2), 500,420);

  text('LPF', 900, 30);
  text('Freq: ' + lpfFreqSlider.value(), 800, 65);
  text('Res: ' + lpfResSlider.value(), 800, 105);

  text('Modulator Osc', 790, 160);
  text('Modulator Env', 1000, 160);
  text('Attack: ' + atkModSlider.value(),900, 190);
  text('Decay: ' + decModSlider.value(),900, 220);
  text('Sustain: ' + susModSlider.value(),900, 250);
  text('Release: ' + relModSlider.value(),900, 280);
  text('Depth: ' + nfc(depth, 2), 790, 320);
  text('Steps: ' + steps, 790,350);

    



}


function setCanvas() {

  // Set carrier Osc options
  selCarAOsc = createSelect();
  selCarAOsc.position(10, 180);
  options(selCarAOsc);
  selCarAOsc.changed(carASelectOsc);

  //Set carrier Osc options
  selCarBOsc = createSelect();
  selCarBOsc.position(400, 180);
  options(selCarBOsc);
  selCarBOsc.changed(carBSelectOsc);

  //Set modulator Osc options
  selModulatorOsc = createSelect();
  selModulatorOsc.position(800,180);
  options(selModulatorOsc)
  selModulatorOsc.changed(modSelectOsc)

  
  // Set depth and step sliders (modulator)
  depthSlider = createSlider(modMinDepth, modMaxDepth, 2053.6, 0.1);
  depthSlider.position(900, 310);
  stepSlider = createSlider(modMinStep, modMaxStep, -24, 0.5);
  stepSlider.position(900, 340);

  // Set detune sliders
  detuneSliderCoarse = createSlider(-24,24,0);
  detuneSliderCoarse.position(600,370);
  detuneSliderFine = createSlider(-1,1,0,0.01);
  detuneSliderFine.position(600,410);

  modButton = createCheckbox('Mod On');
  modButton.position(400,230);
  modButton.changed(modButtonOn);

  factorButton = createCheckbox('Factor On');
  factorButton.position(790, 370);
  factorButton.changed(factorButtonOn);
  

  // Set carrier envelope sliders
  atkCarASlider = createSlider(0.001, 4, 0.1,0.01);
  atkCarASlider.position(200, 180);
  decCarASlider = createSlider(0.01, 2, 1.5, 0.01);
  decCarASlider.position(200, 210);
  susCarASlider = createSlider(0, 1, 0.3, 0.1);
  susCarASlider.position(200, 240);
  relCarASlider = createSlider(0, 1.5, 0.45, 0.01);
  relCarASlider.position(200, 270);



  // Set carrier envelope sliders
  atkCarBSlider = createSlider(0.001, 4, 0.1,0.01);
  atkCarBSlider.position(600, 180);
  decCarBSlider = createSlider(0.01, 2, 1.5, 0.01);
  decCarBSlider.position(600, 210);
  susCarBSlider = createSlider(0, 1, 0.3, 0.1);
  susCarBSlider.position(600, 240);
  relCarBSlider = createSlider(0, 1.5, 0.45, 0.01);
  relCarBSlider.position(600, 270);

  // Set modulator envelopte sliders
  atkModSlider = createSlider(0.001, 4, 0.1, 0.01);
  atkModSlider.position(1000, 180);
  decModSlider = createSlider(0.01, 2, 1.5, 0.01);
  decModSlider.position(1000, 210);
  susModSlider = createSlider(0, 1, 0.1, 0.1);
  susModSlider.position(1000, 240);
  relModSlider = createSlider(0, 1.5, 0.45, 0.01);
  relModSlider.position(1000, 270);
  

  // Set Amps
  AmpASlider = createSlider(0, 1, 1, 0.01);
  AmpASlider.position(100,310);

  AmpBSlider = createSlider(0, 1,0, 0.01);
  AmpBSlider.position(500, 310);



  // Set lpf frequency and resonance sliders
  lpfFreqSlider = createSlider(60, 19500, 19500);
  lpfFreqSlider.position(900, 60)
  lpfResSlider = createSlider(0, 50, 0);
  lpfResSlider.position(900, 100);

}




