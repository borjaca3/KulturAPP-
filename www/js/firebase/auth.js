/*
 * $Id: auth.js Oct 31, 2021 5:40:57 PM tta2526$
 *
 * Copyright (C) 2021 Maider Huarte Arrayago
 *
 * This file is part of TTA2526_06_WEB.zip.
 *
 * TTA2526_06_WEB.zip is  intended for learning purposes only.
 *
 * TTA2526_06_WEB.zip is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option) any later
 * version.
 *
 * TTA2526_06_WEB.zip is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details
 * <http://www.gnu.org/licenses/>.
 */

var auth = firebase.auth();

async function signin_P(email, password) {
	console.log("signin_P email: " + email + " password: " + password);

	var authUser = await auth.signInWithEmailAndPassword(email, password);

	console.log("	User in! " + JSON.stringify(authUser, null, "\t"));

	return authUser;
}

async function signout_P() {
	console.log("signout_P");

	await auth.signOut();

	console.log("	USER SIGNED OUT!");
}

