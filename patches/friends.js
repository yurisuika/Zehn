import Zehn from './../js/zehn.js';
import Options from './../js/options.js';

/* ADD USER AGENT --------------------------------------------------------------------------------------------------- */

Zehn.addUserAgent();

/* ENABLE CONFIG WITH MILLENNIUM ------------------------------------------------------------------------------------ */

Options.setOptions();

/* REVEAL CONTEXT --------------------------------------------------------------------------------------------------- */

Zehn.addRevealClass('.friendsui-container ._2EstNjFIIZm_WUSKm5Wt7n', [
  '._1n7Wloe5jZ6fSuvV18NNWI.contextMenuItem:not(.contextMenuUnselectable)' // CONTEXT ENTRY
]);

Zehn.addRevealClassOnMutation('.friendsui-container ._2EstNjFIIZm_WUSKm5Wt7n', [
  '._1n7Wloe5jZ6fSuvV18NNWI.contextMenuItem:not(.contextMenuUnselectable)' // CONTEXT ENTRY
]);

Zehn.revealSelf('._1n7Wloe5jZ6fSuvV18NNWI.contextMenuItem.zehnReveal');

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

Zehn.createIconTitleContainer('.LegacyPopup', '._2YV0m3IRCNOoUV9YhJNFnV');

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

Zehn.revealInner('.friendsTabButtonsContainer');

/* REVEAL CHAT GROUP HEADER ----------------------------------------------------------------------------------------- */

Zehn.addRevealClass('.chatRoomHeader', [
  '.doGxCBJrGimabHm365bOV', // STREAM
  '.chatRoomButton.ManageNotifications', // NOTIFICATION SETTINGS
  '.chatRoomButton.InviteToGroupChat', // INVITE TO GROUP CHAT
  '.chatRoomButton.GroupChatSettings', // GROUP CHAT SETTINGS
  '.MemberListOption.ToggleMemberListView' // TOGGLE MEMBER LIST
]);

Zehn.revealInner('.chatRoomHeader');

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

// Zehn.revealChildren('.chatEntry');

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

Zehn.revealInner('.chatRoomGroupNavColumn');