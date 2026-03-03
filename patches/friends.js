import Zehn from './../js/zehn.js';
import Options from './../js/options.js';

Zehn.addUserAgent();

Options.setOptions();

function toggleUser() {
  var btnUser = document.getElementById('toggleUser');

  if (btnUser != null) {
    var user = document.querySelector(`.currentUserContainer`);
    var voice = document.querySelector(`.activeVoiceControls`);

    if (btnUser.classList.contains(`ZehnToggled`)) {
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

    btnUser.classList.toggle('ZehnToggled');
  }
};

function addButtonUser(target) {
  Zehn.addButton(target, 'toggleUser', 'toggleUserIcon', false, toggleUser);
};

Zehn.createElement('.friendListHeaderContainer .chatTitleBar', '.ZehnButton', addButtonUser);

function reworkGroupChatSettingsPageList() {
  const elements = document.querySelectorAll('._2YV0m3IRCNOoUV9YhJNFnV');
  elements.forEach((element) => {
    if (element.children.length == 0) {
      var title = document.createElement('div');
      title.classList.add('ZehnListTitle');
      element.append(title);
      title.textContent = element.childNodes[0].textContent;
      element.childNodes[0].remove();

      var icon = document.createElement('div');
      icon.classList.add('ZehnListIcon');
      element.prepend(icon);
    }
  });
};

Zehn.waitAndObserve('._2YV0m3IRCNOoUV9YhJNFnV', reworkGroupChatSettingsPageList);

Zehn.movePrepend('.doGxCBJrGimabHm365bOV', '.chatRoomOptions', [
  '.doGxCBJrGimabHm365bOV' // YULE LOG
]);
// Zehn.movePrepend('.BroadcastChatExpander', '.chatRoomOptions', [
//   '.BroadcastChatExpander ' // CHAT EXPANDER
// ]);
Zehn.moveAppend('.ChatRoomNotificationSettingsDialog > .DialogContent_InnerWidth > form > .DialogHeader', '.ChatRoomNotificationSettingsDialog > .DialogContent_InnerWidth > form > .DialogHeader', [
  '.ChatRoomNotificationSettingsDialog > .DialogContent_InnerWidth > form > .DialogLabel._DialogLayout' // FORGOT WHAT THIS WAS
]);
// Zehn.movePrepend('.currentUserContainer', '.friendListFooter', [
//   '.currentUserContainer' // CURRENT USER
// ]);
// Zehn.moveAppend('.tabSearchTransitionGroup', '.socialTabContainer', [
//   '.tabSearchTransitionGroup' // FRIENDS SEARCH
// ]);