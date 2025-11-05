/*
 * $Id: objects.js Oct 31, 2023 5:41:11 PM tta2526$
 *
 * Copyright (C) 2023 Maider Huarte Arrayago
 *
 * This file is part of TTA2526_PEERS_www.zip.
 *
 * TTA2526_PEERS_www.zip is intended for learning purposes only.
 *
 * TTA2526_PEERS_www.zip is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option) any later
 * version.
 *
 * TTA2526_PEERS_www.zip is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details
 * <http://www.gnu.org/licenses/>.
 */
var peerPack = {
	left: [
		{// "L1"
			content: '<img class="responsive" src="img/L1.jpg" style="max-width: 100%; width: 100%; height: auto; padding: 5px;"/>',
			code: 0,
			color: "green"
		},
		{// "L2"
			content: '<img class="responsive" src="img/L2.jpg" style="max-width: 100%; width: auto; height: auto; padding: 5px;"/>',
			code: 1,
			color: "blue"
		},
		{// "L3"
			content: '<img class="responsive" src="img/L3.jpg" style="max-width: 100%; width: auto; height: auto; padding: 5px;"/>',
			code: 2,
			color: "grey"
		},
		{// "L4"
			content: '<img class="responsive" src="img/L4.jpg" style="max-width: 100%; width: auto; height: auto; padding: 5px;"/>',
			code: 3,
			color: "lightblue"
		},
		{// "L5"
			content: '<img class="responsive" src="img/L5.jpg" style="max-width: 100%; width: auto; height: auto; padding: 5px;"/>',
			code: 4,
			color: "red"
		}
	],
	right: [
		{// "R1"
			content: '<img class="responsive" src="img/R1.jpg" style="max-width: 100%; width: 100%; height: auto; padding: 5px;"/>',
			code: 0
		},
		{// "R2"
			content: '<img class="responsive" src="img/R2.jpg" style="max-width: 100%; width: auto; height: auto; padding: 5px;"/>',
			code: 1
		},
		{// "R3"
			content: '<img class="responsive" src="img/R3.jpg" style="max-width: 100%; width: auto; height: auto; padding: 5px;"/>',
			code: 2
		},
		{// "R4"
			content: '<img class="responsive" src="img/R4.jpg" style="max-width: 100%; width: auto; height: auto; padding: 5px;"/>',
			code: 3
		},
		{// "R5"
			content: '<img class="responsive" src="img/R5.jpg" style="max-width: 100%; width: auto; height: auto; padding: 5px;"/>',
			code: 4
		}
	]
};

var peerGame = {
	items: {left: [], right: []},
	respsOnR: [],
	checks: [],
	chosenL: null,
	create: function() {
		
		peerGame.items.left=randomUtils.objects(peerPack.left);
		peerGame.items.right=randomUtils.objects(peerPack.right);

		for(let i in peerGame.items.right) {
			peerGame.respsOnR[i]=-1;
			peerGame.checks[i]=false;
		}

		peerGame.chosenL= null;

		$("#gameTable").empty().removeClass("ui-disabled");
	},
	print: function() {
		for (let i in peerGame.items.left) {
			var row;

					row = '<tr>' +
						'<td style="width:5%;"></td>' +
						'<td id="tdL-' + i + '" style="width:25%; vertical-align: middle; position: relative; text-align: right;"></td>' +
						'<td style="width:40%;"></td>' +
						'<td id="tdR-' + i + '" style="width:25%; vertical-align: middle; position: relative;"></td>' +
						'<td style="width:5%;"></td>' +
						'</tr>';

			$("#gameTable").append(row);

			var itemL=$(peerGame.items.left[i].content);
			itemL.attr("id", "itemL-"+i);
			$("#tdL-" + i).append(itemL);

			var itemR=$(peerGame.items.right[i].content);
			itemR.attr("id", "itemR-"+i);
			$("#tdR-" + i).append(itemR);

	
				$("#itemL-"+i).attr("onclick", "chooseL("+i+")");
				$("#itemR-"+i).attr("onclick", "checkMatchOnR("+i+")");
			
		}
	},
	clearOnR: function(rightI) {
		var prevLeftI = peerGame.respsOnR[rightI];
		if(prevLeftI != -1) {
			peerGame.styleItem("unselect", "#itemL-" + prevLeftI);
			peerGame.styleItem("unselect", "#itemR-" + rightI);
			$("#line-" + prevLeftI).remove();

			peerGame.respsOnR[rightI]=-1;
			peerGame.checks[rightI]=false;
		}
	},
	clearOnL: function(leftI) {
		var prevRightI = peerGame.respsOnR.indexOf(leftI);

		if(prevRightI != -1) {
			peerGame.styleItem("unselect", "#itemL-" + leftI);
			peerGame.styleItem("unselect", "#itemR-" + prevRightI);
			$("#resp-" + prevRightI).val("");
			$("#line-" + leftI).remove();

			peerGame.respsOnR[prevRightI]=-1;
			peerGame.checks[prevRightI]=false;
		}
	},
	setNewResp: function(leftI, rightI) {
		var color = peerGame.items.left[leftI].color;

		peerGame.styleItem("select", "#itemL-" + leftI, color);
		peerGame.styleItem("select", "#itemR-" + rightI, color);

			var line= createLine("#itemL-" + leftI, "#itemR-" + rightI, 5, 5, "outerMin", "solid 2px " + color, "line-" + leftI);
			$("#gameTable").append(line);
		

		peerGame.respsOnR[rightI]=leftI;
		if( peerGame.items.left[leftI].code == peerGame.items.right[rightI].code)
			peerGame.checks[rightI]=true;
	},
	styleItem: function(mode, item, color) {
		if(mode=="select")
				$(item).css("padding", "0px").css("border", "5px solid " + color);
		else
				$(item).css("padding", "5px").css("border", "0px");
	}
};
