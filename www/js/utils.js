/*
 * $Id: utils.js Oct 31, 2023 5:41:11 PM tta2526$
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

var randomUtils = {
	numbers: function(first, last, length) {
		var randomizedNumbers;

		if (first < last) {
			var numbers = [];
			for (var i = first; i <= last; i++) {
				numbers.push(i);
			}
			randomizedNumbers = numbers.sort(() => 0.5 - Math.random());

			if (length != undefined && length <= (last - first + 1))
				randomizedNumbers = numbers.slice(0, length);
		}

		return randomizedNumbers;
	},
	objects: function(objects, length) {
		var randomizedObjects = objects.sort(() => 0.5 - Math.random());

		if (length != undefined && length < objects.length)
			randomizedObjects = randomizedObjects.slice(0, length);

		return randomizedObjects;
	}
};

var gameUtils = {
	initTimestamp: null,
	lastTimestamp: null,
	rounds: null,
	initializeGame: function() {
		gameUtils.initTimestamp = (new Date()).getTime();
		gameUtils.lastTimestamp = gameUtils.initTimestamp;
		gameUtils.rounds = [];
	},

};

var timeUtils = {
	compsToTimestamp: function(comps) {
		var timestamp = 0;
		if (comps.hasOwnProperty("years")) {
			timestamp += comps.years * 31536000000;
		}
		if (comps.hasOwnProperty("months")) {
			timestamp += comps.months * 2592000000;
		}
		if (comps.hasOwnProperty("days")) {
			timestamp += comps.days * 86400000;
		}
		if (comps.hasOwnProperty("hours")) {
			timestamp += comps.hours * 3600000;
		}
		if (comps.hasOwnProperty("minutes")) {
			timestamp += comps.minutes * 60000;
		}
		if (comps.hasOwnProperty("seconds")) {
			timestamp += comps.seconds * 1000;
		}
		if (comps.hasOwnProperty("milliseconds"))
			timestamp += comps.milliseconds;

		return timestamp;
	},
	timestampToComps: function(timestamp, comps) {
		var remaining = timestamp;
		if (comps.hasOwnProperty("years")) {
			comps.years = Math.floor(remaining / 31536000000);
			remaining = remaining % 31536000000;
		}
		if (comps.hasOwnProperty("months")) {
			comps.months = Math.floor(remaining / 2592000000);
			remaining = remaining % 2592000000;
		}
		if (comps.hasOwnProperty("days")) {
			comps.days = Math.floor(remaining / 86400000);
			remaining = remaining % 86400000;
		}
		if (comps.hasOwnProperty("hours")) {
			comps.hours = Math.floor(remaining / 3600000);
			remaining = remaining % 3600000;
		}
		if (comps.hasOwnProperty("minutes")) {
			comps.minutes = Math.floor(remaining / 60000);
			remaining = remaining % 60000;
		}
		if (comps.hasOwnProperty("seconds")) {
			comps.seconds = Math.floor(remaining / 1000);
			remaining = remaining % 1000;
		}
		if (comps.hasOwnProperty("milliseconds"))
			comps.milliseconds = remaining;

		return comps;
	}
};

