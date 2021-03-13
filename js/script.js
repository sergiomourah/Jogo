var Iniciado = false;
var jogador = 'X';
var jogada = 0;
var jogadorAtual = "USER";
var nivel = ''; //E - EASY, N - NORMAL, H - HARD

function Marcar(btn) {
	//Inicia partida
	if (nivel != '') {
		Iniciado = true;
		//Verificar se valor já foi selecionado
		var valor = MostrarValor(btn);
		if (valor == ""){
			if (jogadorAtual == "USER") {			
				document.all(btn).value = jogador;
				jogada++;
				FinalizarLance();
			}
			else {
				alert("Aguarde a jogada do computador!");
			}
			if (jogadorAtual == "USER" && !VerificarVencedor()) {		
				jogadorAtual = "COMP";
				document.all("lblMsg").value = "Aguardando Computador";
				JogadaComp();
			}
		}
		else {
			alert("Campo já foi selecionado!");
		}
	}
	else {
		alert("Selecione o nível para começar o Jogo!");
	}
}

function JogadaComp(){
	//Inicia partida
	Iniciado = true;
	if (nivel == 'E'){
		lance = false; 
		for (linha = 1; linha < 4; linha++)	{
			for (coluna = 1; coluna < 4; coluna++)	{
				if (lance)	{
					// verificar se jogada já foi realizada
					break;
				} else {
					// Verifica primeiro campo que não foi usado
					if (document.all("L" + linha + "C" + coluna).value == "")	{
						document.all("L" + linha + "C" + coluna).value = jogador;
						lance = true;
					}
				}
			}
		}	
	} else if (nivel == 'N') {
		item = 0;
		lance = false
		while (item < 4) {
			//Criar arrays de campos que iniciam pelas pontas
			aNormal = new Array("L1C1", "L1C3", "L3C1", "L3C3");
			var campoInicia = aNormal[item];
			if (document.all(campoInicia).value == "")	{
				document.all(campoInicia).value = jogador;
				lance = true;
				break;
			}
			item++;	
		}
		//Se os lances das pontas já estiverem todos preenchidos escolhem aleatório
		if (lance == false) {
			for (linha = 1; linha < 4; linha++)	{
			for (coluna = 1; coluna < 4; coluna++)	{
				if (lance)	{
					// verificar se jogada já foi realizada
					break;
				} else {
					// Verifica primeiro campo que não foi usado
						if (document.all("L" + linha + "C" + coluna).value == "")	{
							document.all("L" + linha + "C" + coluna).value = jogador;
							lance = true;
						}
					}
				}
			}
		}
	} else if (nivel == 'H') {
			var LancesUser = LancesFecharJogo("USER");
			var LancesComp = LancesFecharJogo("COMP");

			if (LancesComp)	{
					document.all(LancesComp).value = jogador;
			} else {
				if (LancesUser)	{
					document.all(LancesUser).value = jogador;
				} else {
					if (jogada == 0)	{
						document.all["L1C1"].value = jogador;
					} else if (jogada == 1) {
						if ((document.all("L1C1").value == (jogador == "O" ? "X" : "O"))||
						    (document.all("L1C3").value == (jogador == "O" ? "X" : "O"))|| 
							(document.all("L3C1").value == (jogador == "O" ? "X" : "O"))||
							(document.all("L3C3").value == (jogador == "O" ? "X" : "O")))	{
							document.all("L2C2").value = jogador;
						} else {
							document.all("L1C1").value = jogador;
						}
					} else if (jogada == 2)	{
						if (document.all("L1C1").value=="") {
							document.all("L1C1").value = jogador;
						} else if (document.all("L1C3").value == "")	{
							document.all("L1C3").value = jogador;
						} else if (document.all("L3C3").value == "")	{				
							document.all("L3C3").value = jogador;	
						} else if (document.all("L3C1").value == "")	{
							document.all("L3C1").value = jogador;					
						}
					} else if (jogada == 3) {
						if (document.all("L2C2").value == jogador)	{
							if ((document.all("L2C1").value == ".....") && 
							    (document.all("L2C3").value == ""))	{
								document.all("L2C1").value = jogador;
							} else if ((document.all("L1C2").value=="") && 
							           (document.all("L3C2").value == ""))	{
								document.all("L3C2").value = jogador;
							}
						} else {
							if (document.all("L1C1").value == "") {
								document.all("L1C1").value = jogador;
							} else if (document.all["L1C3"].value == "")	{
								document.all("L1C3").value = jogador;
							} else if (document.all["L3C1"].value == "")	{
								document.all("L3C1").value = jogador;
							} else if (document.all["L3C3"].value == "")	{
								document.all("L3C3").value = jogador;
							}							
						}
					} else {
						lance = false; 
						for (linha = 1; linha < 4; linha++)	{
							for (coluna = 1; coluna < 4; coluna++)	{
								if (lance)	{
									// verificar se jogada já foi realizada
									break;
								} else {
									// Verifica primeiro campo que não foi usado
									if (document.all("L" + linha + "C" + coluna).value == "")	{
										document.all("L" + linha + "C" + coluna).value = jogador;
										lance = true;
									}
								}
							}
						}
					}
				}
			}
	}
	jogada++;
	FinalizarLance();
	jogadorAtual = "USER";
	document.all("lblMsg").value = "Aguardando Usuário";
}

function FinalizarLance() {
	if (VerificarVencedor()) {
		alert("Fim do jogo! Vitória do " + (jogadorAtual == "USER" ? document.all("txtUser").value : "Computador"));
		//Finalizar partida
		Iniciado = false;
		//Gravar Estatisticas
		setCookie();		
		location.reload();
		document.all("lblMsg").value = "Para iniciar o jogo escolha o nível primeiro!";
		document.all("DS_Nivel").value = "Jogo da Velha";
		document.all("txtUser").disabled = false;
	}
	//Verifica se a partida terminou empatada
	if (jogada == 9 && Iniciado == true) {
		alert("Jogo terminou empatado!");
		//Finalizar partida
		Iniciado = false;
		//Gravar Estatisticas
		setCookie();		
		location.reload();
		document.all("lblMsg").value = "Para iniciar o jogo escolha o nível primeiro!";
		document.all("DS_Nivel").value = "Jogo da Velha";
	}
	if (jogador == 'X'){
		jogador = 'O';
	} else {
		jogador = 'X';
	}
}

function MostrarValor(name){
	return document.all(name).value;
}

function VerificarVencedor() {
	
	//Horizontais
	if ((MostrarValor('L1C1') == MostrarValor('L1C2')) && (MostrarValor('L1C1') == MostrarValor('L1C3')) && MostrarValor('L1C1') != '') {
		return true;
	}
	if ((MostrarValor('L2C1') == MostrarValor('L2C2')) && (MostrarValor('L2C1') == MostrarValor('L2C3')) && MostrarValor('L2C1') != '') {
		return true;
	}
	if ((MostrarValor('L3C1') == MostrarValor('L3C2')) && (MostrarValor('L3C1') == MostrarValor('L3C3')) && MostrarValor('L3C1') != '') {
		return true;
	}
	//Verticais
	if ((MostrarValor('L1C1') == MostrarValor('L2C1')) && (MostrarValor('L1C1') == MostrarValor('L3C1')) && MostrarValor('L1C1') != '') {
		return true;
	}
	if ((MostrarValor('L1C2') == MostrarValor('L2C2')) && (MostrarValor('L1C2') == MostrarValor('L3C2')) && MostrarValor('L1C2') != '') {
		return true;
	}
	if ((MostrarValor('L1C3') == MostrarValor('L2C3')) && (MostrarValor('L1C3') == MostrarValor('L3C3')) && MostrarValor('L1C3') != '') {
		return true;
	}
	//Diagonais
	if ((MostrarValor('L1C1') == MostrarValor('L2C2')) && (MostrarValor('L1C1') == MostrarValor('L3C3')) && MostrarValor('L1C1') != '') {
		return true;
	}
	if ((MostrarValor('L1C3') == MostrarValor('L2C2')) && (MostrarValor('L1C3') == MostrarValor('L3C1')) && MostrarValor('L1C3') != '') {
		return true;
	}
	return false;
}

function LancesFecharJogo() {	
		if (jogadorAtual == "COMP")	{
			if (jogador == 'X')	{
				val = 'O';
			} else {
				val = 'X';
			}
		} else {
			val = jogador;
		}

		var vazio = ''; // 


		Pos = new Array();
		Pos[0]  = new Array("L1C1", "L1C2", "L1C3"); 
		Pos[1]  = new Array("L1C1", "L1C3", "L1C2"); 
		Pos[2]  = new Array("L1C2", "L1C3", "L1C1");
		Pos[3]  = new Array("L2C1", "L2C2", "L2C3"); 
		Pos[4]  = new Array("L2C1", "L2C3", "L2C2"); 
		Pos[5]  = new Array("L2C2", "L2C3", "L2C1"); 
		Pos[6]  = new Array("L3C1", "L3C2", "L3C3"); 
		Pos[7]  = new Array("L3C1", "L3C3", "L3C2"); 
		Pos[8]  = new Array("L3C2", "L3C3", "L3C1"); 
		Pos[9]  = new Array("L1C1", "L2C1", "L3C1"); 
		Pos[10] = new Array("L1C1", "L3C1", "L2C1");
		Pos[11] = new Array("L2C1", "L3C1", "L1C1"); 
		Pos[12] = new Array("L1C2", "L2C2", "L3C2"); 
		Pos[13] = new Array("L1C2", "L3C2", "L2C2"); 
		Pos[14] = new Array("L2C2", "L3C2", "L1C2"); 
		Pos[15] = new Array("L1C3", "L2C3", "L3C3"); 
		Pos[16] = new Array("L1C3", "L3C3", "L2C3"); 
		Pos[17] = new Array("L2C3", "L3C3", "L1C3"); 
		Pos[18] = new Array("L1C1", "L2C2", "L3C3"); 
		Pos[19] = new Array("L1C1", "L3C3", "L2C2"); 
		Pos[20] = new Array("L2C2", "L3C3", "L1C1"); 
		Pos[21] = new Array("L1C3", "L2C2", "L3C1"); 
		Pos[22] = new Array("L1C3", "L3C1", "L2C2"); 
		Pos[23] = new Array("L2C2", "L3C1", "L1C3"); 

		var item = 0;
		while (item < 24)	{
			if ((document.all[Pos[item][0]].value == val) && 
			    (document.all[Pos[item][1]].value == val) && 
				(document.all[Pos[item][2]].value == vazio))	{
				return Pos[item][2];
				break;
			}

			item++; 
		}
}

function SelecionarNivel(pNivel) {
	nivel = pNivel;
	if (document.all("txtUser").value != "" &&
	    document.all("txtUser").value != "Insira seu nome") {
		if (Iniciado == false) { 
			if (nivel == 'E'){
				document.all('DS_Nivel').value = "Nível EASY selecionado";
			} else if (nivel == 'N'){
				document.all('DS_Nivel').value = "Nível NORMAL selecionado";
			}else if (nivel == 'H'){
				document.all('DS_Nivel').value = "Nível HARD selecionado";
			}
			//Desabilitar textbox nome usuario se jogo estiver iniciado
			document.all("txtUser").disabled  = true;
			//Alterar classe ao selecionar os níveis
			document.all("NE").className = "nivel";
			document.all("NN").className = "nivel";
			document.all("NH").className = "nivel";
			document.all("N" + pNivel).className  = "nivelSelect";
			//Sinalizar Inicio de Jogo
			document.all("lblMsg").value = 
			document.all("CompInicia").checked && jogada == 0 ? "Jogo iniciado - Aguardando computador" :
			document.all("CompInicia").checked == false && jogada == 0 ? "Jogo iniciado - Aguardando Usuário" :
			document.all("CompInicia").checked && jogada > 0 ? "Aguardando computador" : "Aguardando Usuário";
			if (CompComeca()) {		
					jogadorAtual = "COMP";
					JogadaComp();
			}
		} else {
			alert("Não é permitido alterar nível de partida iniciada!")
		}
	}
	else {
			alert("Insira seu nome para começar!")
		}
}

function CompComeca() {
	if (document.all("CompInicia").checked)
		return true;
}

function InserirNome() {
	if (Iniciado == false) {
		document.all("txtUser").value = "";
	}
}

function setCookie() {
	//Gravar estatisticas no cookies navegador
    var linha = document.all("txtUser").value + " - " + 
		          (jogadorAtual == "USER" ? "VITÓRIA" : "DERROTA") + " - " +
				   (nivel == "E" ? "EASY" : nivel == "N" ? "NORMAL" : "HARD");
	
	if (document.cookie != "") {
		document.cookie += "|" + linha;
	} else {
		document.cookie += linha;
	}
}

function getCookie() {
	//Mostrar Estatisticas cookies navegador
    var ca = document.cookie.split('|');
    for(var i = 0; i< ca.length; i++) {
        var c = ca[i];
        var p = document.getElementById('Foo');	
		var li = document.createElement('li');
		li.innerHTML = c;
		p.appendChild(li);
    }
}