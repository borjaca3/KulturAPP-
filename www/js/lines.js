function createLine(el1, el2, lElBorder, rElBorder, lineMode, borderStyle, id) {
	var points = getPoints(el1, el2, lineMode, lElBorder, rElBorder);

	var length = Math.sqrt(((points.rPointL - points.lPointL) * (points.rPointL - points.lPointL)) + ((points.rPointT - points.lPointT) * (points.rPointT - points.lPointT)));

	var lineL = ((points.lPointL + points.rPointL) / 2) - (length / 2);
	var lineT = ((points.lPointT + points.rPointT) / 2) - (2 / 2);

	var angle = Math.atan2((points.lPointT - points.rPointT), (points.lPointL - points.rPointL)) * (180 / Math.PI);

	return "<section id='" + id + "' style='position: absolute; border: " + borderStyle + "; left:" + lineL + "px; top:" + lineT + "px; width:" + length + "px; -webkit-transform:rotate(" + angle + "deg); transform:rotate(" + angle + "deg);'></section>";
};

function getPoints(el1, el2, lineMode, lElBorder, rElBorder) {
	var lElOff = getElementPositionalProperties(el1);
	var rElOff = getElementPositionalProperties(el2);

	if (lElOff.left > rElOff.left) {
		var temp = lElOff;
		lElOff = rElOff;
		rElOff = temp;
	}

	var lPointL, lPointT, rPointL, rPointT;

	switch (lineMode) {
		case "center":
			lPointL = lElOff.left + lElOff.width / 2;
			lPointT = lElOff.top + lElOff.height / 2;

			rPointL = rElOff.left + rElOff.width / 2;
			rPointT = rElOff.top + rElOff.height / 2;

			break;

		case "outerMin":
			lPointL = lElOff.left + lElOff.width + lElBorder + 1;
			lPointT = lElOff.top + (lElOff.height + lElBorder + 1) / 2;

			rPointL = rElOff.left;
			rPointT = rElOff.top + (rElOff.height + rElBorder + 1) / 2;

			break;
	}

	return { lPointL: lPointL, lPointT: lPointT, rPointL: rPointL, rPointT: rPointT };
}

function getElementPositionalProperties(el) {
	var elL, elT;

	var position = $(el).css("position");
	if (position == "absolute") {
		elL = parseFloat($(el).css("left").replace("px", ""));
		elT = parseFloat($(el).css("top").replace("px", ""));
	}
	else {
		var elParent = $(el).offsetParent();

		elL = elParent.position().left + $(el).position().left;
		elT = elParent.position().top + $(el).position().top;
	}
	var width = $(el).width() | 0;
	var height = $(el).height() | 0;

	return { left: elL, top: elT, width: width, height: height };
};
