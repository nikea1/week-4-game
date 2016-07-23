
$(document).ready(function(){

	//used to create characters
	function character(name, picture, hp, atk, counter, music){
		this.name = name;		//character name
		this.img = picture;		//character image
		this.hp = hp;			//character health
		this.themeSong = music;	//character's theme song
		this.atk = atk;			//initial attack value
		this.inc = atk;			//increment value
		this.counter = counter;	//counter attack strength
		
		this.damageRecieved = function(dmg){	//calculates damage results
			this.hp -= dmg;
		}

		this.strengthen = function(){			//stregthens character each attack
			this.atk += this.inc;
		}
		this.getHp = function(){				//get current hp
			return this.hp;
		}
	}

	var playerChoice = [];		//list of players to pick
	var player;					//character that player controls
	var defender;				//active enemy to fight
	var defenderExist = false;	//check if defender is active
	var playerDead = false;		//check if player is dead

	//character list
	playerChoice[0] = new character("Reimu Hakurei", "assets/images/Hakurei.png", 120, 8, 12, "assets/sounds/IN - Maidens Capriccio - Dream Battle.mp3");
	playerChoice[1] = new character("Marisa Kirisame", "assets/images/Kirisame.png", 110, 15, 5, "assets/sounds/Love-coloured Master Spark.mp3");
	playerChoice[2] = new character("Sakuya Izayoi", "assets/images/Izayoi.png", 180, 5, 25, "assets/sounds/(SWR) Flowering Night.mp3");
	playerChoice[3] = new character("Youmu Konpaku", "assets/images/Konpaku.png", 150, 4, 20, "assets/sounds/PCB - Hiroari Shoots a Strange Bird - Till When？.mp3");

	//generates all characters on webpage to choose from
	for(var i = 0; i < playerChoice.length; i++){
		
		//builds character at target and sets character data and classes and sets an onClick function
		buildCard('#characters', playerChoice[i], "character-choice", setGame);
	
	}

	//Attack button
	$('button').on("click", function(){
		
		if(playerDead) return; //stops attacking when player is dead

		if(defenderExist){ //check if there is someone to fight

			defender.damageRecieved(player.atk);
			
			//output attack text
			$('#player-message').text(player.name + " does " + player.atk + " damage to " + defender.name + "!");
			
			player.strengthen(); //power up player
			
			if(defender.getHp() <= 0){ //if the defender dies
				
				$('#defender').empty();	//clear out defender space

				if($('#enemies').is(':empty')) {	//check if there are any enemies left to fight
					
					//display victory text and restart button
					gameOverPrompt("Well Done, you defeated all of your opponents!");
					
				}
				else{ //else instruct user to pick a new defender
					$('#player-message').text("You defeated " + defender.name + ", go pick another opponent to fight!");
					
					$('#ememy-message').empty();
				}
				
				defenderExist = false; //set flag to false

			}	
			
			if(defenderExist){	//if defender is active it fights back
				player.damageRecieved(defender.counter);
				
				$('#ememy-message').text(defender.name + " strikes back with " + defender.counter + " damage to " + player.name + "!");

				if(player.getHp() <= 0){ //if player loses
					
					playerDead = true; //set flag to true

					//display game over text and reset button
					gameOverPrompt("You've been defeated...GAME OVER.")

				}
			}	

		$('#player .character-health').text(player.hp); //update player's health
		$('#defender .character-health').text(defender.hp);	//update defender's health
		}
		else{//if there is no active defender display this text
		$('#player-message').text("There is no one to attack");
		
		}
		
	})

	//outputs game result and reset button
	function gameOverPrompt(string){
		$('#player-message').text(string);
					
		$('#ememy-message').empty();
		
		//display reset button
		$('#ememy-message').append($('<button>')
			.text('Restart')
			.on("click", function(){

				location.reload();

			}));

	}
	//sets game screen
	function setGame(newPlayer){

		player = newPlayer;	//sets player's info

		$("#characters").empty();	//clears out character list

		buildCard('#player', player, "player"); //creates player on webpage

		//plays player's theme song
		var audioElement = document.createElement('audio');
	        audioElement.setAttribute('src', player.themeSong);
	        audioElement.play();
	        console.log(audioElement);


	    //creates enemy wait list
		setWaitList();

			
	}

	//sets Enemy available list
	function setWaitList(){
		
		for(var i = 0; i < playerChoice.length; i++){
			if(player != playerChoice[i]){
				if(defender != playerChoice[i]){
					if(playerChoice[i].getHp() > 0){

						buildCard('#enemies', playerChoice[i], "wait", setDefender);
					}
				}
			}

		}
	}

	//sets defender
	function setDefender(newDefender){
		
		if (defenderExist) {return;}

		defender = newDefender;
		defenderExist = true;
		$('#enemies').empty();

		buildCard('#defender', defender, "defender");

		//updates enemy list
		setWaitList();


	}

	//creates character and click behaviour
	function buildCard(target, value, newClass, functionOnClick){
		var card_container = $('<div>')
		.addClass("character-card " + newClass)
		.data("chara", value)
		.on("click", function(){

			console.log("click", $(this).data("chara"));
			
			if(functionOnClick != undefined)
				functionOnClick($(this).data("chara"));

		});
		console.log(value);
		console.log(value.name);
		var card_name = $('<div>')
			.addClass("character-name")
			.text(value.name);
			
		var card_img = $('<img>')
			.attr("src", value.img)
			.attr("alt", "Player picture")
			.width(120)
			.height(80)

		var card_health = $('<div>')
			.addClass("character-health")
			.text(value.hp)

			card_container.append(card_name);
			card_container.append(card_img);
			card_container.append(card_health);
			$(target).append(card_container);
	}

});

