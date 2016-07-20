
$(document).ready(function(){

	//used to create characters
	function character(name, picture, hp){
		this.name = name;
		this.img = picture;
		this.hp = hp;
		this.status = "none";
		this.atk = 6;
		this.counter = 20;
		
		this.damageRecieved = function(dmg){
			this.hp -= dmg;
		}

		this.strengthen = function(){
			this.atk += 6;
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

	playerChoice[0] = new character("Obi-wan-Kenobi", "http://placehold.it/120x80", 120);
	playerChoice[1] = new character("Luke Skywalker", "http://placehold.it/120x80", 120);
	playerChoice[2] = new character("Darth Sidious", "http://placehold.it/120x80", 120);
	playerChoice[3] = new character("Emperor Palpatine", "http://placehold.it/120x80", 120);



	//generates players
	for(var i = 0; i < playerChoice.length; i++){
		console.log("outside loop "+playerChoice);
		buildCard();
	
	}//end of for loop

	function setGame(){
		$("#characters").empty();

		var card_container = $('<div>')
		.addClass("character-card player")
		.data("chara", player)
		.on("click", function(){

			console.log("click", $(this).data("chara"));
			//$(this).addClass("character-player").removeClass("character-choice");
			//player = $(this).data("chara");

						

		});

		var card_name = $('<div>')
			.addClass("character-name")
			.text(player.name);
			
		var card_img = $('<img>')
			.attr("src", player.img)
			.attr("alt", "Player picture")

		var card_health = $('<div>')
			.addClass("character-health")
			.text(player.hp)

			card_container.append(card_name);
			card_container.append(card_img);
			card_container.append(card_health);
			$('#player').append(card_container);


		



		//set wait array
		for(var i = 0; i < playerChoice.length; i++){
			if(player != playerChoice[i]){
				
				wait.push(playerChoice[i]);
				var card_container = $('<div>')
					.addClass("character-card wait")
					.data("chara", playerChoice[i])
					.on("click", function(){

					
					//$(this).addClass("character-player").removeClass("character-choice");
					
					//$('#ememies').empty();
					console.log("flag check: " + defenderExist);
					if(defenderExist) return;
					console.log("click", $(this).data("chara"));
					defender = $(this).data("chara");
					setDefender();

								

				});

				var card_name = $('<div>')
					.addClass("character-name")
					.text(playerChoice[i].name);
					
				var card_img = $('<img>')
					.attr("src", playerChoice[i].img)
					.attr("alt", "Player picture")

				var card_health = $('<div>')
					.addClass("character-health")
					.text(playerChoice[i].hp)

					card_container.append(card_name);
					card_container.append(card_img);
					card_container.append(card_health);
					$('#enemies').append(card_container);
			}

		}
		console.log(wait);





		
	}

	function setDefender(){
		defenderExist = true;
		$('#enemies').empty();

		var card_container = $('<div>')
		.addClass("character-card defender")
		.data("chara", defender)
		.on("click", function(){
			
			console.log("flag check: " + defenderExist);
			console.log("click", $(this).data("chara"));
			//$(this).addClass("character-player").removeClass("character-choice");
			//player = $(this).data("chara");

						

		});

		var card_name = $('<div>')
			.addClass("character-name")
			.text(defender.name);
			
		var card_img = $('<img>')
			.attr("src", defender.img)
			.attr("alt", "Player picture")

		var card_health = $('<div>')
			.addClass("character-health")
			.text(defender.hp)

			card_container.append(card_name);
			card_container.append(card_img);
			card_container.append(card_health);
			$('#defender').append(card_container);


		



		//set wait array

		for(var i = 0; i < playerChoice.length; i++){
			if(player != playerChoice[i]){
				if(defender != playerChoice[i]){
				//wait.push(playerChoice[i]);
				var card_container = $('<div>')
					.addClass("character-card wait")
					.data("chara", playerChoice[i])
					.on("click", function(){

					console.log("flag check: " + defenderExist);
					if(defenderExist) return;
					console.log("click", $(this).data("chara"));
					//$(this).addClass("character-player").removeClass("character-choice");
					defender = $(this).data("chara");
					setDefender()

								

				});

				var card_name = $('<div>')
					.addClass("character-name")
					.text(playerChoice[i].name);
					
				var card_img = $('<img>')
					.attr("src", playerChoice[i].img)
					.attr("alt", "Player picture")

				var card_health = $('<div>')
					.addClass("character-health")
					.text(playerChoice[i].hp)

					card_container.append(card_name);
					card_container.append(card_img);
					card_container.append(card_health);
					$('#enemies').append(card_container);
				}
			}

		}
		console.log(wait);
		/**/

	}

	function buildCard(){
		var card_container = $('<div>')
		.addClass("character-card character-choice")
		.data("chara", playerChoice[i])
		.on("click", function(){

			console.log("click", $(this).data("chara"));
			//$(this).addClass("character-player").removeClass("character-choice");
			//player = $(this).data("chara");

			player = $(this).data("chara");
			setGame();

		});
		console.log(playerChoice[i]);
		console.log(playerChoice[i].name);
		var card_name = $('<div>')
			.addClass("character-name")
			.text(playerChoice[i].name);
			
		var card_img = $('<img>')
			.attr("src", playerChoice[i].img)
			.attr("alt", "Player picture")

		var card_health = $('<div>')
			.addClass("character-health")
			.text(playerChoice[i].hp)

			card_container.append(card_name);
			card_container.append(card_img);
			card_container.append(card_health);
			$('#characters').append(card_container);
	}

	$('button').on("click", function(){
		//alert("this is a test");
		console.log("in button " + defenderExist)
		if(defenderExist){

			defender.damageRecieved(player.atk);
			player.damageRecieved(defender.counter);

			$('#player-message').text(player.name + " does " + player.atk + " damage to " + defender.name + "!");
			$('#ememy-message').text(defender.name + " strikes back with " + defender.counter + " damage to " + player.name + "!");
			player.strengthen();
			
			if(player.getHp() <= 0){
				$('#player-message').text("You've been defeated...GAME OVER.");
				$('#ememy-message').empty();
				
				$('#ememy-message').append($('<button>')
					.text('Restart')
					.on("click", function(){

						$('#player-message, #defender, #player, #enemies').empty();
						//buildCard();
					}));

			}
			else if(defender.getHp() <= 0){

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

