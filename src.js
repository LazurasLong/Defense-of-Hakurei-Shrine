   //canvas
    var canvas = document.getElementById('gameboard');
    var ctx = canvas.getContext('2d');
    var canvas_pause = document.getElementById('gameboard_pause');
    var ctx_pause = canvas_pause.getContext('2d');
    var ending = {
        opacity: 0,
        clock: 0,
        active: false,
    }
  
    //main game constructor
    var game;
        //initialize in-game background
    
    var timer = 0;
    /******************************************keylisteners*****************************************/
    /***********************************************************************************************/
    /*4.12.2017: Combined key to be added.*/
    //Game status
    var opening = true;
    var ingame = false;
  
    var resume = {
        opacity: 0,
        active: false,
    };
    //in-game pauser
    var pause = {
        opacity: 0,
        active: false,
    };
    //images
    var menuImg = new Image();
    var instructionImg = new Image();
    
    menuImg.src = './menuimg_new.jpg';
    instructionImg.src = './instruction.png';
    //Key listener
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    /****************************************OPENING MENU ATTRIBUTES*******************************************/
    var zoomScale = 2; //Extent of zooming animation.
    var zoomSpeed = 0.03;
    var background = { x: 0, y: -130 };
    var title = { x: 0, y: 200, opacity: 0, init: false};
    var options = [];
    var options_death = [];
    var options_pause = [];
    var spacing = 50;
    var menuOpen = true;
    var hiddingAnimation = false;
    var contentOpacity = 0;
    /*Launching game animation and loading text*/
    var blackout = {
        opacity: 0,
        clock: 0,
        loadingText: function () {
            ctx.fillStyle = 'white';
            ctx.font = "35px 'Abril Fatface'";
            ctx.textAlign = 'left';
            ctx.fillText("Now Loading", canvas.width - 300, canvas.height - 130)
            ctx.font = "25px 'Kaiti'";
            ctx.fillText("少女祈祷中", canvas.width - 300, canvas.height - 80)
        }
    };
    var characterOptions = [];
    var togame = false;
    /*******************************************/
    function createoptions(num, text, selected) {
        this.display = true;
        this.x = 20;
        this.y = 300 + num * spacing;
        this.color;
        this.opacity = 0;
        this.text = text;
        this.init = false;
        this.selected = selected;
        this.selectedWhiteness = 255; //the initial color when option is selected
        this.selectedWhitenessDecrease = true;
        this.selectedAnimation = function () {
            if (!this.selectedAnimationExecuted) {
                this.selectedAnimationClock++;
                if (this.selectedAnimationClock <= 9) {
                    if (this.selectedAnimationClock <= 3) {
                        this.x -= 1;
                    }
                    else if (this.selectedAnimationClock > 3 && this.selectedAnimationClock <= 6) {
                        this.x += 3;
                    }
                    else if (this.selectedAnimationClock > 6 && this.selectedAnimationClock < 10) {
                        this.x -= 2;
                    }
                }
                    else if (this.selectedAnimationClock > 20){
                        this.selectedAnimationClock = 0;
                        this.selectedAnimationExecuted = true;
                    }
               // debugger;
            }
        };
        this.startedAnimation = function () {
            this.startedAnimationClock++;
            if ((this.startedAnimationClock >= 3 && this.startedAnimationClock <= 6) || (this.startedAnimationClock >= 9 && this.startedAnimationClock <= 12) || (this.startedAnimationClock >= 15 && this.startedAnimationClock <= 18)) {
                this.color = "rgba(113,113,113,";
            } else {
                this.color = "rgba(255,255,255,";
                if (this.startedAnimationClock > 18) {
                    this.startedAnimationClock = 0;
                    this.startedAnimationExecuted = true;
                }
            }
        };
        this.started = false;
        this.selectedAnimationExecuted = true;
        this.startedAnimationExecuted = true;
        this.selectedAnimationClock = 0;
        this.startedAnimationClock = 0;
    }
    
  
    for (i = 0; i < 10; i++) {
        var display;
        if (i == 0) { display = "Story Mode" };
        if (i == 1) { display = "Extra Mode" };
        if (i == 2) { display = "Practice Mode" };
        if (i == 3) { display = "Scoreboard" };
        if (i == 4) { display = "Manual" };
        if (i == 5) { display = "Version Info" };
        if (i == 6) { display = "About" };
        if (i == 7) { display = "Quit" };
     
        //Initializing the selected option(the first one)
        if (i == 0) {
            selected = true;
        }
        else { selected = false; }
        options.push(new createoptions(i, display, selected));
    }
    function characterSelections(name, image, description, active, opacity, x, y, titlebg, melee, ranged, special, spell, speed, recovery) {
        this.img = new Image();
        this.img.src = image;
        this.titlebg = new Image();
        this.titlebg.src = titlebg;
        this.name = name;
        this.describe = description;
        this.active = active;
        this.transition = false;
        this.x = x;
        this.y = y;
        this.opacity = opacity;
        this.nameX = canvas.width - 355;
        this.nameY = 200;
        this.melee = melee;
        this.ranged = ranged;
        this.special = special;
        this.spell = spell;
        this.speed = speed;
        this.recovery = recovery;
    }
    for (i = 0; i < 6; i++) {
        /*Local variables are set to easily identify the attributes of constructor characterSelections.
        * This could also be done by directly pushing constructor functions.
        *
        *
        *
        */
        var characterName;
        var img;
        var titlebg;
        var description;
        var active;
        var opacity;
        var x;
        var y;
        var melee;
        var ranged;
        var special;
        var spell;
        var speed;
        var recovery;
        if (i == 0) {
            characterName = "Hakurei Reimu";
            img = './player/reimu/menuimg.png';
            titlebg = './player/reimu/titlebg.png';
            description = 'The eternal guardian of the sacred place.';
            active = true;
            opacity = 1;
            x = 25;
            y = 130;
            melee = "Hakurei Amulet";
            ranged = "Homing Amulet";
            special = "Musou Hoei -Pure";
            spell = "Musou Fuuin";
            speed = "★★★";
            recovery = "★★★";
            /*Property descriptions*/
        };
        if (i == 1) {
            characterName = "Kirisame Marisa";
            img = './player/marisa/menuimg.png';
            titlebg = './player/marisa/titlebg.png';
            description = 'They called her thief.';
            active = false;
            opacity = 0;
            x = 85;
            y = 130;
            melee = "Magic Rockets";
            ranged = "Illusion Laser";
            special = "Flying Stars";
            spell = "Master Spark";
            speed = "★★★★★";
            recovery = "★★";
        };
        if (i == 2) {
            characterName = "Hong Meiling";
            img = './player/meiling/menuimg.png';
            titlebg = './player/meiling/titlebg.png';
            description = "The Chinese Doorkeeper of Scarlet Devil Mansion.";
            active = false;
            opacity = 0;
            x = 85;
            y = 130;
            melee = "TO BE RELEASED";
            ranged = "TO BE RELEASED";
            special = "TO BE RELEASED";
            spell = "TO BE RELEASED";
            speed = "TO BE RELEASED";
            recovery = "★★★★★";
        };
   
        
        characterOptions.push(new characterSelections(characterName, img, description, active, opacity, x, y, titlebg, melee, ranged, special, spell, speed, recovery))
    }
    
    /***************************************************************************************************/
    function draw() {
        timer++;
        ctx_pause.clearRect(0, 0, canvas_pause.width, canvas_pause.height);
        
        if (opening) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            //building initial animation of menu.
            ctx.scale(zoomScale, zoomScale);
            ctx.drawImage(menuImg, background.x, background.y);
            ctx.scale(1 / zoomScale, 1 / zoomScale);
            /*initial background animation*/
            if (zoomScale > 1.05) {
                if (zoomSpeed < 0.15) {
                    zoomSpeed += 0.0005;
                }
                zoomScale -= zoomSpeed;
            }
            else if (background.y > -200) {
                background.y -= 6;
            }
                /*After initializing background animation, initialize menu animation*/
            else {
                for (i = 0; i < 8; i++) {
                    if (options[i].x < 50 && options[i].init == false) {
                        options[i].x += 1.5;
                        if (options[i].opacity < 1) {
                            options[i].opacity += 0.1;
                        }
                        if (options[i].x >= 50) {
                            options[i].init = true;
                        }
                    }
                }
            }
            if (!title.init) {
                if (title.x < 50) {
                    title.x += 2.7;
                    if (title.opacity < 1) {
                        title.opacity += 0.06;
                    } else if (title.opacity >= 1) { title.opacity = 1 };
                } else { title.init = true; }
            }
            /**finished initialization**/
            if (menuOpen) {/*conditions to be added*/
                var gradient = ctx.createLinearGradient(0, title.y - 37.5, 0, title.y + 20);
                gradient.addColorStop("0", "rgb(237,49,0)");
                gradient.addColorStop("1", "rgb(21,5,0)");
                // Fill with gradient
                ctx.globalAlpha = title.opacity;
                //    ctx.fillStyle = "rgba(255,179,179," + title.opacity + ")";
                ctx.font = "75px 'Lobster'";
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 3;
                ctx.strokeText("Defense of Gensokyo", title.x, title.y);
                ctx.fillStyle = gradient;
                ctx.fillText("Defense of Gensokyo", title.x, title.y);
                ctx.font = "35px 'SimHei'";
                ctx.fillStyle = "white";
                ctx.shadowBlur = 15;
                ctx.shadowColor = "black";
                ctx.fillText("東方六魂記", title.x + 500, title.y + 50);
                ctx.font = "20px 'Abril Fatface'";
                ctx.fillStyle = "white";
                ctx.fillText("Ver 0.01", title.x, title.y + 45);
                ctx.globalAlpha = 1;
                //now start drawing options
                for (i = 0; i < 8; i++) {
                    if (options[i].selected) {
                        //Color blinker
                        if (options[i].startedAnimationExecuted) {
                            options[i].color = "rgba(" + options[i].selectedWhiteness + "," + options[i].selectedWhiteness + "," + options[i].selectedWhiteness + ",";
                            if (options[i].selectedWhitenessDecrease) {
                                options[i].selectedWhiteness -= 2;
                                if (options[i].selectedWhiteness < 193) {
                                    options[i].selectedWhitenessDecrease = false;
                                }
                            } else {
                                options[i].selectedWhiteness += 2;
                                if (options[i].selectedWhiteness >= 255) {
                                    options[i].selectedWhitenessDecrease = true;
                                }
                            }
                        }
                        else {
                            options[i].startedAnimation();
                            hiddingAnimation = true;
                        }
                    }
                    else if (options[i].selected == false) {
                        options[i].color = "rgba(113,113,113,";
                    }
                    options[i].selectedAnimation();
                }
                /*display*/
                for (i = 0; i < 8; i++) {
                    //selected animation
                    ctx.fillStyle = options[i].color + options[i].opacity + ")";
                    ctx.font = "normal 35px 'Abril Fatface'";
                    //   console.log(options[i].color);
                    ctx.fillText(options[i].text, options[i].x, options[i].y);
                }
                //restore shadowblur. (so the title won't have shadow.)
                ctx.shadowBlur = 0;
            }
            if (options[0].started) {
                ctx.globalAlpha = contentOpacity; //Normally after a transition the value of contentOpacity is 1.
                ctx.fillStyle = 'rgba(0,0,0,0.5)'
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.shadowBlur = 5;
                ctx.shadowOffsetX = 1.5;
                ctx.shadowOffsetY = 1.5;
                ctx.fillStyle = "rgba(255,179,179,1)";
                ctx.textAlign = "center";
                ctx.font = "45px 'Abril Fatface'";
                ctx.fillText("Choose A Scenario", canvas.width / 2, 60);
                ctx.font = "30px 'Abril Fatface'";
                ctx.fillText("Press left or right to switch characters", canvas.width / 2 + 270, 105);
                ctx.textAlign = "left";
                for (i = 0; i < 6; i++) {
                    /*Title of properties*/
                    var propertyTitle = {
                        line1: function (x) {
                            return "Primary Weapon: " + characterOptions[x].melee;
                        },
                        line2: function (x) {
                            return "Secondary Weapon: " + characterOptions[x].ranged;
                        },
                        line3: function (x) {
                            return "Special Attack: " + characterOptions[x].special;
                        },
                        line4: function (x) {
                            return "Speed: " + characterOptions[x].speed;
                        },
                    }
                    if (characterOptions[i].active && !characterOptions[i].transition) {
                        ctx.drawImage(characterOptions[i].img, characterOptions[i].x, characterOptions[i].y);
                        ctx.drawImage(characterOptions[i].titlebg, canvas.width / 2 - 100, 115);
                        ctx.font = "65px 'Abril Fatface'";
                        ctx.textAlign = 'center';
                        ctx.fillText(characterOptions[i].name, characterOptions[i].nameX, characterOptions[i].nameY);
                        ctx.font = "30px 'Abril Fatface'";
                        ctx.fillText(characterOptions[i].describe, characterOptions[i].nameX, characterOptions[i].nameY + 50);
                        //restore Textalign
                        ctx.textAlign = 'left';
                        /********Properties Display*********/
                        ctx.font = "35px 'Abril Fatface'";
                        var spacing = 60;
                        ctx.strokeStyle = 'black';
                        ctx.lineWidth = 4;
                        ctx.strokeText(propertyTitle.line1(i), canvas.width / 2 - 30, 360);
                        ctx.fillText(propertyTitle.line1(i), canvas.width / 2 - 30, 360);
                        ctx.strokeText(propertyTitle.line2(i), canvas.width / 2 - 30, 360 + spacing);
                        ctx.fillText(propertyTitle.line2(i), canvas.width / 2 - 30, 360 + spacing);
                        ctx.strokeText(propertyTitle.line3(i), canvas.width / 2 - 30, 360 + spacing * 2);
                        ctx.fillText(propertyTitle.line3(i), canvas.width / 2 - 30, 360 + spacing * 2);
                        ctx.strokeText(propertyTitle.line4(i), canvas.width / 2 - 30, 360 + spacing * 3);
                        ctx.fillText(propertyTitle.line4(i), canvas.width / 2 - 30, 360 + spacing * 3);
                 /*       ctx.strokeText(propertyTitle.line5(i), canvas.width / 2 - 30, 360 + spacing * 4);
                        ctx.fillText(propertyTitle.line5(i), canvas.width / 2 - 30, 360 + spacing * 4);
                        ctx.strokeText(propertyTitle.line6(i), canvas.width / 2 - 30, 360 + spacing * 5);
                        ctx.fillText(propertyTitle.line6(i), canvas.width / 2 - 30, 360 + spacing * 5);*/
                        /**********************************/
                    }
                    else if (!characterOptions[i].active && characterOptions[i].transition) {
                        //approximately move by 60px;
                        if (characterOptions[i].transition == "right") {
                            var next;
                            if (i != 2) {
                                next = i + 1;
                            } else {
                                next = 0;
                            }
                            /*Fading out this character*/
                            if (characterOptions[i].x > -35) {
                                characterOptions[i].x -= 7;
                            }
                            else if (characterOptions[i].x <= -35) {
                                characterOptions[i].x = -35;
                            }
                            if (characterOptions[i].opacity > 0.1) {
                                characterOptions[i].opacity -= 0.1;
                            }
                            else if (characterOptions[i].opacity <= 0.1) {
                                characterOptions[i].opacity = 0;
                            }
                            /*Entering the next character*/
                            if (characterOptions[next].x > 25) {
                                characterOptions[next].x -= 7;
                            }
                            else if (characterOptions[next].x <= 25) {
                                characterOptions[next].x = 25;
                            }
                            if (characterOptions[next].opacity < 0.9) {
                                characterOptions[next].opacity += 0.1;
                            }
                            else if (characterOptions[next].opacity >= 0.9) {
                                characterOptions[next].opacity = 1;
                            }
                            //   debugger;
                            ctx.globalAlpha = characterOptions[i].opacity;
                            ctx.drawImage(characterOptions[i].img, characterOptions[i].x, characterOptions[i].y);
                            ctx.drawImage(characterOptions[i].titlebg, canvas.width / 2 - 100, 115);
                            ctx.font = "65px 'Abril Fatface'";
                            ctx.textAlign = 'center';
                            ctx.fillText(characterOptions[i].name, characterOptions[i].nameX, characterOptions[i].nameY)
                            ctx.font = "30px 'Abril Fatface'";
                            ctx.fillText(characterOptions[i].describe, characterOptions[i].nameX, characterOptions[i].nameY + 50)
                            //restore Textalign
                            ctx.textAlign = 'left';
                            /********Properties Display*********/
                            ctx.font = "35px 'Abril Fatface'";
                            var spacing = 60;
                            ctx.strokeStyle = 'black';
                            ctx.lineWidth = 4;
                            ctx.strokeText(propertyTitle.line1(i), canvas.width / 2 - 30, 360);
                            ctx.fillText(propertyTitle.line1(i), canvas.width / 2 - 30, 360);
                            ctx.strokeText(propertyTitle.line2(i), canvas.width / 2 - 30, 360 + spacing);
                            ctx.fillText(propertyTitle.line2(i), canvas.width / 2 - 30, 360 + spacing);
                            ctx.strokeText(propertyTitle.line3(i), canvas.width / 2 - 30, 360 + spacing * 2);
                            ctx.fillText(propertyTitle.line3(i), canvas.width / 2 - 30, 360 + spacing * 2);
                            ctx.strokeText(propertyTitle.line4(i), canvas.width / 2 - 30, 360 + spacing * 3);
                            ctx.fillText(propertyTitle.line4(i), canvas.width / 2 - 30, 360 + spacing * 3);
                       /*   ctx.strokeText(propertyTitle.line5(i), canvas.width / 2 - 30, 360 + spacing * 4);
                            ctx.fillText(propertyTitle.line5(i), canvas.width / 2 - 30, 360 + spacing * 4);
                            ctx.strokeText(propertyTitle.line6(i), canvas.width / 2 - 30, 360 + spacing * 5);
                            ctx.fillText(propertyTitle.line6(i), canvas.width / 2 - 30, 360 + spacing * 5);*/
                            /**********************************/
                            //console.log(next + "presentedB");
                            //Now present the next one
                            ctx.globalAlpha = characterOptions[next].opacity;
                            ctx.drawImage(characterOptions[next].img, characterOptions[next].x, characterOptions[next].y);
                            ctx.drawImage(characterOptions[next].titlebg, canvas.width / 2 - 100, 115);
                            ctx.font = "65px 'Abril Fatface'";
                            ctx.textAlign = 'center';
                            ctx.fillText(characterOptions[next].name, characterOptions[i].nameX, characterOptions[i].nameY)
                            ctx.font = "30px 'Abril Fatface'";
                            ctx.fillText(characterOptions[next].describe, characterOptions[i].nameX, characterOptions[i].nameY + 50)
                            //restore Textalign
                            ctx.textAlign = 'left';
                            /********Properties Display*********/
                            ctx.font = "35px 'Abril Fatface'";
                            var spacing = 60;
                            ctx.strokeStyle = 'black';
                            ctx.lineWidth = 4;
                            ctx.strokeText(propertyTitle.line1(next), canvas.width / 2 - 30, 360);
                            ctx.fillText(propertyTitle.line1(next), canvas.width / 2 - 30, 360);
                            ctx.strokeText(propertyTitle.line2(next), canvas.width / 2 - 30, 360 + spacing);
                            ctx.fillText(propertyTitle.line2(next), canvas.width / 2 - 30, 360 + spacing);
                            ctx.strokeText(propertyTitle.line3(next), canvas.width / 2 - 30, 360 + spacing * 2);
                            ctx.fillText(propertyTitle.line3(next), canvas.width / 2 - 30, 360 + spacing * 2);
                            ctx.strokeText(propertyTitle.line4(next), canvas.width / 2 - 30, 360 + spacing * 3);
                            ctx.fillText(propertyTitle.line4(next), canvas.width / 2 - 30, 360 + spacing * 3);
                           /* ctx.strokeText(propertyTitle.line5(next), canvas.width / 2 - 30, 360 + spacing * 4);
                            ctx.fillText(propertyTitle.line5(next), canvas.width / 2 - 30, 360 + spacing * 4);
                            ctx.strokeText(propertyTitle.line6(next), canvas.width / 2 - 30, 360 + spacing * 5);
                            ctx.fillText(propertyTitle.line6(next), canvas.width / 2 - 30, 360 + spacing * 5);*/
                            /**********************************/
                            if (characterOptions[next].x == 25 && characterOptions[next].opacity == 1) {
                                characterOptions[next].active = true;
                                characterOptions[i].transition = false;
                                break;
                            }
                            //debugger;
                        }
                        else if (characterOptions[i].transition == "left") {
                            var next;
                            if (i != 0) {
                                next = i - 1;
                            } else {
                                next = 2;
                            }
                            /*Fading out this character*/
                            if (characterOptions[i].x < 80) {
                                characterOptions[i].x += 7;
                            }
                            else if (characterOptions[i].x >= 80) {
                                characterOptions[i].x = 80;
                            }
                            if (characterOptions[i].opacity > 0.1) {
                                characterOptions[i].opacity -= 0.1;
                            }
                            else if (characterOptions[i].opacity <= 0.1) {
                                characterOptions[i].opacity = 0;
                            }
                            /*Entering the next character*/
                            if (characterOptions[next].x < 25) {
                                characterOptions[next].x += 7;
                            }
                            else if (characterOptions[next].x >= 25) {
                                characterOptions[next].x = 25;
                            }
                            if (characterOptions[next].opacity < 0.9) {
                                characterOptions[next].opacity += 0.1;
                            }
                            else if (characterOptions[next].opacity >= 0.9) {
                                characterOptions[next].opacity = 1;
                            }
                            //   debugger;
                            ctx.globalAlpha = characterOptions[i].opacity;
                            ctx.drawImage(characterOptions[i].img, characterOptions[i].x, characterOptions[i].y);
                            ctx.drawImage(characterOptions[i].titlebg, canvas.width / 2 - 100, 115);
                            ctx.font = "65px 'Abril Fatface'";
                            ctx.textAlign = 'center';
                            ctx.fillText(characterOptions[i].name, characterOptions[i].nameX, characterOptions[i].nameY)
                            ctx.font = "30px 'Abril Fatface'";
                            ctx.fillText(characterOptions[i].describe, characterOptions[i].nameX, characterOptions[i].nameY + 50)
                            //restore Textalign
                            ctx.textAlign = 'left';
                            /********Properties Display*********/
                            ctx.font = "35px 'Abril Fatface'";
                            var spacing = 60;
                            ctx.strokeStyle = 'black';
                            ctx.lineWidth = 4;
                            ctx.strokeText(propertyTitle.line1(i), canvas.width / 2 - 30, 360);
                            ctx.fillText(propertyTitle.line1(i), canvas.width / 2 - 30, 360);
                            ctx.strokeText(propertyTitle.line2(i), canvas.width / 2 - 30, 360 + spacing);
                            ctx.fillText(propertyTitle.line2(i), canvas.width / 2 - 30, 360 + spacing);
                            ctx.strokeText(propertyTitle.line3(i), canvas.width / 2 - 30, 360 + spacing * 2);
                            ctx.fillText(propertyTitle.line3(i), canvas.width / 2 - 30, 360 + spacing * 2);
                            ctx.strokeText(propertyTitle.line4(i), canvas.width / 2 - 30, 360 + spacing * 3);
                            ctx.fillText(propertyTitle.line4(i), canvas.width / 2 - 30, 360 + spacing * 3);
                     /*       ctx.strokeText(propertyTitle.line5(i), canvas.width / 2 - 30, 360 + spacing * 4);
                            ctx.fillText(propertyTitle.line5(i), canvas.width / 2 - 30, 360 + spacing * 4);
                            ctx.strokeText(propertyTitle.line6(i), canvas.width / 2 - 30, 360 + spacing * 5);
                            ctx.fillText(propertyTitle.line6(i), canvas.width / 2 - 30, 360 + spacing * 5);*/
                            /**********************************/
                            ctx.globalAlpha = characterOptions[next].opacity;
                            ctx.drawImage(characterOptions[next].img, characterOptions[next].x, characterOptions[next].y);
                            ctx.drawImage(characterOptions[next].titlebg, canvas.width / 2 - 100, 115);
                            ctx.font = "65px 'Abril Fatface'";
                            ctx.textAlign = 'center';
                            ctx.fillText(characterOptions[next].name, characterOptions[i].nameX, characterOptions[i].nameY)
                            ctx.font = "30px 'Abril Fatface'";
                            ctx.fillText(characterOptions[next].describe, characterOptions[i].nameX, characterOptions[i].nameY + 50)
                            //restore Textalign
                            ctx.textAlign = 'left';
                            /********Properties Display*********/
                            ctx.font = "35px 'Abril Fatface'";
                            var spacing = 60;
                            ctx.strokeStyle = 'black';
                            ctx.lineWidth = 4;
                            ctx.strokeText(propertyTitle.line1(next), canvas.width / 2 - 30, 360);
                            ctx.fillText(propertyTitle.line1(next), canvas.width / 2 - 30, 360);
                            ctx.strokeText(propertyTitle.line2(next), canvas.width / 2 - 30, 360 + spacing);
                            ctx.fillText(propertyTitle.line2(next), canvas.width / 2 - 30, 360 + spacing);
                            ctx.strokeText(propertyTitle.line3(next), canvas.width / 2 - 30, 360 + spacing * 2);
                            ctx.fillText(propertyTitle.line3(next), canvas.width / 2 - 30, 360 + spacing * 2);
                            ctx.strokeText(propertyTitle.line4(next), canvas.width / 2 - 30, 360 + spacing * 3);
                            ctx.fillText(propertyTitle.line4(next), canvas.width / 2 - 30, 360 + spacing * 3);
                        /*    ctx.strokeText(propertyTitle.line5(next), canvas.width / 2 - 30, 360 + spacing * 4);
                            ctx.fillText(propertyTitle.line5(next), canvas.width / 2 - 30, 360 + spacing * 4);
                            ctx.strokeText(propertyTitle.line6(next), canvas.width / 2 - 30, 360 + spacing * 5);
                            ctx.fillText(propertyTitle.line6(next), canvas.width / 2 - 30, 360 + spacing * 5);*/
                            /**********************************/
                            if (characterOptions[next].x == 25 && characterOptions[next].opacity == 1) {
                                characterOptions[next].active = true;
                                characterOptions[i].transition = false;
                                break;
                            }
                        }
                        //restore Opacity
                        //  ctx.globalAlpha = contentOpacity;
                    }
                }
                ctx.shadowBlur = 0;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.globalAlpha = 1;
            }
            else if (options[1].started) {
                ctx.globalAlpha = contentOpacity; //Normally after a transition the value of contentOpacity is 1.
                ctx.fillStyle = 'rgba(0,0,0,0.5)'
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.shadowBlur = 5;
                ctx.shadowOffsetX = 1.5;
                ctx.shadowOffsetY = 1.5;
                ctx.fillStyle = "rgba(255,179,179,1)";
                ctx.textAlign = "center";
                ctx.font = "45px 'Abril Fatface'";
                ctx.fillText("To be released in Full Version", canvas.width / 2, canvas.height/2 - 50);
                ctx.textAlign = "left";
                ctx.shadowBlur = 0;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.globalAlpha = 1;
            }
            else if (options[2].started) {
                ctx.globalAlpha = contentOpacity; //Normally after a transition the value of contentOpacity is 1.
                ctx.fillStyle = 'rgba(0,0,0,0.5)'
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.shadowBlur = 5;
                ctx.shadowOffsetX = 1.5;
                ctx.shadowOffsetY = 1.5;
                ctx.fillStyle = "rgba(255,179,179,1)";
                ctx.textAlign = "center";
                ctx.font = "45px 'Abril Fatface'";
                ctx.fillText("To be released in Full Version", canvas.width / 2, canvas.height / 2 - 50);
                ctx.textAlign = "left";
                ctx.shadowBlur = 0;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.globalAlpha = 1;
            }
            else if (options[3].started) {
                ctx.globalAlpha = contentOpacity; //Normally after a transition the value of contentOpacity is 1.
                ctx.fillStyle = 'rgba(0,0,0,0.5)'
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.shadowBlur = 5;
                ctx.shadowOffsetX = 1.5;
                ctx.shadowOffsetY = 1.5;
                ctx.fillStyle = "rgba(255,179,179,1)";
                ctx.textAlign = "center";
                ctx.font = "45px 'Abril Fatface'";
                ctx.fillText("To be released in Full Version", canvas.width / 2, canvas.height / 2 - 50);
                ctx.textAlign = "left";
                ctx.shadowBlur = 0;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.globalAlpha = 1;
            }
            else if (options[4].started) {
       
                ctx.globalAlpha = contentOpacity;
                ctx.shadowBlur = 5;
                ctx.shadowOffsetX = 1.5;
                ctx.shadowOffsetY = 1.5;
                ctx.fillStyle = 'rgba(0,0,0,0.5)'
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = "rgba(255,179,179,1)";
                ctx.textAlign = "center";
                ctx.font = "75px 'Abril Fatface'";
                ctx.fillText("", canvas.width / 2, 125);
                ctx.textAlign = "left";
                ctx.drawImage(instructionImg,150,20)
                ctx.shadowBlur = 0;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.globalAlpha = 1;
            }
            else if (options[5].started) {
                ctx.globalAlpha = contentOpacity;
                ctx.shadowBlur = 5;
                ctx.shadowOffsetX = 1.5;
                ctx.shadowOffsetY = 1.5;
                ctx.fillStyle = 'rgba(0,0,0,0.5)'
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = "rgba(255,179,179,1)";
                ctx.textAlign = "center";
                ctx.font = "75px 'Abril Fatface'";
                ctx.fillText("Version Info", canvas.width / 2, 125);
                ctx.textAlign = "left";
                ctx.font = "35px 'Abril Fatface'";
                ctx.fillText("v1.0: August 15 2017", 100, 200);
                ctx.fillText("v0.01: Trial Version May 15 2017", 100, 250);
                ctx.fillText("v0.005: May 10 2017", 100, 300);
                ctx.fillText("Initial Plan: April 17 2017", 100, 350);
                ctx.shadowBlur = 0;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.globalAlpha = 1;
            }
            else if (options[6].started) {
                ctx.globalAlpha = contentOpacity;
                ctx.shadowBlur = 5;
                ctx.shadowOffsetX = 1.5;
                ctx.shadowOffsetY = 1.5;
                ctx.fillStyle = 'rgba(0,0,0,0.5)'
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = "rgba(255,179,179,1)";
                ctx.textAlign = "center";
                ctx.font = "75px 'Abril Fatface'";
                ctx.fillText("About", canvas.width / 2, 125);
          
                ctx.font = "25px 'Abril Fatface'";
                ctx.fillText("This game is a fan-made Touhou Project shooting game.", canvas.width / 2, 170);
                ctx.fillText("The purpose of this game is to demonstrate the application of Object-Oriented Programming in Javascript.", canvas.width / 2, 200);
                ctx.fillText("The story of the game is adapted from Touhou Project Series by ZUN and Team Shanghai Alice.", canvas.width / 2, 230);
                ctx.fillText("Credits of external images used in this game are given to their original creators.", canvas.width / 2, 260);
                ctx.fillText("Original Stories and Characters: ", canvas.width / 2, 290);
                ctx.fillText("ZUN, Team Shanghai Alice", canvas.width / 2, 320);
                ctx.fillText("Menu Background: ", canvas.width / 2, 350);
                ctx.fillText("http://www.zerochan.net/1222564", canvas.width / 2, 380);
                ctx.fillText("Character Images: ", canvas.width / 2, 410);
                ctx.fillText("Twilight Frontier / Team Shanghai Alice", canvas.width / 2, 440);
                ctx.fillText("https://en.touhouwiki.net/images/d/dd/Th135Reimu.png", canvas.width / 2, 470);
                ctx.fillText("In-game Character Images and Background: ", canvas.width / 2, 500);
                ctx.fillText("ZUN, Team Shanghai Alice", canvas.width / 2, 530)
                ctx.fillText("https://www.spriters-resource.com/pc_computer/touhouseirensenundefinedfantasticobject/", canvas.width / 2, 560)
                ctx.textAlign = "left";
                ctx.shadowBlur = 0;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.globalAlpha = 1;
            }
            else if (options[7].started) {
                //closing current window
                    window.close();
            }
        if(title.init){
            if (hiddingAnimation) {
                if (contentOpacity < 1) {
                    contentOpacity += 0.05;
                }
                for (i = 0; i < 8; i++) {
                    if (options[i].opacity > 0) {
                        options[i].opacity -= 0.05;
                    }
                    if (options[i].x > 25) {
                        options[i].x -= 1;
                    }
                }
                if (title.y > 150) {
                    title.y -= 2;
                }
                if(title.opacity > 0){
                    title.opacity -= 0.05;
                    if (title.opacity <= 0) {
                        menuOpen = false;
                    }
                }
            }
            else {
                if (contentOpacity > 0) {
                    contentOpacity -= 0.05;
                //    debugger;
                }
                else if (contentOpacity < 0) {
                    contentOpacity = 0;
                    //    debugger;
                }
                if (contentOpacity < 0.05) {
                    for (i = 0; i < 8; i++) {
                        if (options[i].started) {
                            options[i].started = false;
                        }
                    }
                }
                for (i = 0; i < 8; i++) {
                    if (options[i].opacity < 1) {
                        options[i].opacity += 0.05;
                    }
                    if (options[i].x < 50) {
                        options[i].x += 1;
                    }
                }
                if (title.y < 200) {
                    title.y += 2;
                }
                if (title.opacity < 1) {
                    title.opacity += 0.05;
                    if (title.opacity >= 0) {
                        menuOpen = true;
                    }
                }
            }
        }
        if (togame) {
            blackout.opacity += 0.015;
            blackout.clock += 1;
   
            if (blackout.opacity >= 1) {
                blackout.opacity = 1;
            }
            if (blackout.clock == 180) {
                //shut down the opened menu option
                for (i = 0; i < 8; i++) {
                    if (options[i].started)
                    options[i].started = false;
                }
                //shut down the opening
                opening = false;
                //Although opening is shutted down, menuOpen value need to be set to true. 
                //Because we started game when menu is false. Set menuOpen to true ensures user returns to main menu correctly
                //So when user returns, main menu will display.
                menuOpen = true;
                ingame = true;
                game.startTime = new Date().getTime();
            }
            ctx.globalAlpha = blackout.opacity;
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            blackout.loadingText();
            ctx.globalAlpha = 1;
        }
        }
        else if (ingame) {
            
            if (!resume.active && !pause.active) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                mainGame();
            }
            /***************/
            //remove blackout
            /***************/
            if (togame) {
                blackout.opacity -= 0.015;
                if (blackout.opacity <= 0) {
                    blackout.opacity = 0;
                    blackout.clock = 0;
                    togame = false;
                    /*note: need to disable controller when togame is on*/
                }
                ctx.globalAlpha = blackout.opacity;
                ctx.fillStyle = 'black';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                blackout.loadingText();
                ctx.globalAlpha = 1;
            }
    }
        if (ending.active) {
            endingUpdate();
    }
       if(game!=undefined && game.player.life < 0){
           resume.active = true;
       } 
          
       
       if (resume.active) {
           if (resume.opacity < 1) {
               resume.opacity += 0.1;
               if (resume.opacity >= 1) {
                   resume.opacity = 1;
               }
           }
           
        
           ctx_pause.globalAlpha = resume.opacity;
           ctx_pause.shadowColor = 'black';
           ctx_pause.shadowBlur = 5;
           ctx_pause.shadowOffsetX = 1.5;
           ctx_pause.shadowOffsetY = 1.5;
           ctx_pause.fillStyle = 'rgba(255,0,0,0.5)';
           ctx_pause.fillRect(26, 18, 840, 682);
           ctx_pause.fillStyle = "white";
           ctx_pause.textAlign = "center";
           ctx_pause.font = "50px 'Abril Fatface'";
           ctx_pause.fillText('Game Over!', 440, canvas.height / 2 - 125);
           ctx_pause.font = "italic 35px 'Abril Fatface'";
           for (i = 0; i < options_death.length; i++) {
               if (options_death[i].selected) {
                   ctx_pause.fillStyle = "white";
               }
               else {
                   ctx_pause.fillStyle = "grey";
               }
               ctx_pause.fillText(options_death[i].text, options_death[i].x, options_death[i].y);
           }
           ctx_pause.globalAlpha = 1;
           
       }
       if (pause.active) {
           if (pause.opacity < 1) {
               pause.opacity += 0.1;
               if (pause.opacity >= 1) {
                   pause.opacity = 1;
               }
           }
           ctx_pause.globalAlpha = pause.opacity;
           ctx_pause.shadowColor = 'black';
           ctx_pause.shadowBlur = 5;
           ctx_pause.shadowOffsetX = 1.5;
           ctx_pause.shadowOffsetY = 1.5;
           ctx_pause.fillStyle = 'rgba(51,51,153,0.7)';
           ctx_pause.fillRect(26, 18, 840, 682);
           ctx_pause.fillStyle = "white";
           ctx_pause.textAlign = "center";
           ctx_pause.font = "50px 'Abril Fatface'";
           ctx_pause.fillText('Paused', 440, canvas.height / 2 - 125);
           ctx_pause.font = "italic 35px 'Abril Fatface'";
           for (i = 0; i < options_death.length; i++) {
               if (options_death[i].selected) {
                   ctx_pause.fillStyle = "white";
               }
               else {
                   ctx_pause.fillStyle = "grey";
               }
               ctx_pause.fillText(options_death[i].text, options_death[i].x, options_death[i].y);
           }
           ctx_pause.globalAlpha = 1;
       }
       requestAnimationFrame(draw);
    }
    
    draw();
    
    function death_options(num, text, selected) {
        this.selected = selected;
        this.x = 440;
        this.y = 300 + num * spacing;
        this.started = false;
        this.text = text;
    }
    for (i = 0; i < 3; i++) {
        if (i == 0) {
            options_death.push(new death_options(i,'Resume',true))
        }
        if (i == 1) {
            options_death.push(new death_options(i, 'Restart from beginning', false))
        }
        if (i == 2) {
            options_death.push(new death_options(i, 'Return to menu', false))
        }
    }
     
    function mainGame() {
	debugger;
        game.clock++; //mainclock
        console.log(parseInt((new Date().getTime() - game.startTime) / 1000, 10))
        
        if (game.mode == 0) {
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            for (i = 0; i < 3; i++) {
                if (game.stage[i].active) {
                  
                    if (game.player.life >= 0){
                    game.stage[i].clock++; //stageclock
                    //draw game background
                    }
              
                    
                    ctx.drawImage(game.stage[i].background.img, game.stage[i].background.x, game.stage[i].background.y, 900, 740);
                    if (game.player.life >= 0) {
                        game.stage[i].background.y += game.stage[i].background.velocity;
                        game.stage[i].background.scroll();
                    }
                    //draw player
                    if (game.player.invincible) {
                        if (game.clock % 2 == 0) {
                            ctx.drawImage(game.player.img, game.player.x, game.player.y, game.player.width, game.player.height);
                        }
                        game.player.invincibleClock++;
                        if (game.player.invincibleClock > 250) {
                            game.player.invincibleClock = 0;
                            game.player.invincible = false;
                        }
                    }
                    else {
                    ctx.drawImage(game.player.img, game.player.x, game.player.y, game.player.width, game.player.height);
                    }
                    //draw player's secondary bullet launcher
             
                    
                  
                    /*fire*/
                   
                        if (!game.player.death) {
                            player_fire();
                            player_bomb_fire();
                            player_collision();
                        }
                        player_bullet_update();
                        player_bomb_update();
                        enemy_bullet_update();
                        enemy_update();
                        enemy_collision();
                    
                    ctx.save();
                    if (game.player.launcher.angle <= 360) {
                        game.player.launcher.angle += 3;
                        if (game.player.launcher.angle > 360) {
                            game.player.launcher.angle = 0;
                        }
                    }
                    //launcherdisplay
                    player_launcher_update();
                    ctx.restore();
                    player_coordinate_update();
                    props_update();
                    props_collision();
                    
                    
                     
                    //enemies
                    //main timeline
                    if (game.currentstage == 0) {
                        //before displaying stage title
                        if (game.stage[game.currentstage].clock > 50 && game.stage[game.currentstage].clock < 200){
                        if (game.stage[game.currentstage].clock % 10 == 0) {
                         
                            game.enemyPool.push(new createEnemy(Math.floor((Math.random() * 300) + 200), -50, 4, 360 - 30, -0.3, (Math.floor((Math.random() * 2) + 1)), 100, 40, 40));
                        }
                        }
                        if (game.stage[game.currentstage].clock > 350 && game.stage[game.currentstage].clock < 500) {
                            if (game.stage[game.currentstage].clock % 10 == 0) {
                       
                                game.enemyPool.push(new createEnemy(Math.floor((Math.random() * 600) + 500), -50, 4, 210, 0.2, 3, 100, 40, 40));
                            }
                        }
                        //reference to    ctx_pause.fillRect(26, 18, 840, 682);
                        if (game.stage[game.currentstage].clock == 700 ) {
                            game.enemyPool.push(new createEnemy(100, -50, 4, 270, 0, 5, 200, 72, 55));
                        }
                        if (game.stage[game.currentstage].clock == 720) {
                            game.enemyPool.push(new createEnemy(300, -50, 4, 270, 0, 5, 200, 72, 55));
                        }
                        if (game.stage[game.currentstage].clock == 740) {
                            game.enemyPool.push(new createEnemy(500, -50, 4, 270, 0, 5, 200, 72, 55));
                        }
                      
                        if (game.stage[game.currentstage].clock == 900) {
                            game.enemyPool.push(new createEnemy(700, -50, 4, 270, 0, 6, 200, 72, 55));
                        }
                        if (game.stage[game.currentstage].clock == 920) {
                            game.enemyPool.push(new createEnemy(500, -50, 4, 270, 0, 6, 200, 72, 55));
                        }
                        if (game.stage[game.currentstage].clock == 940) {
                            game.enemyPool.push(new createEnemy(300, -50, 4, 270, 0, 6, 200, 72, 55));
                        }
                        if (game.stage[game.currentstage].clock == 1020) {
                            game.enemyPool.push(new createEnemy(100, -50, 1, 270, 0, 8, 700, 109, 84));
                       
                        }
                        if (game.stage[game.currentstage].clock == 1080) {
                            game.enemyPool.push(new createEnemy(700, -50, 1, 270, 0, 8, 700, 109, 84));
                        }
                        //round of snipers
                        if (game.stage[game.currentstage].clock == 1620) {
                            game.enemyPool.push(new createEnemy(100, -50, 3, 270, 0, 9, 200, 109, 84));
                        }
                        if (game.stage[game.currentstage].clock == 1650) {
                            game.enemyPool.push(new createEnemy(300, -50, 3, 270, 0, 9, 200, 109, 84));
                        }
                        if (game.stage[game.currentstage].clock == 1680) {
                            game.enemyPool.push(new createEnemy(500, -50, 3, 270, 0, 9, 200, 109, 84));
                        }
                        if (game.stage[game.currentstage].clock == 1710) {
                            game.enemyPool.push(new createEnemy(700, -50, 3, 270, 0, 9, 200, 109, 84));
                            
                        }
                        if (game.stage[game.currentstage].clock == 1740) {
                            game.enemyPool.push(new createEnemy(500, -50, 3, 270, 0, 9, 200, 109, 84));
                        }
                        if (game.stage[game.currentstage].clock == 1770) {
                            game.enemyPool.push(new createEnemy(300, -50, 3, 270, 0, 9, 200, 109, 84));
                        }
                        if (game.stage[game.currentstage].clock == 1800) {
                            game.enemyPool.push(new createEnemy(100, -50, 3, 270, 0, 9, 200, 109, 84));
                        }
                        if (game.stage[game.currentstage].clock == 2020) {
                            game.enemyPool.push(new createEnemy(100, -50, 3, 270, 0, 8, 200, 109, 84));
                        }
                        if (game.stage[game.currentstage].clock == 2050) {
                            game.enemyPool.push(new createEnemy(300, -50, 3, 270, 0, 8, 200, 109, 84));
                        }
                        if (game.stage[game.currentstage].clock == 2080) {
                            game.enemyPool.push(new createEnemy(500, -50, 3, 270, 0, 8, 200, 109, 84));
                        }
                        if (game.stage[game.currentstage].clock == 2110) {
                            game.enemyPool.push(new createEnemy(700, -50, 3, 270, 0, 8, 200, 109, 84));
                        }
                        if (game.stage[game.currentstage].clock == 2140) {
                            game.enemyPool.push(new createEnemy(500, -50, 3, 270, 0, 8, 200, 109, 84));
                        }
                        if (game.stage[game.currentstage].clock == 2170) {
                            game.enemyPool.push(new createEnemy(300, -50, 3, 270, 0, 8, 200, 109, 84));
                        }
                        if (game.stage[game.currentstage].clock == 2200) {
                            game.enemyPool.push(new createEnemy(100, -50, 3, 270, 0, 8, 200, 109, 84));
                        }
                   
                            
                        if (game.stage[game.currentstage].clock > 2250 && game.stage[game.currentstage].clock < 2700) {
                            if (game.stage[game.currentstage].clock % 5 == 0) {
                                game.enemyPool.push(new createEnemy(Math.floor((Math.random() * 300) + 200), -50, 4, 360 - 30, -0.3, (Math.floor((Math.random() * 2) + 1)), 100, 40, 40));
                            }
                        }
                        if (game.stage[game.currentstage].clock > 2900 && game.stage[game.currentstage].clock < 3300) {
                            if (game.stage[game.currentstage].clock % 5 == 0) {
                                game.enemyPool.push(new createEnemy(Math.floor((Math.random() * 600) + 500), -50, 4, 210, 0.2, 3, 100, 40, 40));
                            }
                        }
                        if (
                       game.stage[game.currentstage].clock >= 3300 && game.stage[game.currentstage].clock < 3900
                              ) {
                            if (game.stage[game.currentstage].clock % 20 == 0) {
                                game.enemyPool.push(new createEnemy(Math.floor((Math.random() * 820) + 40),-150, 4, 270, 0,'rock',100,57,202));
                            }
                        }
                        if (game.stage[game.currentstage].clock == 3980) {
                            game.enemyPool.push(new createEnemy(400, -50, 3, 270, 0, 'boss_1', 3000, 181, 214));
                        }
                        //displaying stage title
                        if (game.stage[game.currentstage].clock > 500 && game.stage[game.currentstage].titleInit == false) {
                            game.stage[game.currentstage].title_display();
                        }
                      
                    }
                    //
                    if (game.enemyPool.length > 0) {
                        enemyBulletLoop:
                        for (j = 0; j < game.enemyPool.length; j++) {
                            if(game.enemyPool[j] != undefined){
                            if(
                                game.stage[game.currentstage].clock < 700 
                                && (game.enemyPool[j].type == 1 
                                || game.enemyPool[j].type == 2
                                || game.enemyPool[j].type == 3
                                || game.enemyPool[j].type == 4)) {
                                if (game.enemyPool[j].clock > 25 && game.enemyPool[j].clock % 15 == 0) {
                                    game.enemyBulletPool.push(new enemy_bullet_create('small_blue', game.enemyPool[j].x, game.enemyPool[j].y, 'trace', 8))
                                    continue;
                                } 
                            }
                            if (
                      game.stage[game.currentstage].clock > 2200 && game.stage[game.currentstage].clock < 3400
                      && (game.enemyPool[j].type == 1
                      || game.enemyPool[j].type == 2
                      || game.enemyPool[j].type == 3
                      || game.enemyPool[j].type == 4)) {
                                if (game.enemyPool[j].clock >= 0 && game.enemyPool[j].clock % 120 == 0) {
                                    game.enemyBulletPool.push(new enemy_bullet_create('medium_red', game.enemyPool[j].x, game.enemyPool[j].y, 'trace', 6))
                                    continue;
                                }
                            }
                            if (
                               game.stage[game.currentstage].clock < 1220
                            && (game.enemyPool[j].type == 5 || game.enemyPool[j].type == 6 || game.enemyPool[j].type == 8)
                               ) {
                                if (game.enemyPool[j].type != 8) {
                                    if (game.enemyPool[j].clock > 25 && game.enemyPool[j].clock % 25 == 0) {
                                        circleSpread('small_blue', game.enemyPool[j].x + game.enemyPool[j].width / 2, game.enemyPool[j].y + game.enemyPool[j].height / 2, 30, 2);
                                        continue;
                                }
                                }
                                else {
                                    if (game.enemyPool[j].clock % 45 == 0 && game.enemyPool[j].clock < 400) {
                                        circleSpread('medium_red', game.enemyPool[j].x + game.enemyPool[j].width / 2, game.enemyPool[j].y + game.enemyPool[j].height / 2, 50, 3);
                                        continue;
                                    }
                                }
                            }
              
                            if(
                                game.stage[game.currentstage].clock >= 1620 && game.stage[game.currentstage].clock < 2100
                            && game.enemyPool[j].type == 9
                                ) {
                                if (game.enemyPool[j].clock > 25 && game.enemyPool[j].clock % 25 == 0) {
                                    game.enemyBulletPool.push(new enemy_bullet_create('ellipse', game.enemyPool[j].x, game.enemyPool[j].y, 'trace', 6))
                                    continue;
                                }
                            }
                            if (
                                game.stage[game.currentstage].clock >= 2100 && game.stage[game.currentstage].clock < 2300
               && game.enemyPool[j].type == 8
                   ) {
                                if ((game.enemyPool[j].clock > 0 && game.enemyPool[j].clock < 20) || (game.enemyPool[j].clock > 40 && game.enemyPool[j].clock < 60) || (game.enemyPool[j].clock > 80 && game.enemyPool[j].clock < 100) && game.enemyPool[j].clock % 4 == 0) {
                                    game.enemyBulletPool.push(new enemy_bullet_create('star_small', game.enemyPool[j].x, game.enemyPool[j].y, 'trace', 10))
                                    continue;
                                }
                            }
                                // ctx_pause.fillRect(26, 18, 840, 682);
                         
                                if (game.enemyPool[j].type == 'boss_1') {
                                    if (game.enemyPool[j].y > 50) {
                                        game.stage[game.currentstage].dialogue_active = true;
                           
                                    }
                                }
                            }
                        }
                    }
                  
                    
                    dialogue_update();
                    //   break;
                 
                }
            }
            //draw info background
            ctx.drawImage(game.infobg, 0, 0);
        }
        infoDisplay();
    }
    function endingUpdate() {
        if (ending.opacity < 1) {
            ending.opacity += 0.005;
            if(ending.opacity >=1){
                ending.opacity = 1;
            }
        }
        ending.clock++;
        ctx.globalAlpha = ending.opacity;
        ctx.fillStyle  = 'black'
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        if (ending.clock > 0) {
            ctx.shadowColor = 'white';
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.fillStyle = "rgb(255,179,179)";
            ctx.textAlign = "center";
            ctx.font = "40px 'Abril Fatface'";
            ctx.fillText('All the sudden, the Dragon ran away.', canvas.width/2, canvas.height / 2 - 120);
            ctx.fillText(game.player.fullname + ": " + "I will come back here in August!", canvas.width / 2, canvas.height / 2 - 60);
            ctx.fillText("Congratulations for finishing the Trial Version! Good Job!", canvas.width / 2, canvas.height / 2 - 0);
   
            ctx.fillText("Score: " + game.score, canvas.width / 2, canvas.height / 2 + 120);
            if(ending.clock > 500){
                location.reload();
            }
        }
        ctx.globalAlpha = 1;
    }
        //derives from mainGame.
    function createGame(mode, player, difficulty) {
        this.startTime;
        this.clock = 0;
        this.mode = mode;
        this.score = 0;
            this.player = {};
            this.player.id = player;
            this.player.life = 2;
            this.player.bombNumber = 3;
            this.player.power = 1.00;
            this.player.point = 0;
            
            this.player.active = true;
          
            this.player.fire = false;
        //bomb
            this.player.bomb_fire = false;
            this.player.bomb_cd = 300;
            this.player.bomb_clock = 0;
            this.player.bomb_active = false;
            
              /*controller*/
            this.player.up = false;
            this.player.down = false;
            this.player.left = false;
            this.player.right = false;
               /*coordinate*/
            this.player.x = 420;
            this.player.y = canvas.height - 150;
            this.player.width = 52.6592;
            this.player.height = 74.052;
        //death
            this.player.death = false;
            this.player.invincible = false;
            this.player.respawnClock = 0;
            this.player.invincibleClock = 0;
        
        /*advanced status*/
            this.player.slow = false;
        //detection dot
            this.player.detection = {
                x1: this.player.width/2-3.5,
                x2: this.player.width/2+3.5,
                y1: this.player.y+25,
            };
            this.infobg = new Image();
            this.infobg.src = './ingame/bg.png';
        //enemies' properties
            this.enemyBulletPool = [];
            this.enemyPool = [];
        //props
            this.propsPool = [];
            this.player.autoCollect = false;
        //upper arrow
            this.upperarrow = new Image();
        //allowcontrol
            this.player.allowControl = true;
            if (this.player.id == 0) {
                this.player.name = "reimu";
                this.player.fullname = "Hakurei Reimu";
                this.player.bomb = {
                    img: new Image(),
                    trace: true,
                    through: true,
                    width: 500,
                    height: 500,
                }
                this.player.bullet1 = {
                    img: new Image(),
                    damage: 20,
                    velocity: 10,
                    width: 20,
                    height: 60,
                    through: false,
                }
                this.player.bullet2 = {
                    img: new Image(),
                    damage: 20,
                    velocity: 8,
                    width: 30,
                    height: 30,
                    through: false,
                    trace: true,
                    angle: 90*Math.PI/180,
                    targetNum: 0,
                }
                this.player.bullet3 = {
                    img: new Image(),
                    damage: 5,
                    velocity: 8,
                    width: 6,
                    height: 56,
                    through: false,
                }
                this.player.speed = 10;
            }
            else if (this.player.id == 1) {
                this.player.name = "marisa";
                this.player.fullname = "Kirisame Marisa";
                this.player.bomb = {
                    img: new Image(),
                    trace: false,
                    through: true,
                    width: 140,
                    height: 140,
                }
                this.player.bullet1 = {
                    img: new Image(),
                    damage: 0,
                    velocity: 25,
                    width: 20,
                    height: 60,
                    through: false,
                }
                this.player.bullet2 = {
                    img: new Image(),
                    damage: 10,
                    velocity: 8,
                    width: 38,
                    height: 1045,
                    through: true,
                    active: false,
                    decoration: {
                        imgs:[
               new Image(),
               new Image(),
               new Image(),
               new Image(),
               new Image(),
                        ],
                        num: 0,
                    },
                    decorationPool: [],
                    
                    opacity: 0,
                }
                this.player.speed = 14;
            }
            else if (this.player.id == 2) {
                this.player.name = "meiling";
                this.player.fullname = "Hong Meiling";
                this.player.bullet1 = {
                    img: new Image(),
                    damage: 8,
                    velocity: 15,
                }
                this.player.bullet2 = {
                    img: new Image(),
                    damage: 7,
                    velocity: 12,
                }
                this.player.speed = 12;
            }
            /*bullet properties*/
            this.player.bulletPool = [];
            this.player.bomb.img.src = './player/' + this.player.name + '/bullet/bomb.png';
           
            this.player.bullet1.img.src = './player/' + this.player.name + '/bullet/0.png';
            this.player.bullet2.img.src = './player/' + this.player.name + '/bullet/1.png';
            
            if(this.player.name != 'marisa'){
                this.player.bullet3.img.src = './player/' + this.player.name + '/bullet/2.png';
            }
            if(this.player.name == 'marisa'){
                this.player.bullet2.decoration.imgs[0].src = './player/' + this.player.name + '/bullet/2.png';
                this.player.bullet2.decoration.imgs[1].src = './player/' + this.player.name + '/bullet/3.png';
                this.player.bullet2.decoration.imgs[2].src = './player/' + this.player.name + '/bullet/4.png';
                this.player.bullet2.decoration.imgs[3].src = './player/' + this.player.name + '/bullet/5.png';
                this.player.bullet2.decoration.imgs[4].src = './player/' + this.player.name + '/bullet/6.png';
            }
            /*******************/
            
        //
            this.player.launcher = {
                //launchersystem
                img: new Image(),
                angle: 0,
                center: {
                    x:420,
                    y: canvas.height - 150,
                    x_side: 420,
                    y_side: canvas.height - 150,
                },
                center_slow:{
                    x:0,
                    y:0,
            }
            }
            this.player.launcher.img.src = './player/' + this.player.name + '/launcher/0.png';
      
            this.player.img = new Image();
            this.player.img.src = './player/' + this.player.name + '/sprite/0.png';
            this.stage = [];
            this.currentstage = 0;
            this.self_name;
            this.difficulty = difficulty;
            if (this.mode == 0) {
                this.stage.push(new createStage(0, "Two roads diverged in a yellow wood", "king", 2000, true))
                this.stage.push(new createStage(1, "Gallops to the sea without return", "aya", 3000, false))
                this.stage.push(new createStage(2, "The last road", "teacher",4000,false))
            }
            else if (this.mode == 1) {
            }
            else if (this.mode == 2) {
            }
           
        }    
    function player_coordinate_update() {
        /*update coordinate*/
        var playerSpeed = game.player.speed;
        if (!game.player.death && game.player.active && !ending.active) {
            if (game.player.slow) {
            playerSpeed = playerSpeed / 2;
            }
            if (game.player.up && game.player.y > 32) {
                game.player.y -= playerSpeed;
            }
            if (game.player.down && game.player.y < canvas.height - 95) {
                game.player.y += playerSpeed;
            }
            if (game.player.left && game.player.x > 35) {
                game.player.x -= playerSpeed;
            }
            if (game.player.right && game.player.x < 810) {
                game.player.x += playerSpeed;
            }
            if (game.player.y > 180) {
                if (game.propsPool.length <= 0){
                    game.player.autoCollect = false;
                }
            }
            else if (game.player.y <= 180) {
                game.player.autoCollect = true;
            }
        }
        else if (game.player.death && game.player.active) {
            if(game.player.respawnClock == 0){
            game.player.x = 420;
            game.player.y = canvas.height + 100;
            game.player.respawnClock++;
           
            }
            else if(game.player.respawnClock > 0){
                game.player.y -= 2;
                if (game.player.y <= 510) {
                    game.player.death = false;
                    game.player.respawnClock = 0;
                }
            }
        }
        else if (ending.active) {
            game.player.y -= 6;
            game.player.x -= 2;
        }
        
    }
    function player_launcher_update() {
    
        //shiftpressed animation
     
        if (game.player.name == "reimu") {
            if (!game.player.slow) {
                game.player.launcher.center.x = game.player.x + 12 + 13.5;
                if (game.player.launcher.center.y < game.player.y + game.player.height + 22.5) {
                    game.player.launcher.center.y += 20;
                }
                if (game.player.launcher.center.y_side < game.player.y + game.player.height + 22.5) {
                    game.player.launcher.center.y_side += 15;
                }
                //
                if (game.player.launcher.center.y >= game.player.y + game.player.height + 22.5) {
                    game.player.launcher.center.y = game.player.y + game.player.height + 9 + 13.5;
                }
                if (game.player.launcher.center.y_side >= game.player.y + game.player.height + 22.5) {
                    game.player.launcher.center.y_side = game.player.y + game.player.height + 9 + 13.5;
                }
            }
            else {
                game.player.launcher.center.x = game.player.x + 12 + 13.5;
                if (game.player.launcher.center.y > game.player.y - 22.5) {
                    game.player.launcher.center.y -= 20;
                }
                if (game.player.launcher.center.y_side > game.player.y + 42) {
                    game.player.launcher.center.y_side -= 15;
                }
                if (game.player.launcher.center.y <= game.player.y - 22.5) {
                    game.player.launcher.center.y = game.player.y - 22.5;
                }
                if (game.player.launcher.center.y_side <= game.player.y + 42) {
                    game.player.launcher.center.y_side = game.player.y + 42;
                }
            }
            /********************************************************************************************/
            if (game.player.power < 2) {
                ctx.translate(game.player.launcher.center.x, game.player.launcher.center.y);
                ctx.rotate(Math.PI * game.player.launcher.angle / 180);
                ctx.translate(-(game.player.launcher.center.x), -(game.player.launcher.center.y));
                if (!game.player.death)
                ctx.drawImage(game.player.launcher.img, game.player.launcher.center.x - 13.5, game.player.launcher.center.y - 13.5, 27, 27);
            }
            else if (game.player.power < 3) {
                ctx.translate(game.player.launcher.center.x - 40/*adjustment*/, game.player.launcher.center.y);
                ctx.rotate(Math.PI * game.player.launcher.angle / 180);
                ctx.translate(-(game.player.launcher.center.x - 40/*adjustment*/), -(game.player.launcher.center.y));
                if (!game.player.death)
                ctx.drawImage(game.player.launcher.img, game.player.launcher.center.x - 13.5 - 40/*adjustment*/, game.player.launcher.center.y - 13.5, 27, 27);
                ctx.restore();
                ctx.save();
                ctx.translate(game.player.launcher.center.x + 40/*adjustment*/, game.player.launcher.center.y);
                ctx.rotate(Math.PI * game.player.launcher.angle / 180);
                ctx.translate(-(game.player.launcher.center.x + 40/*adjustment*/), -(game.player.launcher.center.y));
                if (!game.player.death)
                ctx.drawImage(game.player.launcher.img, game.player.launcher.center.x - 13.5 + 40/*adjustment*/, game.player.launcher.center.y - 13.5, 27, 27);
            }
            else if (game.player.power < 4) {
                ctx.translate(game.player.launcher.center.x, game.player.launcher.center.y);
                ctx.rotate(Math.PI * game.player.launcher.angle / 180);
                ctx.translate(-(game.player.launcher.center.x), -(game.player.launcher.center.y));
                if (!game.player.death)
                ctx.drawImage(game.player.launcher.img, game.player.launcher.center.x - 13.5, game.player.launcher.center.y -13.5, 27, 27);
                ctx.restore();
                ctx.save();
                ctx.translate(game.player.launcher.center.x - 50/*adjustment*/, game.player.launcher.center.y_side - 30/*adjustment*/);
                ctx.rotate(Math.PI * game.player.launcher.angle / 180);
                ctx.translate(-(game.player.launcher.center.x - 50/*adjustment*/), -(game.player.launcher.center.y_side - 30/*adjustment*/));
                if (!game.player.death)
                ctx.drawImage(game.player.launcher.img, game.player.launcher.center.x - 13.5 - 50/*adjustment*/, game.player.launcher.center.y_side - 13.5 - 30/*adjustment*/, 27, 27);
                ctx.restore();
                ctx.save();
                ctx.translate(game.player.launcher.center.x + 50/*adjustment*/, game.player.launcher.center.y_side - 30/*adjustment*/);
                ctx.rotate(Math.PI * game.player.launcher.angle / 180);
                ctx.translate(-(game.player.launcher.center.x + 50/*adjustment*/), -(game.player.launcher.center.y_side - 30/*adjustment*/));
                if (!game.player.death)
                ctx.drawImage(game.player.launcher.img, game.player.launcher.center.x - 13.5 + 50/*adjustment*/, game.player.launcher.center.y_side - 13.5 - 30/*adjustment*/, 27, 27);
            }
            else if (game.player.power == 4) {
       
                ctx.translate(game.player.launcher.center.x - 20/*adjustment*/, game.player.launcher.center.y);
                ctx.rotate(Math.PI * game.player.launcher.angle / 180);
                ctx.translate(-(game.player.launcher.center.x - 20/*adjustment*/), -(game.player.launcher.center.y));
                if (!game.player.death)
                ctx.drawImage(game.player.launcher.img, game.player.launcher.center.x - 13.5 - 20/*adjustment*/, game.player.launcher.center.y - 13.5, 27, 27);
                ctx.restore();
                ctx.save();
                ctx.translate(game.player.launcher.center.x + 20/*adjustment*/, game.player.launcher.center.y);
                ctx.rotate(Math.PI * game.player.launcher.angle / 180);
                ctx.translate(-(game.player.launcher.center.x + 20/*adjustment*/), -(game.player.launcher.center.y));
                if (!game.player.death)
                ctx.drawImage(game.player.launcher.img, game.player.launcher.center.x - 13.5 + 20/*adjustment*/, game.player.launcher.center.y - 13.5, 27, 27);
                ctx.restore();
                ctx.save();
                ctx.translate(game.player.launcher.center.x - 50/*adjustment*/, game.player.launcher.center.y_side - 30/*adjustment*/);
                ctx.rotate(Math.PI * game.player.launcher.angle / 180);
                ctx.translate(-(game.player.launcher.center.x - 50/*adjustment*/), -(game.player.launcher.center.y_side - 30/*adjustment*/));
                if (!game.player.death)
                ctx.drawImage(game.player.launcher.img, game.player.launcher.center.x - 13.5 - 50/*adjustment*/, game.player.launcher.center.y_side - 13.5 - 30/*adjustment*/, 27, 27);
                ctx.restore();
                ctx.save();
                ctx.translate(game.player.launcher.center.x + 50/*adjustment*/, game.player.launcher.center.y_side - 30/*adjustment*/);
                ctx.rotate(Math.PI * game.player.launcher.angle / 180);
                ctx.translate(-(game.player.launcher.center.x + 50/*adjustment*/), -(game.player.launcher.center.y_side - 30/*adjustment*/));
                if (!game.player.death)
                ctx.drawImage(game.player.launcher.img, game.player.launcher.center.x - 13.5 + 50/*adjustment*/, game.player.launcher.center.y_side - 13.5 - 30/*adjustment*/, 27, 27);
            }
        }
        
    }
    function player_fire() {
        if(game.player.fire){
        //powersystem
        if (game.player.power < 2) {
            if (game.player.name == "reimu") {
                //bullet1
                if(game.clock % 4 == 0){
                game.player.bulletPool.push(new player_bullet_create(game.player.x, game.player.y, false, game.player.bullet1.img, game.player.bullet1.width, game.player.bullet1.height, game.player.bullet1.damage));
                game.player.bulletPool.push(new player_bullet_create(game.player.x + 30, game.player.y, false, game.player.bullet1.img, game.player.bullet1.width, game.player.bullet1.height, game.player.bullet1.damage));
                }
                //bullet2
                if(!game.player.slow){
                if(game.clock % 10 == 0){
                    game.player.bulletPool.push(new player_bullet_create(game.player.x + game.player.width / 2 - game.player.bullet2.width / 2, game.player.y + game.player.height + 35, true, game.player.bullet2.img, game.player.bullet2.width, game.player.bullet2.height, game.player.bullet2.damage));
                
                }
                }
                else {
                    if (game.clock % 5 == 0) {
                        game.player.bulletPool.push(new player_bullet_create(game.player.x + game.player.width / 2 - game.player.bullet2.width / 2 + 11 - 3, game.player.y - 50, false, game.player.bullet3.img, game.player.bullet3.width, game.player.bullet3.height, game.player.bullet3.damage));
                        game.player.bulletPool.push(new player_bullet_create(game.player.x + game.player.width / 2 - game.player.bullet2.width / 2 + 11 + 3, game.player.y - 50, false, game.player.bullet3.img, game.player.bullet3.width, game.player.bullet3.height, game.player.bullet3.damage));
                    }
                }
                }
            else if (game.player.name == "marisa") {
                //bullet1
                if (!game.player.bomb_active) {
                    if (game.clock % 6 == 0) {
                        game.player.bulletPool.push(new player_bullet_create(game.player.x, game.player.y, false, game.player.bullet1.img, game.player.bullet1.width, game.player.bullet1.height, game.player.bullet1.damage));
                        game.player.bulletPool.push(new player_bullet_create(game.player.x + 30, game.player.y, false, game.player.bullet1.img, game.player.bullet1.width, game.player.bullet1.height, game.player.bullet1.damage));
                    }
                }
                else {
                    if (game.clock % 15 == 0) {
                        game.player.bulletPool.push(new player_bullet_create(game.player.x - 45, game.player.y, false, game.player.bomb.img, game.player.bomb.width, game.player.bomb.height, 500));
                       }
                }
                if (game.player.bullet2.active == false) {
                    game.player.bullet2.active = true;
                }
                var lasercount = 0;
                for (i = 0; i < game.player.bulletPool.length; i++) {
                    if (game.player.bulletPool[i].through) {
                        lasercount++;
                    }
                }
                if (lasercount < 1) {
                    game.player.bulletPool.push(new player_bullet_create(game.player.x + game.player.width / 2 - game.player.bullet2.width / 2 - 50, game.player.y - /*special for laser*/ game.player.bullet2.height - 25 /*adjustment*/, false, game.player.bullet2.img, game.player.bullet2.width, game.player.bullet2.height, game.player.bullet2.damage, true));
                }
                //bullet2 decoration
                if (game.player.bullet2.active == true && game.clock % 10 == 0) {
                    game.player.bullet2.decorationPool.push(new player_bullet_create(game.player.x + game.player.width / 2 - game.player.bullet2.width / 2, game.player.y - 50, false, game.player.bullet2.decoration.imgs[game.player.bullet2.decoration.num], 35, 90))
                    game.player.bullet2.decoration.num++;
                    if (game.player.bullet2.decoration.num > 4) {
                        game.player.bullet2.decoration.num = 0;
                    }
                }
            }
            else if (game.player.name == "meiling") {
            }
        }
        else if (game.player.power < 3) {
            if (game.player.name == "reimu") {
                //bullet1
                if (game.clock % 4 == 0) {
                    game.player.bulletPool.push(new player_bullet_create(game.player.x, game.player.y, false, game.player.bullet1.img, game.player.bullet1.width, game.player.bullet1.height, game.player.bullet1.damage));
                    game.player.bulletPool.push(new player_bullet_create(game.player.x + 30, game.player.y, false, game.player.bullet1.img, game.player.bullet1.width, game.player.bullet1.height, game.player.bullet1.damage));
                }
                //bullet2
                if(!game.player.slow){
                if (game.clock % 10 == 0) {
                    game.player.bulletPool.push(new player_bullet_create(game.player.x + game.player.width / 2 - game.player.bullet2.width / 2 - 40, game.player.y + game.player.height + 35, true, game.player.bullet2.img, game.player.bullet2.width, game.player.bullet2.height, game.player.bullet2.damage));
                    game.player.bulletPool.push(new player_bullet_create(game.player.x + game.player.width / 2 - game.player.bullet2.width / 2 + 40, game.player.y + game.player.height + 35, true, game.player.bullet2.img, game.player.bullet2.width, game.player.bullet2.height, game.player.bullet2.damage));
                }
                }
                else {
                    if (game.clock % 5 == 0) {
                        game.player.bulletPool.push(new player_bullet_create(game.player.x + game.player.width / 2 - game.player.bullet2.width / 2 - 40 + 11 - 3, game.player.y - 50, false, game.player.bullet3.img, game.player.bullet3.width, game.player.bullet3.height, game.player.bullet3.damage));
                        game.player.bulletPool.push(new player_bullet_create(game.player.x + game.player.width / 2 - game.player.bullet2.width / 2 - 40 + 11 + 3, game.player.y - 50, false, game.player.bullet3.img, game.player.bullet3.width, game.player.bullet3.height, game.player.bullet3.damage));
                        game.player.bulletPool.push(new player_bullet_create(game.player.x + game.player.width / 2 - game.player.bullet2.width / 2 + 40 + 11 - 3, game.player.y - 50, false, game.player.bullet3.img, game.player.bullet3.width, game.player.bullet3.height, game.player.bullet3.damage));
                        game.player.bulletPool.push(new player_bullet_create(game.player.x + game.player.width / 2 - game.player.bullet2.width / 2 + 40 + 11 + 3, game.player.y - 50, false, game.player.bullet3.img, game.player.bullet3.width, game.player.bullet3.height, game.player.bullet3.damage));
                    }
                }
            }
            else if (game.player.name == "marisa") {
                //bullet1
                if (!game.player.bomb_active) {
                    if (game.clock % 6 == 0) {
                        game.player.bulletPool.push(new player_bullet_create(game.player.x, game.player.y, false, game.player.bullet1.img, game.player.bullet1.width, game.player.bullet1.height, game.player.bullet1.damage));
                        game.player.bulletPool.push(new player_bullet_create(game.player.x + 30, game.player.y, false, game.player.bullet1.img, game.player.bullet1.width, game.player.bullet1.height, game.player.bullet1.damage));
                    }
                }
                else {
                    if (game.clock % 15 == 0) {
                        game.player.bulletPool.push(new player_bullet_create(game.player.x - 45, game.player.y, false, game.player.bomb.img, game.player.bomb.width, game.player.bomb.height, 500));
                    }
                }
                if (game.player.bullet2.active == false) {
                    game.player.bullet2.active = true;
                }
                
                    var lasercount = 0;
                    for (i = 0; i < game.player.bulletPool.length; i++) {
                        if (game.player.bulletPool[i].through) {
                            lasercount++;
                        }
                    }
                    if (lasercount < 2) {
                        game.player.bulletPool.push(new player_bullet_create(game.player.x + game.player.width / 2 - game.player.bullet2.width / 2 - 50, game.player.y - /*special for laser*/ game.player.bullet2.height - 25 /*adjustment*/, false, game.player.bullet2.img, game.player.bullet2.width, game.player.bullet2.height, game.player.bullet2.damage, true));
                    }
                
                //bullet2 decoration
                if (game.player.bullet2.active == true && game.clock % 10 == 0) {
                    game.player.bullet2.decorationPool.push(new player_bullet_create(game.player.x + game.player.width / 2 - game.player.bullet2.width / 2 - 50, game.player.y - 50, false, game.player.bullet2.decoration.imgs[game.player.bullet2.decoration.num], 35, 90))
                   
                    game.player.bullet2.decoration.num++;
                    if (game.player.bullet2.decoration.num > 4) {
                        game.player.bullet2.decoration.num = 0;
                    }
                }
            }
        }
        else if (game.player.power < 4) {
            if (game.player.name == "reimu") {
                //bullet1
                if (game.clock % 4 == 0) {
                    game.player.bulletPool.push(new player_bullet_create(game.player.x, game.player.y, false, game.player.bullet1.img, game.player.bullet1.width, game.player.bullet1.height, game.player.bullet1.damage));
                    game.player.bulletPool.push(new player_bullet_create(game.player.x + 30, game.player.y, false, game.player.bullet1.img, game.player.bullet1.width, game.player.bullet1.height, game.player.bullet1.damage));
                }
                //bullet2
                if (!game.player.slow) {
                    if (game.clock % 10 == 0) {
                        game.player.bulletPool.push(new player_bullet_create(game.player.x + game.player.width / 2 - game.player.bullet2.width / 2, game.player.y + game.player.height + 35, true, game.player.bullet2.img, game.player.bullet2.width, game.player.bullet2.height, game.player.bullet2.damage));
                        game.player.bulletPool.push(new player_bullet_create(game.player.x + game.player.width / 2 - game.player.bullet2.width / 2 - 50, game.player.y + game.player.height + 10, true, game.player.bullet2.img, game.player.bullet2.width, game.player.bullet2.height, game.player.bullet2.damage));
                        game.player.bulletPool.push(new player_bullet_create(game.player.x + game.player.width / 2 - game.player.bullet2.width / 2 + 50, game.player.y + game.player.height + 10, true, game.player.bullet2.img, game.player.bullet2.width, game.player.bullet2.height, game.player.bullet2.damage));
                    }
                }
                else {
                    if (game.clock % 5 == 0) {
                        game.player.bulletPool.push(new player_bullet_create(game.player.x + game.player.width / 2 - game.player.bullet2.width / 2  + 11 - 3, game.player.y - 50, false, game.player.bullet3.img, game.player.bullet3.width, game.player.bullet3.height, game.player.bullet3.damage));
                        game.player.bulletPool.push(new player_bullet_create(game.player.x + game.player.width / 2 - game.player.bullet2.width / 2  + 11 + 3, game.player.y - 50, false, game.player.bullet3.img, game.player.bullet3.width, game.player.bullet3.height, game.player.bullet3.damage));
                        game.player.bulletPool.push(new player_bullet_create(game.player.x + game.player.width / 2 - game.player.bullet2.width / 2 - 50 + 11 - 3, game.player.y - 25, false, game.player.bullet3.img, game.player.bullet3.width, game.player.bullet3.height, game.player.bullet3.damage));
                        game.player.bulletPool.push(new player_bullet_create(game.player.x + game.player.width / 2 - game.player.bullet2.width / 2 - 50 + 11 + 3, game.player.y - 25, false, game.player.bullet3.img, game.player.bullet3.width, game.player.bullet3.height, game.player.bullet3.damage));
                        game.player.bulletPool.push(new player_bullet_create(game.player.x + game.player.width / 2 - game.player.bullet2.width / 2 + 50 + 11 - 3, game.player.y - 25, false, game.player.bullet3.img, game.player.bullet3.width, game.player.bullet3.height, game.player.bullet3.damage));
                        game.player.bulletPool.push(new player_bullet_create(game.player.x + game.player.width / 2 - game.player.bullet2.width / 2 + 50 + 11 + 3, game.player.y - 25, false, game.player.bullet3.img, game.player.bullet3.width, game.player.bullet3.height, game.player.bullet3.damage));
                    }
                }
            }
            else if (game.player.name == "marisa") {
                //bullet1
                if (!game.player.bomb_active) {
                    if (game.clock % 6 == 0) {
                        game.player.bulletPool.push(new player_bullet_create(game.player.x, game.player.y, false, game.player.bullet1.img, game.player.bullet1.width, game.player.bullet1.height, game.player.bullet1.damage));
                        game.player.bulletPool.push(new player_bullet_create(game.player.x + 30, game.player.y, false, game.player.bullet1.img, game.player.bullet1.width, game.player.bullet1.height, game.player.bullet1.damage));
                    }
                }
                else {
                    if (game.clock % 15 == 0) {
                        game.player.bulletPool.push(new player_bullet_create(game.player.x - 45, game.player.y, false, game.player.bomb.img, game.player.bomb.width, game.player.bomb.height, 500));
                    }
                }
                //bullet2
                if (game.player.bullet2.active == false) {
                    game.player.bullet2.active = true;
                }
                var lasercount = 0;
                for (i = 0; i < game.player.bulletPool.length; i++) {
                    if (game.player.bulletPool[i].through) {
                        lasercount++;
                    }
                }
                if (lasercount < 3) {
                    if(lasercount == 1){
                    game.player.bulletPool.push(new player_bullet_create(game.player.x + game.player.width / 2 - game.player.bullet2.width / 2 - 50, game.player.y - /*special for laser*/ game.player.bullet2.height - 25 /*adjustment*/, false, game.player.bullet2.img, game.player.bullet2.width, game.player.bullet2.height, game.player.bullet2.damage, true));
                    game.player.bulletPool.push(new player_bullet_create(game.player.x + game.player.width / 2 - game.player.bullet2.width / 2 - 50, game.player.y - /*special for laser*/ game.player.bullet2.height - 25 /*adjustment*/, false, game.player.bullet2.img, game.player.bullet2.width, game.player.bullet2.height, game.player.bullet2.damage, true));
                    }
                    else if (lasercount == 2) {
                    game.player.bulletPool.push(new player_bullet_create(game.player.x + game.player.width / 2 - game.player.bullet2.width / 2 - 50, game.player.y - /*special for laser*/ game.player.bullet2.height - 25 /*adjustment*/, false, game.player.bullet2.img, game.player.bullet2.width, game.player.bullet2.height, game.player.bullet2.damage, true));
                    }
                }
                //bullet2 decoration
                if (game.player.bullet2.active == true && game.clock % 10 == 0) {
                    game.player.bullet2.decorationPool.push(new player_bullet_create(game.player.x + game.player.width / 2 - game.player.bullet2.width / 2 - 50, game.player.y - 50, false, game.player.bullet2.decoration.imgs[game.player.bullet2.decoration.num], 35, 90))
                    game.player.bullet2.decoration.num++;
                    if (game.player.bullet2.decoration.num > 4) {
                        game.player.bullet2.decoration.num = 0;
                    }
                }
            }
        }
        else if (game.player.power == 4) {
            if (game.player.name == "reimu") {
                //bullet1
                if (game.clock % 4 == 0) {
                    game.player.bulletPool.push(new player_bullet_create(game.player.x, game.player.y, false, game.player.bullet1.img, game.player.bullet1.width, game.player.bullet1.height, game.player.bullet1.damage));
                    game.player.bulletPool.push(new player_bullet_create(game.player.x + 30, game.player.y, false, game.player.bullet1.img, game.player.bullet1.width, game.player.bullet1.height, game.player.bullet1.damage));
                }
                //bullet2
                if (!game.player.slow){
                    if (game.clock % 10 == 0) {
                        game.player.bulletPool.push(new player_bullet_create(game.player.x + game.player.width / 2 - game.player.bullet2.width / 2 - 20, game.player.y + game.player.height + 35, true,game.player.bullet2.img, game.player.bullet2.width, game.player.bullet2.height, game.player.bullet2.damage));
                        game.player.bulletPool.push(new player_bullet_create(game.player.x + game.player.width / 2 - game.player.bullet2.width / 2 + 20, game.player.y + game.player.height + 35, true, game.player.bullet2.img, game.player.bullet2.width, game.player.bullet2.height, game.player.bullet2.damage));
                        game.player.bulletPool.push(new player_bullet_create(game.player.x + game.player.width / 2 - game.player.bullet2.width / 2 - 50, game.player.y + game.player.height + 10, true, game.player.bullet2.img, game.player.bullet2.width, game.player.bullet2.height, game.player.bullet2.damage));
                        game.player.bulletPool.push(new player_bullet_create(game.player.x + game.player.width / 2 - game.player.bullet2.width / 2 + 50, game.player.y + game.player.height + 10, true, game.player.bullet2.img, game.player.bullet2.width, game.player.bullet2.height, game.player.bullet2.damage));
                    }
                }
                else {
                    if (game.clock % 5 == 0) {
                        game.player.bulletPool.push(new player_bullet_create(game.player.x + game.player.width / 2 - game.player.bullet2.width / 2 - 20 + 11 - 3, game.player.y - 50, false, game.player.bullet3.img, game.player.bullet3.width, game.player.bullet3.height, game.player.bullet3.damage));
                        game.player.bulletPool.push(new player_bullet_create(game.player.x + game.player.width / 2 - game.player.bullet2.width / 2 - 20 + 11 + 3, game.player.y - 50, false, game.player.bullet3.img, game.player.bullet3.width, game.player.bullet3.height, game.player.bullet3.damage));
                        game.player.bulletPool.push(new player_bullet_create(game.player.x + game.player.width / 2 - game.player.bullet2.width / 2 + 20 + 11 - 3, game.player.y - 50, false, game.player.bullet3.img, game.player.bullet3.width, game.player.bullet3.height, game.player.bullet3.damage));
                        game.player.bulletPool.push(new player_bullet_create(game.player.x + game.player.width / 2 - game.player.bullet2.width / 2 + 20 + 11 + 3, game.player.y - 50, false, game.player.bullet3.img, game.player.bullet3.width, game.player.bullet3.height, game.player.bullet3.damage));
                        game.player.bulletPool.push(new player_bullet_create(game.player.x + game.player.width / 2 - game.player.bullet2.width / 2 - 50 + 11 - 3, game.player.y - 25, false, game.player.bullet3.img, game.player.bullet3.width, game.player.bullet3.height, game.player.bullet3.damage));
                        game.player.bulletPool.push(new player_bullet_create(game.player.x + game.player.width / 2 - game.player.bullet2.width / 2 - 50 + 11 + 3, game.player.y - 25, false, game.player.bullet3.img, game.player.bullet3.width, game.player.bullet3.height, game.player.bullet3.damage));
                        game.player.bulletPool.push(new player_bullet_create(game.player.x + game.player.width / 2 - game.player.bullet2.width / 2 + 50 + 11 - 3, game.player.y - 25, false, game.player.bullet3.img, game.player.bullet3.width, game.player.bullet3.height, game.player.bullet3.damage));
                        game.player.bulletPool.push(new player_bullet_create(game.player.x + game.player.width / 2 - game.player.bullet2.width / 2 + 50 + 11 + 3, game.player.y - 25, false, game.player.bullet3.img, game.player.bullet3.width, game.player.bullet3.height, game.player.bullet3.damage));
                    }
                }
            }
            else if (game.player.name == "marisa") {
                //bullet1
                
                if(!game.player.bomb_active){
                    if (game.clock % 6 == 0) {
                    game.player.bulletPool.push(new player_bullet_create(game.player.x, game.player.y, false, game.player.bullet1.img, game.player.bullet1.width, game.player.bullet1.height, game.player.bullet1.damage));
                    game.player.bulletPool.push(new player_bullet_create(game.player.x + 30, game.player.y, false, game.player.bullet1.img, game.player.bullet1.width, game.player.bullet1.height, game.player.bullet1.damage));
                    }
                }
                else {
                    if (game.clock % 15 == 0) {
                        game.player.bulletPool.push(new player_bullet_create(game.player.x - 45, game.player.y, false, game.player.bomb.img, game.player.bomb.width, game.player.bomb.height, 500));
                    }
                }
                if (game.player.bullet2.active == false) {
                    game.player.bullet2.active = true;
                }
                var lasercount = 0;
                for (i = 0; i < game.player.bulletPool.length; i++) {
                    if (game.player.bulletPool[i].through) {
                        lasercount++;
                    }
                }
                if (lasercount < 4) {
                    if (lasercount == 1) {
                        game.player.bulletPool.push(new player_bullet_create(game.player.x + game.player.width / 2 - game.player.bullet2.width / 2 - 50, game.player.y - /*special for laser*/ game.player.bullet2.height - 25 /*adjustment*/, false, game.player.bullet2.img, game.player.bullet2.width, game.player.bullet2.height, game.player.bullet2.damage, true));
                        game.player.bulletPool.push(new player_bullet_create(game.player.x + game.player.width / 2 - game.player.bullet2.width / 2 - 50, game.player.y - /*special for laser*/ game.player.bullet2.height - 25 /*adjustment*/, false, game.player.bullet2.img, game.player.bullet2.width, game.player.bullet2.height, game.player.bullet2.damage, true));
                        game.player.bulletPool.push(new player_bullet_create(game.player.x + game.player.width / 2 - game.player.bullet2.width / 2 - 50, game.player.y - /*special for laser*/ game.player.bullet2.height - 25 /*adjustment*/, false, game.player.bullet2.img, game.player.bullet2.width, game.player.bullet2.height, game.player.bullet2.damage, true));
                    }
                    else if (lasercount == 2) {
                        game.player.bulletPool.push(new player_bullet_create(game.player.x + game.player.width / 2 - game.player.bullet2.width / 2 - 50, game.player.y - /*special for laser*/ game.player.bullet2.height - 25 /*adjustment*/, false, game.player.bullet2.img, game.player.bullet2.width, game.player.bullet2.height, game.player.bullet2.damage, true));
                        game.player.bulletPool.push(new player_bullet_create(game.player.x + game.player.width / 2 - game.player.bullet2.width / 2 - 50, game.player.y - /*special for laser*/ game.player.bullet2.height - 25 /*adjustment*/, false, game.player.bullet2.img, game.player.bullet2.width, game.player.bullet2.height, game.player.bullet2.damage, true));
                    }
                    else if (lasercount == 3) {
                        game.player.bulletPool.push(new player_bullet_create(game.player.x + game.player.width / 2 - game.player.bullet2.width / 2 - 50, game.player.y - /*special for laser*/ game.player.bullet2.height - 25 /*adjustment*/, false, game.player.bullet2.img, game.player.bullet2.width, game.player.bullet2.height, game.player.bullet2.damage, true));
                      
                    }
                }
                //bullet2 decoration
                if (game.player.bullet2.active == true && game.clock % 10 == 0) {
                    game.player.bullet2.decorationPool.push(new player_bullet_create(game.player.x + game.player.width / 2 - game.player.bullet2.width / 2 - 50, game.player.y - 50, false, game.player.bullet2.decoration.imgs[game.player.bullet2.decoration.num], 35, 90))
                    game.player.bullet2.decoration.num++;
                    if (game.player.bullet2.decoration.num > 4) {
                        game.player.bullet2.decoration.num = 0;
                    }
                }
            }
        }
        }
    }
    function player_bomb_fire() {
        if (game.player.bomb_fire) {
            if (game.player.name == "reimu") {
                game.player.bombNumber--;
                game.player.bomb_active = true;
                game.player.bulletPool.push(new player_bullet_create(game.player.x - game.player.bomb.width / 2, game.player.y, game.player.bomb.trace, game.player.bomb.img, game.player.bomb.width, game.player.bomb.height, 200, game.player.bomb.through, 'bomb'));
                
            }
            else if (game.player.name == 'marisa') {
                game.player.bombNumber--;
                game.player.bomb_active = true;
                
            }
            game.player.bomb_fire = false;
            game.player.invincible = true;
        }
    }
    function player_bomb_update() {
        if (game.player.bomb_active == true) {
            game.player.bomb_clock++;
            if (game.player.bomb_clock > game.player.bomb_cd) {
                game.player.bomb_clock = 0;
                game.player.bomb_active = false;
            }
        }
    }
    function player_bullet_create(x,y,trace,img,width,height,damage,through,type) {
        this.x = x;
        this.y = y;
        this.trace = trace;
        this.img = img;
        this.width = width;
        this.height = height;
        this.damage = damage;
        this.type = type;
        if (through == undefined) {
            this.through == false;
        }
        else{
            this.through = through;
        }
        if (this.through == true) {
            this.opacity = 0;
        } else {
            this.opacity = 1;
        }
        this.angle = 90 * Math.PI / 180;
        this.acceleration = 0;
        this.acceleration_derivative = 0.1;
    }
    var laserChecks = 0;
    function player_bullet_update() {
       
        if(game.player.name == 'reimu'){
    
        for (i = 0; i < game.player.bulletPool.length; i++) {
            if (!game.player.bulletPool[i].trace) {
                game.player.bulletPool[i].y -= 30;
            }
            else {
          
                if (game.enemyPool.length != 0) {
                    console.log('firstenemy')
                     var distances = [];
                     for (j = 0; j < game.enemyPool.length; j++) {
                         distances.push(Math.abs(Math.sqrt(game.enemyPool[j].ydistance * game.enemyPool[j].ydistance + game.enemyPool[j].xdistance * game.enemyPool[j].xdistance)));
                     }
                     var target = game.enemyPool[distances.indexOf(Math.min.apply(Math, distances))];
                
                     game.player.bulletPool[i].angle = -Math.atan2((target.y - game.player.bulletPool[i].y + game.player.height / 2), (target.x - game.player.bulletPool[i].x + target.width / 2));
                      }
                     else if(game.enemyPool.length == 0){
                         game.player.bulletPool[i].angle = 90*Math.PI/180;
                     }
                
                game.player.bulletPool[i].acceleration += game.player.bulletPool[i].acceleration_derivative;
                
                game.player.bulletPool[i].y -= Math.sin(game.player.bulletPool[i].angle) * (4+game.player.bulletPool[i].acceleration);
                game.player.bulletPool[i].x += Math.cos(game.player.bulletPool[i].angle) * (4+game.player.bulletPool[i].acceleration);
                
              
            }
            ctx.drawImage(game.player.bulletPool[i].img, game.player.bulletPool[i].x, game.player.bulletPool[i].y,game.player.bulletPool[i].width,game.player.bulletPool[i].height);
        }
        }
        else if (game.player.name == 'marisa') {
      
              
          
            for (i = 0; i < game.player.bulletPool.length; i++) {
                if (!game.player.bulletPool[i].through || game.player.bulletPool[i].type == 'bomb') {
                    game.player.bulletPool[i].y -= 30;
                    ctx.drawImage(game.player.bulletPool[i].img, game.player.bulletPool[i].x, game.player.bulletPool[i].y, game.player.bulletPool[i].width, game.player.bulletPool[i].height);
                }
                else if(game.player.bulletPool[i].through && game.player.bulletPool[i].type != 'bomb' && !game.player.death){
                    console.log(laserChecks);
                    if (game.player.fire) {
                        if (game.player.bulletPool[i].opacity < 1) {
                            game.player.bulletPool[i].opacity += 0.2;
                            if (game.player.bulletPool[i].opacity >= 1) {
                                game.player.bulletPool[i].opacity = 1;
                            }
                        }
                    }
                    else if (!game.player.fire) {
                        if (game.player.bulletPool[i].opacity > 0) {
                            game.player.bulletPool[i].opacity -= 0.2;
                            if (game.player.bulletPool[i].opacity <= 0) {
                                game.player.bulletPool[i].opacity = 0;
                            }
                        }
                    }
                    ctx.globalAlpha = game.player.bulletPool[i].opacity;
              
                    if (game.player.power < 2) {
                        game.player.bulletPool[i].x = game.player.x + game.player.width / 2 - game.player.bullet2.width / 2/*bulletx sticks to player*/;
                        game.player.bulletPool[i].y = game.player.y - /*special for laser*/ game.player.bullet2.height - 25 /*adjustment*/;
                           
                        laserChecks = 0;
                        drawlaser(i);
                       
                    }
                    else if (game.player.power < 3) {
                        if (laserChecks == 0) {
                            console.log('A drawed');
                  
                            game.player.bulletPool[i].x = game.player.x + game.player.width / 2 - game.player.bullet2.width / 2/*bulletx sticks to player*/ - 50;
                            game.player.bulletPool[i].y = game.player.y - /*special for laser*/ game.player.bullet2.height - 25 /*adjustment*/;
                            drawlaser(i);
                            laserChecks++;
                            
                             
                        }
                        else if (laserChecks == 1) {
                            console.log('B drawed');
                       
                            game.player.bulletPool[i].x = game.player.x + game.player.width / 2 - game.player.bullet2.width / 2/*bulletx sticks to player*/ + 50;
                            game.player.bulletPool[i].y = game.player.y - /*special for laser*/ game.player.bullet2.height - 25 /*adjustment*/;
                  
                          
                            laserChecks = 0;
                            drawlaser(i);
                        }
                      
                    }
                    else if (game.player.power < 4) {
                        if (laserChecks == 0) {
                            game.player.bulletPool[i].x = game.player.x + game.player.width / 2 - game.player.bullet2.width / 2/*bulletx sticks to player*/;
                            game.player.bulletPool[i].y = game.player.y - /*special for laser*/ game.player.bullet2.height - 25 /*adjustment*/;
                            drawlaser(i);
                            laserChecks++;
                       
                            continue;
                        }
                        else if (laserChecks == 1) {
                            game.player.bulletPool[i].x = game.player.x + game.player.width / 2 - game.player.bullet2.width / 2/*bulletx sticks to player*/ - 50;
                            game.player.bulletPool[i].y = game.player.y - /*special for laser*/ game.player.bullet2.height - 25 /*adjustment*/;
                            drawlaser(i);
                            laserChecks++;
                        
                            continue;
                        }
                        else if (laserChecks == 2) {
                            game.player.bulletPool[i].x = game.player.x + game.player.width / 2 - game.player.bullet2.width / 2/*bulletx sticks to player*/ + 50;
                            game.player.bulletPool[i].y = game.player.y - /*special for laser*/ game.player.bullet2.height - 25 /*adjustment*/;
                            drawlaser(i);
                            laserChecks = 0;
                            continue;
                        }
                    }
                    else if (game.player.power == 4) {
                        if (laserChecks == 0) {
                            game.player.bulletPool[i].x = game.player.x + game.player.width / 2 - game.player.bullet2.width / 2 - 20;
                            game.player.bulletPool[i].y = game.player.y - /*special for laser*/ game.player.bullet2.height - 25 /*adjustment*/;
                            drawlaser(i);
                            laserChecks++;
                  
                            continue;
                        }
                        else if (laserChecks == 1) {
                            game.player.bulletPool[i].x = game.player.x + game.player.width / 2 - game.player.bullet2.width / 2 + 20;
                            game.player.bulletPool[i].y = game.player.y - /*special for laser*/ game.player.bullet2.height - 25 /*adjustment*/;
                            drawlaser(i);
                            laserChecks++;
                            
                            continue;
                        }
                        else if (laserChecks == 2) {
                            game.player.bulletPool[i].x = game.player.x + game.player.width / 2 - game.player.bullet2.width / 2 - 60;
                            game.player.bulletPool[i].y = game.player.y - /*special for laser*/ game.player.bullet2.height - 25 /*adjustment*/;
                            drawlaser(i);
                            laserChecks++;
                            continue;
                        }
                        else if (laserChecks == 3) {
                            game.player.bulletPool[i].x = game.player.x + game.player.width / 2 - game.player.bullet2.width / 2 + 60;
                            game.player.bulletPool[i].y = game.player.y - /*special for laser*/ game.player.bullet2.height - 25 /*adjustment*/;
                            drawlaser(i);
                            laserChecks = 0;
                            continue;
                        }
                    }
                    
                }
            }
            if (game.player.fire) {
                if (game.player.bullet2.opacity < 1) {
                    game.player.bullet2.opacity += 0.2;
                    if (game.player.bullet2.opacity >= 1) {
                        game.player.bullet2.opacity = 1;
                    }
                }
            }
            else if (!game.player.fire) {
                if (game.player.bullet2.opacity > 0) {
                    game.player.bullet2.opacity -= 0.2;
                    if (game.player.bullet2.opacity <= 0) {
                        game.player.bullet2.opacity = 0;
                    }
                }
            }
            if (game.player.bullet2.active && !game.player.death) {
                ctx.globalAlpha = game.player.bullet2.opacity;
                for (i = 0; i < game.player.bullet2.decorationPool.length; i++) {
                    if (game.player.bullet2.decorationPool[i].y > game.player.y - 50) {
                        game.player.bullet2.decorationPool[i].y = game.player.y - 50;
                    }
                    //thinking it NOT as a bullet
                    game.player.bullet2.decorationPool[i].y -= 15;
                    if (game.player.up) {
                        game.player.bullet2.decorationPool[i].y -= 8;
                    }
                    if (game.player.power < 2) {
                        ctx.drawImage(game.player.bullet2.decorationPool[i].img, game.player.x + game.player.width / 2 - game.player.bullet2.width / 2/*bulletx sticks to player*/, game.player.bullet2.decorationPool[i].y - 20, game.player.bullet2.decorationPool[i].width, game.player.bullet2.decorationPool[i].height);
                    }
                    else if (game.player.power < 3) {
                        
                    ctx.drawImage(game.player.bullet2.decorationPool[i].img, game.player.x + game.player.width / 2 - game.player.bullet2.width / 2/*bulletx sticks to player*/ - 50, game.player.bullet2.decorationPool[i].y - 20, game.player.bullet2.decorationPool[i].width, game.player.bullet2.decorationPool[i].height);
                    ctx.drawImage(game.player.bullet2.decorationPool[i].img, game.player.x + game.player.width / 2 - game.player.bullet2.width / 2/*bulletx sticks to player*/ + 50, game.player.bullet2.decorationPool[i].y - 20, game.player.bullet2.decorationPool[i].width, game.player.bullet2.decorationPool[i].height);
                    }
                    else if (game.player.power < 4) {
                        ctx.drawImage(game.player.bullet2.decorationPool[i].img, game.player.x + game.player.width / 2 - game.player.bullet2.width / 2/*bulletx sticks to player*/, game.player.bullet2.decorationPool[i].y - 20, game.player.bullet2.decorationPool[i].width, game.player.bullet2.decorationPool[i].height);
                        ctx.drawImage(game.player.bullet2.decorationPool[i].img, game.player.x + game.player.width / 2 - game.player.bullet2.width / 2/*bulletx sticks to player*/ - 50, game.player.bullet2.decorationPool[i].y - 20, game.player.bullet2.decorationPool[i].width, game.player.bullet2.decorationPool[i].height);
                        ctx.drawImage(game.player.bullet2.decorationPool[i].img, game.player.x + game.player.width / 2 - game.player.bullet2.width / 2/*bulletx sticks to player*/ + 50, game.player.bullet2.decorationPool[i].y - 20, game.player.bullet2.decorationPool[i].width, game.player.bullet2.decorationPool[i].height);
                    }
                    else if (game.player.power == 4) {
                        ctx.drawImage(game.player.bullet2.decorationPool[i].img, game.player.x + game.player.width / 2 - game.player.bullet2.width / 2/*bulletx sticks to player*/ - 60, game.player.bullet2.decorationPool[i].y - 20, game.player.bullet2.decorationPool[i].width, game.player.bullet2.decorationPool[i].height);
                        ctx.drawImage(game.player.bullet2.decorationPool[i].img, game.player.x + game.player.width / 2 - game.player.bullet2.width / 2/*bulletx sticks to player*/ + 60, game.player.bullet2.decorationPool[i].y - 20, game.player.bullet2.decorationPool[i].width, game.player.bullet2.decorationPool[i].height);
                        ctx.drawImage(game.player.bullet2.decorationPool[i].img, game.player.x + game.player.width / 2 - game.player.bullet2.width / 2/*bulletx sticks to player*/ - 20, game.player.bullet2.decorationPool[i].y - 20, game.player.bullet2.decorationPool[i].width, game.player.bullet2.decorationPool[i].height);
                        ctx.drawImage(game.player.bullet2.decorationPool[i].img, game.player.x + game.player.width / 2 - game.player.bullet2.width / 2/*bulletx sticks to player*/ + 20, game.player.bullet2.decorationPool[i].y - 20, game.player.bullet2.decorationPool[i].width, game.player.bullet2.decorationPool[i].height);
                    }
                }
                ctx.globalAlpha = 1;
            }
        }
        if (game.player.bulletPool.length > 0) {
            for (i = 0; i < game.player.bulletPool.length; i++) {
                if(game.player.bulletPool[i].type != 'bomb'){
                if (game.player.bulletPool[i].height != 1045 && game.player.bulletPool[i].y < -50 || game.player.bulletPool[i].y > canvas.height || game.player.bulletPool[i].x < -100 || game.player.bulletPool[i].x > 950) {
                    game.player.bulletPool.splice(i, 1);
                    break;
                }
                }
                else {
                    if (game.player.bulletPool[i].height != 1045 && game.player.bulletPool[i].y < -500 || game.player.bulletPool[i].y > canvas.height || game.player.bulletPool[i].x < -100 || game.player.bulletPool[i].x > 950) {
                        game.player.bulletPool.splice(i, 1);
                        break;
                    }
                }
            }
        }
       
    }
    function drawlaser(i) {
        if(!game.player.death){
            ctx.drawImage(game.player.bulletPool[i].img, game.player.bulletPool[i].x, game.player.bulletPool[i].y, game.player.bulletPool[i].width, game.player.bulletPool[i].height);
        }
        ctx.globalAlpha = 1;
      
    }
    function createStage(num, title, bossname, bosshp, active) {
            this.clock = 0;
            this.num = num; //stage number
            if (this.num == 0) {
                this.dialogue = [
                    'Hey!',
                    'Hi!',
                    'How are you?',
                    "I'm fine, thank you.",
                    "My room is getting so wet today. What happened?",
                    "How would I know what happened!",
                    "I heard there's a...",
                    "Don't bother me now. Or...You wanna fight?",
                    "Wait...",
                    "Hmnnnnnn...",
                    "You don't wanna fight anymore?",
                    "Yeah.",
                    "Why?",
                    "My weapon got crushed by the wet weather too.",
                    "Oh...Well...So do you know what happened...",
                    "No I don't. Bye-Bye.",
                    "Wait!!!",
                ]
            }
            this.dialogue_current = 0;
            this.dialogue_active = false;
            this.title = title;
           
            this.titleInit = false;
            this.boss = {
                name: bossname,
                hp: bosshp,
                status: "idle",
                img: new Image(),
                x: canvas.width / 2,
                y: -100,
            }
            this.boss.img.src = './ingame/boss/' + this.boss.name + "/" + "0.png";
            
            this.background = {
                img: new Image(),
                x: 15,
                y: 15,
                width: 900,
                height: 740,
                scroll: function () {
                        ctx.drawImage(this.img, this.x, this.y - this.height,this.width,this.height)
                        if (this.y > (15 + this.height)) {
                            this.y = 15;
                        }
                },
                velocity: 2,
            }
            this.background.img.src = './ingame/' + this.num + ".png";
            this.active = active;
            this.titleOpacity = 0;
            this.title_display = function(){
                if(!this.titleInit){
                    ctx.shadowBlur = 3;
                    ctx.shadowOffsetX = 1;
                    ctx.shadowOffsetY = 1;
                    if(this.titleOpacity < 1 && this.clock < 700){
                        this.titleOpacity += 0.04;
                        if (this.titleOpacity >= 1) {
                            this.titleOpacity = 1;
                        }
                    }
                    if (this.titleOpacity > 0 && this.clock > 770) {
                        this.titleOpacity -= 0.04;
                        if (this.titleOpacity <= 0) {
                            this.titleOpacity = 0;
                            this.titleInit = true;
                        }
                    }
                   
                    ctx.globalAlpha = this.titleOpacity;
                    ctx.drawImage(characterOptions[0].titlebg, 50, canvas.height / 2 - 200);
                    
                    
                    ctx.fillStyle = "rgba(255,179,179,1)";
                    ctx.textAlign = "center";
                    ctx.font = "50px 'Abril Fatface'";
                    ctx.fillText('Stage ' + (game.currentstage+1), 440, canvas.height / 2 - 125);
                    ctx.font = "45px 'Abril Fatface'";
                    ctx.fillText(this.title, 440, canvas.height / 2 - 65);
                    ctx.fillText('Get your items above this line', 440, canvas.height / 2 - 215);
                    ctx.fillText('______________________________________________' + (game.currentstage + 1), 440, canvas.height / 2 - 210);
                    ctx.globalAlpha = 1;
                    ctx.shadowBlur = 0;
                    ctx.shadowOffsetX = 0;
                    ctx.shadowOffsetY = 0;
                }
            }
        }
    function createEnemy(x, y, velocity, angle, anglediff, type, hp, width, height, firerate, firetype, firevelocity, firespread) {
        //coordinates
        this.x = x;
        this.y = y;
        //hp
        this.hp = hp;
        //velocity
        this.velocity = velocity;
        //angle
        this.angle = angle * (Math.PI / 180);
        this.angle_change = anglediff * (Math.PI / 180);
        this.acceleration = 0;
        //clock
        this.clock = 0;
        //type of enemy
        this.type = type;
        //image
        this.img = new Image();
        this.img.src = './enemy/' + this.type + '.png';
        this.width = width;
        this.height = height;
        if(this.type == 1 || this.type == 3 || this.type == 5 || this.type == 6 || this.type == 7 || this.type == 9){
            this.deathprop = 'point';
        }
        else if (this.type == 2 || this.type == 4 || this.type == 8 || this.type == 'rock') {
            this.deathprop = 'power';
        }
        
        this.xdistance = 0;
        this.ydistance = 0;
        
       
    }
    function enemy_update() {
       
        if (game.enemyPool.length > 0) {
            
            for (i = 0; i < game.enemyPool.length; i++) {
                game.enemyPool[i].xdistance = game.player.x - game.enemyPool[i].x;
                game.enemyPool[i].ydistance = game.player.y - game.enemyPool[i].y;
                game.enemyPool[i].clock++;
                game.enemyPool[i].angle += game.enemyPool[i].angle_change;
   
                    game.enemyPool[i].x += Math.cos(game.enemyPool[i].angle) * game.enemyPool[i].velocity;
                    game.enemyPool[i].y -= Math.sin(game.enemyPool[i].angle) * game.enemyPool[i].velocity;
           
                    if (game.stage[game.currentstage].dialogue_active && game.enemyPool[i].type == 'boss_1') {
                        game.enemyPool[i].velocity = 0;
                    }
                    
            
            
            ctx.drawImage(game.enemyPool[i].img, game.enemyPool[i].x, game.enemyPool[i].y, game.enemyPool[i].width, game.enemyPool[i].height);
            }
            for (i = 0; i < game.enemyPool.length; i++) {
                if (game.enemyPool[i].x + game.enemyPool[i].img.width < 0 || game.enemyPool[i].x > 880 || game.enemyPool[i].y > canvas.height) {
                    game.enemyPool.splice(i, 1);
                    break;
                }
            }
        }
    }
    function enemy_bullet_create(type, enemyX, enemyY, angle, velocity) {
        this.x = enemyX;
        this.y = enemyY;
        
      
        this.type = type;
        this.img = new Image();
        this.img.src = './bullets/' + this.type + '.png';
        this.checkangle = angle;
        if (this.checkangle == 'trace') {
            
            this.angle = -Math.atan2((game.player.y - this.y + game.player.height/2),(game.player.x - this.x + game.player.width/2));
       
        }
        else{
            this.angle = angle * (Math.PI / 180);
        
        }
        this.velocity = velocity;
        this.acceleration = 0;
    }
    function circleSpread(type, enemyX,enemyY, angle, velocity) {
        //radius does not change. Angle changes.
        var density = Math.floor(360 / angle);
        this.angle = angle;
        this.x = enemyX;
        this.y = enemyY;
        this.velocity = velocity;
        this.type = type;
        for (i = 0; i <= density; i++) {
            this.angle += angle;
            game.enemyBulletPool.push(new enemy_bullet_create(this.type, this.x, this.y, this.angle, this.velocity))
        }
        return;
    }
    function enemy_bullet_update() {
        if (game.enemyBulletPool.length>0){
        for (i = 0; i < game.enemyBulletPool.length; i++) {
            //the given velocity is the hypothenuse
            game.enemyBulletPool[i].y -= Math.sin(game.enemyBulletPool[i].angle) * game.enemyBulletPool[i].velocity;
            game.enemyBulletPool[i].x += Math.cos(game.enemyBulletPool[i].angle) * game.enemyBulletPool[i].velocity;
            ctx.drawImage(game.enemyBulletPool[i].img, game.enemyBulletPool[i].x, game.enemyBulletPool[i].y);
    
        }
        }
    }
    function enemy_collision() {
        for (i = 0; i < game.enemyPool.length; i++) {
            for (j = 0; j < game.player.bulletPool.length; j++) { //bullet pool. check each bullet
                if(game.player.bulletPool[j].height != 1045/*not marisa's laser*/){
                    if (
                           game.player.bulletPool[j].x + game.player.bulletPool[j].width > game.enemyPool[i].x
                        && game.player.bulletPool[j].x < game.enemyPool[i].x + game.enemyPool[i].img.width
                        && game.player.bulletPool[j].y < game.enemyPool[i].y + game.enemyPool[i].img.height
                        && game.player.bulletPool[j].y > game.enemyPool[i].y
                        && game.enemyPool[i].y > 30
                    ) {
                        
                       
                        game.enemyPool[i].hp -= game.player.bulletPool[j].damage;
                        if (game.enemyPool[i].hp <= 0) {
                            
                            
                            enemy_props_property_push();
                            game.score += 100;
                            //remove this enemy from the array
                            game.enemyPool.splice(i, 1);
                            break; 
                   
                        }
                 
                        game.player.bulletPool.splice(j, 1);
                    }
                }
                else if (game.player.bulletPool[j].height == 1045 && !game.player.death) {
                   
                    if (
                             game.player.bulletPool[j].x + game.player.bulletPool[j].width > game.enemyPool[i].x
                          && game.player.bulletPool[j].x < game.enemyPool[i].x + game.enemyPool[i].img.width
                          && game.player.bulletPool[j].y + game.player.bulletPool[j].height > game.enemyPool[i].y + game.enemyPool[i].img.height
                          && game.player.bulletPool[j].opacity == 1
                          && game.enemyPool[i].y > 30
                        ) {
                   
                        game.enemyPool[i].hp -= game.player.bulletPool[j].damage;
                        if (game.enemyPool[i].hp <= 0) {
                            enemy_props_property_push();
                            game.score += 105;
                            game.enemyPool.splice(i, 1);
                            break; //jump out after a collision happens. FIXED PROBLEM 20170318
                            /*****PROBLEM *SOLVED* 20170317:When shoot multiple bullets, OTHER ENEMIES WILL BE KILLED AT SAME COORDINATE.*****/
                        }
                    }
                }
            }
        }
    }
    function enemy_props_property_push() {
        if (game.enemyPool[i].type == 1
 || game.enemyPool[i].type == 2
 || game.enemyPool[i].type == 3
 || game.enemyPool[i].type == 4
    ) {
            game.propsPool.push(new props_create(game.enemyPool[i].x, game.enemyPool[i].y, 270, game.enemyPool[i].deathprop, -2));
        }
        if (game.enemyPool[i].type == 5
  || game.enemyPool[i].type == 6
  || game.enemyPool[i].type == 7
  || game.enemyPool[i].type == 8
  || game.enemyPool[i].type == 9
  || game.enemyPool[i].type == 'rock'
     ) {
            game.propsPool.push(new props_create(game.enemyPool[i].x, game.enemyPool[i].y, 270, game.enemyPool[i].deathprop, -2, true, -1.5, -3));
            game.propsPool.push(new props_create(game.enemyPool[i].x, game.enemyPool[i].y, 270, game.enemyPool[i].deathprop, -2, true, -1, -3.1));
            game.propsPool.push(new props_create(game.enemyPool[i].x, game.enemyPool[i].y, 270, game.enemyPool[i].deathprop, -2, true, -0.5, -3.2));
            game.propsPool.push(new props_create(game.enemyPool[i].x, game.enemyPool[i].y, 270, game.enemyPool[i].deathprop, -2, true, 0, -3.3));
            game.propsPool.push(new props_create(game.enemyPool[i].x, game.enemyPool[i].y, 270, game.enemyPool[i].deathprop, -2, true, 0.5, -3.2));
            game.propsPool.push(new props_create(game.enemyPool[i].x, game.enemyPool[i].y, 270, game.enemyPool[i].deathprop, -2, true, 1, -3.1));
            game.propsPool.push(new props_create(game.enemyPool[i].x, game.enemyPool[i].y, 270, game.enemyPool[i].deathprop, -2, true, 1.5, -3));
        }
        return;
    }
    function props_create(x, y, angle, type, initspeed, deathCreate,dx,dy) {
        this.x = x;
        this.y = y;
        this.acceleration = 0.05;
        this.velocity = 0;
        this.displacement = initspeed;
        this.angle = angle * (Math.PI / 180);
        this.type = type;
        this.img = new Image();
        this.img.src = './props/' + this.type + '.png';
        this.deathCreate = deathCreate;
        this.dx = dx;
        this.dy = dy;
    }
    function props_update() {
        if (game.propsPool.length > 0) {
            for (i = 0; i < game.propsPool.length; i++) {
                game.propsPool[i].velocity += game.propsPool[i].acceleration;
                /*            game.enemyBulletPool[i].y -= Math.sin(game.enemyBulletPool[i].angle) * game.enemyBulletPool[i].velocity;
                     game.enemyBulletPool[i].x += Math.cos(game.enemyBulletPool[i].angle) * game.enemyBulletPool[i].velocity;*/
           
                       
                if (game.propsPool[i].deathCreate && !game.player.autoCollect){
                        game.propsPool[i].x += game.propsPool[i].dx;
                        game.propsPool[i].y += game.propsPool[i].dy + game.propsPool[i].velocity;
                    } else {
                        game.propsPool[i].x += Math.cos(game.propsPool[i].angle) * (game.propsPool[i].displacement + game.propsPool[i].velocity);
                        game.propsPool[i].y -= Math.sin(game.propsPool[i].angle) * (game.propsPool[i].displacement + game.propsPool[i].velocity);
                    }
                    if (game.player.autoCollect && !game.player.death) {
                        game.propsPool[i].angle = -Math.atan2((game.player.y - game.propsPool[i].y + game.player.height / 2), (game.player.x - game.propsPool[i].x + game.player.width / 2))
                        game.propsPool[i].displacement = 15;
                        game.propsPool[i].x += Math.cos(game.propsPool[i].angle) * (1);
                        game.propsPool[i].y -= Math.sin(game.propsPool[i].angle) * (1);
                    }
                   
                ctx.drawImage(game.propsPool[i].img, game.propsPool[i].x, game.propsPool[i].y);
                if (game.propsPool[i].type == 'power' || game.propsPool[i].type == 'point') {
                    if(game.propsPool[i].y < 0){
                        game.upperarrow.src = './props/' + game.propsPool[i].type + '_upper.png';
                        ctx.drawImage(game.upperarrow, game.propsPool[i].x, 30);
                        debugger;
                    }
                }
            }
            for (i = 0; i < game.propsPool.length; i++) {
            if (game.propsPool[i].y > canvas.height || game.propsPool[i].x < -25 || game.propsPool[i].x > 880) {
                game.propsPool.splice(i, 1);
                break;
                }
            }
        }
    }
    function props_collision() {
        if (game.propsPool.length > 0) {
            for (i = 0; i < game.propsPool.length; i++) {
                if(
                    game.propsPool[i].x < game.player.x + game.player.width
                &&  game.propsPool[i].x + game.propsPool[i].img.width > game.player.x
                &&  game.propsPool[i].y < game.player.y + game.player.height
                &&  game.propsPool[i].y + game.propsPool[i].img.height> game.player.y 
                    
                    ) {
                   
                    if (game.propsPool[i].type == 'power') {
                        
                        game.player.power += 0.01;
                        if (game.player.power >= 4) {
                            game.player.power = 4;
                        }
                        game.score += 25;
                    }
                    else if (game.propsPool[i].type == 'point') {
                        
                        game.player.point += 1;
                        if (game.player.point == 100) {
                            game.player.point = 0;
                            game.player.life++;
                        }
                        game.score += 50;
                    }
                    game.propsPool.splice(i, 1);
                    break;
                        
                }
            }
        }
    }
    function infoDisplay() {
        ctx.fillStyle = "rgba(255,179,179,1)";
        ctx.textAlign = "left";
        ctx.font = "45px 'Abril Fatface'";
        //approx.width of info: 420
        ctx.strokeStyle = 'rgb(115,8,48)';
        ctx.lineWidth = 7;
        ctx.strokeText("Stage " + (game.currentstage+1), canvas.width - 280, 70);
        ctx.fillStyle = 'white';
        ctx.fillText("Stage " + (game.currentstage + 1), canvas.width - 280, 70);
        //ctx.fillText(parseInt((new Date().getTime() - game.startTime) / 1000, 10), canvas.width - 410, 120)
        ctx.font = "30px 'Abril Fatface'";
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 5;
        ctx.strokeText("Scenario: " + game.player.fullname, canvas.width - 385, 125);
        ctx.fillStyle = 'rgb(255,146,164)';
        ctx.fillText("Scenario: " + game.player.fullname, canvas.width - 385, 125);
        ctx.strokeStyle = 'black';
        ctx.strokeText("Score: " + game.score, canvas.width - 385, 170);
        ctx.fillStyle = 'white';
        ctx.fillText("Score: " + game.score, canvas.width - 385, 170);
        ctx.fillText("________________________", canvas.width - 385, 190);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 4;
        ctx.strokeText("Player", canvas.width - 385, 235);
        ctx.fillStyle = 'rgb(239,130,81)';
        ctx.fillText("Player", canvas.width - 385, 235);
        var lifeDisplay = '';
        var bombDisplay = '';
        for (i = 0; i < game.player.life; i++) {
            lifeDisplay += '★'
        }
        for (i = 0; i < game.player.bombNumber; i++) {
            bombDisplay += '★'
        }
        ctx.textAlign = 'right';
        ctx.fillStyle = 'rgb(87,87,87)';
        ctx.fillText('★★★★★★★★', canvas.width - 40, 235);
        ctx.fillText('★★★★★★★★', canvas.width - 40, 280);
        ctx.textAlign = 'left';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        ctx.strokeText(lifeDisplay, 1041, 235);
        ctx.strokeText(bombDisplay, 1041, 280);
        ctx.fillStyle = 'rgb(239,130,81)';
        ctx.fillText(lifeDisplay, 1041, 235);
        ctx.fillStyle = 'rgb(255,95,249)';
        ctx.fillText(bombDisplay, 1041, 280);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 4;
        ctx.strokeText("Bomb", canvas.width - 385, 280);
        ctx.fillStyle = 'rgb(255,95,249)';
        ctx.fillText("Bomb", canvas.width - 385, 280);
        ctx.fillStyle = 'white';
        ctx.fillText("________________________", canvas.width - 385, 300);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 4;
        ctx.strokeText("Power", canvas.width - 385, 345);
        ctx.fillStyle = 'rgb(255,0,0)';
        ctx.fillText("Power", canvas.width - 385, 345);
 
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 4;
        ctx.strokeText("Point", canvas.width - 385, 390);
        ctx.fillStyle = 'rgb(0,108,255)';
        ctx.fillText("Point", canvas.width - 385, 390);
        ctx.textAlign = 'right';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 4;
        ctx.strokeText(game.player.power.toFixed(2) + "/4.00", canvas.width - 40, 345);
        ctx.fillStyle = 'rgb(255,0,0)';
        ctx.fillText(game.player.power.toFixed(2) + "/4.00", canvas.width - 40, 345);
        ctx.textAlign = 'right';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 4;
        ctx.strokeText(game.player.point + "/100", canvas.width - 40, 390);
        ctx.fillStyle = 'rgb(0,108,255)';
        ctx.fillText(game.player.point + "/100", canvas.width - 40, 390);
    }
    function player_collision() {
        if(game.enemyBulletPool.length > 0){
            for (i = 0; i < game.enemyBulletPool.length; i++) {
                if (game.enemyBulletPool[i].x > game.player.x + game.player.width / 3
                 && game.enemyBulletPool[i].x < game.player.x + game.player.width - game.player.width / 3
                 && game.enemyBulletPool[i].y > game.player.y + game.player.height / 3
                 && game.enemyBulletPool[i].y < game.player.y + game.player.height / 3 * 2
                 && game.player.invincible == false
                    ) {
                    console.log('died')
                    if (game.player.autoCollect == true) {
                        game.player.autoCollect = false;
                    }
                    game.player.life--;
                    
                    
                    if (game.player.power >= 2) {
                        game.player.power -= 1;
                    }
                    else if (game.player.power < 2) {
                        game.player.power = 1;
                    }
                    game.player.death = true;
                    game.player.invincible = true;
                    game.propsPool.push(new props_create(game.player.x, game.player.y, 250, 'power', -4,true,  -1.5,-6));
                    game.propsPool.push(new props_create(game.player.x, game.player.y, 250, 'power', -4, true, -1, -6.2));
                    game.propsPool.push(new props_create(game.player.x, game.player.y, 250, 'power', -4, true, -0.5, -6.4));
                    game.propsPool.push(new props_create(game.player.x, game.player.y, 250, 'power', -4, true, 0, -6.6));
                    game.propsPool.push(new props_create(game.player.x, game.player.y, 250, 'power', -4, true, 0.5, -6.4));
                    game.propsPool.push(new props_create(game.player.x, game.player.y, 250, 'power', -4, true, 1, -6.2));
                    game.propsPool.push(new props_create(game.player.x, game.player.y, 250, 'power', -4, true, 1.5, -6));
                }
                    /*
                             this.player.detection = {
                x1: this.player.width/2-3.5,
                x2: this.player.width/2+3.5,
                y1: this.player.y+25,
            };
                    */
            }
        }
        if(game.enemyPool.length > 0 && !game.player.death && !game.player.invincible){
        for (j = 0; j < game.enemyPool.length; j++) {
            if (game.enemyPool[j].x + game.enemyPool[j].width > game.player.x + game.player.width / 3 && game.enemyPool[j].x < game.player.x + game.player.width - game.player.width / 3 && game.enemyPool[j].y < game.player.y + game.player.height / 3 * 2 && game.enemyPool[j].y + game.enemyPool[j].height > game.player.y + game.player.height / 3) {
                console.log('died')
                if (game.player.autoCollect == true) {
                    game.player.autoCollect = false;
                }
                game.player.life--;
                if (game.player.power >= 2) {
                    game.player.power -= 1;
                }
                else if (game.player.power < 2) {
                    game.player.power = 1;
                }
                game.player.death = true;
                game.player.invincible = true;
                game.propsPool.push(new props_create(game.player.x, game.player.y, 250, 'power', -4, true, -1.5, -6));
                game.propsPool.push(new props_create(game.player.x, game.player.y, 250, 'power', -4, true, -1, -6.2));
                game.propsPool.push(new props_create(game.player.x, game.player.y, 250, 'power', -4, true, -0.5, -6.4));
                game.propsPool.push(new props_create(game.player.x, game.player.y, 250, 'power', -4, true, 0, -6.6));
                game.propsPool.push(new props_create(game.player.x, game.player.y, 250, 'power', -4, true, 0.5, -6.4));
                game.propsPool.push(new props_create(game.player.x, game.player.y, 250, 'power', -4, true, 1, -6.2));
                game.propsPool.push(new props_create(game.player.x, game.player.y, 250, 'power', -4, true, 1.5, -6));
            }
        }
        }
    }
    var decoration_dialogue = new Image();
    decoration_dialogue.src = './decoration_dialogue.png';
    function dialogue_update() {
        if (game.stage[game.currentstage].dialogue_active) {
            ctx.drawImage(decoration_dialogue, 0, 400)
            if (game.stage[game.currentstage].dialogue_current % 2 == 0 ) {
            ctx.shadowBlur = 3;
            ctx.shadowOffsetX = 1.5;
            ctx.shadowOffsetY = 1.5;
            ctx.fillStyle = 'rgba(255,0,0,0.5)';
            ctx.fillRect(100, 500, 800, 250);
            
            ctx.fillStyle = 'white';
            ctx.font = "22px 'Abril Fatface'";
            ctx.textAlign = 'left';
            ctx.fillText(game.player.fullname + ": " + game.stage[game.currentstage].dialogue[game.stage[game.currentstage].dialogue_current], 120, 540);
             
            console.log(game.stage[game.currentstage].dialogue[game.stage[game.currentstage].dialogue_current])
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.textAlign = 'left';
            }
            else {
                ctx.shadowBlur = 3;
                ctx.shadowOffsetX = 1.5;
                ctx.shadowOffsetY = 1.5;
                ctx.fillStyle = 'rgba(0,0,255,0.5)';
                ctx.fillRect(100, 500, 800, 250);
                ctx.fillStyle = 'white';
                ctx.font = "22px 'Abril Fatface'";
                ctx.textAlign = 'left';
                ctx.fillText("The Dragon's Son: " + game.stage[game.currentstage].dialogue[game.stage[game.currentstage].dialogue_current], 120, 540);
                ctx.shadowBlur = 0;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
            }
           
        }
    }
        /*Keylisener Functions*/
        function keyDownHandler(e) {
            if (e.keyCode == 38) {
                if (opening) {
                    if (menuOpen) {
                        for (i = 0; i < 8; i++) {
                            if (options[i].selected) {
                                if (i != 0) {
                                    options[i].selected = false;
                                    options[i - 1].selected = true;
                                    options[i - 1].selectedAnimationExecuted = false;
                                }
                                else if (i == 0) {
                                    options[0].selected = false;
                                    options[7].selected = true;
                                    options[7].selectedAnimationExecuted = false;
                                }
                                break;//prevent overlapping switching
                            }
                        }
                    }
                }
                if (game != undefined && game.player.allowControl) {
                    game.player.up = true;
                    if (resume.active || pause.active) {
                        for (i = 0; i < 3; i++) {
                            if (options_death[i].selected) {
                                if (i != 0) {
                                    options_death[i].selected = false;
                                    options_death[i - 1].selected = true;
                                }
                                else if (i == 0) {
                                    options_death[0].selected = false;
                                    options_death[2].selected = true;
                                    debugger;
                                }
                                break;//prevent overlapping switching
                            }
                        }
                    }
                }
            }
            else if (e.keyCode == 40) {
                if (opening) {
                    if (menuOpen) {
                        for (i = 0; i < 8; i++) {
                            if (options[i].selected) {
                                if (i != 7) {
                                    options[i].selected = false;
                                    options[i + 1].selected = true;
                                    options[i + 1].selectedAnimationExecuted = false;
                                }
                                else if (i == 7) {
                                    options[7].selected = false;
                                    options[0].selected = true;
                                    options[0].selectedAnimationExecuted = false;
                                }
                                break;//prevent overlapping switching
                            }
                        }
                    }
                }
                if (game != undefined && game.player.allowControl) {
                        game.player.down = true;
                        if (resume.active || pause.active) {
                            for (i = 0; i < 3; i++) {
                                if (options_death[i].selected) {
                                    if (i != 2) {
                                        options_death[i].selected = false;
                                        options_death[i + 1].selected = true;
                                    }
                                    else if (i == 2) {
                                        options_death[i].selected = false;
                                        options_death[0].selected = true;
                                        debugger;
                                    }
                                    break;//prevent overlapping switching
                                }
                            }
                        }
                }
            }
            else if (e.keyCode == 39) {
                if (opening) {
                    if (!menuOpen && !togame) {
                        if (options[0].started || options[1].started) {
                            for (i = 0; i < 3; i++) {
                                if (characterOptions[i].active) {
                                    if (i != 2) {
                                        characterOptions[i].active = false;
                                        characterOptions[i + 1].x = 85;
                                        characterOptions[i].transition = "right";
                                        //   characterOptions[i + 1].active = true;
                                    }
                                    else if (i == 2) {
                                        characterOptions[2].active = false;
                                        characterOptions[0].x = 85;
                                        characterOptions[i].transition = "right";
                                    }
                                    break;//prevent overlapping switching
                                }
                            }
                        }
                    }
                }
                if (game != undefined && game.player.allowControl) {
                    game.player.right = true;
                }
            }
            else if (e.keyCode == 37) {
                if (opening) {
                    if (!menuOpen && !togame) {
                        if (options[0].started || options[1].started) {
                            for (i = 0; i < 3; i++) {
                                if (characterOptions[i].active) {
                                    if (i != 0) {
                                        characterOptions[i].active = false;
                                        characterOptions[i - 1].x = -35;
                                        characterOptions[i].transition = "left";
                                        //   characterOptions[i - 1].active = true;
                                    }
                                    else if (i == 0) {
                                        characterOptions[0].active = false;
                                        characterOptions[2].x = -35;
                                        characterOptions[i].transition = "left";
                                        //   characterOptions[5].active = true;
                                    }
                                    break;//prevent overlapping switching
                                }
                            }
                        }
                    }
                }
                if (game != undefined && game.player.allowControl) {
                    game.player.left = true;
                }
            }
            else if (e.keyCode == 90) {
                if (game != undefined && game.stage[game.currentstage].dialogue_active == false) {
                    game.player.fire = true;
                }
            }
            else if (e.keyCode == 88) {
                if (game != undefined && game.player.bomb_clock == 0 && game.player.bomb_fire == false && game.player.bombNumber > 0) {
                    game.player.bomb_fire = true;
                }
            }
            else if (e.keyCode == 13) {
                if (opening) {
                    if (menuOpen) {
                        for (i = 0; i < 8; i++) {
                            if (options[i].init && options[i].opacity >= 1) {
                                if (options[i].selected) {
                                    options[i].startedAnimationExecuted = false;
                                    options[i].started = true;
                                }
                            }
                        }
                    }
                    else if ((options[0].started) && !togame) {
                        for (i = 0; i < 3; i++) {
                            if (characterOptions[i].active) {
                                if (options[0].started) {
                                    game = new createGame(0, i);
                                }
                                else if (options[1].started) {
                                    game = new createGame(1, i);
                                }
                                togame = true;
                            }
                        }
                    }
                }
                if (ingame) {
                    if (!resume.active) {
                        for (i = 0; i < game.stage.length; i++) {
                            if (game.stage[i].active) {
                                if (game.stage[i].initScene && game.stage[i].dialogue) {
                                    game.stage[i].dialogueCurrent++;
                                }
                            }
                        }
                    }
                    else if (resume.active){
                        for (i = 0; i < 3; i++) {
                            if (options_death[i].selected) {
                                if (i == 0) {
                                    game.player.life = 2;
                                    game.player.power = 4;
                                    resume.active = false;
                                    resume.opacity = 0;
                                }
                                if (i == 1) {
                                    resume.active = false;
                                    resume.opacity = 0;
                                 
                                    game = new createGame(0, game.player.id);
                       
                                    
                                }
                                if (i == 2) {
                                    location.reload();
                                }
                            }
                        }
                    }
                    if (pause.active) {
                        for (i = 0; i < 3; i++) {
                            if (options_death[i].selected) {
                                if (i == 0) {
                                    pause.active = false;
                                }
                                if (i == 1) {
                                    pause.active = false;
                                    pause.opacity = 0;
                                    game = new createGame(0, game.player.id);
                                }
                                if (i == 2) {
                                    location.reload();
                                }
                            }
                        }
                    }
                    if (game.stage[game.currentstage].dialogue_active) {
                        if ((game.stage[game.currentstage].dialogue[game.stage[game.currentstage].dialogue_current + 1]) != undefined) {
                            game.stage[game.currentstage].dialogue_current++;
                        }
                        else {
                            game.stage[game.currentstage].dialogue_active = false;
                            
                            if (game.currentstage == 0) {
                                for (i = 0; i < game.enemyPool.length; i++) {
                                    if (game.enemyPool[i].type == 'boss_1') {
                                        game.enemyPool[i].velocity = 9;
                                        game.enemyPool[i].angle = 90;
                                        
                                        ending.active = true;
                                    }
                                }
                            }
                          
                        }
                    }
                }
            }
            else if (e.keyCode == 27) {
                if (opening && !togame) {
                    if (hiddingAnimation) {
                        hiddingAnimation = false;
                    }
                }
                if (ingame) {
                    if(!pause.active){
                        pause.active = true;
                    }
                    else if (pause.active) {
                        pause.active = false;
                        pause.opacity = 0;
                    }
                }
            }
            else if (e.keyCode == 16) {
                if (game != undefined) {
                    game.player.slow = true;
                }
            }
            /*********************************
            ******** In GAME CONTROLLER ******
            **********************************/
        }
        function keyUpHandler(e) {
            if (game != undefined) { 
                if (e.keyCode == 37) {
                    game.player.left = false;
                }
                else if (e.keyCode == 39) {
                    game.player.right = false;
                }
                else if (e.keyCode == 40) {
                    game.player.down = false;
                }
                else if (e.keyCode == 38) {
                    game.player.up = false;
                }
                else if (e.keyCode == 16) {
                    game.player.slow = false;
                }
                else if (e.keyCode == 90) {
                    game.player.fire = false;
                }
 
            }
        }
