
$(document).ready(function(){

	//used to create characters
	function character(name, picture, hp, atk, counter){
		this.name = name;
		this.img = picture;
		this.hp = hp;
		this.status = "none";
		this.atk = atk;
		this.inc = atk;
		this.counter = counter;
		
		this.damageRecieved = function(dmg){
			this.hp -= dmg;
		}

		this.strengthen = function(){
			this.atk += this.inc;
		}
		this.getHp = function(){
			return this.hp;
		}
	}

	var playerChoice = [];
	var wait = [];
	var player;
	var defender;
	var defenderExist = false;

	playerChoice[0] = new character("Obi-wan-Kenobi", "http://placehold.it/120x80", 120, 8, 24);
	playerChoice[1] = new character("Luke Skywalker", "http://placehold.it/120x80", 100, 5, 5);
	playerChoice[2] = new character("Darth Maul", "http://placehold.it/120x80", 180, 5, 25);
	playerChoice[3] = new character("Darth Sidious", "http://placehold.it/120x80", 150, 4, 20);



	//generates players
	for(var i = 0; i < playerChoice.length; i++){
		console.log("outside loop "+playerChoice);
		buildCard('#characters', playerChoice[i], "character-choice", setGame);
	
	}//end of for loop

	function setGame(newPlayer){

		player = newPlayer;

		$("#characters").empty();

		buildCard('#player', player, "player");
		

		//set wait array
		for(var i = 0; i < playerChoice.length; i++){
			if(player != playerChoice[i]){
				
				wait.push(playerChoice[i]);

				buildCard('#enemies', playerChoice[i], "wait", setDefender);
				
			}

		}
		console.log(wait);		
	}

	function setDefender(newDefender){
		
		if (defenderExist) {return;}

		defender = newDefender;
		defenderExist = true;
		$('#enemies').empty();

		buildCard('#defender', defender, "defender");
		

		//set wait array

		for(var i = 0; i < playerChoice.length; i++){
			if(player != playerChoice[i]){
				if(defender != playerChoice[i]){
					if(playerChoice[i].getHp() >= 0){
				//wait.push(playerChoice[i]);

						buildCard('#enemies', playerChoice[i], "wait", setDefender);
					}
				}
			}

		}
		console.log(wait);
		/**/

	}

	function buildCard(target, value, newClass, functionOnClick){
		var card_container = $('<div>')
		.addClass("character-card " + newClass)
		.data("chara", value)
		.on("click", function(){

			console.log("click", $(this).data("chara"));
			//$(this).addClass("character-player").removeClass("character-choice");
			//player = $(this).data("chara");

			//player = ;
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

		var card_health = $('<div>')
			.addClass("character-health")
			.text(value.hp)

			card_container.append(card_name);
			card_container.append(card_img);
			card_container.append(card_health);
			$(target).append(card_container);
	}

	$('button').on("click", function(){
		//alert("this is a test");
		console.log("in button " + defenderExist)
		if(defenderExist){

			defender.damageRecieved(player.atk);
			
			$('#player-message').text(player.name + " does " + player.atk + " damage to " + defender.name + "!");
			
			player.strengthen();

			if(defender.getHp() <= 0){
				$('#defender').empty();

				if($('#enemies').is(':empty')) {
					$('#player-message').text("Well Done Jedi Master you defeated all of your opponents!");
					$('#ememy-message').empty();
					$('#ememy-message').append($('<button>')
						.text('Restart')
						.on("click", function(){

							location.reload();

						}));
				}
				else{
					$('#player-message').text("You defeated " + defender.name + ", go pick another opponent to fight!");
					
					$('#ememy-message').empty();
				}
				defenderExist = false;

			}	
			
			if(defenderExist){
				player.damageRecieved(defender.counter);
				
				$('#ememy-message').text(defender.name + " strikes back with " + defender.counter + " damage to " + player.name + "!");

				if(player.getHp() <= 0){
					
					$('#player-message').text("You've been defeated...GAME OVER.");
					
					$('#ememy-message').empty();
					
					$('#ememy-message').append($('<button>')
						.text('Restart')
						.on("click", function(){

							location.reload();

						}));
				}
			}

									
			
			
			

		$('#player .character-health').text(player.hp); //update player 
		$('#defender .character-health').text(defender.hp);
		}
		else{
		$('#player-message').text("There is no one to attack");
		
		}
		//player.damageRecieved(defender.counter);
		//defender.damageRecieved(player.atk);
		//player.
	})

});

