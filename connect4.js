 $(document).ready(function(){
  		var currentPlayer = "p1"; 
  		var rowLimit = 5;
  		var colLimit = 6;
  		var aiFight = 0;
  		isWinner = 0;
  		colArr0 = [];
  		colArr1 = [];
 		colArr2 = [];
 		colArr3 = [];
 		colArr4 = [];
 		colArr5 = [];
 		colArr6 = [];
 		p1Counter = 0;
 		p2Counter = 0;
 		lastIndexRowPerArray = 0;
 		lastIndexCol = 0;
  		
  		$('#aiCheckBox').on('click',  function (e) {
  			alert("Reloading Page");
  			reload();
  		});
  		//Click Table Column
		$('#mytable').on('click', 'td', function (e) {

			isAI();
			
				indexCol = $(this).index();

				if(eval("lastPushIndex = colArr" + indexCol + " .length") == 6){
					alert("Full Stack!! Choose another column");
					return;
				}

				eval("lastPushIndex = colArr" + indexCol + " .push(currentPlayer)");
				indexRowPerArray = lastPushIndex - 1;
				//alert(indexRowPerArray);
				if(currentPlayer == "p1"){
			        $("#col_"+indexRowPerArray+"_"+indexCol).addClass("green"); 
			        p1Counter++;
			        $('#p1Text').text(p1Counter);

			        lastIndexRowPerArray = indexRowPerArray;
			        lastIndexCol = indexCol;
			       
		    	}else{
   					if(aiFight == 0){
				        $("#col_"+indexRowPerArray+"_"+indexCol).addClass("blue"); 

				    } else{
				    	//alert("MYTURN");
				    	//aiTurn();
				    }
   				        p2Counter++;
				         $('#p2Text').text(p2Counter);
		    	}

	    	//alert(indexRowPerArray+" "+indexCol);

	    	checkWinner();

			changePlayer();
			

			if(aiFight == 1 && currentPlayer == 'p2'){
				if(isWinner == 0){
					aiTurn();

					p2Counter++;
					$('#p2Text').text(p2Counter);
					
					changePlayer();
				}
			}
		 });// END OF DOCUMENT READY


		function aiTurn(){
			//AI TURN LOGIC
	        //40% - ai move horizontal of last play of user  1-30
			//30% - ai move left side of last play of user	 31 - 60
			//30% - ai move right side of last play          61 - 90
			
			generateNo = getRandomNumber(1,100)
			
			if(generateNo >= 0 && generateNo <= 40){
				//alert("A");
					lastIndexRowPerArray = lastIndexRowPerArray + 1;
					eval("lastPushIndex = colArr" + lastIndexCol + " .push(currentPlayer)");
					$("#col_"+lastIndexRowPerArray+"_"+lastIndexCol).addClass("blue"); 
			}else if(generateNo >=41 && generateNo <= 70){
				//alert("B");
				if(lastIndexCol == 0){
					lastIndexCol = lastIndexCol + 1;	
				}else {
					lastIndexCol = lastIndexCol - 1;
				}

				eval("lastPushIndex = colArr" + lastIndexCol + " .push(currentPlayer)");
				lastIndexRowPerArray = lastPushIndex - 1;
				$("#col_"+lastIndexRowPerArray+"_"+lastIndexCol).addClass("blue");
				

			}else if(generateNo >71 && generateNo <= 100){
				if(lastIndexCol == 6){
					lastIndexCol = lastIndexCol - 1;	
				}else {
					lastIndexCol = lastIndexCol + 1;
				}

				eval("lastPushIndex = colArr" + lastIndexCol + " .push(currentPlayer)");
				lastIndexRowPerArray = lastPushIndex - 1;
				$("#col_"+lastIndexRowPerArray+"_"+lastIndexCol).addClass("blue");
			}

			checkWinner();
			
		}//end of aiTurn

		function checkWinner(){
    	
			if(checkVertical() === true){
	    		isWinner = 1;
	    		alert(currentPlayer+": Winner for Vertical Connect")
	    		reload();

	    		//reset board
	    	}
	    	else if(checkHorizontal() === true){
	    		isWinner = 1;
	    		alert(currentPlayer+": Winner for Horizontal Connect")
	    		reload();
	    		//reset board
	    	}
	    	else if(checkDiagonalLeft() === true){
	    		isWinner = 1;
	    		alert(currentPlayer+": Winner for Diagonal Left Connect")
	    		reload();
	    		//reset board
	    	}
	    	else if(checkDiagonalRight() === true){
	    		isWinner = 1;
	    		alert(currentPlayer+": Winner for Diagonal Right Connect")
	    		reload();
	    		//reset board
	    	}else {
	    		
	    		if(p1Counter >= 21 && p2Counter >= 21){
	    			isWinner = 1;
	    			alert("Draw Game!!!!");
	    			reload();
	    		}
	    	}//end else
	   	    	
		}


		function getRandomNumber (min, max) {
    		return Math.floor(Math.random() * (max - min + 1)) + min;
    	}

		function isAI(){
			//check if the checkbox is checked 
			if($('#aiCheckBox').is(":checked")){
				aiFight = 1;
			}else{
				aiFight = 0;
			}
			//alert(aiFight);
		}

		function checkDiagonalRight(){
			// "\" pattern
			rowLimitDiagonalRight = 2;
			colLimitDiagonalRight = 3

			for(g = 0; g<=rowLimitDiagonalRight; g++ ){
				counterDiagonalRight = 0;
				for(h = 6;h >= colLimitDiagonalRight; h-- ){

					if(eval("colArr"+h).length > 0){

						if(eval("colArr"+h+"["+g+"]") != null){
							hh = h;
							gg = g;
							
							for(counterDiagonalRight2 = 0; counterDiagonalRight2 <= 3; counterDiagonalRight2++){
								//alert("colArr"+hh+"["+gg+"]");
								//alert(eval("colArr"+ff+"["+ee+"]"));
									
									if(eval("colArr"+hh).length > 0){
									
										if(eval("colArr"+hh+"["+gg+"]") == currentPlayer){
							    			counterDiagonalRight++
							    		}else{
							    			//reset counter to 0 if not current player
											counterDiagonalRight=0;
											//continue;
							    		}
						    		}
						    		
								
								hh--;
								gg++;

							}//end for counterDiagonalRight
							} //end if

					}//end if  

					if(counterDiagonalRight >= 4){
			    		return true;
			    	}

				}//end for f

			} // end for e

			return false; 




		}

		function checkDiagonalLeft(){
			// "/" pattern
			rowLimitDiagonalLeft = 2;
			colLimitDiagonalLeft = 3

			for(e = 0; e<=rowLimitDiagonalLeft; e++ ){
				counterDiagonalLeft = 0;
				for(f = 0;f <= colLimitDiagonalLeft; f++ ){

					if(eval("colArr"+f).length > 0){

						if(eval("colArr"+f+"["+e+"]") != null){
							ff = f;
							ee = e;
							for(counterDiagonalLeft2 = 0; counterDiagonalLeft2 <= 3; counterDiagonalLeft2++){
								//alert("colArr"+ff+"["+ee+"]");
								//alert(eval("colArr"+ff+"["+ee+"]"));
								
									if(eval("colArr"+ff).length > 0){
									
										if(eval("colArr"+ff+"["+ee+"]") == currentPlayer){
							    			counterDiagonalLeft++
							    		}else{
							    			//reset counter to 0 if not current player
											counterDiagonalLeft=0;
											//continue;
							    		}
						    		}
								
								ff++;
								ee++;


							}//end for counterDiagonalLeft
							} //end if

					}//end if  

					if(counterDiagonalLeft >= 4){
			    		return true;
			    	}

				}//end for f

			} // end for e

			return false; 
		} // end of Check Diagonal Left
		
		function checkHorizontal(){

			for(c = 0; c<=rowLimit; c++ ){
				counterHorizontal = 0;
				for(d = 0;d <= colLimit; d++ ){

					if(eval("colArr"+d).length > 0){


						if(eval("colArr"+d+"["+c+"]") != null){
								//alert(eval("colArr"+d+"["+c+"]"));

						if(eval("colArr"+d+"["+c+"]") == currentPlayer){
			    			counterHorizontal++
			    		}else{
			    			//reset counter to 0 if not current player
							counterHorizontal=0;
			    		}

						} //end if

					}else{
						counterHorizontal=0;
					}//end if  

					if(counterHorizontal >= 4){
			    		return true;
			    	}

				}//end for d

			} // end for c
			return false;

		} //end of checkHorizontal

  		function checkVertical(){  			

  			for(a = 0;a <= colLimit; a++){
  				counterVertical = 0;
  				if(eval("colArr"+a).length > 0){
	  			for(b = 0;b<= eval("colArr"+a).length - 1;b++){
		    		//alert(colArr0[a]);

		    		if(eval("colArr"+a)[b] == currentPlayer){
		    			counterVertical++
		    		}else{
		    			//reset counter to 0 if not current player
						counterVertical=0;
		    		}
		    	}//end inner for

		    	//console.log(currentPlayer+":"+counter);
		    	//alert(counter)
		    	if(counterVertical >= 4){
		    		return true;
		    	}

		   	 }//end if 
		    }//end outer for

		    return false;

  		} //end of checkVertical



     	// Table TD Hover
		$('td').hover(function() {
		    var t = parseInt($(this).index()) + 1;
		    $('#myTable td:nth-child(' + t + ')').addClass('highlighted');
		},
		function() {
		    var t = parseInt($(this).index()) + 1;
		    $('#myTable td:nth-child(' + t + ')').removeClass('highlighted');
		});

	   // End of TD Hover


	   //change player 
	   function changePlayer(){
		    if( currentPlayer  == "p1" )
		        currentPlayer = "p2";
		    else{
		        currentPlayer = "p1";
		    }
		    $('#currplayer').text(currentPlayer);
		} //end changePlayer

		//reset board
		function reload(){
			window.location.reload();
		}


  }); //end document ready 