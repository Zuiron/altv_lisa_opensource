var loaded = false;
var debug = false; // true for debug mode (to test on browser with mock of alt)
var data = {
	client: {
		model: null,
		state: null
	},
	server: {
		model: null,
		state: null
	}
};
var editor = null;

if(debug){
	const alt_mock = {
		emit: (...args) => {
			console.log(args);
		},
		on: (...args) => {
			console.log(args);
		}
	}	
	var alt = alt || alt_mock;
	let mainEditor = document.getElementById('main-container');
	mainEditor.className = "";
}

const serverDefaultValue = `
//client code
const playerPos = { x: 414.20746, y: -972.52386, z: 29.44237, heading:-185.0 }
let localPlayer = alt.getLocalPlayer();
let localPlayerId = localPlayer.scriptID;
game.setEntityCoords(localPlayerId, playerPos.x, playerPos.y, playerPos.z, 1, 0, 0, 1);`;

const clientDefaultValue = `
//server code
player.pos = {x:400.20746, y: -951.52386, z: 29.39782};`;

function createEditor() {
	let mainEditor = document.getElementById('main-container');
	data.client.model = monaco.editor.createModel(serverDefaultValue, 'javascript');
	data.server.model = monaco.editor.createModel(clientDefaultValue, 'javascript');
	
	editor = monaco.editor.create(document.getElementById('container'), {
		model: data.client.model,
		value: '/// type your code below...',
		language: 'javascript',
		theme: 'vs-dark',
		minimap: {
			enabled: true
		}
	});
	
	// compiler options
	monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
		target: monaco.languages.typescript.ScriptTarget.ES6,
		allowNonTsExtensions: true
	});

	if(!debug)
	mainEditor.className="hidden";
	alt.emit('editorReady');
}

createEditor();

function switchTab(selectedTab, modelId) {
	var tabs = document.getElementById('tabs');
	for (var i = 0; i < tabs.childNodes.length; i++) {
		var child = tabs.childNodes[i];
		if (child.className !== 'alt-logo')
			child.className = 'tab';
	}

	selectedTab.className = 'tab active';
	var currentState = editor.saveViewState();
	var currentModel = editor.getModel();
	if (currentModel === data.client.model) {
		data.client.state = currentState;
	} else if (currentModel === data.server.model) {
		data.server.state = currentState;
	}
	editor.setModel(data[modelId].model);
	editor.focus();
}

function execute() {
	const errors = monaco.editor.getModelMarkers();
	const errorsContainer = document.getElementById('errors');
	const successContainer = document.getElementById('success');
	const currentModel = editor.getModel();
	const currentCode = editor.getValue();

	if (errors.length > 0) {
		successContainer.innerHTML = "";
		successContainer.className = "hidden";
		errorsContainer.className = "show";
		errorsContainer.innerHTML = "ERROR: Fix errors noob."
		return;
	}
	errorsContainer.className = "hidden";
	errorsContainer.innerHTML = "";

	if (!currentCode) return;
	if (currentModel === data.client.model) {
		successContainer.className = "show";
		successContainer.innerHTML = "Client executed! " + getDate();
		alt.emit('clientEvalExecute', editor.getValue());
	} else if (currentModel === data.server.model) {
		successContainer.className = "show";
		successContainer.innerHTML = "Server executed! " + getDate();
		alt.emit('serverEvalExecute', editor.getValue());
	}
}

function toggleEditor() {
	let mainEditor = document.getElementById('main-container');
	if (mainEditor.classList.contains("active")) {
		mainEditor.className = "hidden";
		alt.emit('editorOpened', false);
	} else {
		mainEditor.className = "active";
		alt.emit('editorOpened', true);
		editor.focus();
	}
}

alt.on('toggleEditor', () => {
	toggleEditor();
});

function getDate() {
	let returnDate;
	const date = new Date();
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let seconds = date.getSeconds();
	let ampm = hours >= 12 ? 'PM' : 'AM';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0' + minutes : minutes;
	returnDate = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
	return returnDate;
}

window.addEventListener('load', function() {});