//funkce pro vypocet prvniho formulare
function vypis() {
	//prevod vystupu formulare na pouzitelna data
	var rok = document.getElementById("formular").elements.namedItem("rok").value;
	var svaty = document.getElementById("formular").elements.namedItem("svaty").value;
	var predpo = document.getElementById("formular").elements.namedItem("predpo").value;
	var typkalen = document.getElementById("formular").elements.namedItem("kal").value;
	var den_tydeni = document.getElementById("formular").elements.namedItem("den_v_tydnu").value;

	if (predpo == "pred"){
		predpo = 0;
	}else {
		predpo = 1;
	}

	//"zmereni" velikosti JSON
	var velikost_xml = Object.keys(data_json.article).length
	var i;
	for (i = 0; i < velikost_xml; i++) {
		//prochazi JSON
		var jmeno = data_json.article[i]['name_cz'];
		var lat = data_json.article[i]['name_lat'];
		var datum = data_json.article[i]['content'];
		//hleda shodu mezi zadanym svatkem a obsahem JSON (kriteria - jmeno cz a datum, moznost chyby v zavislosti na obsahu JSON)
		if (svaty.lastIndexOf(jmeno) !== -1 && svaty.lastIndexOf(datum) !== -1) {
		
			var datum_svatku = datum;
			//najde prvni pozici tecky
			var pos_prvni = datum_svatku.indexOf(".");
			//najde druhou tecku
			var pos_druha = datum_svatku.lastIndexOf(".");
			//velikost datumu(posledni pozice))
			var posledni_pozice = datum.length;
			var den = datum.slice(0,pos_prvni);
			var mesic = datum.slice(posledni_pozice - 2, posledni_pozice);
			var datum_do_funkce = [Number(rok), Number(mesic), Number(den)];
		

			var vyp = vypocet(datum_do_funkce, typkalen, predpo, den_tydeni);
			var vystup = "Hledany datum je : " + vyp[0] + " " + vyp[2] + ". " + vyp[1] + ".";
	   	document.getElementById("vysledek").innerHTML = vystup;
		
		}
	}
}

//funkce pro automaticke formatovani datumu, parametrem je pole s rokem, mesicem a dnem
function formatuj_datum(pole_datumu){
	var mezi_kus = " " + pole_datumu[0] + " " + pole_datumu[2] + ". " + pole_datumu[1] + ".";
	return mezi_kus
}

//funkce pro vypis dat ke konkretnimu roku
function vypis2(){
	//ziskani a prevod roku z formulare
	var rok22 = document.getElementById("formular2").elements.namedItem("rok2").value;
	var rok22 = Number(rok22);

	//vypis pomucek pro urceni velikonoc
	document.getElementById("slunecni_kruh").innerHTML = slunecni_kruh(rok22);
	document.getElementById("konkurenty").innerHTML = konkurenty(rok22);
	document.getElementById("zlate_cislo").innerHTML = zlate_cislo(rok22);
	document.getElementById("ned_pis_jul").innerHTML = nedelni_pismeno_j(slunecni_kruh(rok22));
	document.getElementById("ned_pis_gre").innerHTML = nedelni_pismeno_g(rok22);
	document.getElementById("epak_jul").innerHTML = epakty_j(zlate_cislo(rok22));
	document.getElementById("epak_gre").innerHTML = epakty_g(rok22);

	//vypis velikonoc
	var vel_jul = velikonoce_j(rok22);
	var vel_j_vystup = " " + vel_jul[0] + " " + vel_jul[2] + ". " + vel_jul[1] + ".";
	document.getElementById("vel_jul").innerHTML = vel_j_vystup;

	var vel_gre = velikonoce_g(rok22);
	var vel_g_vystup = " " + vel_gre[0] + " " + vel_gre[2] + ". " + vel_gre[1] + ".";
	document.getElementById("vel_gre").innerHTML = vel_g_vystup;

	//vypis casti liturgickeho roku, pohyblivych svatku
	document.getElementById("devitnik").innerHTML = formatuj_datum(devitnik(rok22));
	document.getElementById("ned_po_devitnik").innerHTML = formatuj_datum(nedele_po_devitniku(rok22));
	document.getElementById("pok_ned").innerHTML = formatuj_datum(masopustni_nedele(rok22));
	document.getElementById("pop_str").innerHTML = formatuj_datum(popelecni_streda(rok22));
	document.getElementById("praz_ned").innerHTML = formatuj_datum(prazna_nedele(rok22));
	document.getElementById("rem").innerHTML = formatuj_datum(druha_postni(rok22));
	document.getElementById("kych_ned").innerHTML = formatuj_datum(kychava_nedele(rok22));
	document.getElementById("druz_ned").innerHTML = formatuj_datum(druzebna_nedele(rok22));
	document.getElementById("smrt_ned").innerHTML = formatuj_datum(smrtna_nedele(rok22));
	document.getElementById("kvet_ned").innerHTML = formatuj_datum(kvetna_nedele(rok22));
	document.getElementById("zel_ctvrt").innerHTML = formatuj_datum(zeleny_ctvrtek(rok22));
	document.getElementById("vel_pat").innerHTML = formatuj_datum(velky_patek(rok22));
	document.getElementById("bil_sob").innerHTML = formatuj_datum(bila_sobota(rok22));
	document.getElementById("bil_ned").innerHTML = formatuj_datum(bila_nedele(rok22));
	document.getElementById("den_svat").innerHTML = formatuj_datum(den_svatosti(rok22));
	document.getElementById("mis").innerHTML = formatuj_datum(misericordia(rok22));
	document.getElementById("jub").innerHTML = formatuj_datum(jubilate(rok22));
	document.getElementById("can").innerHTML = formatuj_datum(cantate(rok22));
	document.getElementById("kriz_ned").innerHTML = formatuj_datum(krizova_nedele(rok22));
	document.getElementById("nanebe").innerHTML = formatuj_datum(nanebevstoupeni(rok22));
	document.getElementById("exaudi").innerHTML = formatuj_datum(exaudi(rok22));
	document.getElementById("pentecoste").innerHTML = formatuj_datum(letnice(rok22));
	document.getElementById("trojice").innerHTML = formatuj_datum(trojice(rok22));
	document.getElementById("boz_tela").innerHTML = formatuj_datum(boziho_tela(rok22));
	document.getElementById("ad_4").innerHTML = formatuj_datum(ctvrta_ned_ad(rok22));
	document.getElementById("ad_3").innerHTML = formatuj_datum(treti_ned_ad(rok22));
	document.getElementById("ad_2").innerHTML = formatuj_datum(druha_ned_ad(rok22));
	document.getElementById("ad_1").innerHTML = formatuj_datum(prvni_ned_ad(rok22));

	//vypis letnich nedeli a masopustniho obdobi, zmena nutna vzhledem k vystupu (pole poli)
	var txt1 = "";
	var let_ned = nedele_letni(rok22);
	for (i = 0; i < let_ned.length; i++) {
   	var txt = formatuj_datum(let_ned[i]);
   	var txt1 = txt1 + ((i + 1) + ". neděle letní : " + txt + "<br>");
    
	}
	document.getElementById("nedele_letni").innerHTML = txt1;

	var txt2 = "";
	var mas_ned = masopust(rok22);
	for (i = 0; i < mas_ned.length; i++) {
   	var txt = formatuj_datum(mas_ned[i]);
   	var txt2 = txt2 + ((i + 1) + ". neděle masopustu : " + txt + "<br>");
    
	}
	document.getElementById("nedele_masopustu").innerHTML = txt2;
}
