function passTime(lunch_time, dessert_time)
{
	return{
		'action': 'UpdateAlarmTime',
		'lunch_time': document.getElementById('lunch_time').value.split(':'),
		'dessert_time': document.getElementById('dessert_time').value.split(':')
	};
}

function setTime(lunch_time, dessert_time) {
	chrome.storage.sync.set(
	{
		'lunch_time':
		{
			'hour': lunch_time[0],
			'minute': lunch_time[1]
		},
		'dessert_time':
		{
			'hour': dessert_time[0],
			'minute': dessert_time[1]
		}
	},
	function() 
	{
		console.log('Time settings saved');
	});
	
}

function getValue(time)
{
	chrome.storage.sync.get(time, function(items) 
	{
		if (items[time]['hour'] == undefined || items[time]['minute'] == undefined) 
		{
			items[time]['hour'] = '00';
			items[time]['minute'] = '00';
		}
		format_time = String('00' + items[time]['hour']).slice(-2) + ':'
				     + String('00' + items[time]['minute']).slice(-2);
		document.getElementById(time).value = format_time;
	});
}

function getTime() {
	getValue('lunch_time');
	getValue('dessert_time');
}

function init() 
{
	getTime();
}

window.addEventListener('load', init);

document.addEventListener('DOMContentLoaded', function()
{
    var save = document.getElementById('save');
    save.addEventListener('click', function()
	{
		lunch_time = document.getElementById('lunch_time').value.split(':');
        dessert_time = document.getElementById('dessert_time').value.split(':');
		setTime(lunch_time, dessert_time);
		chrome.runtime.sendMessage(passTime(lunch_time, dessert_time), function(response)
		{
			console.log(response);
		});
    });
	
	var site = document.getElementById('Go to site');
	site.addEventListener('click', function()
	{
		chrome.tabs.create({url:'https://dinbendon.net/do/'});
	});
});
