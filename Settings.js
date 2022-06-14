
function is_valid_token_option_value(tokenOptionName, value) {
	return token_setting_options().find(o => o.name === tokenOptionName)?.options?.map(value).includes(value);
}

function convert_option_to_override_dropdown(tokenOption) {
	// Note: Spread syntax effectively goes one level deep while copying an array. Therefore, it may be unsuitable for copying multidimensional arrays or objects
	// we are explicitly not using the spread operator at this level because we need to deep copy the object
	let converted = {
		name: tokenOption.name,
		label: tokenOption.label,
		type: 'dropdown',
		options: tokenOption.options.map(option => { return {...option} }),
		defaultValue: undefined
	};
	converted.options.push({ value: undefined, label: "Not Overridden", description: "Changing this setting will override the default settings" });
	return converted;
}

function token_setting_options() {
	return [
		{
			name: 'tokenStyleSelect',
			label: 'Token Style',
			type: 'dropdown',
			options: [
				{ value: "circle", label: "Circle", description: `The token is round and is contained within the border. We set "Ignore Aspect Ratio" to true and "Square" to false. Great for tokens with a portrait art style!` },
				{ value: "square", label: "Square", description: `The token is square and is contained within the border. We set "Ignore Aspect Ratio" to true and "Square" to true. Great for tokens with a portrait art style!` },
				{ value: "virtualMiniCircle", label: "Virtual Mini w/ Round Base", description: `The token looks like a physical mini with a round base. The image will show up as it is naturally with the largest side being equal to the token size, we set "Ignore Aspect Ratio" to false and "Square" to true. We also add a virtual token base to this Style with Borders and Health Aura on the base of the token. Great for tokens with a top-down art style!` },
				{ value: "virtualMiniSquare", label: "Virtual Mini w/ Square Base", description: `The token looks like a physical mini with a round base. The image will show up as it is naturally with The largest side being equal to the token size, we set "Ignore Aspect Ratio" to false and "Square" to true. We also add a virtual token base to this Style with Borders and Health Aura on the base of the token. Great for tokens with a top-down art style!` },
				{ value: "noConstraint", label: "No Constraint", description: `The token will show up as it is naturally largest side being equal to token size, we set "Ignore Aspect Ratio" to false and "Square to true. Borders and Health Aura are drawn as a drop shadow to fit the shape of the token.` }
			],
			defaultValue: "circle"
		},
		{
			name: 'tokenBaseStyleSelect',
			label: 'Token Base Style',
			type: 'dropdown',
			options: [
				{ value: "default", label: "Default", description: "A default dark semi-opaque plastic base." },
				{ value: "grass", label: "Grass", description: "A grass covered base.." },
				{ value: "tile", label: "Tile", description: "A tile base." },
				{ value: "sand", label: "Sand", description: "A sand covered base." },
				{ value: "rock", label: "Rock", description: "A rock base." },
				{ value: "water", label: "Water", description: "A water base." }
			],
			defaultValue: "default"
		},
		{
			name: 'hidden',
			label: 'Hide',
			type: 'toggle',
			options: [
				{ value: true, label: "Hidden", description: "The token is hidden to players." },
				{ value: false, label: "Visible", description: "The token is visible to players." }
			],
			defaultValue: false
		},
		{
			name: 'square',
			label: 'Square Token',
			type: 'toggle',
			options: [
				{ value: true, label: "Square", description: "The token is square." },
				{ value: false, label: "Round", description: "The token is clipped to fit within a circle." }
			],
			defaultValue: false
		},
		{
			name: 'locked',
			label: 'Disable All Interaction',
			type: 'toggle',
			options: [
				{ value: true, label: "Interaction Disabled", description: "The token can not be interacted with in any way. Not movable, not selectable by players, no hp/ac displayed, no border displayed, no nothing. Players shouldn't even know it's a token." },
				{ value: false, label: "Interaction Allowed", description: "The token can be interacted with." }
			],
			defaultValue: false
		},
		{
			name: 'restrictPlayerMove',
			label: 'Restrict Player Movement',
			type: 'toggle',
			options: [
				{ value: true, label: "Restricted", description: "Players can not move the token." },
				{ value: false, label: "Unrestricted", description: "Players can move the token." }
			],
			defaultValue: false
		},
		{
			name: 'disablestat',
			label: 'Remove HP/AC',
			type: 'toggle',
			options: [
				{ value: true, label: "Removed", description: "The token does not have HP/AC shown to either the DM or the players." },
				{ value: false, label: "Visible to DM", description: "The token has HP/AC shown to only the DM." }
			],
			defaultValue: false
		},
		{
			name: 'hidestat',
			label: 'Hide Player HP/AC',
			type: 'toggle',
			options: [
				{ value: true, label: "Hidden", description: "Each player can see their own HP/AC, but can't see the HP/AC of other players." },
				{ value: false, label: "Visible", description: "Each player can see their own HP/AC as well as the HP/AC of other players." }
			],
			defaultValue: false
		},
		{
			name: 'hidehpbar',
			label: 'Only show HP values on hover',
			type: 'toggle',
			options: [
				{ value: true, label: "On Hover", description: "HP values are only shown when you hover or select the token. The 'Disable HP/AC' option overrides this one." },
				{ value: false, label: "Always", description: "HP values are always displayed on the token. The 'Disable HP/AC' option overrides this one." }
			],
			defaultValue: false
		},
		{
			name: 'disableborder',
			label: 'Disable Border',
			type: 'toggle',
			options: [
				{ value: true, label: 'No Border', description: "The token has a border drawn around the image." },
				{ value: false, label: 'Border', description: "The token does not have a border drawn around the image." }
			],
			defaultValue: false
		},
		{
			name: 'disableaura',
			label: 'Disable Health Aura',
			type: 'toggle',
			options: [
				{ value: true, label: 'No Aura', description: "An aura is drawn around the token's image that represents current health." },
				{ value: false, label: 'Health Aura', description: "Enable this to have an aura drawn around the token's image that represents current health." }
			],
			defaultValue: false
		},
		{
			name: 'enablepercenthpbar',
			label: 'Enable Token HP% Bar',
			type: 'toggle',
			options: [
				{ value: true, label: 'Health Bar', description: "The token has a traditional visual hp% bar below it" },
				{ value: false, label: 'No Bar', description: "The token does not have a traditional visual hp% bar below it" }
			],
			defaultValue: false
		},
		{
			name: 'revealname',
			label: 'Show name to players',
			type: 'toggle',
			options: [
				{ value: true, label: 'Visible', description: "The token's name is visible to players" },
				{ value: false, label: 'Hidden', description: "The token's name is hidden from players" }
			],
			defaultValue: false
		},
		{
			name: 'legacyaspectratio',
			label: 'Ignore Image Aspect Ratio',
			type: 'toggle',
			options: [
				{ value: true, label: 'Stretch', description: "The token's image will stretch to fill the token space" },
				{ value: false, label: 'Maintain', description: "New token's image will respect the aspect ratio of the image provided" }
			],
			defaultValue: false
		},
		{
			name: "player_owned",
			label: "Player Accessible Stats",
			type: 'toggle',
			options: [
				{ value: true, label: 'Player & DM', description: "The token's stat block is accessible to players via the token context menu. Players can also alter the HP/AC of this token." },
				{ value: false, label: 'DM only', description: "The token's stat block is not accessible to players via the token context menu. Players can not alter the HP/AC of this token." }
			],
			defaultValue: false
		}
	];
}

function b64EncodeUnicode(str) {
        // first we use encodeURIComponent to get percent-encoded UTF-8,
        // then we convert the percent encodings into raw bytes which
        // can be fed into btoa.
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
        }));
    }

function b64DecodeUnicode(str) {
        // Going backwards: from bytestream, to percent-encoding, to original string.
        return decodeURIComponent(atob(str).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }
    


function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}


function cloud_migration(scenedata=null){
	let http_api_gw="https://services.abovevtt.net";
	let searchParams = new URLSearchParams(window.location.search);
	if(searchParams.has("dev")){
		http_api_gw="https://jiv5p31gj3.execute-api.eu-west-1.amazonaws.com";
	}
	let gameid = find_game_id();

	if(scenedata==null)
		scenedata=localStorage.getItem("ScenesHandler"+gameid);
	$.ajax({
		url:http_api_gw+"/services?action=migrate&campaign="+window.CAMPAIGN_SECRET,
		type:"POST",
		contentType:'application/json',
		data: scenedata,
		success:function(data){
			localStorage.setItem("Migrated"+gameid,"1");
			alert("Migration (hopefully) completed. You need to Re-Join AboveVTT");
			location.reload();
		}
	});
}

function init_settings(){
	
	let body = settingsPanel.body;

	
	if((!window.CLOUD) && (!window.FORCED_DM)){
		body.append(`
		<h5 class="token-image-modal-footer-title">MIGRATE YOUR SCENES TO THE CLOUD</h5>
		<div class="sidebar-panel-header-explanation">
			<p>Your data is currently stored on your browser's cache. Press migrate to move your data into the AboveVTT cloud (<b>WARNING. YOU RISK LOOSING YOU DATA</b>) </p>
			<button onclick='cloud_migration();' class="sidebar-panel-footer-button sidebar-hover-text" data-hover="This will migrate your data to the cloud. Be careful or you may loose your scenes">MIGRATE</button>
		</div>
		`)
	}
	else if(window.CLOUD){
		body.append('<b>Your scenes are stored in the "cloud"</b>');
	}

	body.append(`
		<h5 class="token-image-modal-footer-title">Import / Export</h5>
		<div class="sidebar-panel-header-explanation">
			<p><b>WARNING</b>: The import / export feature is expirimental. Use at your own risk. A future version will include an import/export wizard.</p>
			<p>Export will download a file containing all of your scenes, custom tokens, and soundpads. 
			Import will allow you to upload an exported file. Scenes from that file will be added to the scenes in this campaign.</p>
			<div class="sidebar-panel-footer-horizontal-wrapper">
			<button onclick='import_openfile();' class="sidebar-panel-footer-button sidebar-hover-text" data-hover="Upload a file containing scenes, custom tokens, and soundpads. This will not overwrite your existing scenes. Any scenes found in the uploaded file will be added to your current list scenes">IMPORT</button>
			<button onclick='export_file();' class="sidebar-panel-footer-button sidebar-hover-text" data-hover="Download a file containing all of your scenes, custom tokens, and soundpads">EXPORT</button>
				<input accept='.abovevtt' id='input_file' type='file' style='display: none' />
		</div>
	`);

	$("#input_file").change(import_readfile);

	body.append(`
		<br />
		<h5 class="token-image-modal-footer-title">Default Options when placing tokens</h5>
		<div class="sidebar-panel-header-explanation">Every time you place a token on the scene, these settings will be used. You can override these settings on a per-token basis by clicking the gear on a specific token row in the tokens tab.</div>
	`);

	let tokenOptionsButton = $(`<button class="sidebar-panel-footer-button">Change The Default Token Options</button>`);
	tokenOptionsButton.on("click", function (clickEvent) {
		build_and_display_sidebar_flyout(clickEvent.clientY, function (flyout) {
			let optionsContainer = build_sidebar_token_options_flyout(token_setting_options(), window.TOKEN_SETTINGS, function (name, value) {
				if (value === true || value === false || typeof value === 'string') {
					window.TOKEN_SETTINGS[name] = value;
				} else {
					delete window.TOKEN_SETTINGS[name];
				}
			}, function() {
				persist_token_settings(window.TOKEN_SETTINGS);
				redraw_settings_panel_token_examples();
			});
			optionsContainer.prepend(`<div class="sidebar-panel-header-explanation">Every time you place a token on the scene, these settings will be used. You can override these settings on a per-token basis by clicking the gear on a specific token row in the tokens tab.</div>`);
			flyout.append(optionsContainer);
			position_flyout_left_of(body, flyout);
		});
	});
	body.append(tokenOptionsButton);
	body.append(`<br />`);

	const experimental_features = [
		{
			name: 'streamDiceRolls',
			label: 'Stream Dice Rolls',
			type: 'toggle',
			options: [
				{ value: true, label: "Streaming", description: `You and your players can find the button to join the dice stream in the game log in the top right corner. Disclaimer: the dice will start small then grow to normal size after a few rolls. They will be contained to the smaller of your window or the sending screen size.` },
				{ value: false, label: "Not Streaming", description: `This will enable the dice stream feature for everyone. You will all still have to join the dice stream. You and your players can find the button to do this in the game log in the top right corner once this feature is enabled. Disclaimer: the dice will start small then grow to normal size after a few rolls. They will be contained to the smaller of your window or the sending screen size.` }
			],
			defaultValue: false
		}
	];

	body.append(`
		<br />
		<h5 class="token-image-modal-footer-title">Experimental Features</h5>
		<div class="sidebar-panel-header-explanation">These are experimental features. You must explicitly opt-in to them. Use at your own risk.</div>
	`);
	for(let i = 0; i < experimental_features.length; i++) {
		let setting = experimental_features[i];
		if (setting.dmOnly === true && !window.DM) {
			continue;
		}
		let currentValue = window.EXPERIMENTAL_SETTINGS[setting.name] || setting.defaultValue;
		let inputWrapper = build_toggle_input(setting, currentValue, function(name, newValue) {
			console.log(`experimental setting ${name} is now ${newValue}`);
			if (name === "streamDiceRolls") {
				enable_dice_streaming_feature(newValue);
				if(newValue == true) {
					window.MB.sendMessage("custom/myVTT/enabledicestreamingfeature");
				} else {
					window.MB.sendMessage("custom/myVTT/disabledicestream");
				}
			} else {
				window.EXPERIMENTAL_SETTINGS[setting.name] = newValue;
				persist_experimental_settings(window.EXPERIMENTAL_SETTINGS);
			}
		});
		body.append(inputWrapper);
	}
	let optOutOfAll = $(`<button class="token-image-modal-remove-all-button" title="Opt out of all expirimental features." style="width:100%;padding:8px;margin:10px 0px 30px 0px;">Opt out of all</button>`);
	optOutOfAll.click(function () {
		for (let i = 0; i < experimental_features.length; i++) {
			let setting = experimental_features[i];
			let toggle = body.find(`button[name=${setting.name}]`);
			if (toggle.hasClass("rc-switch-checked")) {
				toggle.click();
			}
		}
	});
	body.append(optOutOfAll);

	redraw_settings_panel_token_examples();
}

function redraw_settings_panel_token_examples(settings) {
	console.log("redraw_settings_panel_token_examples", settings);
	let mergedSettings = {...window.TOKEN_SETTINGS};
	if (settings !== undefined) {
		mergedSettings = {...mergedSettings, ...settings};
	}
	delete mergedSettings.imageSize;
	let items = $(".example-tokens-wrapper .example-token");
	for (let i = 0; i < items.length; i++) {
		let item = $(items[i]);
		mergedSettings.imgsrc = item.find("img.token-image").attr("src");
		item.replaceWith(build_example_token(mergedSettings));
	}
}

function build_example_token(options) {
	let mergedOptions = {...default_options(), ...window.TOKEN_SETTINGS, ...options};
	mergedOptions.hp = 10;
	mergedOptions.max_hp = 10;
	mergedOptions.id = `exampleToken-${uuid()}`;
	mergedOptions.size = 100;
	mergedOptions.ac = 10;

	// TODO: this is horribly inneficient. Clean up token.place and then update this
	let token = new Token(mergedOptions);
	token.place(0);
	let html = $(`#tokens div[data-id='${mergedOptions.id}']`).clone();
	token.delete();

	html.addClass("example-token");
	html.css({
		float: "left",
		width: "33%",
		position: "relative",
		opacity: 1,
		top: 0,
		left: 0
	});
	return html;
}

// used for settings tab, and tokens tab configuration modals. For placed tokens, see `build_options_flyout_menu`
// updateValue: function(name, newValue) {} // only update the data here
// didChange: function() {} // do ui things here
function build_sidebar_token_options_flyout(availableOptions, setValues, updateValue, didChange) {
	if (typeof updateValue !== 'function') {
		updateValue = function(name, newValue){
			console.warn("build_sidebar_token_options_flyout was not given an updateValue function so we can't set ", name, "to", value);
		};
	}
	if (typeof didChange !== 'function') {
		didChange = function(){
			console.log("build_sidebar_token_options_flyout was not given adidChange function");
		};
	}

	let container = $(`<div class="sidebar-token-options-flyout-container prevent-sidebar-modal-close"></div>`);

	// const updateValue = function(name, newValue) {
	// 	if (is_valid_token_option_value(name, newValue)) {
	// 		setValues[name] = newValue;
	// 	} else {
	// 		delete setValues[name];
	// 	}
	// };

	availableOptions.forEach(option => {
		const currentValue = setValues[option.name];
		if (option.type === "dropdown") {
			let inputWrapper = build_dropdown_input(option, currentValue, function(name, newValue) {
				updateValue(name, newValue);
				didChange();
			});
			container.append(inputWrapper);
		} else if (option.type === "toggle") {
			let inputWrapper = build_toggle_input(option, currentValue, function (name, newValue) {
				updateValue(name, newValue);
				didChange();
			});
			container.append(inputWrapper)
		} else {
			console.warn("build_sidebar_token_options_flyout failed to handle token setting option with type", option.type);
		}
	});
	update_token_base_visibility(container);


	// Build example tokens to show the settings changes
	container.append(`<h5 class="token-image-modal-footer-title" style="margin-top:15px;">Example Tokens</h5>`);
	let tokenExamplesWrapper = $(`<div class="example-tokens-wrapper"></div>`);
	container.append(tokenExamplesWrapper);
	// not square image to show aspect ratio
	tokenExamplesWrapper.append(build_example_token({imgsrc: "https://www.dndbeyond.com/avatars/thumbnails/6/359/420/618/636272697874197438.png"}));
	// perfectly square image
	tokenExamplesWrapper.append(build_example_token({imgsrc: "https://www.dndbeyond.com/avatars/8/441/636306375308314493.jpeg"}));
	// idk, something else I guess
	tokenExamplesWrapper.append(build_example_token({imgsrc: "https://i.imgur.com/2Lglcip.png"}));

	let resetToDefaults = $(`<button class='token-image-modal-remove-all-button' title="Reset all token settings back to their default values." style="width:100%;padding:8px;margin:10px 0px;">Reset Token Settings to Defaults</button>`);
	resetToDefaults.on("click", function (clickEvent) {

		let tokenOptionsFlyoutContainer = $(clickEvent.currentTarget).parent();

		// disable all toggle switches
		tokenOptionsFlyoutContainer
			.find(".rc-switch")
			.removeClass("rc-switch-checked")
			.removeClass("rc-switch-unknown");

		// set all dropdowns to their default values
		tokenOptionsFlyoutContainer
			.find("select")
			.each(function () {
				let el = $(this);
				let matchingOption = availableOptions.find(o => o.name === el.attr("name"));
				el.find(`option[value=${matchingOption.defaultValue}]`).attr('selected','selected');
			});

		// This is why we want multiple callback functions.
		// We're about to call updateValue a bunch of times and only need to update the UI (or do anything else really) one time
		availableOptions.forEach(option => updateValue(option.name, undefined));
		didChange();
	});
	container.append(resetToDefaults);

	observe_hover_text(container);

	return container;
}

function update_token_base_visibility(container) {
	const selectedStyle = container.find("select[name=tokenStyleSelect]").val();
	const findOtherOption = function(optionName) {
		return container.find(`.token-image-modal-footer-select-wrapper[data-option-name=${optionName}]`);
	}
	let styleSubSelect = findOtherOption("tokenBaseStyleSelect");
	if(selectedStyle === "virtualMiniCircle" || selectedStyle === "virtualMiniSquare"){
		styleSubSelect.show();
	} else{
		styleSubSelect.hide();
	}
	if (selectedStyle === "noConstraint") {
		findOtherOption("square").show();
		findOtherOption("legacyaspectratio").show();
	} else {
		findOtherOption("square").hide();
		findOtherOption("legacyaspectratio").hide();
	}
}

function enable_dice_streaming_feature(enabled){
	if(enabled)
	{
		if($(".stream-dice-button").length>0)
			return;
		$(".glc-game-log>[class*='Container-Flex']").append($(`<div  id="stream_dice"><div class='stream-dice-button'>Dice Stream Disabled</div></div>`));
		$(".stream-dice-button").off().on("click", function(){
			if(window.JOINTHEDICESTREAM){
				update_dice_streaming_feature(false);
			}
			else {
				update_dice_streaming_feature(true);
			}
		})
	}
	else{
		$(".stream-dice-button").remove();
		window.JOINTHEDICESTREAM = false;
		$("[id^='streamer-']").remove();
		for (let peer in window.STREAMPEERS) {
			window.STREAMPEERS[peer].close();
			delete window.STREAMPEERS[peer]
		}
	}
}

function update_dice_streaming_feature(enabled, sendToText=gamelog_send_to_text()) {		

	if (enabled == true) {
		// STREAMING STUFF
		window.JOINTHEDICESTREAM = true;
		$('.stream-dice-button').html("Dice Stream Enabled");
		$('.stream-dice-button').toggleClass("enabled", true);
		$("[role='presentation'] [role='menuitem']").each(function(){
			$(this).off().on("click", function(){
				if($(this).text() == "Everyone") {
					window.MB.sendMessage("custom/myVTT/revealmydicestream",{
						streamid: window.MYSTREAMID
					});		
				}
				else if($(this).text() == "Dungeon Master"){
					window.MB.sendMessage("custom/myVTT/showonlytodmdicestream",{
						streamid: window.MYSTREAMID
					});
				}
				else{
					window.MB.sendMessage("custom/myVTT/hidemydicestream",{
						streamid: window.MYSTREAMID
					});
				}
			});
		});


		// DICE STREAMING ?!?!
		let diceRollPanel = $(".dice-rolling-panel__container");
		if (diceRollPanel.length > 0) {
			window.MYMEDIASTREAM = diceRollPanel[0].captureStream(30);
		}
		if (window.JOINTHEDICESTREAM) {
			
			for (let i in window.STREAMPEERS) {
				console.log("replacing the track")
				window.STREAMPEERS[i].getSenders()[0].replaceTrack(window.MYMEDIASTREAM.getVideoTracks()[0]);
			}
			setTimeout(function(){
				if(sendToText == "Dungeon Master"){
					window.MB.sendMessage("custom/myVTT/showonlytodmdicestream",{
						streamid: window.MYSTREAMID
					});
				}
				else{
					window.MB.sendMessage("custom/myVTT/hidemydicestream",{
						streamid: window.MYSTREAMID
					});
				}		
			}, 1000)
			setTimeout(function(){
				window.MB.sendMessage("custom/myVTT/wannaseemydicecollection", {
					from: window.MYSTREAMID
				})
			}, 500);
		} 
	}
	else {
		$(`.stream-dice-button`).html("Dice Stream Disabled");
		window.JOINTHEDICESTREAM = false;
		$('.stream-dice-button').toggleClass("enabled", false);
		$("[id^='streamer-']").remove();
		window.MB.sendMessage("custom/myVTT/turnoffsingledicestream", {
			to: "everyone",
			from: window.MYSTREAMID
		})
		for (let peer in window.STREAMPEERS) {
			window.STREAMPEERS[peer].close();
			delete window.STREAMPEERS[peer]
		}
	}

}

function persist_token_settings(settings){
	const gameid = find_game_id();
	localStorage.setItem("TokenSettings" + gameid, JSON.stringify(settings));
}


function persist_experimental_settings(settings) {
	const gameid = find_game_id();
	localStorage.setItem("ExperimentalSettings" + gameid, JSON.stringify(settings));
}

function export_scenes(callback){
	if(window.CLOUD){
		let http_api_gw="https://services.abovevtt.net";
		let searchParams = new URLSearchParams(window.location.search);
		if(searchParams.has("dev")){
			http_api_gw="https://jiv5p31gj3.execute-api.eu-west-1.amazonaws.com";
		}

		$.ajax({
			url:http_api_gw+"/services?action=export_scenes&campaign="+window.CAMPAIGN_SECRET,
			success: function(data){
				callback(JSON.parse(data))
			}
		})
	}
	else{
		let scenes=[];
		for(i=0;i<window.ScenesHandler.scenes.length;i++){
			var scene=Object.assign({}, window.ScenesHandler.scenes[i]);
			scenes.push(scene);
		}
		callback(scenes);
	}
}

function export_file(){
	let DataFile={
		version: 2,
		scenes:[],
		soundpads:{},
		tokendata:{},
		notes:{},
		journalchapters:[],
		};
	
	export_scenes(
		(scenes)=>{
			DataFile.scenes=scenes;

			DataFile.tokendata=Object.assign({}, tokendata);
			var tmp=DataFile.tokendata.folders['AboveVTT BUILTIN'];
			delete DataFile.tokendata.folders['AboveVTT BUILTIN'];
			DataFile.tokendata.folders['AboveVTT BUILTIN']=tmp;
			DataFile.mytokens=mytokens;
			DataFile.mytokensfolders=mytokensfolders;
			DataFile.notes=window.JOURNAL.notes;
			DataFile.journalchapters=window.JOURNAL.chapters;	
			DataFile.soundpads=window.SOUNDPADS;
			download(b64EncodeUnicode(JSON.stringify(DataFile,null,"\t")),"DataFile.abovevtt","text/plain");
		}
	);

};

function import_openfile(){
	$("#input_file").trigger("click");
}

function import_readfile() {
	var reader = new FileReader();
	reader.onload = function() {
		// DECODE
		var DataFile=null;
		try{
			var DataFile=$.parseJSON(b64DecodeUnicode(reader.result));
		}
		catch{
			
		}
		if(!DataFile){ // pre version 2
			var DataFile=$.parseJSON(atob(reader.result));
		}
		
		console.log(DataFile);
		
		
		for(k in DataFile.soundpads){
			window.SOUNDPADS[k]=DataFile.soundpads[k];
		}
		$("#sounds-panel").remove(); init_audio();
		persist_soundpad();

		if (DataFile.mytokens !== undefined) {
			mytokens = DataFile.mytokens;
		}
		if (DataFile.mytokensfolders !== undefined) {
			mytokensfolders = DataFile.mytokensfolders;
		}
		did_change_mytokens_items();

		for(k in DataFile.tokendata.folders){
			tokendata.folders[k]=DataFile.tokendata.folders[k];
		}
		if(!tokendata.tokens){
			tokendata.tokens={};
		}
		for(k in DataFile.tokendata.tokens){
			tokendata.tokens[k]=DataFile.tokendata.tokens[k];
		}
		persist_customtokens();

		alert('Loading completed. Data merged');
		
		if(DataFile.notes){
			window.JOURNAL.notes=DataFile.notes;
			window.JOURNAL.chapters=DataFile.journalchapters;
			window.JOURNAL.persist();
			window.JOURNAL.build_journal();
		}


		if(window.CLOUD){
			cloud_migration(JSON.stringify(DataFile.scenes));
		}
		else{
			for(i=0;i<DataFile.scenes.length;i++){
				window.ScenesHandler.scenes.push(DataFile.scenes[i]);
			}
		}
	};
	reader.readAsText($("#input_file").get(0).files[0]);
}
