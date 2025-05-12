
//---------------------ALL GLOBAL VARIABLES-----------------------

//Splash Page
var mode = 0;

//RECORDER

var recUI;

var mic, recorder, soundFile;

var recStartButton;
var recStartVal;

var recStopButton;
var recStopVal;

var recPlayButton;
var recPlayVal;

var recSaveButton;
var recSaveVal;

var recLoopButton;
var recLoopVal;


//AUDIO SAVER

var saveUI;

var finalRecorder, finalSoundFile;

var saveStartButton;
var saveStartVal;

var saveStopButton;
var saveStopVal;

var savePlayButton;
var savePlayVal;

var saveSaveButton;
var saveSaveVal;

var saveLoopButton;
var saveLoopVal;

var finalFileName;


//RATE & PAN

var ratePanUI;

var rateSlider;
var rateValue;

var panSlider;
var panValue;


//DISTORTION

var distUI;

var distButton;

var distNoneButton;
var distNoneVal;

var dist2xButton;
var dist2xVal;

var dist3xButton;
var dist3xVal;

var oversampleNone;
var oversample2x;
var oversample3x;

var distortion;

var distSlider;
var distValue;


//REVERB & DELAY

var revDelUI;

var revButton;

var revSlider;
var revValue;

var reverb;

var delSlider;
var delValue;

var delay;


//FILTER

var filterUI;

var lowPass;
var highPass;

var lowPassSlider;
var lowPassValue;

var highPassSlider;
var highPassValue;

//OUTPUT

var masterOut;
var masterSlider;
var masterSliderVal;

//-------------------------SETUP -------------------------

function setup() {
  createCanvas(1200, 800);
  background(0);
  splash = new Splash();
  
  distortionUI();
  reverbDelayUI();
  filterUIFn();
  ratePanUIFn();
  recorderUI();
  recSetup();
  saveFinalUI();
  masterUI();
}

//--------------------- MASTER OUTPUT CODE----------------

function masterUI(){
  masterSlider = new slider(20, 55, 'MASTER VOLUME', 0.0, 1.0, 0.25, 0, 100);
  masterSlider.show();
}

function masterVol(){
  noStroke();
  fill(6, 10, 69);
  rect(10, 12, 300, 60);
  masterSliderVal = masterSlider.value();
  outputVolume(masterSliderVal);
}

// -------------------- RECORDER CODE -----------------------------

//draws the recorder panel
function recorderUI(){
  recUI = new uiTemp(25, 100, 'RECORDER');
  
  recStartButton = new button(100, 200, 30, 'START');
  recStartButton.show();
  recStartButton.press(recStart);
  
  recStopButton = new button(200, 200, 30, 'STOP');
  recStopButton.show();
  recStopButton.press(recStop);
  
  recPlayButton = new button(50, 300, 30, 'PLAY');
  recPlayButton.show();
  recPlayButton.press(recPlay);
  
  recSaveButton = new button(150, 300, 30, 'SAVE RAW');
  recSaveButton.show();
  recSaveButton.press(recSave);
  
  recLoopButton = new button(250, 300, 30, 'LOOP');
  recLoopButton.show();
  recLoopButton.press(recLoop);
}

//Sets up audio input and recorder
function recSetup(){
  mic = new p5.AudioIn();
  mic.start();
  recorder = new p5.SoundRecorder();
  recorder.setInput(mic);
  soundFile = new p5.SoundFile();
}

//starts recording
function recStart(){
  userStartAudio();
  recStartVal = recStartButton.value();
  recStopVal = false;
  recPlayVal = false;
  recSaveVal = false;
  recLoopVal = false;
  recorder.record(soundFile);
  recText();

}

//stops recording
function recStop(){
  soundFile.setLoop(false);
  recorder.stop();
  recStopVal = recStopButton.value();
  recStartVal = false;
  recPlayVal = false;
  recSaveVal = false;
  recLoopVal = false;
  recText();
}

//plays the recording back
function recPlay(){
  soundFile.play();
  recPlayVal = recPlayButton.value();
  recStartVal = false;
  recStopVal = false;
  recSaveVal = false;
  recLoopVal = false;
  recText();
}

//saves the recording
function recSave(){
  let fileName = prompt("Name the file");
  saveSound(soundFile, fileName + '.wav');
  recSaveVal = recSaveButton.value();
  recStartVal = false;
  recStopVal = false;
  recPlayVal = false;
  recLoopVal = false;
  recText();
}

//Loops the recording
function recLoop(){
  soundFile.loop();
  recLoopVal = recLoopButton.value();
  recStartVal = false;
  recStopVal = false;
  recPlayVal = false;
  recSaveVal = false;
  recText();
}

//prints text for recording panel
function recText(){
  if(recStartVal == true){
    fill(6, 10, 69);
    noStroke();
    rect(150, 200, 100, 75);
    rect(50, 300, 100, 75);
    rect(150, 300, 100, 75);
    rect(250, 300, 100, 75);
    rect(150, 525, 100, 75);
    rect(100, 625, 100, 75);
    rect(150, 650, 100, 80);
    rect(200, 625, 100, 75);
    textSize(15);
    fill("hotpink");
    strokeWeight(1);
    text('Recording!', 165, 250);
    console.log("started");
  }
  if(recStopVal == true){
    fill(6, 10, 69);
    noStroke();
    rect(150, 200, 100, 75);
    rect(50, 300, 100, 75);
    rect(250, 300, 100, 75);
    textSize(15);
    fill("hotpink");
    strokeWeight(1);
    text('Stopped!', 170, 250);
    console.log("stopped");
  }
  if(recPlayVal == true){
    fill(6, 10, 69);
    noStroke();
    rect(50, 300, 100, 75);
    rect(150, 200, 100, 75);
    textSize(15);
    fill("hotpink");
    strokeWeight(1);
    text('Playing!', 75, 350);
    console.log("Playing!");
  }
  if(recSaveVal == true){
    fill(6, 10, 69);
    noStroke();
    rect(200, 300, 100, 75);
    textSize(15);
    fill("hotpink");
    strokeWeight(1);
    text('Saved!', 175, 350);
    console.log("Saved!");
  }
  if(recLoopVal == true){
    fill(6, 10, 69);
    noStroke();
    rect(250, 300, 100, 75);
    rect(150, 200, 100, 75);
    textSize(15);
    fill("hotpink");
    strokeWeight(1);
    text('Looping!', 275, 350);
    console.log("Looping!");
  }
}


//------------------------SAVE FINAL AUDIO CODE-------------------------

function saveFinalUI(){
  saveUI = new uiTemp(25, 450, 'SAVE YOUR AUDIO');
  
  saveStartButton = new button(100, 525, 30, 'START SAVE');
  saveStartButton.show();
  saveStartButton.press(saveStart);
  
  saveStopButton = new button(200, 525, 30, 'STOP SAVE');
  saveStopButton.show();
  saveStopButton.press(saveStop);
  
  savePlayButton = new button(100, 600, 30, 'PLAY');
  savePlayButton.show();
  savePlayButton.press(savePlay);
  
  saveSaveButton = new button(150, 675, 30, 'SAVE');
  saveSaveButton.show();
  saveSaveButton.press(saveSave);
  
  saveLoopButton = new button(200, 600, 30, 'LOOP');
  saveLoopButton.show();
  saveLoopButton.press(saveLoop);
  
  saveSetup();
}

//sets up recorder to record the changed file
function saveSetup(){
  finalRecorder = new p5.SoundRecorder();
  finalSoundFile = new p5.SoundFile();
}

//starts recording the final audio
function saveStart(){
  userStartAudio();
  saveStartVal = saveStartButton.value();
  saveStopVal = false;
  savePlayVal = false;
  saveSaveVal = false;
  saveLoopVal = false;
  finalRecorder.record(finalSoundFile);
  saveText();
}

//stops recording final audio
function saveStop(){
  soundFile.setLoop(false);
  finalRecorder.stop();
  saveStopVal = saveStopButton.value();
  saveStartVal = false;
  savePlayVal = false;
  saveSaveVal = false;
  saveLoopVal = false;
  saveText();
}

//Loops the audio
function saveLoop(){
  soundFile.loop();
  saveLoopVal = saveLoopButton.value();
  saveStartVal = false;
  saveStopVal = false;
  savePlayVal = false;
  saveSaveVal = false;
  saveText();
}

//saves the final audio
function saveSave(){
  let fileName = prompt("Name the file");
  saveSound(finalSoundFile, fileName + '.wav');
  saveSaveVal = recSaveButton.value();
  saveStartVal = false;
  saveStopVal = false;
  savePlayVal = false;
  saveLoopVal = false;
  saveText();
}

//plays the audio back
function savePlay(){
  soundFile.play();
  savePlayVal = savePlayButton.value();
  saveStartVal = false;
  saveStopVal = false;
  saveSaveVal = false;
  saveLoopVal = false;
  saveText();
}

//prints text for recording panel
function saveText(){
  if(saveStartVal == true){
    fill(6, 10, 69);
    noStroke();
    rect(150, 525, 100, 75);
    rect(100, 625, 100, 75);
    rect(150, 650, 100, 80);
    rect(200, 625, 100, 75);
    textSize(15);
    fill("hotpink");
    strokeWeight(1);
    text('Started Save!', 155, 575);
    console.log("started");
  }
  if(saveStopVal == true){
    fill(6, 10, 69);
    noStroke();
    rect(150, 525, 100, 75);
    rect(100, 625, 100, 75);
    rect(200, 625, 100, 75);
    textSize(15);
    fill("hotpink");
    strokeWeight(1);
    text('Stopped!', 170, 575);
    console.log("stopped");
  }
  if(savePlayVal == true){
    fill(6, 10, 69);
    noStroke();
    rect(100, 625, 100, 75);
    rect(150, 525, 100, 75);
    textSize(15);
    fill("hotpink");
    strokeWeight(1);
    text('Playing!', 125, 650);
    console.log("Playing!");
  }
  if(saveSaveVal == true){
    fill(6, 10, 69);
    noStroke();
    rect(150, 650, 100, 80);
    textSize(15);
    fill("hotpink");
    strokeWeight(1);
    text('Saved!', 175, 725);
    console.log("Saved!");
  }
  if(saveLoopVal == true){
    fill(6, 10, 69);
    noStroke();
    rect(150, 525, 100, 75);
    rect(200, 625, 100, 75);
    textSize(15);
    fill("hotpink");
    strokeWeight(1);
    text('Looping!', 220, 650);
    console.log("Looping!");
  }
}


//-------------------------DISTORTION EFFECT CODE----------------------

//Draws the distortion panel
function distortionUI(){
  distUI = new uiTemp(425, 100, 'DISTORTION');
  
  distSetup();
  
  distNoneButton = new button(450, 235, 30,'NONE');
  distNoneButton.show();
  distNoneButton.press(oversampleNoneFn);
  
  dist2xButton = new button(550, 235, 30, '2x');
  dist2xButton.show();
  dist2xButton.press(oversample2xFn);
  
  dist3xButton = new button(650, 235, 30, '3x');
  dist3xButton.show();
  dist3xButton.press(oversample3xFn);
  
  distSlider = new slider(450, 325, 'AMOUNT', 0, 1.0, 0, 0, 100);
  distSlider.show();
}

//Creates a distortion object
function distSetup(){
  distortion = new p5.Distortion(0, '2x');
}

//Connects the soundfile's output to input of the distortion
function distortionFn(){
  soundFile.connect(distortion);
  
  oversampleAmt = oversampleAmount();
  
  distValue = distSlider.value();
  distortion.set(distValue, oversampleAmt);
  
  textSize(20);
  fill("hotpink");
  text('OVERSAMPLING', 450, 200);
}

//me trying to work around my bad code part 1
function oversampleNoneFn(){
  oversampleNone = true;
  oversample2x = false;
  oversample3x = false;
}

//me trying to work around my bad code part 2
function oversample2xFn(){
  oversampleNone = false;
  oversample2x = true;
  oversample3x = false;
}

//me trying to work around my code part 3
function oversample3xFn(){
  oversampleNone = false;
  oversample2x = false;
  oversample3x = true;
}

//returns the selected oversampling amount
function oversampleAmount(){
  let amt;
  if (oversampleNone == true){
    amt = 'none';
  }
  if (oversample2x == true){
    amt = '2x';
  }
  if (oversample3x == true){
    amt = '3x';
  }
  return amt;
}


//-------------------------REVERB & DELAY EFFECT CODE---------------------

//Draws reverb panel
function reverbDelayUI(){
  revDelUI = new uiTemp(825, 100, 'REVERB & DELAY');
  
  revSlider = new slider(850, 225, 'REVERB DRY/WET', 0.0, 1.0, 0, 0, 100);
  revSlider.show();
  
  delSlider = new slider(850, 330, 'DELAY TIME', 0.0, 1.0, 0, 0, 100);
  delSlider.show();
  
  revSetup();
  delSetup();
}

//Makes delay object
function delSetup(){
  delay = new p5.Delay();
  delay.amp(2);
}

//makes reverb object
function revSetup(){
  reverb = new p5.Reverb();
  reverb.amp(3);
}

//connects output of sound into reverb
function reverbFn(){
  soundFile.connect(reverb);
  
  revValue = revSlider.value();
  reverb.drywet(revValue);
}

//connects output of sound into delay
function delayFn(){
  soundFile.connect(delay);
  
  delValue = delSlider.value();
  delay.delayTime(delValue);
}


//---------------------------FILTER EFFECT CODE--------------------------

//draws filter panel
function filterUIFn(){
  filterUI = new uiTemp(425, 450, 'FILTER');
  
  lowPassSlider = new slider(450, 575, 'LOW-PASS', 20, 15000, 15000, 100, 0);
  lowPassSlider.show();
  
  highPassSlider = new slider(450, 675, 'HIGH-PASS', 20, 15000, 20, 0, 100);
  highPassSlider.show();
  
  filterSetup();
}

//creates filter objects
function filterSetup(){
  lowPass = new p5.LowPass();
  lowPass.amp(2);
  
  highPass = new p5.HighPass();
  highPass.amp(2);
}

//connects sound to lowpass
function lowPassFilter(){
  soundFile.connect(lowPass);

  lowPass.res(20)
  lowPassValue = lowPassSlider.value();
  lowPass.freq(lowPassValue);
}

//connects sound to highpass
function highPassFilter(){
  soundFile.connect(highPass);

  highPass.res(20);
  highPassValue = highPassSlider.value();
  highPass.freq(highPassValue);
}


//------------------ RATE AND PAN EFFECT CODE --------------------------

//draws rate and pan panel
function ratePanUIFn(){
  ratePanUI = new uiTemp(825, 450, 'RATE & PAN');
  
  rateSlider = new slider(850, 575, 'RATE', -2.0, 2.0, 1, -200, '+200');
  rateSlider.show();
  
  panSlider = new slider(850, 675, 'PAN', -1.0, 1.0, 0, -100, '+100');
  panSlider.show();
  
 }

//rate function
function rate(){
  rateValue = rateSlider.value();
  soundFile.rate(rateValue);
}

//panning function
function pan(){
  panValue = panSlider.value();
  soundFile.pan(panValue);
}

//--------------------- HIDE/SHOW UI----------------------

function showUI(){
  ratePanUI.show();
  
  filterUI.show();
  
  revDelUI.show();
  
  distUI.show();
  
  saveUI.show();
  
  recUI.show();
  
  recStartButton.show();
  recStopButton.show();
  recPlayButton.show();
  recSaveButton.show();
  recLoopButton.show();
  
  saveStartButton.show();
  saveStopButton.show();
  savePlayButton.show();
  saveSaveButton.show();
  saveLoopButton.show();
  
  rateSlider.show();
  panSlider.show();
  
  distNoneButton.show();
  dist2xButton.show();
  dist3xButton.show();
  distSlider.show();
  
  revSlider.show();
  delSlider.show();
  
  lowPassSlider.show();
  highPassSlider.show();
  
  masterSlider.show();
  
}

function hideUI(){
  
  recStartButton.hide();
  recStopButton.hide();
  recPlayButton.hide();
  recSaveButton.hide();
  recLoopButton.hide();
  
  saveStartButton.hide();
  saveStopButton.hide();
  savePlayButton.hide();
  saveSaveButton.hide();
  saveLoopButton.hide();
  
  rateSlider.hide();
  panSlider.hide();
  
  distNoneButton.hide();
  dist2xButton.hide();
  dist3xButton.hide();
  distSlider.hide();
  
  revSlider.hide();
  delSlider.hide();
  
  lowPassSlider.hide();
  highPassSlider.hide();
  
  masterSlider.hide();
}


//------------------------TITLE UI CODE----------------------------

//Makes the title
function title(){
  textSize(30);
  fill(6, 10, 69);
  stroke("yellow");
  strokeWeight(4);
  text('VOICE CHANGER BY SUDH',405, 50);
  noFill();
  stroke(255);
  rect(375, 10, 450, 60);
}


//--------------------------CLASSES--------------------------------

//makes buttons
class button {
  constructor(x, y, size, text){
    this.x = x;
    this.y = y;
    this.size = size;
    this.text = text;
    this.button = createButton(this.text);
    this.button.position(this.x, this.y);
    this.button.size(100);
  }
  show(){
    this.button.show();
  }
  press(fn){
    this.button.mousePressed(fn);
  }
  value(){ //only meant to be called WHEN button is pressed!!!
    this.val = true;
    return this.val;
  }
  hide(){
    this.button.hide();
  }
}

//makes the fun ui boxes
class uiTemp {
  //w = 350, h = 300
  constructor(x, y, text){
    this.x = x;
    this.y = y;
    this.text = text;
  }
  show(){
    fill(6, 10, 69);
    stroke(255);
    strokeWeight(3);
    rect(this.x, this.y, 350, 300);
    textSize(30);
    fill(6, 10, 69);
    stroke("yellow");
    strokeWeight(3);
    text(this.text, this.x+25, this.y+50);
  }
}

//makes the sliders
class slider {
  constructor(x, y, sliderName, minVal, maxVal, defaultVal, minDisplayVal, maxDisplayVal, col){
    this.x = x;
    this.y = y;
    this.sliderName = sliderName;
    this.minVal = minVal;
    this.maxVal = maxVal;
    this.defaultVal = defaultVal;
    this.minDisplayVal = minDisplayVal;
    this.maxDisplayVal = maxDisplayVal;
    this.col = col;
    
    this.slider = createSlider(
      this.minVal,
      this.maxVal,
      this.defaultVal,
      0);
    this.slider.position(this.x + 50, this.y);
    this.slider.size(200);
    
  }
  show(){
   this.slider.show();
  }
  value(){
    this.sliderValue = this.slider.value();
    
     //slider name
    textSize(20);
    fill("hotpink");
    strokeWeight(1);
    text(this.sliderName, this.x, this.y - 20,);
    
    //slider min
    textSize(15);
    fill("hotpink");
    strokeWeight(1);
    text(this.minDisplayVal + '%', this.x, this.y + 15);
    
    //slider max
    textSize(15);
    fill("hotpink");
    strokeWeight(1);
    text(this.maxDisplayVal + "%", this.x + 260, this.y + 15);
    
    //value display
    fill(6, 10, 69);
    noStroke();
    rect(this.x+200, this.y - 50, 100, 40);
    textSize(20);
    fill("hotpink");
    strokeWeight(1);
    
    this.displayVal = map(this.sliderValue, this.minVal, this.maxVal, this.minDisplayVal, this.maxDisplayVal);
    text("(  " + round(this.displayVal) + "%  )", this.x + 200, this.y - 22,);
    
    return this.sliderValue;
  }
  hide(){
    this.slider.hide();
  }
}

function draw() {
  if (mouseIsPressed == true && splash.update() == true) {
    mode = 1;
  }
  
  if(mode == 0){
    hideUI();
  }
  
  if (mode == 1) {
    background(6, 10, 69);
    stroke(255);
    fill(0);
    rect(150, 150, 900, 435);
    splash.hide();
    showUI();
    title();
    masterVol();
    rate();
    pan();
    distortionFn();
    reverbFn();
    delayFn();
    lowPassFilter();
    highPassFilter();
    
    recText();
    saveText();
  }
}
