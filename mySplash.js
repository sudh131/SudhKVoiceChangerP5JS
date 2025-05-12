class Splash {

 constructor() {
      this.splashBorder = 150;
  fill(6, 10, 69);
  stroke(255);
  strokeWeight(4);
  rect(this.splashBorder, this.splashBorder, width-this.splashBorder*2, height-this.splashBorder*2.5);
  // draw a rectangle like this in a 3D enviornment
  // rect(this.splashBorder-(windowWidth/2), this.splashBorder-(windowHeight/2), windowWidth-this.splashBorder*2, windowHeight-this.splashBorder*2);
  fill(255);
  strokeWeight(3)
   
  line(width-this.splashBorder-40, this.splashBorder+20,width-this.splashBorder-20, this.splashBorder+40)
   line(width-this.splashBorder-20, this.splashBorder+20,width-this.splashBorder-40, this.splashBorder+40)
   
    this.title = createDiv("Voice Changer");
  this.title.style('color:yellow');
  this.title.style('font-family: Arial');
  this.title.position(this.splashBorder+20, this.splashBorder+20);
  
  this.name = createDiv("Sudh Kalaga");
  this.name.style('color: yellow');
  this.name.style('font-family: Arial');
  this.name.position(this.splashBorder+20, this.splashBorder+60);
   
   stroke(255);
   fill(2, 163, 250);
   strokeWeight(1);
   rect(163, 500, 146, 40);
   
   this.info = createDiv("This project allows you to record a quick voice memo and then add various effects to what you've recorded. You can then play back the audio as well as save the audio. Make something goofy please. <p> <p> To save your final audio, follow these steps: <p> 1. Start Save (Starts recording all of the audio output of the program) <p> 2. Play or Loop (plays the altered audio file through the master output of the program). <p> 3. Stop Save (Stops recording the master output) <p> 4. Save (Prompts you to make a file name, then saves the .wav file locally) <p> Hit Refresh if you need to restart for some reason<p> <a href=https://editor.p5js.org/SudhK/sketches/YS-AhObZg>View Project Code </a>");
  this.info.style('font-family: Arial');
  this.info.style('color: hotpink');
  
  this.info.position(this.splashBorder+20, this.splashBorder+100);
  this.info.size(width-this.splashBorder*2-50, width-this.splashBorder*2-50)
  
}
  update(){
       if(mouseX > width-this.splashBorder-40 && 
          mouseX < width-this.splashBorder-20 
          && mouseY < this.splashBorder+40 
          && mouseY > this.splashBorder+20
     ){
     return true
   }
  }
 
  hide(){
    this.title.remove()
    this.name.remove()
    this.info.remove()
  }
}

