//http://www.ewg.org/skindeep/browse/facial+cleanser/

var productPrices = [];

$(document).ready(function(){

	var products = $('div.page_container_for_stuff table > tbody > tr > td.product_name_list');
	
	products = products.slice(0, 100);
	
	products.each(function(i, product) {
		var p = $(product);
		var name = p.text();
		var pId = p.find("a").first().attr('href').match(/\/product\/(\d+)\//);
		pId = pId[1];
		//search(name, pId);
		if(localStorage["product_" + pId])
		{
			//console.log(pId, JSON.parse(localStorage["product_" + pId]));
			onPrice(JSON.parse(localStorage["product_" + pId]));
		}
		else
		{
			chrome.extension.sendRequest(
				{
					'action' : 'searchPrice',
					'text' : name,
					'pId' : pId
				}, onPrice);
		}
	});
	
});

function onPrice(res) {
	//console.log(res);
	if(!localStorage["product_" + res.pId])
	{
		localStorage["product_" + res.pId] = JSON.stringify(res);
	}
	$('a[href^="/skindeep/product/' + res.pId + '/"]:first').after($('<a>').attr('target', '_blank').attr('href', res.url).html(res.price));
}
