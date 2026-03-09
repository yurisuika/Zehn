import Zehn from './../js/zehn.js';
import Options from './../js/options.js';

/* ADD USER AGENT --------------------------------------------------------------------------------------------------- */

Zehn.addUserAgent();

/* ENABLE CONFIG WITH MILLENNIUM ------------------------------------------------------------------------------------ */

Options.setOptions();

/* TOGGLE CURRENT USER CONTAINER ------------------------------------------------------------------------------------ */

Zehn.addButton('.friendsListContainer', '.friendListHeaderContainer .chatTitleBar', '#zehnToggleUser', false, false, (root, target, button) => {
  const btnUser = document.getElementById('zehnToggleUser');
  if (btnUser) {
    const user = document.querySelector(`.currentUserContainer`);
    const voice = document.querySelector(`.friendListHeaderContainer .activeVoiceControls`);

    if (btnUser.classList.contains(`zehnToggled`)) {
      user.style.setProperty('transform', 'scaleY(0)', 'important');
      user.style.setProperty('min-height', '0px', 'important');
      user.style.setProperty('height', '0px', 'important');
      if (voice) {
        voice.style.setProperty('transform', 'scaleY(0)', 'important');
        voice.style.setProperty('min-height', '0px', 'important');
        voice.style.setProperty('height', '0px', 'important');
      }
    }
    else {
      user.style.setProperty('transform', 'none', 'important');
      user.style.setProperty('min-height', '48px', 'important');
      user.style.setProperty('height', '48px', 'important');
      if (voice) {
        voice.style.setProperty('transform', 'none', 'important');
        voice.style.setProperty('min-height', '48px', 'important');
        voice.style.setProperty('height', '48px', 'important');
      }
    }

    btnUser.classList.toggle('zehnToggled');
  }
});

/* ADD ICON ELEMENTS TO GROUP CHAT SETTINGS PAGELIST ---------------------------------------------------------------- */

Zehn.waitAndCallback('.LegacyPopup', '._2YV0m3IRCNOoUV9YhJNFnV', (root, target) => {
  if (target.children.length == 0) {
    const title = document.createElement('div');
    title.classList.add('zehnListTitle');
    target.append(title);
    title.textContent = target.childNodes[0].textContent;
    target.childNodes[0].remove();

    const icon = document.createElement('div');
    icon.classList.add('zehnListIcon');
    target.prepend(icon);
  }
});

/* TOGGLE GROUP CHAT SETTINGS BUTTONS ------------------------------------------------------------------------------- */

Zehn.checkButtonToggle('.chatDialogs', '.MultiUserChat', '.zehnToggleSettingsButtons', 'zehnSettingsButtonsOpened');
Zehn.addButton('.MultiUserChat', '.chatRoomOptions', '.zehnToggleSettingsButtons', true, false, (root, target, button) => {
  Zehn.addRootClassOnToggle(root, target, button, 'zehnSettingsButtonsOpened');
});

/* TOGGLE GROUP CHAT CHANNEL PAGELIST ------------------------------------------------------------------------------- */

Zehn.checkButtonToggle('.chatDialogs', '.MultiUserChat', '.zehnToggleChannelList', 'zehnChannelListOpened');
Zehn.addButton('.MultiUserChat', '.chatRoomOptions', '.zehnToggleChannelList', true, false, (root, target, button) => {
  Zehn.addRootClassOnToggle(root, target, button, 'zehnChannelListOpened');
});

/* TOGGLE MEMBER LIST STATUS ---------------------------------------------------------------------------------------- */

Zehn.waitAndCallback('.multiChatDialog', '.MultiUserChat', (root, target) => {
  const toggle = target.querySelector('.MemberListOption.ToggleMemberListView');
  const header = target.querySelector('.chatRoomOptions');
  if (header && toggle) {
    header.append(toggle);
  }
});

/* MOVE GROUP CHAT BROADCAST BUTTON INTO HEADER --------------------------------------------------------------------- */

Zehn.movePrepend('.MultiUserChat', '.chatRoomOptions', [
  '.doGxCBJrGimabHm365bOV' // YULE LOG / BROADCAST
]);

/* NOTIFICATION SETTINGS MOVE INTO TITLEBAR ------------------------------------------------------------------------- */

Zehn.moveAppend('.LegacyPopup', '.ChatRoomNotificationSettingsDialog > .DialogContent_InnerWidth > form > .DialogHeader', [
  '.ChatRoomNotificationSettingsDialog > .DialogContent_InnerWidth > form > .DialogLabel._DialogLayout' // CHAT ROOM NAME
]);

/* MOVE CURRENT USER CONTAINER TO FOOTER IF IT DIDN'T BREAK --------------------------------------------------------- */

// Zehn.movePrepend('.friendsListContainer', '.friendListFooter', [
//   '.currentUserContainer' // CURRENT USER
// ]);

/* MOVE CHAT EMBED BUTTONS ------------------------------------------------------------------------------------------ */

Zehn.moveAppend('.msg', '.BBCodeResizableComponent', [
  '.Panel .chatImageURL' // POP OUT VIDEO
]);