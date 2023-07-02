//Fractal Tree generation Source---->Idea By generatorofappideas


let backgroundImage;
let img1;
let img2;
let imgsoil;
let imgkindjack;
let imgcastle1;
let imgcow;
let imgelisabeth;
let imgsoul1;
let t; 
let da, db, dc; 
let wholeSize; 
let showTree = false; 
let clouds = []; 


let x, y; 
let angle = 0; 
let radiusX = 100; 
let radiusY = 40; 
let xx,yy ;

let cowX = 110; 
let cowY = 620; 
let cowDirection = 1; 
let isFlipped = false; 



let imgkindjackX;
let imgkindjackY;
let imgkindjackSpeed = 3;
let imgkindjackThreshold = 10;
let jackStartX = 399;
let jackStartY = 650;



function preload() {
  backgroundImage = loadImage("images/sky.jpg");
  img1 = loadImage("images/real hill.png");
  img2 = loadImage("images/beanstalkcute.png");
  imgsoil = loadImage("images/soil.png");
  imgkindjack = loadImage("images/kindjack.png");
  imgcastle1 = loadImage("images/castel1.png");
  imgcow = loadImage("images/cow.png");
  imgelisabeth = loadImage("images/elisabeth.png");
  imgsoul1 = loadImage("images/ghost.png");
  
  
}


function setup() {
  createCanvas(800,800);
 
  imgkindjackX = jackStartX;
  imgkindjackY = jackStartY;

  t = new branch(random(height / 2, height / 4))
  generateClouds(30);
 
  
}

function draw() {
  
  background(0);
 
  image(backgroundImage, 0, 0, width, height);
   image(img1, 0,600, 800, 200);

   
   
   flipImgCow(isFlipped);
   
   cowX += cowDirection * 0.9; 
   cowY = 620 + sin(cowX * 0.18) * 6; 
   
   
   if (cowX >= 599) {
    isFlipped=true
     cowDirection = -1; 
   } else if (cowX <= 109) {
    isFlipped = false
     cowDirection = 1; 
     
   }
     
   


   image(img2, 480, 250, 200, 490);
   
   image(imgsoil, 489, 725 , 120, 40);
 
   image(imgcastle1, 469, 120 , 200, 200);
   
   
  


x = 350 + radiusX * sin(angle)*3;
y = 100 + radiusY * cos(angle)*1.5;

yy = 190 + cos(angle)*10;


image(imgelisabeth, 320, yy , 90, 100);
image(imgsoul1, x, y, 90, 100);

angle += 0.03;


if (angle >= TWO_PI) {
  angle = 0;
}

  for (let i = 0; i < clouds.length; i++) {
    clouds[i].show();
    clouds[i].update();
  }
  
if (showTree) {
 
  
  push();

  image(imgsoil, 195, 735 , 140, 50);
  
  translate(width / 3, height-50);
 
  
  t.show();
  pop();
  resetMatrix();


}

let distance = dist(imgkindjackX, imgkindjackY, mouseX, mouseY);
  

if (imgkindjackX > 490 && imgkindjackX < 540 && mouseY<620 ) {
 
 if(imgkindjackY>200 && imgkindjackY<800){
 imgkindjackY -= imgkindjackSpeed;}
}else
if (imgkindjackX > 80 || imgkindjackX < 700 || imgkindjackY > 650 || imgkindjackY < 690) {
  if (distance > imgkindjackThreshold) {
    if (imgkindjackX < mouseX && imgkindjackX < 700) {
      imgkindjackX += imgkindjackSpeed;
    } else if (imgkindjackX > mouseX && imgkindjackX > 80) {
      imgkindjackX -= imgkindjackSpeed;
    }
    
    if (imgkindjackY < mouseY && imgkindjackY < 720) {
      imgkindjackY += imgkindjackSpeed;
    } else if (imgkindjackY > mouseY && imgkindjackY > 630) {
      imgkindjackY -= imgkindjackSpeed;
    }
  }
} 
image(imgkindjack, imgkindjackX, imgkindjackY, 40, 80);

}


class branch {
  
  constructor(size) {
    this.next = [] 
    this.size = random(0.37, 0.4) * size;
    this.qwe = 0.001; 
    this.angle = sin(frameCount * 0.5 + HALF_PI * this.size) *random(-3,3);
    this.fAngle = 0; 

    if (this.size > 10) {
      const branches = this.size < 11 ?
        floor(random(1, 3)) :
        floor(random(3, 4))

      for (let i = 0; i < branches; i++) {
        this.next.push(new branch(this.size))
        if (i > 0)
          this.next[i].angle = sin(frameCount + this.size) * 6
        
      }
    }
    
    this.tribe = 0.3; 
  } 

  show() {
    if (this.qwe < 0.5) this.qwe += 0.009
    push()
    da = sin(frameCount * 0.094 - this.size) / this.size * 6;
    db = -cos(frameCount * 0.152 + PI / this.size) / this.size * 9;
    dc = sin(-frameCount * 0.13 + this.size + this.fAngle) / this.size;

    if (this.next.length !== 0) {
      stroke(da * 50 + 100, -db * 5 + 150, dc * 100 + 150, 50)
      if (this.fAngle !== this.angle) this.fAngle += (this.angle - this.fAngle) / 600
      this.folding(this.qwe);
    } else {
      let i = frameCount % 20 / 4
      let qw = cos((this.size - i) * 0.043 + frameCount * 0.21 + this.fAngle + this.size) + sin(i * 0.17 + frameCount * 0.51 + this.angle)
      stroke(50 + db * 20 + qw * 34 * qw, 220 - (dc + sin(frameCount / 3 + 1)) * 70 - qw * 30, 96 + (da + cos(frameCount - 2)) * 60 + qw, 90);
      strokeWeight(10)
      fill(90 + db * 50, 120 - (qw + da - cos(frameCount / 4)) * 30, 126 + (qw + dc - sin(frameCount / 2)) * 30, 110);
      rotate(-PI / 4 + cos(frameCount * (this.qwe) + this.angle) * (0.5 - this.qwe))
      rect(3, -3, this.qwe * 30, -this.qwe * 30)
      line(0, 0, this.qwe * 38, -this.qwe * 38)
      ellipse(0, 0, this.qwe * 30, this.qwe * 30)
     
    }

    if (this.qwe > 0.49) {
    
      push()

      for (let i in this.next) {
        this.next[i].show()
        pop()
      }
      pop()
    }
    if (this.tribe < 2) this.tribe += 0.006;

    
  }
  folding(delta) {
    

    const tempSize = this.size * delta * 1.9
   

    rotate((delta * this.fAngle) / 7 + (da + db) / tempSize + dc)

    const elwe = this.qwe * this.size / 3
    
    if (elwe > 3) {

      strokeWeight(2);

      let qq = abs((0.5 - this.qwe)) * 512
      for (let i = 0; i < tempSize / 5; i++) {

        let qw = cos((tempSize - i) * 0.043 + frameCount * 0.21 + this.fAngle + this.size) + sin(i * 0.17 + frameCount * 0.51 + this.angle)
        fill(50 + (-qw + dc * 2 + (i % 4) / 4) * 50 + qq,
          qq * 2 + 150 - ((i % 6) / 2 - db * 2 - da + qw) * 60,
          qq + 120 + (-da * 2 + db + dc - (i % 5) / 2) * 75,
          170 - (db + qw) * 40);
        ellipse(0, -i * 5, (elwe - (da - qw - db) * 2 + 4) * this.tribe, (elwe + (qw + db - dc) * 2 + 2) * this.tribe)
      } 
    } 
    else {
      let qw = cos((tempSize) * 0.043 + frameCount * 0.21 + this.fAngle + this.size) + sin(frameCount * 0.51 + this.angle)
      stroke(10 + (-qw + dc * 2 + 1.4) * 50,
        150 - (1.2 - db * 2 - da + qw) * 60,
        120 + (-da * 2 + db + dc - 0.2) * 75,
        170 - (db + qw) * 40);
      strokeWeight(elwe * this.tribe * 2);
      line(0, 0, 0, -tempSize)
    }

    if (delta > 0.01) {
      translate(0, -tempSize)
      this.folding(delta - (1 - delta) / 6)
    }
  }
}




class Cloud {
  constructor(x, y, size) {
    this.position = createVector(x, y);
    this.size = size;
    this.speed = random(0.03, 0.1);
  }

  update() {
    this.position.x += this.speed;
    if (this.position.x > width + 100) {
      this.position.x = -100;
    }
  }
  show() {
    noStroke();
    fill(255);
    ellipse(this.position.x, this.position.y, this.size, this.size /1.572);
    ellipse(
      this.position.x + this.size / 2,
      this.position.y - this.size / 4,
      this.size,
      this.size / 2
    );
    ellipse(
      this.position.x - this.size / 2,
      this.position.y - this.size / 4,
      this.size,
      this.size / 2
    );
  }
}


function generateClouds(numClouds) {
  for (let i = 0; i < numClouds; i++) {
    let x = random(width);
    let y = height / 2.38;
    let size = random(80, 150);
    let cloud = new Cloud(x, y, size);
    clouds.push(cloud);
  }
}



function flipImgCow(flip) {
  if (flip) {
    push();
    translate(cowX + 65, cowY + 50);
    scale(-1, 1);
    image(imgcow, -65, -50, 130, 100);
    pop();
   
  } else {
    image(imgcow, cowX, cowY, 130, 100);
  }
}


function mouseClicked() {

 if (!showTree) {
  showTree = true;
  }
  
}







