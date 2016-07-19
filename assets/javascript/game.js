
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
	}

	var playerChoice = [];
	var wait = [];
	var player;
	var defender;

	playerChoice[0] = new character("Obi-wan-Kenobi", "http://placehold.it/120x80", 120);
	playerChoice[1] = new character("Luke Skywalker", "http://placehold.it/120x80", 120);
	playerChoice[2] = new character("Darth Sidious", "http://placehold.it/120x80", 120);
	playerChoice[3] = new character("Emperor Palpatine", "http://placehold.it/120x80", 120);

	//generates players
	for(var i = 0; i < playerChoice.length; i++){
	
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

					console.log("click", $(this).data("chara"));
					//$(this).addClass("character-player").removeClass("character-choice");
					defender = $(this).data("chara");
					//$('#ememies').empty();
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
					$('#ememies').append(card_container);
			}

		}
		console.log(wait);





		
	}

	function setDefender(){

		$('#ememies').empty();

		var card_container = $('<div>')
		.addClass("character-card defender")
		.data("chara", defender)
		.on("click", function(){

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

					console.log("click", $(this).data("chara"));
					//$(this).addClass("character-player").removeClass("character-choice");
					defender = $(this).data("chara");
					//setDefender()

								

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
					$('#ememies').append(card_container);
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
		alert("this is a test");
	})

});

