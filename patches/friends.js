import Zehn from './../js/zehn.js';
import Options from './../js/options.js';

/* ADD USER AGENT --------------------------------------------------------------------------------------------------- */

Zehn.addUserAgent();

/* ENABLE CONFIG WITHOUT MILLENNIUM --------------------------------------------------------------------------------- */

Options.setOptions();

/* SET SCROLLBAR GLYPH COLORS --------------------------------------------------------------------------------------- */

Zehn.setGlyphColor();

/* REVEAL CONTEXT --------------------------------------------------------------------------------------------------- */

Zehn.addRevealClass('.friendsui-container ._2EstNjFIIZm_WUSKm5Wt7n', [
  '._1n7Wloe5jZ6fSuvV18NNWI.contextMenuItem:not(.contextMenuUnselectable)' // CONTEXT ENTRY
]);

Zehn.revealSelf('._1n7Wloe5jZ6fSuvV18NNWI.contextMenuItem.zehnReveal');

/* TOGGLE CLASSES BASED ON WHAT HEADER CONTENT IS OPEN -------------------------------------------------------------- */

Zehn.toggleClassWithPresence('.chat_main', '.friendsListContainer', '.TabSearchActive', 'zehnSearchOpened');

/* TOGGLE HEADER CONTAINERS ----------------------------------------------------------------------------------------- */

Zehn.checkTargetToggle('.friendListHeaderContainer .chatTitleBar', '#zehnToggleFriendsHeader', 'zehnFriendsHeaderClosed');
Zehn.createButton('.friendsListContainer', '.friendListHeaderContainer .chatTitleBar', ['#zehnToggleFriendsHeader', '.zehnButton'], (root, target, button) => {
  Zehn.addRootClassOnToggle(root, target, button, 'zehnFriendsHeaderClosed');
}, false);

/* TOGGLE CURRENT USER CONTAINER ------------------------------------------------------------------------------------ */

Zehn.checkTargetToggle('.friendsTabButtonsContainer', '#zehnToggleUser', 'zehnCurrentUserOpened');
Zehn.createButton('.friendsListContainer', '.friendsTabButtonsContainer', ['#zehnToggleUser', '.zehnButton', '.zehnReveal'], (root, target, button) => {
  Zehn.addRootClassOnToggle(root, target, button, 'zehnCurrentUserOpened');
});

/* SET VARIABLE FOR HEADER HEIGHT ----------------------------------------------------------------------------------- */

Zehn.storeTargetHeightAsVariable('.friendsui-container', '.quickAccessFriends', '--zehn-size-friends-quickaccess-height');

/* ADD ICON ELEMENTS TO GROUP CHAT SETTINGS PAGELIST ---------------------------------------------------------------- */

Zehn.createIconTitleContainer('.LegacyPopup', '._2YV0m3IRCNOoUV9YhJNFnV');

/* TOGGLE GROUP CHAT SETTINGS BUTTONS ------------------------------------------------------------------------------- */

Zehn.checkButtonToggle('.MultiUserChat', '.zehnToggleSettingsButtons', 'zehnSettingsButtonsOpened');
Zehn.createButton('.MultiUserChat', '.chatRoomOptions', ['.zehnToggleSettingsButtons', '.zehnButton', '.zehnReveal'], (root, target, button) => {
  Zehn.addRootClassOnToggle(root, target, button, 'zehnSettingsButtonsOpened');
});

/* TOGGLE GROUP CHAT CHANNEL PAGELIST ------------------------------------------------------------------------------- */

Zehn.checkButtonToggle('.MultiUserChat', '.zehnToggleChannelList', 'zehnChannelListOpened');
Zehn.createButton('.MultiUserChat', '.chatRoomOptions', ['.zehnToggleChannelList', '.zehnButton', '.zehnReveal'], (root, target, button) => {
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

/* REVEAL FRRIENDS CONTROLS ----------------------------------------------------------------------------------------- */

Zehn.addRevealClass('.friendsTabButtonsContainer', [
  '.searchIconButton', // SEARCH
  '.friendRequestButton', // REQUESTS
  '.addFriendButton' // ADD
]);

// Zehn.revealInner('.friendsTabButtonsContainer');
Zehn.revealInner('.socialTabSearchContainer');

/* REVEAL FRIENDS LIST ---------------------------------------------------------------------------------------------- */

Zehn.addRevealClass('.FriendsListContent', [
  '.friendGroup>.groupName', // GAME GROUP
  '.groupHeaderContainer', // FRIEND GROUP
  '.friendsListSectionTitle.chatSectionTitle', // GROUP CHATS TOGGLE
  '.chatRoomListContainer .ChatRoomListGroupItem', // GROUP CHAT
  '.friend' // FRIEND
], [
  'zehnRevealBackgroundOnly'
]);

Zehn.revealSelf('.FriendsListContent .friendGroup>.groupName');
Zehn.revealSelf('.FriendsListContent .groupHeaderContainer');
Zehn.revealSelf('.FriendsListContent .friendsListSectionTitle.chatSectionTitle');
Zehn.revealSelf('.FriendsListContent .chatRoomListContainer .ChatRoomListGroupItem');
Zehn.revealSelf('.FriendsListContent .friend');

/* REVEAL CHAT GROUP HEADER ----------------------------------------------------------------------------------------- */

Zehn.addRevealClass('.chatRoomHeader', [
  '.doGxCBJrGimabHm365bOV', // STREAM
  '.chatRoomButton.ManageNotifications', // NOTIFICATION SETTINGS
  '.chatRoomButton.InviteToGroupChat', // INVITE TO GROUP CHAT
  '.chatRoomButton.GroupChatSettings', // GROUP CHAT SETTINGS
  '.MemberListOption.ToggleMemberListView' // TOGGLE MEMBER LIST
]);

Zehn.revealInner('.chatRoomHeader');
// Zehn.revealInner('.chatDialogs');

/* REVEAL CHAT ENTRY ------------------------------------------------------------------------------------------------ */

// Zehn.addRevealClass('.chatEntry', [
//   '._3Ule3rolhZJiBN4yNNtk1s .RVIs84dAE6wHcjH9tkinc', // ENTER
//   '.RVIs84dAE6wHcjH9tkinc.Aupswi7-c-w3XwNO5cp2i', // EMOTICON
//   '.RVIs84dAE6wHcjH9tkinc._3zOBeq5W4cNK3lRz_7aroW', // EMBED
//   '.ChatMessageEntryVoice .VoiceToggle' // VOICE
// ]);

// Zehn.revealInner('.chatEntry');

/* REVEAL CHAT CHANNEL LIST ----------------------------------------------------------------------------------------- */

Zehn.addRevealClass('.chatRoomGroupNavColumn', [
  '.chatRoomGroupNavCollapseExpand' // PIN
]);
Zehn.addRevealClass('.chatRoomGroupNavColumn', [
  '.chatRoomTextChannel', // TEXT
  '.chatRoomVoiceChannel' // VOICE
], [
  'zehnRevealBackgroundOnly'
]);

Zehn.revealInner('.chatRoomGroupNavColumn');

/* REVEAL CHAT TABS ------------------------------------------------------------------------------------------------- */

Zehn.addRevealClass('.titleBarContainer.ChatTabs', [
  '._3f1rJf0BU79ub9YR2KihaT' // TAB CONTAINER
], [
  'zehnRevealBackgroundOnly'
]);

Zehn.revealInner('.titleBarContainer.ChatTabs');