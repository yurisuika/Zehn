import Zehn from './../js/zehn.js';

Zehn.addUserAgent();

function addButtonUser() {
  var btn = document.createElement('button');
  btn.classList.add('ZehnButton');
  btn.id = 'toggleUser';
  btn.type = 'button';
  btn.value = 'open';
  btn.name = 'button';
  btn.onclick = function () {
    var btnUser = document.getElementById('toggleUser');
    var user = document.querySelector(`.currentUserContainer`);
    var voice = document.querySelector(`.activeVoiceControls`);
    if (btnUser.value == 'close') {
      btnUser.value = 'open';
      user.style.setProperty('transform', 'scaleY(0)', 'important');
      user.style.setProperty('min-height', '0px', 'important');
      user.style.setProperty('height', '0px', 'important');
      if (voice != null) {
        voice.style.setProperty('transform', 'scaleY(0)', 'important');
        voice.style.setProperty('min-height', '0px', 'important');
        voice.style.setProperty('height', '0px', 'important');
      }
    }
    else if (btnUser.value = 'open') {
      btnUser.value = 'close';
      user.style.setProperty('transform', 'none', 'important');
      user.style.setProperty('min-height', '48px', 'important');
      user.style.setProperty('height', '48px', 'important');
      if (voice != null) {
        voice.style.setProperty('transform', 'none', 'important');
        voice.style.setProperty('min-height', '32px', 'important');
        voice.style.setProperty('height', '32px', 'important');
      }
    }
  };
  document.querySelector('.chatTitleBar').prepend(btn);
  var icon = document.createElement('div');
  icon.id = 'toggleUserIcon';
  document.getElementById('toggleUser').append(icon);
}

Zehn.createElement('.friendListHeaderContainer .chatTitleBar', '.ZehnButton', addButtonUser);

Zehn.movePrepend('.doGxCBJrGimabHm365bOV', '.chatRoomOptions', [
  '.doGxCBJrGimabHm365bOV', // YULE LOG
]);
// Zehn.movePrepend('.BroadcastChatExpander', '.chatRoomOptions', [
//   '.BroadcastChatExpander ' // CHAT EXPANDER
// ]);
Zehn.moveAppend('.ChatRoomNotificationSettingsDialog > .DialogContent_InnerWidth > form > .DialogHeader', '.ChatRoomNotificationSettingsDialog > .DialogContent_InnerWidth > form > .DialogHeader', [
  '.ChatRoomNotificationSettingsDialog > .DialogContent_InnerWidth > form > .DialogLabel._DialogLayout' // FORGOT WHAT THIS WAS
]);
// Zehn.movePrepend('.currentUserContainer', '.chatTitleBar .title-area-children', [
//   '.currentUserContainer' // CURRENT USER
// ]);
Zehn.moveAppend('.tabSearchTransitionGroup', '.socialTabContainer', [
  '.tabSearchTransitionGroup', // FRIENDS SEARCH
]);