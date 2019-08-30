/*  Author: Joseph Dudgeon
    Date: 26/08/19
    Assets provided by InTouchGames
    Created using TypeScript HTML Application Template
    (https://marketplace.visualstudio.com/items?itemName=Rich-Newman.TypeScriptHTMLApplicationTemplate&ssr=false#qna)
*/
//Declare varibales
var draw_array = new Array();
var canvas;
var ctx;
var safe_background;
var safe_open;
var safe_closed;
var safe1;
var safe2;
var safe3;
var safe4;
var safe5;
var safe6;
var safe7;
var safe8;
var safe9;
var spin;
var safe_dial;
var button;
var leds_1;
var leds_2;
var leds_3;
var gold;
var gold_flash;
var ring;
var ring_flash;
var money;
var money_flash;
var number_dial_default;
var number_dial_red;
var number_dial_green;
var safe_screen;
var safe_screen_win;
var red_marker;
var green_marker;
var safe_screen_text;
var safe_screen_1 = "_";
var safe_screen_2 = "_";
var safe_screen_3 = "_";
var safe_screen_4 = "_";
var leds_cycle = 0;
var led_cycle_rate = 15;
var flash_marker = 0;
var flash_marker_rate = 20;
var button_pressed = false;
var spin_rate = 100;
var spin_cycle = 0;
var screen_text;
var spinning = false;
var lose = false;
var lose_count = 0;
var lose_show = 50;
var win = false;
var safes = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var selected_safes;
var selected_safes_itr = 0;
var multiplier1 = 16;
var multiplier2 = 17;
var multiplier3 = 18;
var multipliers = [multiplier1, multiplier1, multiplier1, multiplier2, multiplier2, multiplier2, multiplier3, multiplier3, multiplier3];
var revealed_multipliers = new Array();
var winning_multiplier;
var winning_safe_A;
var winning_safe_B;
var bet = 100;
// Enum used to declare and control the state of the dial
var dial_state;
(function (dial_state) {
    dial_state[dial_state["spinning"] = 0] = "spinning";
    dial_state[dial_state["one"] = 1] = "one";
    dial_state[dial_state["two"] = 2] = "two";
    dial_state[dial_state["three"] = 3] = "three";
    dial_state[dial_state["four"] = 4] = "four";
    dial_state[dial_state["five"] = 5] = "five";
    dial_state[dial_state["six"] = 6] = "six";
    dial_state[dial_state["seven"] = 7] = "seven";
    dial_state[dial_state["eight"] = 8] = "eight";
    dial_state[dial_state["nine"] = 9] = "nine";
})(dial_state || (dial_state = {}));
var dial = dial_state.one;
//Main game loop function ran every frame  
function gameLoop() {
    requestAnimationFrame(gameLoop);
    background();
    for (var i = 0; i < draw_array.length; i++) {
        var d = draw_array[i];
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
function safe_screen_text_update(safe_number, safe_itr) {
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
function dialState(safe_number) {
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
    var counter = array.length;
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        var index = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        var temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
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
var cDial = /** @class */ (function () {
    function cDial(x, y) {
        var _this = this;
        this.rotation = 0;
        this.flash_rate = 20;
        this.flash = 0;
        this.draw = function () {
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
                    _this.rotation += 0.02;
                    ctx.rotate(_this.rotation);
                    break;
            }
            if (win) {
                _this.rotation += 0.05;
                ctx.rotate(_this.rotation);
                ctx.drawImage(number_dial_green, -(number_dial_green.width / 2), -(number_dial_green.height / 2), number_dial_green.width, number_dial_green.height);
            }
            else if (lose) {
                _this.flash++;
                if (_this.flash < _this.flash_rate) {
                    ctx.drawImage(number_dial_red, -(number_dial_red.width / 2), -(number_dial_red.height / 2), number_dial_red.width, number_dial_red.height);
                }
                if (_this.flash >= _this.flash_rate && _this.flash < 2 * _this.flash_rate) {
                    ctx.drawImage(number_dial_default, -(_this.width / 2), -(_this.height / 2), _this.width, _this.height);
                }
                if (_this.flash == 2 * _this.flash_rate) {
                    _this.flash = 0;
                }
            }
            else {
                ctx.drawImage(number_dial_default, -(_this.width / 2), -(_this.height / 2), _this.width, _this.height);
            }
            ctx.restore();
        };
        this.x = x;
        this.y = y;
        this.width = number_dial_default.width;
        this.height = number_dial_default.height;
    }
    return cDial;
}());
//Class for the button
var cButton = /** @class */ (function () {
    function cButton(x, y) {
        var _this = this;
        this.flash_rate = 50;
        this.flash = 0;
        this.draw = function () {
            ctx.save();
            if (!spinning && !win && !lose) {
                //flash
                _this.flash++;
                if (_this.flash > _this.flash_rate) {
                    ctx.scale(0, 0);
                }
                if (_this.flash == 2 * _this.flash_rate) {
                    ctx.scale(_this.x, _this.y);
                    _this.flash = 0;
                }
                ctx.drawImage(spin, _this.x, _this.y, _this.width, _this.height);
            }
            ctx.restore();
        };
        this.down = false;
        this.mouseDown = function (event) {
            var x = event.x;
            var y = event.y;
            //Check if the user has pressed the mouse over where the button is 
            if (x > _this.x - _this.width && y > _this.y - _this.height &&
                x < _this.x + _this.width && y < _this.y + _this.height && !spinning && !win && !lose) {
                _this.down = true;
                spinning = true;
                spin_cycle = 0;
            }
        };
        this.mouseUp = function (event) {
            _this.down = false;
        };
        this.x = x;
        this.y = y;
        this.width = spin.width;
        this.height = spin.height;
        canvas.addEventListener("mousedown", this.mouseDown, false);
        canvas.addEventListener("mouseup", this.mouseUp, false);
    }
    return cButton;
}());
//Class for the main screen text
var cScreenText = /** @class */ (function () {
    function cScreenText(x, y) {
        var _this = this;
        this.flash_rate = 20;
        this.flash = 0;
        this.draw = function () {
            ctx.save();
            ctx.fillStyle = "Black";
            ctx.font = 40 + "px Verdana";
            ctx.textAlign = "center";
            if (win) {
                _this.flash++;
                if (_this.flash > _this.flash_rate) {
                    ctx.scale(0, 0);
                }
                if (_this.flash == 2 * _this.flash_rate) {
                    ctx.scale(_this.x, _this.y);
                    _this.flash = 0;
                }
            }
            ctx.fillText(screen_text, _this.x, _this.y);
            ctx.restore();
        };
        this.x = x;
        this.y = y;
    }
    return cScreenText;
}());
//Class for the safe screen
var cSafeScreen = /** @class */ (function () {
    function cSafeScreen(x, y) {
        var _this = this;
        this.draw = function () {
            ctx.save();
            ctx.fillStyle = "White";
            ctx.font = 40 + "px Verdana";
            ctx.textAlign = "center";
            if (!win) {
                ctx.drawImage(safe_screen, _this.x, _this.y, safe_screen.width, safe_screen.height);
                safe_screen_text = safe_screen_1 + "   " + safe_screen_2 + "   " + safe_screen_3 + "   " + safe_screen_4;
            }
            else {
                ctx.drawImage(safe_screen_win, _this.x, _this.y, safe_screen_win.width, safe_screen_win.height);
                safe_screen_text = "WIN!";
            }
            ctx.fillText(safe_screen_text, _this.x + 150, _this.y + 50);
            ctx.restore();
        };
        this.x = x;
        this.y = y;
    }
    return cSafeScreen;
}());
//Class for the safes
var cSafe = /** @class */ (function () {
    function cSafe(x, y, safe_number, multiplier) {
        var _this = this;
        this.flash_rate = 20;
        this.flash = 0;
        this.draw = function () {
            ctx.save();
            ctx.fillStyle = "White";
            ctx.font = 40 + "px Verdana";
            ctx.textAlign = "center";
            if (win) {
                ctx.drawImage(safe_open, _this.x, _this.y, _this.width, _this.height);
                if (_this.safe_number == winning_safe_A || _this.safe_number == winning_safe_B) {
                    _this.flash++;
                    if (_this.flash < _this.flash_rate) {
                        ctx.drawImage(_this.multiplier_image, _this.x, _this.y, _this.multiplier_image.width, _this.multiplier_image.height);
                    }
                    if (_this.flash >= _this.flash_rate && _this.flash < 2 * _this.flash_rate) {
                        ctx.drawImage(_this.multiplier_image_flash, _this.x, _this.y, _this.multiplier_image_flash.width, _this.multiplier_image_flash.height);
                    }
                    if (_this.flash == 2 * _this.flash_rate) {
                        _this.flash = 0;
                    }
                }
                ctx.fillText(_this.multiplier.toString() + "X", _this.x + 95, _this.y + 100);
                ctx.strokeText(_this.multiplier.toString() + "X", _this.x + 95, _this.y + 100);
            }
            else {
                if (!_this.open) {
                    ctx.drawImage(safe_closed, _this.x, _this.y, _this.width, _this.height);
                    ctx.fillText(_this.safe_number.toString(), _this.x + 83, _this.y + 82);
                }
                else {
                    ctx.drawImage(safe_open, _this.x, _this.y, _this.width, _this.height);
                    ctx.drawImage(_this.multiplier_image, _this.x, _this.y, _this.multiplier_image.width, _this.multiplier_image.height);
                    ctx.fillText(_this.multiplier.toString() + "X", _this.x + 95, _this.y + 100);
                    ctx.strokeText(_this.multiplier.toString() + "X", _this.x + 95, _this.y + 100);
                }
            }
            ctx.restore();
        };
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
        }
        else if (multiplier == multiplier2) {
            this.multiplier_image = ring;
            this.multiplier_image_flash = ring_flash;
        }
        else if (multiplier == multiplier3) {
            this.multiplier_image = gold;
            this.multiplier_image_flash = gold_flash;
        }
    }
    return cSafe;
}());
//Actions to occur when window loads
window.onload = function () {
    //load all of the HTML elements
    safe_background = document.getElementById('safe_background');
    safe_closed = document.getElementById('safe');
    safe_open = document.getElementById('safe_open');
    spin = document.getElementById('spin');
    safe_dial = document.getElementById('safe_dial');
    leds_1 = document.getElementById('leds_1');
    leds_2 = document.getElementById('leds_2');
    leds_3 = document.getElementById('leds_3');
    number_dial_default = document.getElementById('number_dial_default');
    number_dial_red = document.getElementById('number_dial_red');
    number_dial_green = document.getElementById('number_dial_green');
    safe_screen = document.getElementById('safe_screen');
    safe_screen_win = document.getElementById('safe_screen_win');
    money = document.getElementById('money');
    money_flash = document.getElementById('money_flash');
    ring = document.getElementById('ring');
    ring_flash = document.getElementById('ring_flash');
    gold = document.getElementById('gold');
    gold_flash = document.getElementById('gold_flash');
    red_marker = document.getElementById('red_marker');
    green_marker = document.getElementById('green_marker');
    canvas = document.getElementById('cnvs');
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
};
//# sourceMappingURL=app.js.map