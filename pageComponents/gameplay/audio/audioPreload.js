export default function audioPreload(game){
     this.load.audio("playerHit","/audio/playerHit.wav");

    // -----------Player shots----------

    // Level 1 -> 5 
        this.load.audio( "playerShot", "/audio/playerShot.wav" )

    // Level 6
        this.load.audio( "babyPew", "/audio/babyPew.wav" )

    // Level 7
        this.load.audio( "pew", "/audio/pew.wav" )

    // Level 8
        this.load.audio( "shortPlayerShot8", "/audio/shortPlayerShot8.wav" )

    // // Level 9
        this.load.audio( "laserPew", "/audio/laserPew.wav" )



    // Unused

        this.load.audio( "playerShotPew", "/audio/playerShotPew.wav" )

        this.load.audio( "8bitExplosion", "/audio/8bitExplosion.wav" )


    // -----------Alien explosions/Deaths----------


    // Level 6 & 7
        this.load.audio( "bassRumbleExplode", "/audio/bassRumbleExplode.wav" )

    // Level 8
        this.load.audio( "missile", "/audio/missile.wav" )

    // Level 9
        this.load.audio( "enemyHit", "/audio/enemyHit.wav" )

    // ------ Upgrade transition sound to 7 -> 8 ---- //

        this.load.audio( "8bitUpgrade","/audio/8bitUpgrade.wav" )

    // -----------MUSIC----------

        this.load.audio( "level7Music", "/audio/level7Music.mp3" )

        this.load.audio( "level8Music", "/audio/level8Music.wav" )

        this.load.audio( "level9Music", "/audio/level9Music.wav" )

    // -----------Game Over audio----------

        this.load.audio( "gameOver", "/audio/gameOver.wav" )

        this.load.audio( "gameover8", "/audio/gameover8.wav" )

        this.load.audio( "pacManDeath", "/audio/pacManDeath.wav" )

}


// // Player has shot a bullet.

// app.playerShotSound = function(){
//     //AUDIO Player PEWPEWPEW sounds etc. -K

//     if (app.levelCounter <= 5){
//         app.soundCall = new Howl({
//         volume: 0.5,
//         urls: [app.playSound("playerShot")]
//         }).play();

//     } else if (app.levelCounter === 6){
//         app.soundCall = new Howl({
//         urls: [app.playSound("babypew")]
//         }).play();

//     } else if (app.levelCounter === 7){
//         app.soundCall = new Howl({
//         volume: 0.5,
//         urls: [app.playSound("pew")]
//         }).play();

//     } else if (app.levelCounter === 8){
//         app.soundCall = new Howl({
//         volume: 0.5,
//         urls: [app.playSound("shortplayershot8")]
//         }).play();

//     } else if (app.levelCounter >= 8){
//         app.soundCall = new Howl({
//         volume: 0.5,
//         urls: [app.playSound("laserpew")]
//         }).play();

//     }

// }

// // Player dies

// app.playGameOverSound = function(){
//         if(app.levelCounter < 7){
//         app.soundCall = new Howl({
//         urls: [app.playSound("gameOver")]
//         }).play();
//     } else if (app.levelCounter === 7){
//         app.soundCall = new Howl({
//         urls: [app.playSound("pacmandeath")]
//         }).play();
//     } else if (app.levelCounter > 7){
//         app.soundCall = new Howl({
//         urls: [app.playSound("gameover8")]
//         }).play();
//     }
// }

// // Player takes a hit

// app.playPlayerIsHit = function(){
//     app.soundCall = new Howl({
//     volume: 0.5,
//     urls: [app.playSound("playerHit")]
//     }).play();
// }

