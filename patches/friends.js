import Zehn from './../js/zehn.js';
import Options from './../js/options.js';

Zehn.addUserAgent();

Options.setOptions();

function toggleUser() {
  var btnUser = document.getElementById('toggleUser');

  if (btnUser != null) {
    var user = document.querySelector(`.currentUserContainer`);
    var voice = document.querySelector(`.activeVoiceControls`);

    if (btnUser.classList.contains(`zehnToggled`)) {
      user.style.setProperty('transform', 'scaleY(0)', 'important');
      user.style.setProperty('min-height', '0px', 'important');
      user.style.setProperty('height', '0px', 'important');
      if (voice != null) {
        voice.style.setProperty('transform', 'scaleY(0)', 'important');
        voice.style.setProperty('min-height', '0px', 'important');
        voice.style.setProperty('height', '0px', 'important');
      }
    }
    else {
      user.style.setProperty('transform', 'none', 'important');
      user.style.setProperty('min-height', '48px', 'important');
      user.style.setProperty('height', '48px', 'important');
      if (voice != null) {
        voice.style.setProperty('transform', 'none', 'important');
        voice.style.setProperty('min-height', '48px', 'important');
        voice.style.setProperty('height', '48px', 'important');
      }
    }

    btnUser.classList.toggle('zehnToggled');
  }
};

function addButtonUser(target) {
  Zehn.addButton(target, 'toggleUser', 'toggleUserIcon', false, toggleUser);
};

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
// Zehn.moveAppend('.tabSearchTransitionGroup', '.socialTabContainer', [
//   '.tabSearchTransitionGroup', // FRIENDS SEARCH
// ]);