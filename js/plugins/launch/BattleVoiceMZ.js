//=============================================================================
// Plugin for RPG Maker MZ
// BattleVoiceMZ.js
//=============================================================================
// [Update History]
// This plugin is MZ version of BattleVoice.js the KADOKAWA RMMV plugin.
// - BattleVoice.js
// 2015.Nov    Ver1.0.0 First Release
// 2016.Aug    Ver1.1.0 Strict Option Input
// 2019.Feb.27 Ver1.2.0 Random Play
// - BattkeVoiceMZ
// 2020.Jan    Ver1.0.0 First release: Add plugin commands

/*:
 * @target MZ
 * @plugindesc play voice SE at battle when actor does spcified action
 * @author Sasuke KANNAZUKI
 * 
 * @param ON switch ID
 * @desc play se only when the switch is ON.
 * This setting interlocks with option Battle Voice.
 * @type switch
 * @default 1
 * 
 * @param volume
 * @desc volume of SEs. this setting is common among all voice SEs.
 * (Default:90)
 * @type number
 * @min 0
 * @max 100000
 * @default 90
 * 
 * @param pitch
 * @desc pitch of SEs. this setting is common among all voice SEs.
 * (Default:100)
 * @type number
 * @min 10
 * @max 100000
 * @default 100
 *
 * @param pan
 * @desc pan of SEs. this setting is common among all voice SEs.
 * 0:center, <0:left, >0:right (Default:0)
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * 
 * @param Battle Voice Name at Option
 * @desc display name at option
 * @type text
 * @default Battle Voice
 *
 * @noteParam attackVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam recoverVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam friendMagicVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam magicVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam skillVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam damageVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam defeatedVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam victoryVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 * 
 * @command set
 * @text Change Actor Voice
 * @desc Change various occasional voice
 *
 * @arg actorId
 * @text Actor ID
 * @desc Actor to change voice
 * @type actor
 * @default 1
 *
 * @arg situation
 * @text Situation
 * @desc Which occasion to change voice
 * @type select
 * @option At normal attack
 * @value attack
 * @option At recovery magic
 * @value recover
 * @option At magic to ally
 * @value friendMagic
 * @option At general magic
 * @value magic
 * @option At non-magical skill
 * @value skill
 * @option On Damaged
 * @value damage
 * @option On Dead
 * @value dead
 * @option On Victory
 * @value victory
 * @default attack
 *
 * @arg isSet
 * @text Set or Reset
 * @desc If reset, voices become set by plugin
 * If reset, following 2 parameters are ignored.
 * @type select
 * @option Set
 * @value set
 * @option Reset
 * @value reset
 * @default set
 *
 * @arg voice1
 * @text New Voice 1
 * @desc If you set more voices, write remainder next param.
 * If you set only one voice, set next param empty.
 * @type file
 * @dir audio/se/
 * @default 
 *
 * @arg voice2
 * @text New Voice >=2
 * @desc By writing like atk1,atk2,atk3
 * You can set plural voices
 * @type string
 * @default 
 *
 * @command allReset
 * @text All Reset Actor Voice
 * @desc Set all voices defined on plugin.
 * It's not reset skill related voice setting.
 *
 * @arg actorId
 * @text Actor ID
 * @desc Actor that reset voice setting
 * @type actor
 * @default 1
 *
 * @command skillSet
 * @text Set Skill Related Voice
 * @desc Set original voice for each skill.
 *
 * @arg actorId
 * @text Actor ID
 * @desc The actor to set the skill voice.
 * @type actor
 * @default 1
 *
 * @arg skillId
 * @text Skill ID
 * @desc The skill to set the origial voice.
 * @type skill
 * @default 1
 *
 * @arg isSet
 * @text Set or Reset
 * @desc If reset, voices become normal setting.
 * If reset, following 2 parameters are ignored.
 * @type select
 * @option Set
 * @value set
 * @option Reset
 * @value reset
 * @default set
 *
 * @arg voice1
 * @text New Voice 1
 * @desc If you set plural voices, write remainder next param.
 * If you set only one voice, set next param empty.
 * @type file
 * @dir audio/se/
 * @default 
 *
 * @arg voice2
 * @text New Voice >=2
 * @desc By writing like atk1,atk2,atk3
 * You can set plural voices
 * @type string
 * @default 
 *
 * @command skillAllReset
 * @text Reset All Skill Voice
 * @desc All reset an actor's skill specified voice.
 * Voices that is defined plugins are not reset.
 *
 * @arg actorId
 * @text Actor ID
 * @desc Actor that reset skill voice setting
 * @type actor
 * @default 1
 *
 * @help
 * This plugin runs under RPG Maker MZ.
 *
 * This plugin enables to play SE (assumed battle voice) at
 *  various situations.
 *
 * [Summary]
 * Player can change voice ON/OFF by Option Scene (except Title).
 * This setting interlocks switch ID set at plugin parameter.
 *
 * [note specification]
 * write down each actor's note at following format to set SE filename.
 * <attackVoice:filename>  plays when actor does normal attack.
 * <recoverVoice:filename>   plays when actor uses HP recovering magic.
 * <friendMagicVoice:filename> plays when actor spells magic for friend
 *  except HP recovering. if this is not set but <magicVoice:filename> is set,
 *  it plays <magicVoice:filename> setting file.
 * <magicVoice:filename>   plays when actor spells magic(except for friend).
 * <skillVoice:filename>   plays when actor uses special skill except magic.
 * <damageVoice:filename>    plays when actor takes damage.
 * <defeatedVoice:filename>   plays when actor is died.
 * <victoryVoice:filename>   plays when battle finishes.
 *  if plural actors attend the battle, randomly selected actor's SE is adopted. *
 * *NOTE* Here 'magic' skill means its 'Skill Type' is included in 
 *  '[SV]Magic Skills' on 'System 2' tab.
 *
 * [Advanced option 1]
 * If you want to play one of several voices randomly,
 * write filenames with colon as follows:
 * <attackVoice:atk1,atk2,atk3>
 * in this case, at attack, plays atk1 atk2, or atk3 randomly.
 *
 * If set no SE one of filenames, 
 * <attackVoice:atk1,atk2,$>
 * in this case, at attack, plays atk1 atk2, or doesn't play SE.
 *
 * You can set the same filename twice or more than.
 * <attackVoice:atk1,atk2,atk2,$>
 * in this case, 25% atk1, 50% atk2, 25% don't play.
 *
 * *NOTE* When set SEs at this notation, these files might be excluded at
 *  deployment with option 'Exclude unused files'.
 *  To prevent this, I recommend to make dummy event and set each SE to
 *  'Play SE' on the Contents.
 *
 * [Plugin Commands]
 * By calling plugin commands, you can do as follows:
 * - Set/Reset voice on each situation
 * - Reset all situations' voice to default
 * - Assign/Reset actor voice to each skill
 * - Reset all voices assigned to skills
 *
 * [License]
 * this plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 */
/*:ja
 * @target MZ
 * @plugindesc ?????????????????????????????????????????????SE?????????????????????
 * @author ??????????????????
 * 
 * @param ON switch ID
 * @text ???????????????????????????ID
 * @desc ????????????????????? ON ????????????????????????SE?????????????????????
 * ????????????????????????????????????????????????????????????
 * @type switch
 * @default 1
 *
 * @param volume
 * @text ?????????????????????
 * @desc ?????????SE????????????????????????????????????????????????????????????SE???
 * ????????????????????????(?????????:90)
 * @type number
 * @min 0
 * @max 100000
 * @default 90
 *
 * @param pitch
 * @text ???????????????
 * @desc ?????????SE??????????????????????????????????????????????????????SE???
 * ????????????????????????(?????????:100)
 * @type number
 * @min 10
 * @max 100000
 * @default 100
 *
 * @param pan
 * @text ????????????
 * @desc ?????????SE?????????????????????????????????????????????SE????????????????????????
 * 0:??????, ??????:?????????, ??????:????????? (?????????:0)
 * @type number
 * @min -100
 * @max 100
 * @default 0
 *
 * @param Battle Voice Name at Option
 * @text ???????????????????????????
 * @desc ?????????????????????????????????????????????
 * @type string
 * @default ??????????????????
 *
 * @noteParam attackVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam recoverVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam friendMagicVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam magicVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam skillVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam damageVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam defeatedVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam victoryVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 * 
 * @command set
 * @text ???????????????????????????
 * @desc ????????????????????????????????????????????????
 *
 * @arg actorId
 * @text ????????????ID
 * @desc ?????????????????????????????????
 * @type actor
 * @default 1
 *
 * @arg situation
 * @text ????????????????????????
 * @desc ?????????????????????????????????????????????
 * @type select
 * @option ???????????????
 * @value attack
 * @option ?????????????????????
 * @value recover
 * @option ???????????????????????????
 * @value friendMagic
 * @option ?????????????????????
 * @value magic
 * @option ???????????????????????????
 * @value skill
 * @option ??????????????????
 * @value damage
 * @option ???????????????
 * @value dead
 * @option ???????????????
 * @value victory
 * @default attack
 *
 * @arg isSet
 * @text ???????????????????????????
 * @desc ????????????????????????????????????????????????????????????
 * ??????????????????????????????2???????????????????????????????????????
 * @type select
 * @option ?????????
 * @value set
 * @option ????????????
 * @value reset
 * @default set
 *
 * @arg voice1
 * @text ???????????????
 * @desc ????????????????????????????????????????????????????????????????????????
 * ??????????????????????????????????????????????????????????????????
 * @type file
 * @dir audio/se/
 * @default 
 *
 * @arg voice2
 * @text ???????????????(2????????????)
 * @desc atk1,atk2,atk3 ?????????????????????????????????
 * ?????????????????????
 * @type string
 * @default 
 *
 * @command allReset
 * @text ?????????????????????????????????
 * @desc ?????????????????????????????????????????????????????????????????????
 * ?????????????????????????????????????????????????????????
 *
 * @arg actorId
 * @text ????????????ID
 * @desc ??????????????????????????????????????????
 * @type actor
 * @default 1
 *
 * @command skillSet
 * @text ?????????????????????
 * @desc ?????????????????????????????????
 * ?????????ID????????????????????????????????????????????????
 *
 * @arg actorId
 * @text ????????????ID
 * @desc ?????????????????????????????????????????????
 * @type actor
 * @default 1
 *
 * @arg skillId
 * @text ?????????ID
 * @desc ?????????????????????????????????
 * @type skill
 * @default 1
 *
 * @arg isSet
 * @text ???????????????????????????
 * @desc ???????????????????????????????????????????????????????????????
 * ??????????????????????????????2???????????????????????????????????????
 * @type select
 * @option ?????????
 * @value set
 * @option ????????????
 * @value reset
 * @default set
 *
 * @arg voice1
 * @text ???????????????
 * @desc ?????????????????????????????????????????????????????????????????????????????????
 * ??????????????????????????????????????????????????????????????????
 * @type file
 * @dir audio/se/
 * @default 
 *
 * @arg voice2
 * @text ???????????????(2????????????)
 * @desc atk1,atk2,atk3 ?????????????????????????????????
 * ?????????????????????
 * @type string
 * @default 
 *
 * @command skillAllReset
 * @text ??????????????????????????????
 * @desc ???????????????????????????????????????????????????????????????
 * ???????????????????????????????????????????????????
 *
 * @arg actorId
 * @text ????????????ID
 * @desc ???????????????????????????????????????????????????
 * @type actor
 * @default 1
 *
 @help
 * ???????????????????????????RPG????????????MZ???????????????????????????
 * 
 * ???????????????????????????????????????????????????????????????????????????????????????????????????
 *
 * ?????????
 * ????????????????????????????????????(????????????????????????)???ON/OFF??????????????????
 * ???????????????????????????????????????????????????????????????????????????????????????????????????????????????
 *
 * ?????????????????????
 * ?????????????????????????????????????????????????????????????????????????????????
 * filename ????????????SE??????????????????????????????????????????
 *
 * <attackVoice:filename>  ??????????????????????????????????????????????????????
 * <recoverVoice:filename>   HP??????????????????????????????????????????????????????????????????
 * <friendMagicVoice:filename>   HP??????????????????????????????????????????????????????
 *  ?????????????????????????????????????????????????????????<magicVoice:filename>???
 *  ??????????????????????????????????????????????????????????????????
 * <magicVoice:filename> ?????????????????????????????????????????????????????????????????????????????????
 * <skillVoice:filename>   ???????????????????????????????????????????????????????????????
 * <damageVoice:filename>    ???????????????????????????????????????????????????????????????
 * <defeatedVoice:filename>   ???????????????????????????????????????????????????????????????
 * <victoryVoice:filename>   ???????????????????????????????????????????????????
 *  ???????????????????????????????????????????????????????????????????????????????????????????????????????????????
 *
 * ?????????????????????????????????????????????????????????????????????????????????????????????
 * ???????????????2???????????????[SV]??????????????????????????????????????????????????????
 *
 * ??????????????????
 * ??????????????????filename ????????????????????????????????????????????????????????????????????????
 * ????????????????????????????????????????????????????????????????????????
 * <attackVoice:atk1,atk2,atk3>
 * atk1 atk2 atk3 ??????????????????????????????????????????????????????????????????
 *
 * ????????????????????????????????????$ ???????????????????????????
 * <attackVoice:atk1,atk2,$>
 * ???????????????atk1, atk2, ????????????????????????????????????
 * 
 * ??????????????????????????????????????????????????????
 * <attackVoice:atk1,atk2,atk2,$>
 * ???????????????25%???atk1???50%???atk2???25%?????????????????????????????????
 *
 * ???????????????????????????????????????????????????????????????????????????????????????????????????????????????
 *  ????????????????????????????????????????????????????????????????????????????????????????????????SE???
 *  ????????????????????????????????????????????????????????????
 * 
 * ??????????????????????????????
 * ???????????????????????????????????????????????????????????????
 * ???????????????????????????????????????????????????????????????????????????
 * ???????????????????????????????????????????????????????????????
 * ???????????????????????????????????????????????????????????????????????????
 * ???????????????????????????????????????????????????????????????????????????
 *
 * ????????????????????????
 * ???????????????????????? MIT ???????????????????????????????????????
 * ????????????????????????????????????
 * http://opensource.org/licenses/mit-license.php
 */
(() => {
  const pluginName = 'BattleVoiceMZ';

  //
  // process parameters
  //
  const parameters = PluginManager.parameters(pluginName);
  const pitch = Number(parameters['pitch'] || 100);
  const volume = Number(parameters['volume'] || 90);
  const pan = Number(parameters['pan'] || 0);
  const playSwitchId = Number(parameters['ON switch ID'] || 1);
  const strBattleVoice = parameters['Battle Voice Name at Option'] ||
    'Battle Voice';

  //
  // process plugin commands
  //
  PluginManager.registerCommand(pluginName, 'set', args => {
    const actor = $gameActors.actor(+args.actorId);
    if (actor) {
      if (actor.battleVoices == null) {
        actor.battleVoices = {};
      }
      switch (args.isSet) {
      case 'set':
        const voice1 = args.voice1;
        const voice2 = args.voice2;
        if (voice1) {
          const voice = voice2 ? voice1 + ',' + voice2 : voice1;
          actor.battleVoices[args.situation] = voice;
        } else {
          actor.battleVoices[args.situation] = null;
        }
        break;
      case 'reset':
        actor.battleVoices[args.situation] = null;
        break;
      }
    }
  });

  PluginManager.registerCommand(pluginName, 'allReset', args => {
    const actor = $gameActors.actor(+args.actorId);
    if (actor) {
      actor.battleVoices = null;
    }
  });

  PluginManager.registerCommand(pluginName, 'skillSet', args => {
    const actor = $gameActors.actor(+args.actorId);
    if (actor) {
      if (actor.skillVoices == null) {
        actor.skillVoices = {};
      }
      switch (args.isSet) {
      case 'set':
        const voice1 = args.voice1;
        const voice2 = args.voice2;
        if (voice1) {
          const voice = voice2 ? voice1 + ',' + voice2 : voice1;
          actor.skillVoices[+args.skillId] = voice;
        } else {
          actor.skillVoices[+args.skillId] = null;
        }
        break;
      case 'reset':
        actor.skillVoices[+args.skillId] = null;
        break;
      }
    }
  });

  PluginManager.registerCommand(pluginName, 'skillAllReset', args => {
    const actor = $gameActors.actor(+args.actorId);
    if (actor) {
      actor.skillVoices = null;
    }
  });

  //
  // set play options (interlock with switch)
  //
  const doesDisplaySpecialOptions = () => {
    return !SceneManager.isPreviousScene(Scene_Title);
  };

  const _Window_Options_makeCommandList =
   Window_Options.prototype.makeCommandList;
  Window_Options.prototype.makeCommandList = function() {
    if (doesDisplaySpecialOptions()) {
      this.addCommand(strBattleVoice, 'battleVoice');
    }
    _Window_Options_makeCommandList.call(this);
  };

  const _Window_Options_getConfigValue =
   Window_Options.prototype.getConfigValue;
  Window_Options.prototype.getConfigValue = function(symbol) { 
    switch (symbol) {
    case 'battleVoice':
      return $gameSwitches.value(playSwitchId);
    default:
      return _Window_Options_getConfigValue.call(this, symbol);
    }
  };

  const _Window_Options_setConfigValue =
   Window_Options.prototype.setConfigValue;
  Window_Options.prototype.setConfigValue = function(symbol, volume) {
    switch (symbol) {
    case 'battleVoice':
      return $gameSwitches.setValue(playSwitchId, volume);
    default:
      return _Window_Options_setConfigValue.call(this, symbol, volume);
    }
  };

  //
  // play actor voice
  //
  const canPlayActorVoice = () => {
    return $gameSwitches.value(playSwitchId);
  };

  const split = name => {
    if (!name) {
      return name;
    }
    const names = name.split(',');
    return names[Math.randomInt(names.length)];
  };

  const createAudioByFileName = name => {
    let audio = {};
    audio.name = name;
    audio.pitch = pitch;
    audio.volume = volume;
    audio.pan = pan
    return audio;
  };

  const playActorVoice = (actor, type) => {
    if (!canPlayActorVoice()) {
      return;
    }
    let name = '';
    const a = actor.battleVoices || {};
    const m = actor.actor().meta;
    switch(type){
      case 'attack':
        name = split(a.attack || m.attackVoice);
        break;
      case 'recover':
        name = split(a.recover || m.recoverVoice);
        break;
      case 'friendmagic':
        name = split(a.friendMagic || m.friendMagicVoice || m.magicVoice);
        break;
      case 'magic':
        name = split(a.magic || m.magicVoice);
        break;
      case 'skill':
        name = split(a.skill || m.skillVoice);
        break;
      case 'damage':
        name = split(a.damage || m.damageVoice);
        break;
      case 'dead':
        name = split(a.dead || m.defeatedVoice);
        break;
      case 'victory':
        name = split(a.victory || m.victoryVoice);
        break;
    }
    if (name && name !=="$") {
      var audio = createAudioByFileName(name);
      AudioManager.playSe(audio);
    }
  };

  const isSkillVoice = (actor, action) => {
    if (!actor.skillVoices || !action.isSkill()) {
      return false;
    }
    return !!actor.skillVoices[action._item.itemId()];
  };

  const playSkillVoice = (actor, action) => {
    if (!canPlayActorVoice()) {
      return;
    }
    const name = split(actor.skillVoices[action._item.itemId()]);
    if (name && name !=="$") {
      var audio = createAudioByFileName(name);
      AudioManager.playSe(audio);
    }
  };

  //
  // functions for call actor voice.
  //
  const _Game_Actor_performAction = Game_Actor.prototype.performAction;
  Game_Actor.prototype.performAction = function(action) {
    _Game_Actor_performAction.call(this, action);
    if (isSkillVoice(this, action)) {
      playSkillVoice(this, action);
    } else if (action.isAttack()) {
      playActorVoice(this, 'attack');
    } else if (action.isMagicSkill() && action.isHpRecover()) {
      playActorVoice(this, 'recover');
    } else if (action.isMagicSkill() && action.isForFriend()) {
      playActorVoice(this, 'friendmagic');
    } else if (action.isMagicSkill()) {
      playActorVoice(this, 'magic');
    } else if (action.isSkill() && !action.isGuard()) {
      playActorVoice(this, 'skill');
    }
  };

  const _Game_Actor_performDamage = Game_Actor.prototype.performDamage;
  Game_Actor.prototype.performDamage = function() {
    _Game_Actor_performDamage.call(this);
    playActorVoice(this, 'damage');
  };

  const _Game_Actor_performCollapse = Game_Actor.prototype.performCollapse;
  Game_Actor.prototype.performCollapse = function() {
    _Game_Actor_performCollapse.call(this);
    if ($gameParty.inBattle()) {
      playActorVoice(this, 'dead');
    }
  };

  const _BattleManager_processVictory = BattleManager.processVictory;
  BattleManager.processVictory = function() {
    const index = Math.randomInt($gameParty.aliveMembers().length);
    const actor = $gameParty.aliveMembers()[index];
    playActorVoice(actor, 'victory');
    _BattleManager_processVictory.call(this);
  };
})();
