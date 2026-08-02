import Options from './../js/options.js';

/* ENABLE CONFIG WITHOUT MILLENNIUM --------------------------------------------------------------------------------- */

Options.applyOptions();










import Zehn from './../js/zehn.js';

/* ADD USER AGENT --------------------------------------------------------------------------------------------------- */

Zehn.addUserAgent();

/* CREATE LOCALIZED ON/OFF LABELS FOR SWITCHES ---------------------------------------------------------------------- */

Zehn.createSwitchLabels();

/* SET SCROLLBAR GLYPH COLORS --------------------------------------------------------------------------------------- */

Zehn.setGlyphColor();

/* CREATE SPINNER --------------------------------------------------------------------------------------------------- */

Zehn.createSpinner('html', '.VicgWmz2sj_UUd0XKXvFQ');
Zehn.createSpinner('html', '._3CN5DkgNMvdtT9fJhNOj_v');
Zehn.createSpinner('html', '._2wAKy-0ZkO_vhbiQCP9MgE');

/* REVEAL CONTEXT --------------------------------------------------------------------------------------------------- */

Zehn.addRevealClass('.friendsui-container ._2EstNjFIIZm_WUSKm5Wt7n', [
  '._1n7Wloe5jZ6fSuvV18NNWI.contextMenuItem:not(.contextMenuUnselectable, .disabled)' // CONTEXT ENTRY
]);
Zehn.addRevealClass('.friendsui-container ._10UNx2XXsFmsHb86RCyofu', [
  '._2Qsf4rHzNzK6Z3UYN7tOFx' // VIDEO
]);

Zehn.revealSelf('._2EstNjFIIZm_WUSKm5Wt7n ._1n7Wloe5jZ6fSuvV18NNWI.contextMenuItem.zehnReveal');
Zehn.revealSelf('._10UNx2XXsFmsHb86RCyofu ._2Qsf4rHzNzK6Z3UYN7tOFx.zehnReveal');

/* REVEAL BROADCAST CONTEXT MENU ------------------------------------------------------------------------------------ */

Zehn.addRevealClass('.STV_BroadcastSettingsPanel', [
  '._1n7Wloe5jZ6fSuvV18NNWI.contextMenuItem:not(.contextMenuUnselectable, .disabled)' // CONTEXT ENTRY
]);

Zehn.revealSelf('.STV_BroadcastSettingsPanel ._1n7Wloe5jZ6fSuvV18NNWI.contextMenuItem.zehnReveal');

/* STORE HEIGHT OF HEADER ------------------------------------------------------------------------------------------- */

Zehn.storeTargetHeightAsVariable('.friendsListContainer', '.friendListHeaderContainer', '--friends-header-height');

/* TOGGLE CLASSES BASED ON WHAT HEADER CONTENT IS OPEN -------------------------------------------------------------- */

Zehn.toggleClassWithPresence('.chat_main', '.friendsListContainer', '.TabSearchActive', 'zehnSearchOpened');

/* TOGGLE HEADER CONTAINERS ----------------------------------------------------------------------------------------- */

Zehn.checkTargetToggle('.friendListHeaderContainer .chatTitleBar', '#zehnToggleFriendsHeader', 'zehnFriendsHeaderClosed');
Zehn.createButton('.friendsListContainer', '.friendListHeaderContainer .chatTitleBar', ['#zehnToggleFriendsHeader', '.zehnButton'], (root, target, button) => {
  Zehn.addRootClassOnToggle(root, target, button, 'zehnFriendsHeaderClosed');
}, false);

/* TOGGLE CURRENT USER CONTAINER ------------------------------------------------------------------------------------ */

Zehn.checkTargetToggle('.friendsTabButtonsContainer', '#zehnToggleUser', 'zehnUserOpened');
Zehn.createButton('.friendsListContainer', '.friendsTabButtonsContainer', ['#zehnToggleUser', '.zehnButton'], (root, target, button) => {
  Zehn.addRootClassOnToggle(root, target, button, 'zehnUserOpened');
});

/* MOVE CURRENT USER INTO VOICE CONTROLS WRAPPER -------------------------------------------------------------------- */

Zehn.moveAppend('.friendlist', '.friendListHeaderContainer>div:not([class])', [
  '.currentUserContainer' // CURRENT USER
]);

/* MOVE SORT BY INTO GROUP HEADER ----------------------------------------------------------------------------------- */

Zehn.moveAppend('.chat_main', '.friendGroup.offlineFriends .groupHeaderContainer .groupName', [
  '.friendGroup.offlineFriends .groupHeaderContainer .SortByRecent' // SORT BY BUTTON
]);

/* WRAP ADD FRIENDS BUTTON ------------------------------------------------------------------------------------------ */

Zehn.createContainer('.MultiUserChat', '.inviteAnotherFriendButton', ['.zehnAddFriendWrapper']);

/* CREATE FRIENDS TABLIST ------------------------------------------------------------------------------------------- */

Zehn.createAdjacentElement('.friendsListContainer', '.socialTabSearchContainer', ['.zehnFriendsTablist'], false);

Zehn.findRootsAndTargets('.friendsListContainer', '.friendlist', (root, target) => {
  target.id = 'zehnFriendsDisplayed';
});

function toggleList(root, target, button) {
  const btnFriends = target.querySelector('.zehnFriendsTabFriends');
  const btnChats = target.querySelector('.zehnFriendsTabChats');
  const buttons = [btnFriends, btnChats];

  if (btnFriends && btnChats) {
    const container = root.querySelector('.friendlist');
    const friends = document.querySelector('.friendlistListContainer');
    const chats = document.querySelector('.FriendsListChatSection');
    const lists = [friends, chats];

    lists.forEach((list) => {
      if (button == btnFriends) {
        if (list && (list == friends)) {
          list.classList.add('zehnDisplayed');
          container.id = 'zehnFriendsDisplayed';
        } else if (list) {
          list.classList.remove('zehnDisplayed');
        }
      } else if (button == btnChats) {
        if (list && (list == chats)) {
          list.classList.add('zehnDisplayed');
          container.id = 'zehnChatsDisplayed';
        } else if (list) {
          list.classList.remove('zehnDisplayed');
        }
      }
    });

    buttons.forEach((element) => {
      if (element == button) {
        element.classList.add('zehnToggled');
      } else {
        element.classList.remove('zehnToggled');
      }
    });
  }
};

let localFriends = await Zehn.localize(document.documentElement.lang, "Label_Friends");
Zehn.checkButtonToggle('.friendsListContainer', '.zehnFriendsTabFriends', 'zehnFriendsTablistFriendsOpened');
Zehn.createTextButton('.friendsListContainer', '.zehnFriendsTablist', ['.zehnFriendsTabFriends', '.zehnToggled'], localFriends, toggleList);

let localChats = await Zehn.localize(document.documentElement.lang, "Label_Chats");
Zehn.checkButtonToggle('.friendsListContainer', '.zehnFriendsTabChats', 'zehnFriendsTablistChatsOpened');
Zehn.createTextButton('.friendsListContainer', '.zehnFriendsTablist', ['.zehnFriendsTabChats'], localChats, toggleList);

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
  '.doGxCBJrGimabHm365bOV' // YULE LOG
]);
Zehn.createIconContainer('.MultiUserChat', '.broadcastInfoContainer .thumbnail', ['.zehnBroadcastPlaceholderWrapper']);
Zehn.createIconContainer('.MultiUserChat', '.doGxCBJrGimabHm365bOV', ['.zehnBroadcastPreviewWrapper']);

/* NOTIFICATION SETTINGS MOVE INTO TITLEBAR ------------------------------------------------------------------------- */

Zehn.moveAppend('.LegacyPopup', '.ChatRoomNotificationSettingsDialog > .DialogContent_InnerWidth > form > .DialogHeader', [
  '.ChatRoomNotificationSettingsDialog > .DialogContent_InnerWidth > form > .DialogLabel._DialogLayout' // CHAT ROOM NAME
]);

/* WRAP POPOUT SVG -------------------------------------------------------------------------------------------------- */

Zehn.createContainer('.msg', '.chatImageURL', ['.zehnEmbedLinkWrapper']);

/* WRAP EMOTICON ADD SVG -------------------------------------------------------------------------------------------- */

Zehn.createContainer('.msg', '._2FJUPOjT7afeB0125mqdQt', ['.zehnAddEmoticon']);

/* REVEAL FRIENDS --------------------------------------------------------------------------------------------------- */

Zehn.addRevealClass('.friendsTabButtonsContainer', [
  '.searchIconButton', // SEARCH
  '.friendRequestButton', // REQUESTS
  '.addFriendButton', // ADD
  '#zehnToggleUser' // CURRENT USER TOGGLE
]);

Zehn.addRevealClass('.FriendsListContent', [
  '.friendGroup>.groupName', // GAME GROUP
  '.groupHeaderContainer', // FRIEND GROUP
  '.friendsListSectionTitle.chatSectionTitle', // GROUP CHATS TOGGLE
  '.chatRoomListContainer .ChatRoomListGroupItem', // GROUP CHAT
  '.friendCategoryContainer>.friend', // FRIEND
  '.unreadFriend>.friend', // FRIEND
  '.friendsContainer>.friend', // GROUPED FRIEND
  '.chatRoomVoiceChannel' // VOICE CHANNEL
], [
  'zehnRevealBackgroundOnly'
]);

Zehn.revealInner('.friendlist');

/* REVEAL CHAT TABS ------------------------------------------------------------------------------------------------- */

Zehn.addRevealClass('.titleBarContainer.ChatTabs', [
  '._3f1rJf0BU79ub9YR2KihaT' // CHAT TAB CONTAINER
], [
  'zehnRevealBackgroundOnly'
]);

Zehn.revealInner('.ChatTabs');

/* REVEAL CHAT ------------------------------------------------------------------------------------------------------ */

Zehn.addRevealClass('.chatRoomHeader', [
  '.broadcastInfoContainer .thumbnail', // STREAM
  '.doGxCBJrGimabHm365bOV', // STREAM YULE
  '.chatRoomButton.ManageNotifications', // NOTIFICATION SETTINGS
  '.chatRoomButton.InviteToGroupChat', // INVITE TO GROUP CHAT
  '.chatRoomButton.GroupChatSettings', // GROUP CHAT SETTINGS
  '.MemberListOption.ToggleMemberListView' // TOGGLE MEMBER LIST
]);

Zehn.addRevealClass('.chatRoomGroupNavColumn', [
  '.chatRoomGroupNavCollapseExpand' // CHATLIST PIN BUTTON
]);

Zehn.addRevealClass('.chatRoomGroupNavColumn', [
  '.chatRoomTextChannelsGroup>.chatRoomTextChannel', // TEXT
  '.chatRoomVoiceChannelNameContainer' // VOICE
], [
  'zehnRevealBackgroundOnly'
]);

Zehn.revealInner('.chatWindow');