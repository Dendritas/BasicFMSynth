
function keyPressed() {
    
      switch(key) {
        case "Q":
        case "q":
        note = 60 + oct;
        break;
    
        case "2":
        note = 61 + oct;
        break;
    
        case "W":
        case "w":
        note = 62 + oct;
        break;
    
        case "3":
        note = 63 + oct;
        break;
        
        case "E":
        case "e":
        note = 64 + oct;
        break;
    
        case "R":
        case "r":
        note = 65 + oct;
        break;
    
        case "5":
        note = 66 + oct;
        break;
    
        case "T":
        case "t":
        note = 67 + oct;
        break;
    
        case "6":
        note = 68 + oct;
        break;
    
        case "Y":
        case "y":
        note = 69 + oct;
        break;
    
        case "7":
        note = 70 + oct;
        break;
    
        case "U":
        case "u":
        note = 71 + oct;
        break;
    
        case "I":
        case "i":
        note = 72 + oct;
        break;
    
        case 'c':
        case 'C':
        oct += 12;
        //envCar.amp(0);
        break;
    
        case 'x':
        case 'X':
        oct = 0;
        //envCar.amp(0);
        break;
    
        case 'Z':
        case 'z':
        oct -= 12;
        //envCar.amp(0);
        break;
    
      }
      
      envMod.triggerAttack(modulator);
      envCarA.triggerAttack(carrierA);
      envCarB.triggerAttack(carrierB);
    
    
    }
    
    // function keySettings(env){
    //     env.triggerAttack(modulator);
    // }
    
    
    
    function keyReleased() {
      
      envMod.triggerRelease(modulator);
      envCarA.triggerRelease(carrierA);
      envCarB.triggerRelease(carrierB);

    }