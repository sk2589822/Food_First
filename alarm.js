var lunch_hour = 10
var dessert_hour = 15
var lunch_time = new Date().setHours(lunch_hour, 10, 0);
var dessert_time = new Date().setHours(dessert_hour, 10, 0);
var DinBenDon_url = {url: 'https://dinbendon.net/do/'};

function CreateAlarm()
{
	var lunch_alarm = {when: lunch_time , periodInMinutes: 1440};
	var dessert_alarm = {when: dessert_time, periodInMinutes: 1440};
	chrome.alarms.clearAll();
	chrome.alarms.create('Lunch', lunch_alarm);
	chrome.alarms.create('Dessert', dessert_alarm);
}

chrome.alarms.onAlarm.addListener(function(alarm) 
{
	var now = Date.now();
	if(alarm.name == 'Lunch' && Math.abs(now - lunch_time) <= 60000) 
	{
		var lunch_notify = new Notification('訂便當囉', {icon: 'images/bentou.png'})
		lunch_time = new Date().setHours(lunch_hour + 24, 10, 0);
		lunch_notify.onclick = function()
		{
			chrome.tabs.create(DinBenDon_url);
			lunch_notify.close();
		}
	}
	else if(alarm.name == 'Dessert' && Math.abs(now - dessert_time) <= 60000)
	{
		var dessert_notify = new Notification('拿點心囉', {icon: 'images/dessert.png'})
		dessert_time = new Date().setHours(dessert_hour + 24, 10, 0);
		dessert_notify.onclick = function() 
		{
			dessert_notify.close();
		}
	}
});

CreateAlarm();