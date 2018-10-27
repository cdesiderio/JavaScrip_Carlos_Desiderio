/*
*****************************************************
Codigo para realizar las funciones de una calculadora
*****************************************************
*/

var Calculadora = {	
	
	operacion: "",
	valorUno: 0,
	valorDos: 0,
	valorFinal: 0,
	resultado: 0,
	valorpantalla: "0",
	auxiliarIgual: false, 
	pantalla: document.getElementById("display"),
	
	init: (function()
	{
		this.eventosBotones(".tecla"); //controlar tamanios de los botones
		this.eventosTeclas();          //asignar los eventos a las teclas
	}),
	

/* Manejar el tamanio de los botones o teclas */

	disminuirBoton: function(event)
	{
		Calculadora.DisminuirBoton(event.target);
	},

	aumentarBoton: function(event)
	{
		Calculadora.AumentarBoton(event.target);
	},
	
	eventosBotones: function(selector)
	{
		var listado = document.querySelectorAll(selector);
		for (var i = 0; i<listado.length;i++)
		{
			listado[i].onmouseover = this.disminuirBoton;
			listado[i].onmouseleave = this.aumentarBoton;
		};
	},

	AumentarBoton: function(elemento)
	{
		var x = elemento.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" 
			|| x=="igual" || x=="punto" ) 
		{
			elemento.style.width = "31%";
			elemento.style.height = "63px";
		} else if(x=="mas") 
		{
			elemento.style.width = "91%";
			elemento.style.height = "100%";
		} else 
		{
			elemento.style.width = "23%";
			elemento.style.height = "63px";
		}
	},

	
	DisminuirBoton: function(elemento)
	{
		var x = elemento.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" 
			|| x=="punto" || x=="igual"  )
		{
			elemento.style.width = "29%";
			elemento.style.height = "62px";
		} else if(x == "mas") 
		{
			elemento.style.width = "89%";
			elemento.style.height = "98%";
		} else 
		{
			elemento.style.width = "22%";
			elemento.style.height = "62px";
		}
	},
	
	/* Manejar los eventos de cada una de las teclas */
	eventosTeclas: function()
	{
		document.getElementById("0").addEventListener("click", function() {Calculadora.atraparValor("0");});
		document.getElementById("1").addEventListener("click", function() {Calculadora.atraparValor("1");});
		document.getElementById("2").addEventListener("click", function() {Calculadora.atraparValor("2");});
		document.getElementById("3").addEventListener("click", function() {Calculadora.atraparValor("3");});
		document.getElementById("4").addEventListener("click", function() {Calculadora.atraparValor("4");});
		document.getElementById("5").addEventListener("click", function() {Calculadora.atraparValor("5");});
		document.getElementById("6").addEventListener("click", function() {Calculadora.atraparValor("6");});
		document.getElementById("7").addEventListener("click", function() {Calculadora.atraparValor("7");});
		document.getElementById("8").addEventListener("click", function() {Calculadora.atraparValor("8");});
		document.getElementById("9").addEventListener("click", function() {Calculadora.atraparValor("9");});
		document.getElementById("on").addEventListener("click", function() {Calculadora.limpiarPantalla();});
		document.getElementById("sign").addEventListener("click", function() {Calculadora.neutralizarSigno();});
		document.getElementById("punto").addEventListener("click", function() {Calculadora.atraparValorDecimal();});
		document.getElementById("igual").addEventListener("click", function() {Calculadora.mostrarTotalOperacion();});
		document.getElementById("mas").addEventListener("click", function() {Calculadora.atraparTipoOperacion("+");});
		document.getElementById("dividido").addEventListener("click", function() {Calculadora.atraparTipoOperacion("/");});
		document.getElementById("por").addEventListener("click", function() {Calculadora.atraparTipoOperacion("*");});
		document.getElementById("menos").addEventListener("click", function() {Calculadora.atraparTipoOperacion("-");});
		
		
	},
	
	realizarOperacion: function(valor1, valor2, operacion)
	{
		switch(operacion)
		{
			case "+": 
				this.resultado = eval(valor1 + valor2);
			break;
			case "-": 
				this.resultado = eval(valor1 - valor2);
			break;
			case "*": 
				this.resultado = eval(valor1 * valor2);
			break;
			case "/": 
				this.resultado = eval(valor1 / valor2);
			break;

		}
	},
	
	
	/* Limpiar la pantalla */
		limpiarPantalla: function()
		{ 

			this.valorpantalla = "0";
			this.operacion = "";
			this.valorUno = 0;
			this.valorDos = 0;
			this.resultado = 0;
			this.Operación = "";
			this.auxiliarIgual = false;
			this.valorFinal = 0;
			this.actualizarPantalla();
		},
	
	
	neutralizarSigno: function()
	{
		if (this.valorpantalla !="0")
		{
			var aux;
			if (this.valorpantalla.charAt(0)=="-") 
				aux = this.valorpantalla.slice(1);
			else 
				aux = "-" + this.valorpantalla;

			this.valorpantalla = "";
			this.valorpantalla = aux;
			this.actualizarPantalla();
		}
	},
	
	
	atraparValorDecimal: function()
	{
		if (this.valorpantalla.indexOf(".")== -1) 
		{
			if (this.valorpantalla == "")
				this.valorpantalla = this.valorpantalla + "0.";
			else 
				this.valorpantalla = this.valorpantalla + ".";
			this.actualizarPantalla();
		}
	},
	

	
	atraparValor: function(valor)
	{
		if (this.valorpantalla.length < 8) 
		{		
			if (this.valorpantalla=="0") 
			{
				this.valorpantalla = "";
				this.valorpantalla = this.valorpantalla + valor;
			} else 
				this.valorpantalla = this.valorpantalla + valor;
		this.actualizarPantalla();
		}
	},
	
	
	mostrarTotalOperacion: function()
	{ 

		if(!this.auxiliarIgual)
		{ 
			this.valorDos = parseFloat(this.valorpantalla);
			this.valorFinal = this.valorDos;		
			this.realizarOperacion(this.valorUno, this.valorDos, this.operacion);		
		} 
		else 
			this.realizarOperacion(this.valorUno, this.valorFinal, this.operacion);
		
		this.valorUno = this.resultado;		
		this.valorpantalla = "";	
		if (this.resultado.toString().length < 9)
			this.valorpantalla = this.resultado.toString();
		else 
			this.valorpantalla = this.resultado.toString().slice(0,8) + "..";
		
		this.auxiliarIgual = true;		
		this.actualizarPantalla();
	
	},
	
	atraparTipoOperacion: function(oper)
	{
		this.operacion = oper;
		this.valorUno = parseFloat(this.valorpantalla);
		this.valorpantalla = "";		
		this.auxiliarIgual = false;
		this.actualizarPantalla();
	},
	
	actualizarPantalla: function()
	{
		this.pantalla.innerHTML = this.valorpantalla;
	}
	

	
};

Calculadora.init();