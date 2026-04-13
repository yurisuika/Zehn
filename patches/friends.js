import Zehn from './../js/zehn.js';
import Options from './../js/options.js';

/* ADD USER AGENT --------------------------------------------------------------------------------------------------- */

Zehn.addUserAgent();

/* ENABLE CONFIG WITH MILLENNIUM ------------------------------------------------------------------------------------ */

Options.setOptions();

/* TOGGLE HEADER CONTAINERS ----------------------------------------------------------------------------------------- */

Zehn.addButton('.friendsListContainer', '.friendListHeaderContainer .chatTitleBar', '#zehnToggleFriendsHeader', ['zehnButton'], false, false, (root, target, button) => {
  Zehn.addRootClassOnToggle(root, target, button, 'zehnFriendsHeaderClosed');
});

/* TOGGLE CURRENT USER CONTAINER ------------------------------------------------------------------------------------ */

Zehn.checkTargetToggle('.friendsTabButtonsContainer', '#zehnToggleUser', 'zehnCurrentUserOpened');
Zehn.addButton('.friendsListContainer', '.friendsTabButtonsContainer', '#zehnToggleUser', ['zehnButton', 'zehnReveal'], true, false, (root, target, button) => {
  Zehn.addRootClassOnToggle(root, target, button, 'zehnCurrentUserOpened');
});

/* ADD ICON ELEMENTS TO GROUP CHAT SETTINGS PAGELIST ---------------------------------------------------------------- */

Zehn.observeRootForCallback('.LegacyPopup', '._2YV0m3IRCNOoUV9YhJNFnV', (root, target) => {
  if (target.children.length == 0) {
    const container = document.createElement('div');
    container.classList.add('zehnListContainer');
    target.append(container);

    const title = document.createElement('div');
    title.classList.add('zehnListTitle');
    container.append(title);
    title.textContent = target.childNodes[0].textContent;
    target.childNodes[0].remove();

    const icon = document.createElement('div');
    icon.classList.add('zehnListIcon');
    container.prepend(icon);
  }
});

/* TOGGLE GROUP CHAT SETTINGS BUTTONS ------------------------------------------------------------------------------- */

Zehn.checkButtonToggle('.MultiUserChat', '.zehnToggleSettingsButtons', 'zehnSettingsButtonsOpened');
Zehn.addButton('.MultiUserChat', '.chatRoomOptions', '.zehnToggleSettingsButtons', ['zehnButton', 'zehnReveal'], true, false, (root, target, button) => {
  Zehn.addRootClassOnToggle(root, target, button, 'zehnSettingsButtonsOpened');
});

/* TOGGLE GROUP CHAT CHANNEL PAGELIST ------------------------------------------------------------------------------- */

Zehn.checkButtonToggle('.MultiUserChat', '.zehnToggleChannelList', 'zehnChannelListOpened');
Zehn.addButton('.MultiUserChat', '.chatRoomOptions', '.zehnToggleChannelList', ['zehnButton', 'zehnReveal'], true, false, (root, target, button) => {
  Zehn.addRootClassOnToggle(root, target, button, 'zehnChannelListOpened');
});

/* TOGGLE MEMBER LIST STATUS ---------------------------------------------------------------------------------------- */

Zehn.moveAppend('.MultiUserChat', '.chatRoomOptions', [
  '.MemberListOption.ToggleMemberListView'
]);

/* MOVE GROUP CHAT BROADCAST BUTTON INTO HEADER --------------------------------------------------------------------- */

Zehn.movePrepend('.MultiUserChat', '.chatRoomOptions', [
  '.doGxCBJrGimabHm365bOV' // YULE LOG / BROADCAST
]);

/* NOTIFICATION SETTINGS MOVE INTO TITLEBAR ------------------------------------------------------------------------- */

Zehn.moveAppend('.LegacyPopup', '.ChatRoomNotificationSettingsDialog > .DialogContent_InnerWidth > form > .DialogHeader', [
  '.ChatRoomNotificationSettingsDialog > .DialogContent_InnerWidth > form > .DialogLabel._DialogLayout' // CHAT ROOM NAME
]);

/* MOVE CHAT EMBED BUTTONS ------------------------------------------------------------------------------------------ */

Zehn.moveAppend('.msg', '.BBCodeResizableComponent.chatVideoContainer', [
  '.Panel > .chatImageURL' // POP OUT VIDEO
]);
Zehn.removeDuplicatedElement('.msg', '.BBCodeResizableComponent.chatVideoContainer', '.chatImageURL', 0);

/* REVEAL FRRIENDS -------------------------------------------------------------------------------------------------- */

Zehn.addRevealClass('.friendsTabButtonsContainer', [
  '.searchIconButton', // SEARCH
  '.friendRequestButton', // REQUESTS
  '.addFriendButton' // ADD
]);

Zehn.reveal('.friendsTabButtonsContainer'); // FRIENDS CONTROLS

/* REVEAL CHAT GROUP HEADER ----------------------------------------------------------------------------------------- */

Zehn.addRevealClass('.chatRoomHeader', [
  '.doGxCBJrGimabHm365bOV', // STREAM
  '.chatRoomButton.ManageNotifications', // NOTIFICATION SETTINGS
  '.chatRoomButton.InviteToGroupChat', // INVITE TO GROUP CHAT
  '.chatRoomButton.GroupChatSettings', // GROUP CHAT SETTINGS
  '.MemberListOption.ToggleMemberListView' // TOGGLE MEMBER LIST
]);

Zehn.reveal('.chatRoomHeader'); // CHAT HEADER

/* REVEAL CHAT ENTRY ------------------------------------------------------------------------------------------------ */

// Zehn.addRevealClass('.chatEntry', [
//   '._3Ule3rolhZJiBN4yNNtk1s .RVIs84dAE6wHcjH9tkinc', // ENTER
//   '.RVIs84dAE6wHcjH9tkinc.Aupswi7-c-w3XwNO5cp2i', // EMOTICON
//   '.RVIs84dAE6wHcjH9tkinc._3zOBeq5W4cNK3lRz_7aroW', // EMBED
//   '.ChatMessageEntryVoice .VoiceToggle' // VOICE
// ]);

// Zehn.addRevealClassOnMutation('.chatEntry', [
//   '._3Ule3rolhZJiBN4yNNtk1s .RVIs84dAE6wHcjH9tkinc' // ENTER
// ]);

// Zehn.reveal('.chatEntry'); // CHAT BAR

/* REVEAL CHAT CHANNEL LIST ----------------------------------------------------------------------------------------- */

Zehn.addRevealClass('.chatRoomGroupNavColumn', [
  '.chatRoomGroupNavCollapseExpand' // PIN
]);

Zehn.addRevealClass('.chatRoomGroupNavColumn', [
  '.chatRoomTextChannel', // TEXT
  '.chatRoomVoiceChannel' // VOICE
], true);

Zehn.addRevealClassOnMutation('.chatRoomGroupNavColumn', [
  '.chatRoomTextChannel', // TEXT
  '.chatRoomVoiceChannel' // VOICE
], true);

Zehn.reveal('.chatRoomGroupNavColumn'); // PAGELIST