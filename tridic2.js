//tridic vyberu svatku, polozku v html (select-> option) seradi podle radio button

//ulozeni velikosti JSON
var velikost_xml = Object.keys(data_json.article).length
//podle velikosti JSON vytvori polozky option v selectu
for (i = 0; i < velikost_xml; i++) {
	//vytvoreni option
	var x = document.createElement("OPTION");
	//dosazeni attributu id (hodnota bude odpovidat poradi)
	x.setAttribute("id", i);
	var t = document.createTextNode("");
	x.appendChild(t);
	document.getElementById("svaty").appendChild(x);
}

function myFunction(){
	var seznam = [];

	for (i = 0; i < velikost_xml; i++) {

		if(document.getElementById("11").checked){

			var toNode = data_json.article[i]['name_cz'];
			var fromNode = data_json.article[i]['name_lat'];
			var messageNode = data_json.article[i]['name_de'];
			var xNode = data_json.article[i]['content'];
		}else if(document.getElementById("21").checked){
			var toNode = data_json.article[i]['name_lat'];
			var fromNode = data_json.article[i]['name_cz'];
			var messageNode = data_json.article[i]['name_de'];
			var xNode = data_json.article[i]['content'];
		}else if(document.getElementById("31").checked){

			var toNode = data_json.article[i]['name_de'];
			var fromNode = data_json.article[i]['name_cz'];
			var messageNode = data_json.article[i]['name_lat'];
			var xNode = data_json.article[i]['content'];
		}else{
			var toNode = data_json.article[i]['content'];
			var fromNode = data_json.article[i]['name_cz'];
			var messageNode = data_json.article[i]['name_lat'];
			var xNode = data_json.article[i]['name_de'];
		}
		if (toNode == ""){
			var tex1 = "Neznámé";
		}else {
			var tex1 = toNode;
		}
		if (fromNode == ""){
			var tex2 = "Neznámé";
		}else {
			var tex2 = fromNode;
		}
		if (messageNode == ""){
			var tex3 = "Neznámé";
		}else {
			var tex3 = messageNode;
		}
		if (xNode == ""){
			var tex4 = "Neznámé";
		}else {
			var tex4 = xNode;
		}
		

		var tex = tex1 + " -- " + tex2 + " -- " + tex3 + " -- " + tex4;
		seznam.push(tex);

	}
	seznam = seznam.sort();
	for (i = 0; i < velikost_xml; i++) {
	
    	var x = document.getElementById(i).innerHTML = seznam[i];

	}
}	
