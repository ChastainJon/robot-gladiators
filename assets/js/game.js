var fight = function(enemy){
    while(playerInfo.health > 0 &&enemy.health > 0){
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        if (promptFight === "skip" || promptFight === "SKIP"){
            window.alert(playerInfo.name + " has chosen to skip the fight!");
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");
            if(confirmSkip){
                window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                console.log("playerInfo.money", playerInfo.money);
                break;
            }
        }
        //remove enemy.health
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
        enemy.health = Math.max(0, enemy.health - damage);
        console.log(playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining.");
        //check enemy health
        if (enemy.health <= 0){
            window.alert(enemy.name + " has died!");
            playerInfo.money = playerInfo.money + 20;
            break;
        }
        else{
            window.alert(enemy.name + " still has " + enemy.health + " health left");
        }
        //remove playerInfo.health
        var damage = randomNumber(enemy.attack - 3, enemy.attack);
        playerInfo.health = Math.max(0, playerInfo.health - damage);
        console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");
        //check playerInfo.health
        if(playerInfo.health <= 0){
            window.alert(playerInfo.name + " has died!");
            break;
        }
        else{
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left");
        }
    }
};
//Start Game Function
var startGame = function(){
    playerInfo.reset();
    for(var i=0; i < enemyInfo.length; i++){
        if(playerInfo.health > 0){
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            var pickedEnemyObj = enemyInfo[i];
            pickedEnemyObj.health = randomNumber(40, 60);
            //debugger;
            fight(pickedEnemyObj);
            if(playerInfo.health > 0 && i < enemyInfo.length - 1){
                var storeConfirm = window.confirm("The fight is over, visit the shop?");
                if(storeConfirm){
                    shop();
                }
            }
        }
        else{
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }
    endGame();
};
//End Game Function
var endGame = function() {
    window.alert("The game has now ended. Let's see how you did!");
    //Check players results
    if(playerInfo.health > 0){
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    }
    else{
        window.alert("You've lost your robot in battle.")
    }
    //Check to see if player wants to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");
    if(playAgainConfirm){
        //restart game
        startGame();
    }
    else{
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};
//Shop function
var shop = function(){
    console.log("Entered the shop");
    var shopOptionPrompt = window.prompt("would you like to REFILL your health, UPGRADE your attack, or LEAVE the shop? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice");
    //store options
    switch(shopOptionPrompt){
        case "refill":
        case "REFILL":
            playerInfo.refillHealth();
            break;
        case "upgrade":
        case "UPGRADE":
            playerInfo.upgradeAttack();
            break;
        case "leave":
        case "LEAVE":
            window.alert("Leaving the store");
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");
            shop();
            break;
    }
};
var randomNumber = function(min, max){
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};
var playerInfo ={
    name: window.prompt("What is your robot's name?"),
    health: 100,
    attack: 10,
    money: 10,
    reset: function(){
        this.health =100;
        this.money =10;
        this.attack =10;
    },
    refillHealth: function(){
        if(this.money >= 7){
            window.alert("Refilling player's health by 20 for 7 dollars");
            this.health += 20;
            this.money +- 7;
        }
        else{
            window.alert("You do not have enough money4");
        }
    },
    upgradeAttack: function(){
        if(this.money >= 7){
            window.alert("Upgrading player's attack by 6 for 7 dollars");
            this.attack += 6;
            this.money -= 7;
        }
        else{
            window.alert("You do not have enough money4");
        }
    }

};

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10,14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10,14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10,14)
    }
];
//start game when page loads
startGame();
