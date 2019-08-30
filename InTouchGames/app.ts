/*  Author: Joseph Dudgeon
    Date: 26/08/19
    Assets provided by InTouchGames
    Created using TypeScript HTML Application Template
    (https://marketplace.visualstudio.com/items?itemName=Rich-Newman.TypeScriptHTMLApplicationTemplate&ssr=false#qna)
*/


//Declare varibales
var draw_array: Array<iDraw> = new Array<iDraw>();
var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D;
var safe_background: HTMLImageElement;
var safe_open: HTMLImageElement;
var safe_closed: HTMLImageElement;
var safe1: cSafe;
var safe2: cSafe;
var safe3: cSafe;
var safe4: cSafe;
var safe5: cSafe;
var safe6: cSafe;
var safe7: cSafe;
var safe8: cSafe;
var safe9: cSafe;
var spin: HTMLImageElement;
var safe_dial: HTMLImageElement;
var button: cButton;
var leds_1: HTMLImageElement;
var leds_2: HTMLImageElement;
var leds_3: HTMLImageElement;
var gold: HTMLImageElement;
var gold_flash: HTMLImageElement;
var ring: HTMLImageElement;
var ring_flash: HTMLImageElement;
var money: HTMLImageElement;
var money_flash: HTMLImageElement;
var number_dial_default: HTMLImageElement;
var number_dial_red: HTMLImageElement;
var number_dial_green: HTMLImageElement;
var safe_screen: HTMLImageElement;
var safe_screen_win: HTMLImageElement;
var red_marker: HTMLImageElement;
var green_marker: HTMLImageElement;
var safe_screen_text: string;
var safe_screen_1: string = "_";
var safe_screen_2: string = "_";
var safe_screen_3: string = "_";
var safe_screen_4: string = "_";
var leds_cycle: number = 0;
var led_cycle_rate: number = 15;
var flash_marker: number = 0;
var flash_marker_rate: number = 20;
var button_pressed: boolean = false;
var spin_rate: number = 100;
var spin_cycle: number = 0;
var screen_text: string;
var spinning: boolean = false;
var lose: boolean = false;
var lose_count: number = 0;
var lose_show: number = 50;
var win: boolean = false;
var safes: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var selected_safes: number[];
var selected_safes_itr: number = 0;
var multiplier1: number = 16;
var multiplier2: number = 17;
var multiplier3: number = 18;
var multipliers: number[] = [multiplier1, multiplier1, multiplier1, multiplier2, multiplier2, multiplier2, multiplier3, multiplier3, multiplier3];
var revealed_multipliers: Array<number> = new Array<number>();
var winning_multiplier: number;
var winning_safe_A: number;
var winning_safe_B: number;
var bet: number = 100;
// Enum used to declare and control the state of the dial
enum dial_state {
    spinning,
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    nine,
}
var dial: dial_state = dial_state.one;

//Main game loop function ran every frame  
function gameLoop() {
    requestAnimationFrame(gameLoop);
    background();
    for (var i: number = 0; i < draw_array.length; i++) {
        var d: iDraw = draw_array[i];
        d.draw();
    }

    gameContol();

}
//Function that controls the game. Input: void. Output:void
function gameContol() {
    if (spinning) {
        spin_cycle++;
        screen_text = "Spinning!";
        dial = dial_state.spinning;

    }
    if (spin_cycle == spin_rate) {
        spinning = false;
        spin_cycle = 0;
        dial = dialState(selected_safes[selected_safes_itr]);
        safe_screen_text_update(selected_safes[selected_safes_itr], selected_safes_itr);
        revealed_multipliers.push(multipliers[selected_safes[selected_safes_itr] - 1]);
        checkWin();
        selected_safes_itr++;
    }
    if (win) {
        screen_text = "You Win £" + (bet * winning_multiplier) + "!!!";
    }
    if (lose) {
        lose_count++;
        if (lose_count == lose_show) {
            lose_count = 0;
            lose = false;
        }
    }
}

//Function that updates the text of the safe screen. Input: number, number. Output: void
function safe_screen_text_update(safe_number: number, safe_itr: number) {
    switch (safe_itr) {
        case (0):
            safe_screen_1 = safe_number.toString();
            break;
        case (1):
            safe_screen_2 = safe_number.toString();
            break;
        case (2):
            safe_screen_3 = safe_number.toString();
            break;
        case (3):
            safe_screen_4 = safe_number.toString();
            break;
    }
}

//Function that checks if the player has won. Input:void. Output:void.
function checkWin() {
    lose = true;
    for (var i = 0; i < revealed_multipliers.length - 1; i++) {
        for (var j = i + 1; j < revealed_multipliers.length; j++) {
            if (revealed_multipliers[i] == revealed_multipliers[j]) {
                win = true;
                lose = false;
                winning_multiplier = revealed_multipliers[i];
                winning_safe_A = selected_safes[i];
                winning_safe_B = selected_safes[j];
            }

        }
    }
}

// Function that updates the state of the dial. Input:number. Output:dial_state enum
function dialState(safe_number: number) {
    switch (safe_number) {
        case (1):
            dial = dial_state.one;
            screen_text = "Safe 1!";
            safe1.open = true;
            return dial;
        case (2):
            dial = dial_state.two;
            screen_text = "Safe 2!";
            safe2.open = true;
            return dial;
        case (3):
            dial = dial_state.three;
            screen_text = "Safe 3!";
            safe3.open = true;
            return dial;
        case (4):
            dial = dial_state.four;
            screen_text = "Safe 4!";
            safe4.open = true;
            return dial;
        case (5):
            dial = dial_state.five;
            screen_text = "Safe 5!";
            safe5.open = true;
            return dial;
        case (6):
            dial = dial_state.six;
            screen_text = "Safe 6!";
            safe6.open = true;
            return dial;
        case (7):
            dial = dial_state.seven;
            screen_text = "Safe 7!";
            safe7.open = true;
            return dial;
        case (8):
            dial = dial_state.eight;
            screen_text = "Safe 8!";
            safe8.open = true;
            return dial;
        case (9):
            dial = dial_state.nine;
            screen_text = "Safe 9!";
            safe9.open = true;
            return dial;
    }

}

//Function that sets up the logic for the game. Randomises the safes and multipliers and selects 4 safes to be opened. Input:void. Output:void
function gameLogicSetup() {
    //shuffle the multipliers array. multiplier at index 0 will be safe 1, index 1 safe 2 etc.
    shuffle(multipliers);
    //shuffle the safes then splice the array to get only 4 values
    shuffle(safes);
    selected_safes = safes.slice(0, 4);
}

//Function that shuffles an array using Fisher–Yates shuffle. Input:array. Output: array
function shuffle(array) {
    
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

//Interface that is used to draw all the changing parts of the game (changed due to game play)
interface iDraw {
    x: number;
    y: number;
    draw();
}

//Function that draws the parts of the game that do not change. Input:void. Output:void
function background() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 1024, 720);
    ctx.save();
    ctx.drawImage(safe_background, 100, 0, safe_background.width, safe_background.height);
    ctx.drawImage(safe_dial, 675, 275, safe_dial.width, safe_dial.height);
   


    leds_cycle++;
    if (leds_cycle < led_cycle_rate) {
        ctx.drawImage(leds_1, 680, 250, leds_1.width, leds_1.height);
        ctx.drawImage(leds_2, 845, 250, leds_2.width, leds_2.height);
    }
    else if (leds_cycle >= led_cycle_rate && leds_cycle < 2 * led_cycle_rate) {
        ctx.drawImage(leds_2, 680, 250, leds_2.width, leds_2.height);
        ctx.drawImage(leds_3, 845, 250, leds_3.width, leds_3.height);
    }
    else if (leds_cycle >= 2 * led_cycle_rate && leds_cycle < 3 * led_cycle_rate) {
        ctx.drawImage(leds_3, 680, 250, leds_3.width, leds_3.height);
        ctx.drawImage(leds_1, 845, 250, leds_1.width, leds_1.height);
    }
    else if (leds_cycle == 3 * led_cycle_rate) {
        leds_cycle = 0;
    }
    
    if (lose) {
        flash_marker++;
        if (flash_marker > flash_marker_rate) {
            ctx.scale(0, 0);
        }
        if (flash_marker == 2 * flash_marker_rate) {
            ctx.scale(1, 1);
            flash_marker = 0;
        }
        ctx.drawImage(red_marker, 800, 270, red_marker.width, red_marker.height);
    }
    if (win) {
        ctx.drawImage(green_marker, 800, 270, green_marker.width, green_marker.height);
    }

    ctx.restore();
}

//Class for the safe dial
class cDial implements iDraw {
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public rotation: number = 0;

    private flash_rate: number = 20;
    private flash: number = 0;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.width = number_dial_default.width;
        this.height = number_dial_default.height;

    }
    public draw = (): void => {
        ctx.save();
        ctx.translate(820, 450);
        
        switch (dial) {
            case (dial_state.one):
                ctx.rotate((2 * Math.PI) / 9);
                break;
            case (dial_state.two):
                ctx.rotate((2 * Math.PI));
                break;
            case (dial_state.three):
                ctx.rotate(8 * ((2 * Math.PI) / 9));
                break;
            case (dial_state.four):
                ctx.rotate(7 * ((2 * Math.PI) / 9));
                break;
            case (dial_state.five):
                ctx.rotate(6 * ((2 * Math.PI) / 9));
                break;
            case (dial_state.six):
                ctx.rotate(5 * ((2 * Math.PI) / 9));
                break;
            case (dial_state.seven):
                ctx.rotate(4 * ((2 * Math.PI) / 9));
                break;
            case (dial_state.eight):
                ctx.rotate(3 * ((2 * Math.PI) / 9));
                break;
            case (dial_state.nine):
                ctx.rotate(2 * ((2 * Math.PI) / 9));
                break;
            case (dial_state.spinning):
                this.rotation += 0.02;
                ctx.rotate(this.rotation);
                break;
        }
        

        if (win) {
            this.rotation += 0.05;
            ctx.rotate(this.rotation);
            ctx.drawImage(number_dial_green, -(number_dial_green.width / 2), -(number_dial_green.height / 2), number_dial_green.width, number_dial_green.height);
        }
        else if (lose) {
            this.flash++;
            if (this.flash < this.flash_rate) {
                ctx.drawImage(number_dial_red, -(number_dial_red.width / 2), -(number_dial_red.height / 2), number_dial_red.width, number_dial_red.height);
            }
            if (this.flash >= this.flash_rate && this.flash < 2 * this.flash_rate) {
                ctx.drawImage(number_dial_default, -(this.width / 2), -(this.height / 2), this.width, this.height);
            }
            if (this.flash == 2 * this.flash_rate) {
                this.flash = 0;
            }

        }
        else {
            ctx.drawImage(number_dial_default, -(this.width / 2), -(this.height / 2), this.width, this.height);
        }
        
        ctx.restore();
    }
}

//Class for the button
class cButton implements iDraw {
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    private flash_rate: number = 50;
    private flash: number = 0;
  

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.width = spin.width;
        this.height = spin.height;

        
        canvas.addEventListener("mousedown", this.mouseDown, false);
        canvas.addEventListener("mouseup", this.mouseUp, false);
    }

    public draw = (): void => {
        ctx.save();

        if (!spinning && !win && !lose) {
            //flash
            this.flash++;
            if (this.flash > this.flash_rate) {
                ctx.scale(0, 0);
            }
            if (this.flash == 2 * this.flash_rate) {
                ctx.scale(this.x, this.y);
                this.flash = 0;
            }
            ctx.drawImage(spin, this.x, this.y, this.width, this.height);
        }
        ctx.restore();
    }

    public down: boolean = false;

    public mouseDown = (event: MouseEvent): void => {
        var x: number = event.x;
        var y: number = event.y;
        //Check if the user has pressed the mouse over where the button is 
        if (x > this.x - this.width && y > this.y - this.height &&
            x < this.x + this.width && y < this.y + this.height && !spinning && !win && !lose) {
            this.down = true;
            spinning = true;

            spin_cycle = 0;

        }
    }

    public mouseUp = (event: MouseEvent): void => {
        this.down = false;

    }
}

//Class for the main screen text
class cScreenText implements iDraw {
    public x: number;
    public y: number;

    private flash_rate: number = 20;
    private flash: number = 0;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public draw = (): void => {
        ctx.save();
        ctx.fillStyle = "Black";
        ctx.font = 40 + "px Verdana";
        ctx.textAlign = "center";
        if (win) {
            this.flash++;
            if (this.flash > this.flash_rate) {
                ctx.scale(0, 0);
            }
            if (this.flash == 2 * this.flash_rate) {
                ctx.scale(this.x, this.y);
                this.flash = 0;
            }
        }
        ctx.fillText(screen_text, this.x, this.y);
        ctx.restore();
    }

}

//Class for the safe screen
class cSafeScreen implements iDraw {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public draw = (): void => {
        ctx.save();
        ctx.fillStyle = "White";
        ctx.font = 40 + "px Verdana";
        ctx.textAlign = "center";
        if (!win) {
            ctx.drawImage(safe_screen, this.x, this.y, safe_screen.width, safe_screen.height);
            safe_screen_text = safe_screen_1 + "   " + safe_screen_2 + "   " + safe_screen_3 + "   " + safe_screen_4;

        }
        else {
            ctx.drawImage(safe_screen_win, this.x, this.y, safe_screen_win.width, safe_screen_win.height);
            safe_screen_text = "WIN!";
        }
        ctx.fillText(safe_screen_text, this.x + 150, this.y + 50);
        ctx.restore();
    }
}

//Class for the safes
class cSafe implements iDraw {
    public x: number;
    public y: number;
    public open: boolean;

    private width: number;
    private height: number;
    private safe_number: number;
    private multiplier: number;
    private multiplier_image: HTMLImageElement;
    private multiplier_image_flash: HTMLImageElement;
    private flash_rate: number = 20;
    private flash: number = 0;

    constructor(x: number, y: number, safe_number: number, multiplier: number) {
        this.x = x;
        this.y = y;
        this.safe_number = safe_number;
        this.open = false;
        this.width = safe_closed.width;
        this.height = safe_closed.height;
        this.multiplier = multiplier;
        if (multiplier == multiplier1) {
            this.multiplier_image = money;
            this.multiplier_image_flash = money_flash;
        } else if (multiplier == multiplier2) {
            this.multiplier_image = ring;
            this.multiplier_image_flash = ring_flash;
        } else if (multiplier == multiplier3) {
            this.multiplier_image = gold;
            this.multiplier_image_flash = gold_flash;
        }
    }

    public draw = (): void => {
        ctx.save();
        ctx.fillStyle = "White";
        ctx.font = 40 + "px Verdana";
        ctx.textAlign = "center";
        if (win) {
            ctx.drawImage(safe_open, this.x, this.y, this.width, this.height);
            if (this.safe_number == winning_safe_A || this.safe_number == winning_safe_B) {
                this.flash++;
                if (this.flash < this.flash_rate) {
                    ctx.drawImage(this.multiplier_image, this.x, this.y, this.multiplier_image.width , this.multiplier_image.height);
                }
                if (this.flash >= this.flash_rate && this.flash < 2 * this.flash_rate) {
                    ctx.drawImage(this.multiplier_image_flash, this.x, this.y, this.multiplier_image_flash.width, this.multiplier_image_flash.height);
                }
                if (this.flash == 2 * this.flash_rate) {
                    this.flash = 0;
                }
                
            }
            ctx.fillText(this.multiplier.toString() + "X", this.x + 95, this.y + 100);
            ctx.strokeText(this.multiplier.toString() + "X", this.x + 95, this.y + 100);
        }
        else {
            if (!this.open) {

                ctx.drawImage(safe_closed, this.x, this.y, this.width, this.height);
                ctx.fillText(this.safe_number.toString(), this.x + 83, this.y + 82);

            }
            else {
                ctx.drawImage(safe_open, this.x, this.y, this.width, this.height);
                ctx.drawImage(this.multiplier_image, this.x, this.y, this.multiplier_image.width, this.multiplier_image.height);
                ctx.fillText(this.multiplier.toString() + "X", this.x + 95, this.y + 100);
                ctx.strokeText(this.multiplier.toString() + "X", this.x + 95, this.y + 100);
            }
        }
        
        ctx.restore();
    }

}

//Actions to occur when window loads
window.onload = () => {
    //load all of the HTML elements
    safe_background = <HTMLImageElement>document.getElementById('safe_background');
    safe_closed = <HTMLImageElement>document.getElementById('safe');
    safe_open = <HTMLImageElement>document.getElementById('safe_open');
    spin = <HTMLImageElement>document.getElementById('spin');
    safe_dial = <HTMLImageElement>document.getElementById('safe_dial');
    leds_1 = <HTMLImageElement>document.getElementById('leds_1');
    leds_2 = <HTMLImageElement>document.getElementById('leds_2');
    leds_3 = <HTMLImageElement>document.getElementById('leds_3');
    number_dial_default = <HTMLImageElement>document.getElementById('number_dial_default');
    number_dial_red = <HTMLImageElement>document.getElementById('number_dial_red');
    number_dial_green = <HTMLImageElement>document.getElementById('number_dial_green');
    safe_screen = <HTMLImageElement>document.getElementById('safe_screen');
    safe_screen_win = <HTMLImageElement>document.getElementById('safe_screen_win');
    money = <HTMLImageElement>document.getElementById('money');
    money_flash = <HTMLImageElement>document.getElementById('money_flash');
    ring = <HTMLImageElement>document.getElementById('ring');
    ring_flash = <HTMLImageElement>document.getElementById('ring_flash');
    gold = <HTMLImageElement>document.getElementById('gold');
    gold_flash = <HTMLImageElement>document.getElementById('gold_flash');
    red_marker = <HTMLImageElement>document.getElementById('red_marker');
    green_marker = <HTMLImageElement>document.getElementById('green_marker');
    
    canvas = <HTMLCanvasElement>document.getElementById('cnvs');
    ctx = canvas.getContext("2d");
    //Set up the logic for the game
    gameLogicSetup();
    //Set the intial text for the main screen
    screen_text = "Match a pair for a safe busting multiplier!";
    //Create the safes
    safe1 = new cSafe(150, 180, 1, multipliers[0]);
    safe2 = new cSafe(325, 180, 2, multipliers[1]);
    safe3 = new cSafe(500, 180, 3, multipliers[2]);
    safe4 = new cSafe(150, 320, 4, multipliers[3]);
    safe5 = new cSafe(325, 320, 5, multipliers[4]);
    safe6 = new cSafe(500, 320, 6, multipliers[5]);
    safe7 = new cSafe(150, 460, 7, multipliers[6]);
    safe8 = new cSafe(325, 460, 8, multipliers[7]);
    safe9 = new cSafe(500, 460, 9, multipliers[8]);

    //Add all class elements to be drawn into the draw array
    draw_array.push(safe1);
    draw_array.push(safe2);
    draw_array.push(safe3);
    draw_array.push(safe4);
    draw_array.push(safe5);
    draw_array.push(safe6);
    draw_array.push(safe7);
    draw_array.push(safe8);
    draw_array.push(safe9);
    draw_array.push(new cDial(678, 318));
    draw_array.push(new cButton(785, 415));
    draw_array.push(new cScreenText(555, 90));
    draw_array.push(new cSafeScreen(670, 165));
    //Call the game loop function
    gameLoop();
}