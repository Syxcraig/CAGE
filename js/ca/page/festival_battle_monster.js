// monster stats
tools['Page'].runtime['festival_battle_monster.php'] = function() {

	console.log('Page: festival_battle_monster.php');

	var _monstername = null;
	// add percentage to top bars
	if($('#app_body div[style*="nm_bars.jpg"], #app_body div[style*="nm_bars_cross.jpg"]').length > 0) {
		$('img[src*="monster_health_background.jpg"], [src*="nm_red.jpg"], [src*="nm_orange.jpg"]').each(function(_i, _e) {
			_monstername = $(_e).parent().parent().find('div:contains("\'s Life"):last, #app_body div:contains("\'s life"):last');
			var _health = $(_e).parent()[0];
			if(_health.style && _health.style.width !== "" && _monstername && _monstername.text()) {
				var _percentage = _health.style.width.substr(0, 5);
				_monstername.text(_monstername.text() + ' (' + _percentage + (_percentage.indexOf('%') > -1 ? ')' : '%)'));
			}
		});
	} else {
		$('img[src*="monster_health_background.jpg"], [src*="nm_red.jpg"]').each(function(_i, _e) {
			_monstername = $(_e).parent().parent().parent().parent().find('div:contains("\'s Life"):last, div:contains("\'s life"):last');
			var _health = $(_e).parent()[0];
			if(_health.style && _health.style.width !== "" && _monstername && _monstername.text()) {
				var _percentage = _health.style.width.substr(0, 5);
				_monstername.text(_monstername.text() + ' (' + _percentage + (_percentage.indexOf('%') > -1 ? ')' : '%)'));
			}
		});
	}

	var _defense = tools['Page'].runtime['defense'](), _stun = tools['Page'].runtime['stun_bar']().replace('Need ', '');

	// rearrange attack result
	if($('div.result').length > 0) {
		//resize Elite Guard boxes
		$('div.result div:textEquals("Elite Guard")').parent().find('div[style*="height:84px"]').css('height', 68);
		$('img[alt="Call to Elite Guard"]').parent().css({
			'height' : 68,
			'overflow' : 'hidden'
		});
		// add monster damage/health/... to result
		$('div.result:has(img[src*="graphics/button_monster_attack_again.gif"]) span.result_body div:last, div.result:contains(" Again!")').append('<div id="MonsterResultDamage"><div>' + _monstername.text() + '</div><div>' + _defense + '</div><div>' + _stun + '</div><div>Your Damage/Activity: ' + $('td.dragonContainer tr:has(a[href*="' + CastleAge.userId + '"]) > td:last').text().trim() + '</div></div>');
		if($('div.result:contains(" Again!")').length > 0) {
			$('#MonsterResultDamage').css('float', 'none');
		}
	}

	// answer CTA
	if($('form:has(input[alt="Ask for help"]):first').length == 1) {
		var _form = $('#app_body form:has(input[alt="Ask for help"])').clone();
		_form.find('input[name="bqh"]').remove();
		$('#app_body form:has(input[alt="Ask for help"])').parent().parent().find('img[src*="siege"]:last').parent().append('<a href="http://apps.facebook.com/castle_age/festival_battle_monster.php?' + _form.serialize() + '&action=doObjective"><img id="cageSummonCTA" src="http://image4.castleagegame.com/graphics/mp_button_summon.gif"></a>').unbind('click').click(function() {
			tools.Page.loadPage('festival_battle_monster.php?' + $('form:has(div.imgButton > input[alt="Ask for help"]):first').serialize() + '&action=doObjective');
			return false;
		});
	}

	tools['Page'].runtime['battleStats']();

};
