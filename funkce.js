var VZOR_G_MAP = {

	"A": 2006,

	"B": 2005,

	"C": 2010,

	"D": 2009,

	"E": 2003,

	"F": 2013,

	"G": 2001,

	"GF": 1996,

	"BA": 2000,

	"DC": 2004,

	"FE": 2008,

	"AG": 2012,

	"CB": 2016,

	"ED": 2020

}

var NEDELNI_PISMENO_G_2099_MAP = {

	"A": "G",

	"B": "A",

	"C": "B",

	"D": "C",

	"E": "D",

	"F": "E",

	"G": "F",

	"GF": "FE",

	"BA": "AG",

	"DC": "CB",

	"FE": "ED",

	"AG": "GF",

	"CB": "BA",

	"ED": "DC"

}



var NEDELNI_PISMENO_G_1899_MAP = {

	"A": "F",

	"B": "G",

	"C": "A",

	"D": "B",

	"E": "C",

	"F": "D",

	"G": "E",

	"GF": "ED",

	"BA": "GF",

	"DC": "BA",

	"FE": "DC",

	"AG": "FE",

	"CB": "AG",

	"ED": "CB",

}



var NEDELNI_PISMENO_G_1799_MAP = {

	"A": "E",

	"B": "F",

	"C": "G",

	"D": "A",

	"E": "B",

	"F": "C",

	"G": "D",

	"GF": "DC",

	"BA": "FE",

	"DC": "AG",

	"FE": "CB",

	"AG": "ED",

	"CB": "GF",

	"ED": "BA",

}



var NEDELNI_PISMENO_G_1699_MAP = {

	"A": "D",

	"B": "E",

	"C": "F",

	"D": "G",

	"E": "A",

	"F": "B",

	"G": "C",

	"GF": "CB",

	"BA": "ED",

	"DC": "GF",

	"FE": "BA",

	"AG": "DC",

	"CB": "FE",

	"ED": "AG",

}



var NEDELNI_PISMENO_J_MAP = [null, 'GF', 'E', 'D', 'C', 'BA', 'G', 'F', 'E', 'DC', 'B', 'A', 'G', 'FE', 'D', 'C', 'B',

								'AG', 'F', 'E', 'D', 'CB', 'A', 'G', 'F', 'ED', 'C', 'B', 'A']



function slunecni_kruh(rok){



	return (rok + 9) % 28 || 28;

}



function nedelni_pismeno_j(slunecnikruh){



	return NEDELNI_PISMENO_J_MAP[slunecnikruh]

}





function konkurenty(rok){



	ctvrtina = (rok / 4)

	ctvrtina = parseInt(ctvrtina);

	return (rok + ctvrtina + 4) % 7 || 7

}



function zlate_cislo(rok){



	cislo = (rok + 1) % 19

	if (cislo == 0){

		return 19

		}

	else{

		return cislo

		}

}



function epakty_j(zlatecislo){



	return ((zlatecislo - 1) * 11) % 30

}



function epakty_g(rok){



	if (rok <= 1582){

		return null

		}

	else{

		stoleti = parseInt(rok / 100) + 1;

		opravas = parseInt(3 * stoleti / 4);  // slunecni oprava

		opravam = parseInt((8 * stoleti + 5) / 25);  // mesicni oprava

		var zc = zlate_cislo(rok);

		var ej = epakty_j(zc);

		return (ej - opravas + opravam + 8) % 30

		}

}



function nedelni_pismeno_g(rok){



	var sk = slunecni_kruh(rok);

	var npj = nedelni_pismeno_j(sk);



	if (rok <= 1582){

		return null

		}

	else{

		if (rok <= 1699){

				return NEDELNI_PISMENO_G_1699_MAP[npj]

				}

		if (rok <= 1799){

				return NEDELNI_PISMENO_G_1799_MAP[npj]

				}

		if (rok <= 1899){

				return NEDELNI_PISMENO_G_1899_MAP[npj]

				}

		if (rok <= 2099){

				return NEDELNI_PISMENO_G_2099_MAP[npj]

				}

		}

}



function velikonoce_j(rok){



	var pomocna_a = rok % 19;

	var pomocna_b = rok % 4;

	var pomocna_c = rok % 7;

	var pomocna_d = (15 + (19 * pomocna_a)) % 30;

	var pomocna_e = (6 + (2 * pomocna_b) + (4 * pomocna_c) + (6 * pomocna_d)) % 7;

	if ((22 + pomocna_d + pomocna_e) > 31){



		var rok = String(rok);

		var pomocne = String(pomocna_d + pomocna_e - 9);

		var x = [rok, "04", pomocne];

		return x

		}

	else{

		var rok = String(rok);

		var pomocne = String(22 + pomocna_d + pomocna_e);

		var x = [rok, "03", pomocne];

		// Vraci pole rok, mesic, den

		return x

		}

}





function velikonoce_g(Yr){



var AA = Math.floor(Yr / 100);

var BB = AA - Math.floor(AA / 4);

var CC = Yr % 19;

var DD = (15 + 19*CC + BB -

	Math.floor((AA + 1 - Math.floor((AA+8) / 25)) / 3)) % 30;

var EE = DD - Math.floor((CC+11*DD) / 319);

var DM = 22 + EE +

	(140004 - (Yr + Math.floor(Yr / 4))%7 + BB - EE) % 7;

var EMo = 3 + Math.floor(DM / 32);

var EDy = 1 + (DM-1) % 31;

var Yr = String(Yr);

var EMo = String(EMo);

var EDy = String(EDy);

var x = [Yr, EMo, EDy];

return x



}

//funkce na vyhledani dne v tydnu

//datum je pole, typkal je typ kalendare, string "J" nebo "G"

//pozice v tydnu pred nebo po - 0 pred, 1 po

//den_hledany je den v tydnu, 0 = nedele, 1 = pondeli, etc.

function vypocet(datum, typkal, pozice, den_hledany){

	var rok = Number(datum[0]);

	var mesic = Number(datum[1]) - 1;

	var den = Number(datum[2]) - 1;

	var sk = slunecni_kruh(rok);

	var npj = nedelni_pismeno_j(sk);

	var npg = nedelni_pismeno_g(rok);



	//zjisteni typu kal.

	if (typkal == "J"){

		//nahrazeni roku pouzitelnym rokem

		//rok2 je pouzitelny rok, ktery zacina stejnym dnem v tydnu

		rok2 = VZOR_G_MAP[npj]

	}else{

		rok2 = VZOR_G_MAP[npg]

	}



	//ulozeninahradniho roku

	var rok2_puvodni = new Date(rok2, mesic, den);

	var rok2_puvodni = rok2_puvodni.getFullYear();



	//pozice 0 = pred danym datem

	if (pozice == 0){

		var i;

		//zmensuj den, dokud nebude stejny jako den v argumentu

		for (i = 0; i < 8; i++) {

				var d = new Date(rok2, mesic, den - i);

				var n = d.getDay();



				if (n == den_hledany){

				//kontrola roku presahuji puvodni rok

				//(napr. silvestr etc.)

				if (d.getFullYear() > rok2_puvodni){

					var rok = rok + 1;

				}else if (d.getFullYear < rok2_puvodni){

					var rok = rok - 1;

				}



					var new_month = d.getMonth() + 1;

					var new_day = d.getDate();

					var novy = [rok, new_month, new_day];

					return novy

				}

		}



	//jinak pozice 1 = po danem datu

	}else{



		var i;



		for (i = 0; i < 8; i++){



			var d = new Date(rok2, mesic, den + i);



			var n = d.getDay();



				if (n == den_hledany){

				//kontrola roku presahuji puvodni rok

				//(napr. silvestr etc.)

				if (d.getFullYear() > rok2_puvodni){

					var rok = rok + 1;

				}else if (d.getFullYear < rok2_puvodni){

					var rok = rok - 1;

				}



					var new_month = d.getMonth() + 1;

					var new_day = d.getDate();

					var novy = [rok, new_month, new_day];

					return novy

				}

	//konec funkce

	}}



}



function velikonoce(rok){

	if (rok < 1583){

		var date = velikonoce_j(rok);



	}else{

		var date = velikonoce_g(rok);



	}

	return date

}



function devitnik(rok){

	//Septuagesima

	var vel = velikonoce(rok);

	var sk = slunecni_kruh(rok);

	var npj = nedelni_pismeno_j(sk);

	var npg = nedelni_pismeno_g(rok);

	var mesic = Number(vel[1]) - 1;

	var den = Number(vel[2]);



	if (rok < 1583){

		rok2 = VZOR_G_MAP[npj];

	}else{

		rok2 = VZOR_G_MAP[npg];

		}

		//ulozeninahradniho roku

	var rok2_puvodni = new Date(rok2, mesic, den);

	var rok2_puvodni = rok2_puvodni.getFullYear();



	if (rok == 1300 || rok == 1400 || rok == 1500){



		var d = new Date(rok2, mesic, den - 62);

	}else{

		var d = new Date(rok2, mesic, den - 63);

		}

	if (d.getFullYear() > rok2_puvodni){

		var rok = rok + 1;

	}else if (d.getFullYear < rok2_puvodni){

		var rok = rok - 1;

		}



	var new_month = d.getMonth() + 1;

	var new_day = d.getDate();

	var novy = [rok, new_month, new_day];



	return novy

}



function nedele_po_devitniku(rok){

	//Sexagesima

	var vel = velikonoce(rok);

	var sk = slunecni_kruh(rok);

	var npj = nedelni_pismeno_j(sk);

	var npg = nedelni_pismeno_g(rok);

	var mesic = Number(vel[1]) - 1;

	var den = Number(vel[2]);



	if (rok < 1583){

		rok2 = VZOR_G_MAP[npj];

	}else{

		rok2 = VZOR_G_MAP[npg];

		}

		//ulozeninahradniho roku

	var rok2_puvodni = new Date(rok2, mesic, den);

	var rok2_puvodni = rok2_puvodni.getFullYear();



	if (rok == 1300 || rok == 1400 || rok == 1500){



		var d = new Date(rok2, mesic, den - 55);

	}else{

		var d = new Date(rok2, mesic, den - 56);

		}

	if (d.getFullYear() > rok2_puvodni){

		var rok = rok + 1;

	}else if (d.getFullYear < rok2_puvodni){

		var rok = rok - 1;

		}



	var new_month = d.getMonth() + 1;

	var new_day = d.getDate();

	var novy = [rok, new_month, new_day];



	return novy

}


function masopustni_nedele(rok){

	//Quinquagesina

	var vel = velikonoce(rok);

	var sk = slunecni_kruh(rok);

	var npj = nedelni_pismeno_j(sk);

	var npg = nedelni_pismeno_g(rok);

	var mesic = Number(vel[1]) - 1;

	var den = Number(vel[2]);



	if (rok < 1583){

		rok2 = VZOR_G_MAP[npj];

	}else{

		rok2 = VZOR_G_MAP[npg];

		}

		//ulozeninahradniho roku

	var rok2_puvodni = new Date(rok2, mesic, den);

	var rok2_puvodni = rok2_puvodni.getFullYear();



	if (rok == 1300 || rok == 1400 || rok == 1500){



		var d = new Date(rok2, mesic, den - 48);

	}else{

		var d = new Date(rok2, mesic, den - 49);

		}

	if (d.getFullYear() > rok2_puvodni){

		var rok = rok + 1;

	}else if (d.getFullYear < rok2_puvodni){

		var rok = rok - 1;

		}



	var new_month = d.getMonth() + 1;

	var new_day = d.getDate();

	var novy = [rok, new_month, new_day];



	return novy

}

function popelecni_streda(rok){

	//Ash Wednesday

	var vel = velikonoce(rok);

	var sk = slunecni_kruh(rok);

	var npj = nedelni_pismeno_j(sk);

	var npg = nedelni_pismeno_g(rok);

	var mesic = Number(vel[1]) - 1;

	var den = Number(vel[2]);



	if (rok < 1583){

		rok2 = VZOR_G_MAP[npj];

	}else{

		rok2 = VZOR_G_MAP[npg];

		}

		//ulozeninahradniho roku

	var rok2_puvodni = new Date(rok2, mesic, den);

	var rok2_puvodni = rok2_puvodni.getFullYear();



	if (rok == 1300 || rok == 1400 || rok == 1500){



		var d = new Date(rok2, mesic, den - 45);

	}else{

		var d = new Date(rok2, mesic, den - 46);

		}

	if (d.getFullYear() > rok2_puvodni){

		var rok = rok + 1;

	}else if (d.getFullYear < rok2_puvodni){

		var rok = rok - 1;

		}



	var new_month = d.getMonth() + 1;

	var new_day = d.getDate();

	var novy = [rok, new_month, new_day];



	return novy

}

function prazna_nedele(rok){

	//Reminiscere

	var vel = velikonoce(rok);

	var sk = slunecni_kruh(rok);

	var npj = nedelni_pismeno_j(sk);

	var npg = nedelni_pismeno_g(rok);

	var mesic = Number(vel[1]) - 1;

	var den = Number(vel[2]);



	if (rok < 1583){

		rok2 = VZOR_G_MAP[npj];

	}else{

		rok2 = VZOR_G_MAP[npg];

		}

		//ulozeninahradniho roku

	var rok2_puvodni = new Date(rok2, mesic, den);

	var rok2_puvodni = rok2_puvodni.getFullYear();



	if (rok == 1300 || rok == 1400 || rok == 1500){



		var d = new Date(rok2, mesic, den - 41);

	}else{

		var d = new Date(rok2, mesic, den - 42);

		}

	if (d.getFullYear() > rok2_puvodni){

		var rok = rok + 1;

	}else if (d.getFullYear < rok2_puvodni){

		var rok = rok - 1;

		}



	var new_month = d.getMonth() + 1;

	var new_day = d.getDate();

	var novy = [rok, new_month, new_day];



	return novy

}

function druha_postni(rok){

	//druha_postni

	var vel = velikonoce(rok);

	var sk = slunecni_kruh(rok);

	var npj = nedelni_pismeno_j(sk);

	var npg = nedelni_pismeno_g(rok);

	var mesic = Number(vel[1]) - 1;

	var den = Number(vel[2]);



	if (rok < 1583){

		rok2 = VZOR_G_MAP[npj];

	}else{

		rok2 = VZOR_G_MAP[npg];

		}

		//ulozeninahradniho roku

	var rok2_puvodni = new Date(rok2, mesic, den);

	var rok2_puvodni = rok2_puvodni.getFullYear();



	if (rok == 1300 || rok == 1400 || rok == 1500){



		var d = new Date(rok2, mesic, den - 35);

	}else{

		var d = new Date(rok2, mesic, den - 35);

		}

	if (d.getFullYear() > rok2_puvodni){

		var rok = rok + 1;

	}else if (d.getFullYear < rok2_puvodni){

		var rok = rok - 1;

		}



	var new_month = d.getMonth() + 1;

	var new_day = d.getDate();

	var novy = [rok, new_month, new_day];



	return novy

}

function kychava_nedele(rok){

	//kychava_nedele

	var vel = velikonoce(rok);

	var sk = slunecni_kruh(rok);

	var npj = nedelni_pismeno_j(sk);

	var npg = nedelni_pismeno_g(rok);

	var mesic = Number(vel[1]) - 1;

	var den = Number(vel[2]);



	if (rok < 1583){

		rok2 = VZOR_G_MAP[npj];

	}else{

		rok2 = VZOR_G_MAP[npg];

		}

		//ulozeninahradniho roku

	var rok2_puvodni = new Date(rok2, mesic, den);

	var rok2_puvodni = rok2_puvodni.getFullYear();



	if (rok == 1300 || rok == 1400 || rok == 1500){



		var d = new Date(rok2, mesic, den - 28);

	}else{

		var d = new Date(rok2, mesic, den - 28);

		}

	if (d.getFullYear() > rok2_puvodni){

		var rok = rok + 1;

	}else if (d.getFullYear < rok2_puvodni){

		var rok = rok - 1;

		}



	var new_month = d.getMonth() + 1;

	var new_day = d.getDate();

	var novy = [rok, new_month, new_day];



	return novy

}

function druzebna_nedele(rok){

	//druzebna_nedele

	var vel = velikonoce(rok);

	var sk = slunecni_kruh(rok);

	var npj = nedelni_pismeno_j(sk);

	var npg = nedelni_pismeno_g(rok);

	var mesic = Number(vel[1]) - 1;

	var den = Number(vel[2]);



	if (rok < 1583){

		rok2 = VZOR_G_MAP[npj];

	}else{

		rok2 = VZOR_G_MAP[npg];

		}

		//ulozeninahradniho roku

	var rok2_puvodni = new Date(rok2, mesic, den);

	var rok2_puvodni = rok2_puvodni.getFullYear();



	if (rok == 1300 || rok == 1400 || rok == 1500){



		var d = new Date(rok2, mesic, den - 21);

	}else{

		var d = new Date(rok2, mesic, den - 21);

		}

	if (d.getFullYear() > rok2_puvodni){

		var rok = rok + 1;

	}else if (d.getFullYear < rok2_puvodni){

		var rok = rok - 1;

		}



	var new_month = d.getMonth() + 1;

	var new_day = d.getDate();

	var novy = [rok, new_month, new_day];



	return novy

}

function smrtna_nedele(rok){

	//smrtna_nedele

	var vel = velikonoce(rok);

	var sk = slunecni_kruh(rok);

	var npj = nedelni_pismeno_j(sk);

	var npg = nedelni_pismeno_g(rok);

	var mesic = Number(vel[1]) - 1;

	var den = Number(vel[2]);



	if (rok < 1583){

		rok2 = VZOR_G_MAP[npj];

	}else{

		rok2 = VZOR_G_MAP[npg];

		}

		//ulozeninahradniho roku

	var rok2_puvodni = new Date(rok2, mesic, den);

	var rok2_puvodni = rok2_puvodni.getFullYear();



	if (rok == 1300 || rok == 1400 || rok == 1500){



		var d = new Date(rok2, mesic, den - 14);

	}else{

		var d = new Date(rok2, mesic, den - 14);

		}

	if (d.getFullYear() > rok2_puvodni){

		var rok = rok + 1;

	}else if (d.getFullYear < rok2_puvodni){

		var rok = rok - 1;

		}



	var new_month = d.getMonth() + 1;

	var new_day = d.getDate();

	var novy = [rok, new_month, new_day];



	return novy

}

function kvetna_nedele(rok){

	//kvetna_nedele

	var vel = velikonoce(rok);

	var sk = slunecni_kruh(rok);

	var npj = nedelni_pismeno_j(sk);

	var npg = nedelni_pismeno_g(rok);

	var mesic = Number(vel[1]) - 1;

	var den = Number(vel[2]);



	if (rok < 1583){

		rok2 = VZOR_G_MAP[npj];

	}else{

		rok2 = VZOR_G_MAP[npg];

		}

		//ulozeninahradniho roku

	var rok2_puvodni = new Date(rok2, mesic, den);

	var rok2_puvodni = rok2_puvodni.getFullYear();



	if (rok == 1300 || rok == 1400 || rok == 1500){



		var d = new Date(rok2, mesic, den - 7);

	}else{

		var d = new Date(rok2, mesic, den - 7);

		}

	if (d.getFullYear() > rok2_puvodni){

		var rok = rok + 1;

	}else if (d.getFullYear < rok2_puvodni){

		var rok = rok - 1;

		}



	var new_month = d.getMonth() + 1;

	var new_day = d.getDate();

	var novy = [rok, new_month, new_day];



	return novy

}

function zeleny_ctvrtek(rok){

	//zeleny_ctvrtek

	var vel = velikonoce(rok);

	var sk = slunecni_kruh(rok);

	var npj = nedelni_pismeno_j(sk);

	var npg = nedelni_pismeno_g(rok);

	var mesic = Number(vel[1]) - 1;

	var den = Number(vel[2]);



	if (rok < 1583){

		rok2 = VZOR_G_MAP[npj];

	}else{

		rok2 = VZOR_G_MAP[npg];

		}

		//ulozeninahradniho roku

	var rok2_puvodni = new Date(rok2, mesic, den);

	var rok2_puvodni = rok2_puvodni.getFullYear();



	if (rok == 1300 || rok == 1400 || rok == 1500){



		var d = new Date(rok2, mesic, den - 3);

	}else{

		var d = new Date(rok2, mesic, den - 3);

		}

	if (d.getFullYear() > rok2_puvodni){

		var rok = rok + 1;

	}else if (d.getFullYear < rok2_puvodni){

		var rok = rok - 1;

		}



	var new_month = d.getMonth() + 1;

	var new_day = d.getDate();

	var novy = [rok, new_month, new_day];



	return novy

}

function velky_patek(rok){

	//velky_patek

	var vel = velikonoce(rok);

	var sk = slunecni_kruh(rok);

	var npj = nedelni_pismeno_j(sk);

	var npg = nedelni_pismeno_g(rok);

	var mesic = Number(vel[1]) - 1;

	var den = Number(vel[2]);



	if (rok < 1583){

		rok2 = VZOR_G_MAP[npj];

	}else{

		rok2 = VZOR_G_MAP[npg];

		}

		//ulozeninahradniho roku

	var rok2_puvodni = new Date(rok2, mesic, den);

	var rok2_puvodni = rok2_puvodni.getFullYear();



	if (rok == 1300 || rok == 1400 || rok == 1500){



		var d = new Date(rok2, mesic, den - 2);

	}else{

		var d = new Date(rok2, mesic, den - 2);

		}

	if (d.getFullYear() > rok2_puvodni){

		var rok = rok + 1;

	}else if (d.getFullYear < rok2_puvodni){

		var rok = rok - 1;

		}



	var new_month = d.getMonth() + 1;

	var new_day = d.getDate();

	var novy = [rok, new_month, new_day];



	return novy

}

function bila_sobota(rok){

	//bila_sobota

	var vel = velikonoce(rok);

	var sk = slunecni_kruh(rok);

	var npj = nedelni_pismeno_j(sk);

	var npg = nedelni_pismeno_g(rok);

	var mesic = Number(vel[1]) - 1;

	var den = Number(vel[2]);



	if (rok < 1583){

		rok2 = VZOR_G_MAP[npj];

	}else{

		rok2 = VZOR_G_MAP[npg];

		}

		//ulozeninahradniho roku

	var rok2_puvodni = new Date(rok2, mesic, den);

	var rok2_puvodni = rok2_puvodni.getFullYear();



	if (rok == 1300 || rok == 1400 || rok == 1500){



		var d = new Date(rok2, mesic, den - 1);

	}else{

		var d = new Date(rok2, mesic, den - 1);

		}

	if (d.getFullYear() > rok2_puvodni){

		var rok = rok + 1;

	}else if (d.getFullYear < rok2_puvodni){

		var rok = rok - 1;

		}



	var new_month = d.getMonth() + 1;

	var new_day = d.getDate();

	var novy = [rok, new_month, new_day];



	return novy

}

function bila_nedele(rok){

	//bila_sobota

	var vel = velikonoce(rok);

	var sk = slunecni_kruh(rok);

	var npj = nedelni_pismeno_j(sk);

	var npg = nedelni_pismeno_g(rok);

	var mesic = Number(vel[1]) - 1;

	var den = Number(vel[2]);



	if (rok < 1583){

		rok2 = VZOR_G_MAP[npj];

	}else{

		rok2 = VZOR_G_MAP[npg];

		}

		//ulozeninahradniho roku

	var rok2_puvodni = new Date(rok2, mesic, den);

	var rok2_puvodni = rok2_puvodni.getFullYear();



	if (rok == 1300 || rok == 1400 || rok == 1500){



		var d = new Date(rok2, mesic, den + 7);

	}else{

		var d = new Date(rok2, mesic, den + 7);

		}

	if (d.getFullYear() > rok2_puvodni){

		var rok = rok + 1;

	}else if (d.getFullYear < rok2_puvodni){

		var rok = rok - 1;

		}



	var new_month = d.getMonth() + 1;

	var new_day = d.getDate();

	var novy = [rok, new_month, new_day];



	return novy

}

function den_svatosti(rok){

	//den_svatosti

	var vel = velikonoce(rok);

	var sk = slunecni_kruh(rok);

	var npj = nedelni_pismeno_j(sk);

	var npg = nedelni_pismeno_g(rok);

	var mesic = Number(vel[1]) - 1;

	var den = Number(vel[2]);



	if (rok < 1583){

		rok2 = VZOR_G_MAP[npj];

	}else{

		rok2 = VZOR_G_MAP[npg];

		}

		//ulozeninahradniho roku

	var rok2_puvodni = new Date(rok2, mesic, den);

	var rok2_puvodni = rok2_puvodni.getFullYear();



	if (rok == 1300 || rok == 1400 || rok == 1500){



		var d = new Date(rok2, mesic, den + 12);

	}else{

		var d = new Date(rok2, mesic, den + 12);

		}

	if (d.getFullYear() > rok2_puvodni){

		var rok = rok + 1;

	}else if (d.getFullYear < rok2_puvodni){

		var rok = rok - 1;

		}



	var new_month = d.getMonth() + 1;

	var new_day = d.getDate();

	var novy = [rok, new_month, new_day];



	return novy

}

function misericordia(rok){

	//misericordia

	var vel = velikonoce(rok);

	var sk = slunecni_kruh(rok);

	var npj = nedelni_pismeno_j(sk);

	var npg = nedelni_pismeno_g(rok);

	var mesic = Number(vel[1]) - 1;

	var den = Number(vel[2]);



	if (rok < 1583){

		rok2 = VZOR_G_MAP[npj];

	}else{

		rok2 = VZOR_G_MAP[npg];

		}

		//ulozeninahradniho roku

	var rok2_puvodni = new Date(rok2, mesic, den);

	var rok2_puvodni = rok2_puvodni.getFullYear();



	if (rok == 1300 || rok == 1400 || rok == 1500){



		var d = new Date(rok2, mesic, den + 14);

	}else{

		var d = new Date(rok2, mesic, den + 14);

		}

	if (d.getFullYear() > rok2_puvodni){

		var rok = rok + 1;

	}else if (d.getFullYear < rok2_puvodni){

		var rok = rok - 1;

		}



	var new_month = d.getMonth() + 1;

	var new_day = d.getDate();

	var novy = [rok, new_month, new_day];



	return novy

}

function jubilate(rok){

	//jubilate

	var vel = velikonoce(rok);

	var sk = slunecni_kruh(rok);

	var npj = nedelni_pismeno_j(sk);

	var npg = nedelni_pismeno_g(rok);

	var mesic = Number(vel[1]) - 1;

	var den = Number(vel[2]);



	if (rok < 1583){

		rok2 = VZOR_G_MAP[npj];

	}else{

		rok2 = VZOR_G_MAP[npg];

		}

		//ulozeninahradniho roku

	var rok2_puvodni = new Date(rok2, mesic, den);

	var rok2_puvodni = rok2_puvodni.getFullYear();



	if (rok == 1300 || rok == 1400 || rok == 1500){



		var d = new Date(rok2, mesic, den + 21);

	}else{

		var d = new Date(rok2, mesic, den + 21);

		}

	if (d.getFullYear() > rok2_puvodni){

		var rok = rok + 1;

	}else if (d.getFullYear < rok2_puvodni){

		var rok = rok - 1;

		}



	var new_month = d.getMonth() + 1;

	var new_day = d.getDate();

	var novy = [rok, new_month, new_day];



	return novy

}

function cantate(rok){

	//cantate

	var vel = velikonoce(rok);

	var sk = slunecni_kruh(rok);

	var npj = nedelni_pismeno_j(sk);

	var npg = nedelni_pismeno_g(rok);

	var mesic = Number(vel[1]) - 1;

	var den = Number(vel[2]);



	if (rok < 1583){

		rok2 = VZOR_G_MAP[npj];

	}else{

		rok2 = VZOR_G_MAP[npg];

		}

		//ulozeninahradniho roku

	var rok2_puvodni = new Date(rok2, mesic, den);

	var rok2_puvodni = rok2_puvodni.getFullYear();



	if (rok == 1300 || rok == 1400 || rok == 1500){



		var d = new Date(rok2, mesic, den + 28);

	}else{

		var d = new Date(rok2, mesic, den + 28);

		}

	if (d.getFullYear() > rok2_puvodni){

		var rok = rok + 1;

	}else if (d.getFullYear < rok2_puvodni){

		var rok = rok - 1;

		}



	var new_month = d.getMonth() + 1;

	var new_day = d.getDate();

	var novy = [rok, new_month, new_day];



	return novy
}

function krizova_nedele(rok){

	//krizova nedele

	var vel = velikonoce(rok);

	var sk = slunecni_kruh(rok);

	var npj = nedelni_pismeno_j(sk);

	var npg = nedelni_pismeno_g(rok);

	var mesic = Number(vel[1]) - 1;

	var den = Number(vel[2]);



	if (rok < 1583){

		rok2 = VZOR_G_MAP[npj];

	}else{

		rok2 = VZOR_G_MAP[npg];

		}

		//ulozeninahradniho roku

	var rok2_puvodni = new Date(rok2, mesic, den);

	var rok2_puvodni = rok2_puvodni.getFullYear();



	if (rok == 1300 || rok == 1400 || rok == 1500){



		var d = new Date(rok2, mesic, den + 35);

	}else{

		var d = new Date(rok2, mesic, den + 35);

		}

	if (d.getFullYear() > rok2_puvodni){

		var rok = rok + 1;

	}else if (d.getFullYear < rok2_puvodni){

		var rok = rok - 1;

		}



	var new_month = d.getMonth() + 1;

	var new_day = d.getDate();

	var novy = [rok, new_month, new_day];



	return novy
}

function nanebevstoupeni(rok){

	//nanebevstoupeni Pane

	var vel = velikonoce(rok);

	var sk = slunecni_kruh(rok);

	var npj = nedelni_pismeno_j(sk);

	var npg = nedelni_pismeno_g(rok);

	var mesic = Number(vel[1]) - 1;

	var den = Number(vel[2]);



	if (rok < 1583){

		rok2 = VZOR_G_MAP[npj];

	}else{

		rok2 = VZOR_G_MAP[npg];

		}

		//ulozeninahradniho roku

	var rok2_puvodni = new Date(rok2, mesic, den);

	var rok2_puvodni = rok2_puvodni.getFullYear();



	if (rok == 1300 || rok == 1400 || rok == 1500){



		var d = new Date(rok2, mesic, den + 40);

	}else{

		var d = new Date(rok2, mesic, den + 40);

		}

	if (d.getFullYear() > rok2_puvodni){

		var rok = rok + 1;

	}else if (d.getFullYear < rok2_puvodni){

		var rok = rok - 1;

		}



	var new_month = d.getMonth() + 1;

	var new_day = d.getDate();

	var novy = [rok, new_month, new_day];



	return novy
}
		
function exaudi(rok){

	//exaudi

	var vel = velikonoce(rok);

	var sk = slunecni_kruh(rok);

	var npj = nedelni_pismeno_j(sk);

	var npg = nedelni_pismeno_g(rok);

	var mesic = Number(vel[1]) - 1;

	var den = Number(vel[2]);



	if (rok < 1583){

		rok2 = VZOR_G_MAP[npj];

	}else{

		rok2 = VZOR_G_MAP[npg];

		}

		//ulozeninahradniho roku

	var rok2_puvodni = new Date(rok2, mesic, den);

	var rok2_puvodni = rok2_puvodni.getFullYear();



	if (rok == 1300 || rok == 1400 || rok == 1500){



		var d = new Date(rok2, mesic, den + 42);

	}else{

		var d = new Date(rok2, mesic, den + 42);

		}

	if (d.getFullYear() > rok2_puvodni){

		var rok = rok + 1;

	}else if (d.getFullYear < rok2_puvodni){

		var rok = rok - 1;

		}



	var new_month = d.getMonth() + 1;

	var new_day = d.getDate();

	var novy = [rok, new_month, new_day];



	return novy

}

function letnice(rok){

	//letnice

	var vel = velikonoce(rok);

	var sk = slunecni_kruh(rok);

	var npj = nedelni_pismeno_j(sk);

	var npg = nedelni_pismeno_g(rok);

	var mesic = Number(vel[1]) - 1;

	var den = Number(vel[2]);



	if (rok < 1583){

		rok2 = VZOR_G_MAP[npj];

	}else{

		rok2 = VZOR_G_MAP[npg];

		}

		//ulozeninahradniho roku

	var rok2_puvodni = new Date(rok2, mesic, den);

	var rok2_puvodni = rok2_puvodni.getFullYear();



	if (rok == 1300 || rok == 1400 || rok == 1500){



		var d = new Date(rok2, mesic, den + 49);

	}else{

		var d = new Date(rok2, mesic, den + 49);

		}

	if (d.getFullYear() > rok2_puvodni){

		var rok = rok + 1;

	}else if (d.getFullYear < rok2_puvodni){

		var rok = rok - 1;

		}



	var new_month = d.getMonth() + 1;

	var new_day = d.getDate();

	var novy = [rok, new_month, new_day];



	return novy

}

function trojice(rok){

	//trojice

	var vel = velikonoce(rok);

	var sk = slunecni_kruh(rok);

	var npj = nedelni_pismeno_j(sk);

	var npg = nedelni_pismeno_g(rok);

	var mesic = Number(vel[1]) - 1;

	var den = Number(vel[2]);



	if (rok < 1583){

		rok2 = VZOR_G_MAP[npj];

	}else{

		rok2 = VZOR_G_MAP[npg];

		}

		//ulozeninahradniho roku

	var rok2_puvodni = new Date(rok2, mesic, den);

	var rok2_puvodni = rok2_puvodni.getFullYear();



	if (rok == 1300 || rok == 1400 || rok == 1500){



		var d = new Date(rok2, mesic, den + 56);

	}else{

		var d = new Date(rok2, mesic, den + 56);

		}

	if (d.getFullYear() > rok2_puvodni){

		var rok = rok + 1;

	}else if (d.getFullYear < rok2_puvodni){

		var rok = rok - 1;

		}



	var new_month = d.getMonth() + 1;

	var new_day = d.getDate();

	var novy = [rok, new_month, new_day];



	return novy

}

function boziho_tela(rok){

	//Solemnity of the Body and Blood of Christ

	var vel = velikonoce(rok);

	var sk = slunecni_kruh(rok);

	var npj = nedelni_pismeno_j(sk);

	var npg = nedelni_pismeno_g(rok);

	var mesic = Number(vel[1]) - 1;

	var den = Number(vel[2]);



	if (rok < 1583){

		rok2 = VZOR_G_MAP[npj];

	}else{

		rok2 = VZOR_G_MAP[npg];

		}

		//ulozeninahradniho roku

	var rok2_puvodni = new Date(rok2, mesic, den);

	var rok2_puvodni = rok2_puvodni.getFullYear();



	if (rok == 1300 || rok == 1400 || rok == 1500){



		var d = new Date(rok2, mesic, den + 60);

	}else{

		var d = new Date(rok2, mesic, den + 60);

		}

	if (d.getFullYear() > rok2_puvodni){

		var rok = rok + 1;

	}else if (d.getFullYear < rok2_puvodni){

		var rok = rok - 1;

		}



	var new_month = d.getMonth() + 1;

	var new_day = d.getDate();

	var novy = [rok, new_month, new_day];



	return novy

}

function ctvrta_ned_ad(rok){

	//4. advent Sunday



	var sk = slunecni_kruh(rok);

	var npj = nedelni_pismeno_j(sk);

	var npg = nedelni_pismeno_g(rok);
	

	if (rok < 1583){

		rok2 = VZOR_G_MAP[npj];

	}else{

		rok2 = VZOR_G_MAP[npg];

		}



	var i;
	

	for (i = 0; i < 9; i++) {
		var d = new Date(rok2, 11, 24 - i);
		var dd = d.getDay();
		if (dd == 0){
			var novy = [rok, 12, d.getDate()];
			return novy
			}
}


	var new_month = d.getMonth() + 1;

	var new_day = d.getDate();

	var novy = [rok, new_month, new_day];



	return novy

}

function treti_ned_ad(rok){

	//3. advent Sunday

	var vel = ctvrta_ned_ad(rok);

	var sk = slunecni_kruh(rok);

	var npj = nedelni_pismeno_j(sk);

	var npg = nedelni_pismeno_g(rok);

	var mesic = Number(vel[1]) - 1;

	var den = Number(vel[2]);



	if (rok < 1583){

		rok2 = VZOR_G_MAP[npj];

	}else{

		rok2 = VZOR_G_MAP[npg];

		}

		//ulozeninahradniho roku

	var rok2_puvodni = new Date(rok2, mesic, den);

	var rok2_puvodni = rok2_puvodni.getFullYear();



	if (rok == 1300 || rok == 1400 || rok == 1500){



		var d = new Date(rok2, mesic, den - 7);

	}else{

		var d = new Date(rok2, mesic, den - 7);

		}

	if (d.getFullYear() > rok2_puvodni){

		var rok = rok + 1;

	}else if (d.getFullYear < rok2_puvodni){

		var rok = rok - 1;

		}



	var new_month = d.getMonth() + 1;

	var new_day = d.getDate();

	var novy = [rok, new_month, new_day];



	return novy

}

function druha_ned_ad(rok){

	//2. advent Sunday

	var vel = ctvrta_ned_ad(rok);

	var sk = slunecni_kruh(rok);

	var npj = nedelni_pismeno_j(sk);

	var npg = nedelni_pismeno_g(rok);

	var mesic = Number(vel[1]) - 1;

	var den = Number(vel[2]);



	if (rok < 1583){

		rok2 = VZOR_G_MAP[npj];

	}else{

		rok2 = VZOR_G_MAP[npg];

		}

		//ulozeninahradniho roku

	var rok2_puvodni = new Date(rok2, mesic, den);

	var rok2_puvodni = rok2_puvodni.getFullYear();



	if (rok == 1300 || rok == 1400 || rok == 1500){



		var d = new Date(rok2, mesic, den - 14);

	}else{

		var d = new Date(rok2, mesic, den - 14);

		}

	if (d.getFullYear() > rok2_puvodni){

		var rok = rok + 1;

	}else if (d.getFullYear < rok2_puvodni){

		var rok = rok - 1;

		}



	var new_month = d.getMonth() + 1;

	var new_day = d.getDate();

	var novy = [rok, new_month, new_day];



	return novy

}

function prvni_ned_ad(rok){

	//1. advent Sunday

	var vel = ctvrta_ned_ad(rok);

	var sk = slunecni_kruh(rok);

	var npj = nedelni_pismeno_j(sk);

	var npg = nedelni_pismeno_g(rok);

	var mesic = Number(vel[1]) - 1;

	var den = Number(vel[2]);



	if (rok < 1583){

		rok2 = VZOR_G_MAP[npj];

	}else{

		rok2 = VZOR_G_MAP[npg];

		}

		//ulozeninahradniho roku

	var rok2_puvodni = new Date(rok2, mesic, den);

	var rok2_puvodni = rok2_puvodni.getFullYear();



	if (rok == 1300 || rok == 1400 || rok == 1500){



		var d = new Date(rok2, mesic, den - 21);

	}else{

		var d = new Date(rok2, mesic, den - 21);

		}

	if (d.getFullYear() > rok2_puvodni){

		var rok = rok + 1;

	}else if (d.getFullYear < rok2_puvodni){

		var rok = rok - 1;

		}



	var new_month = d.getMonth() + 1;

	var new_day = d.getDate();

	var novy = [rok, new_month, new_day];



	return novy

}

function nedele_letni(rok){

	//nedele letni
	var sk = slunecni_kruh(rok);

	var troj = trojice(rok);

	var pna = prvni_ned_ad(rok);

	var npj = nedelni_pismeno_j(sk);

	var npg = nedelni_pismeno_g(rok);

	var mesic_troj = Number(troj[1]) - 1;

	var den_troj = Number(troj[2]);
	var mesic_pna = Number(pna[1]) - 1;

	var den_pna = Number(pna[2]);

	var nedele_list = [];
	

	if (rok < 1583){

		rok2 = VZOR_G_MAP[npj];

	}else{

		rok2 = VZOR_G_MAP[npg];

		}


			var i;
			var d2 = new Date(rok2, mesic_pna, den_pna);
			

			for (i = 1; i < 41; i++) {



				var d = new Date(rok2, mesic_troj, den_troj + (7 * i));


				if (d.getTime() === d2.getTime()){
					return nedele_list
				}else {
					var new_month = d.getMonth() + 1;

					var new_day = d.getDate();

					var novy = [rok, new_month, new_day];
					nedele_list.push(novy);
}
}
}

function masopust(rok){
	var sk = slunecni_kruh(rok);

	var nedele_list = [];

	var pna = devitnik(rok);

	var npj = nedelni_pismeno_j(sk);

	var npg = nedelni_pismeno_g(rok);

	if (rok < 1583){

		rok2 = VZOR_G_MAP[npj];
		var typkal = "J";

	}else{

		rok2 = VZOR_G_MAP[npg];
		var typkal = "G";

	}
	//funkce na vyhledani dne v tydnu

	//datum je pole, typkal je typ kalendare, string "J" nebo "G"

	//pozice v tydnu pred nebo po - 0 pred, 1 po

	//den_hledany je den v tydnu, 0 = nedele, 1 = pondeli, etc.

	var prvni_ned_po_kralich = vypocet([rok, 1, 6], typkal, 1, 0);
	var mesic_troj = Number(prvni_ned_po_kralich[1]) - 1;

	var den_troj = Number(prvni_ned_po_kralich[2]);
	var mesic_pna = Number(pna[1]) - 1;

	var den_pna = Number(pna[2]);

				var i;
			var d2 = new Date(rok2, mesic_pna, den_pna);
			

			for (i = 0; i < 16; i++) {



				var d = new Date(rok2, mesic_troj, den_troj + (7 * i));


				if (d.getTime() === d2.getTime()){
					return nedele_list
				}else {
					var new_month = d.getMonth() + 1;

					var new_day = d.getDate();

					var novy = [rok, new_month, new_day];
					nedele_list.push(novy);
}
}

}
