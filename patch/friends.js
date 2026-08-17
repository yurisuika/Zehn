import OPTIONS from './../js/options.js';

/* ENABLE CONFIG WITHOUT MILLENNIUM --------------------------------------------------------------------------------- */

OPTIONS.applyOptions();










import ZEHN from './../js/zehn.js';

/* ADD USER AGENT --------------------------------------------------------------------------------------------------- */

ZEHN.addUserAgent();

/* CONVERT SYSTEM COLORS -------------------------------------------------------------------------------------------- */

ZEHN.convertAccents();

/* CREATE LOCALIZED ON/OFF LABELS FOR SWITCHES ---------------------------------------------------------------------- */

ZEHN.createSwitchLabels();

/* SET SCROLLBAR GLYPH COLORS --------------------------------------------------------------------------------------- */

ZEHN.setGlyphColor();

/* CREATE SPINNER --------------------------------------------------------------------------------------------------- */

ZEHN.createSpinner('html', '.VicgWmz2sj_UUd0XKXvFQ');
ZEHN.createSpinner('html', '._3CN5DkgNMvdtT9fJhNOj_v');
ZEHN.createSpinner('html', '._2wAKy-0ZkO_vhbiQCP9MgE');

/* STORE HEIGHT OF HEADER ------------------------------------------------------------------------------------------- */

ZEHN.storeTargetHeightAsVariable('.friendsListContainer', '.friendListHeaderContainer', '--friends-header-height');

/* TOGGLE CLASSES BASED ON WHAT HEADER CONTENT IS OPEN -------------------------------------------------------------- */

ZEHN.toggleClassWithPresence('.chat_main', '.friendsListContainer', '.TabSearchActive', 'zehnSearchOpened');

/* TOGGLE HEADER CONTAINERS ----------------------------------------------------------------------------------------- */

ZEHN.checkTargetToggle('.friendListHeaderContainer .chatTitleBar', '#zehnToggleFriendsHeader', 'zehnFriendsHeaderClosed');
ZEHN.createButton('.friendsListContainer', '.friendListHeaderContainer .chatTitleBar', ['#zehnToggleFriendsHeader', '.zehnButton'], (root, target, button) => {
  ZEHN.addRootClassOnToggle(root, target, button, 'zehnFriendsHeaderClosed');
}, false);

/* TOGGLE CURRENT USER CONTAINER ------------------------------------------------------------------------------------ */

ZEHN.checkTargetToggle('.friendsTabButtonsContainer', '#zehnToggleUser', 'zehnUserOpened');
ZEHN.createButton('.friendsListContainer', '.friendsTabButtonsContainer', ['#zehnToggleUser', '.zehnButton', '.zehnReveal'], (root, target, button) => {
  ZEHN.addRootClassOnToggle(root, target, button, 'zehnUserOpened');
});

/* MOVE CURRENT USER INTO VOICE CONTROLS WRAPPER -------------------------------------------------------------------- */

ZEHN.moveAppend('.friendlist', '.friendListHeaderContainer>div:not([class])', [
  '.currentUserContainer' // CURRENT USER
]);

/* MOVE SORT BY INTO GROUP HEADER ----------------------------------------------------------------------------------- */

ZEHN.moveAppend('.chat_main', '.friendGroup.offlineFriends .groupHeaderContainer .groupName', [
  '.friendGroup.offlineFriends .groupHeaderContainer .SortByRecent' // SORT BY BUTTON
]);

/* WRAP ADD FRIENDS BUTTON ------------------------------------------------------------------------------------------ */

ZEHN.createContainer('.MultiUserChat', '.inviteAnotherFriendButton', ['.zehnAddFriendWrapper']);

/* CREATE FRIENDS TABLIST ------------------------------------------------------------------------------------------- */

ZEHN.createAdjacentElement('.friendsListContainer', '.socialTabSearchContainer', ['.zehnFriendsTablist'], false);

ZEHN.findRootsAndTargets('.friendsListContainer', '.friendlist', (root, target) => {
  target.id = 'zehnFriendsDisplayed';
});

function toggleList(root, target, button) {
  const BTN_FRIENDS = target.querySelector('.zehnFriendsTabFriends');
  const BTN_CHATS = target.querySelector('.zehnFriendsTabChats');
  const BUTTONS = [BTN_FRIENDS, BTN_CHATS];

  if (BTN_FRIENDS && BTN_CHATS) {
    const CONTAINER = root.querySelector('.friendlist');
    const FRIENDS = document.querySelector('.friendlistListContainer');
    const CHATS = document.querySelector('.FriendsListChatSection');
    const LISTS = [FRIENDS, CHATS];

    LISTS.forEach((list) => {
      if (button == BTN_FRIENDS) {
        if (list && (list == FRIENDS)) {
          list.classList.add('zehnDisplayed');
          CONTAINER.id = 'zehnFriendsDisplayed';
        } else if (list) {
          list.classList.remove('zehnDisplayed');
        }
      } else if (button == BTN_CHATS) {
        if (list && (list == CHATS)) {
          list.classList.add('zehnDisplayed');
          CONTAINER.id = 'zehnChatsDisplayed';
        } else if (list) {
          list.classList.remove('zehnDisplayed');
        }
      }
    });

    BUTTONS.forEach((element) => {
      if (element == button) {
        element.classList.add('zehnToggled');
      } else {
        element.classList.remove('zehnToggled');
      }
    });
  }
};

let localFriends = await ZEHN.localize(document.documentElement.lang, "Label_Friends");
ZEHN.checkButtonToggle('.friendsListContainer', '.zehnFriendsTabFriends', 'zehnFriendsTablistFriendsOpened');
ZEHN.createTextButton('.friendsListContainer', '.zehnFriendsTablist', ['.zehnFriendsTabFriends', '.zehnToggled'], localFriends, toggleList);

let localChats = await ZEHN.localize(document.documentElement.lang, "Label_Chats");
ZEHN.checkButtonToggle('.friendsListContainer', '.zehnFriendsTabChats', 'zehnFriendsTablistChatsOpened');
ZEHN.createTextButton('.friendsListContainer', '.zehnFriendsTablist', ['.zehnFriendsTabChats'], localChats, toggleList);

/* TOGGLE GROUP CHAT SETTINGS BUTTONS ------------------------------------------------------------------------------- */

ZEHN.checkButtonToggle('.MultiUserChat', '.zehnToggleSettingsButtons', 'zehnSettingsButtonsOpened');
ZEHN.createButton('.MultiUserChat', '.chatRoomOptions', ['.zehnToggleSettingsButtons', '.zehnButton', '.zehnReveal'], (root, target, button) => {
  ZEHN.addRootClassOnToggle(root, target, button, 'zehnSettingsButtonsOpened');
});

/* TOGGLE GROUP CHAT CHANNEL PAGELIST ------------------------------------------------------------------------------- */

ZEHN.checkButtonToggle('.MultiUserChat', '.zehnToggleChannelList', 'zehnChannelListOpened');
ZEHN.createButton('.MultiUserChat', '.chatRoomOptions', ['.zehnToggleChannelList', '.zehnButton', '.zehnReveal'], (root, target, button) => {
  ZEHN.addRootClassOnToggle(root, target, button, 'zehnChannelListOpened');
});

/* TOGGLE MEMBER LIST STATUS ---------------------------------------------------------------------------------------- */

ZEHN.moveAppend('.MultiUserChat', '.chatRoomOptions', [
  '.MemberListOption.ToggleMemberListView'
]);

/* MOVE GROUP CHAT BROADCAST BUTTON INTO HEADER --------------------------------------------------------------------- */

ZEHN.movePrepend('.MultiUserChat', '.chatRoomOptions', [
  '.doGxCBJrGimabHm365bOV' // YULE LOG
]);
ZEHN.createIconContainer('.MultiUserChat', '.broadcastInfoContainer .thumbnail', ['.zehnBroadcastPlaceholderWrapper']);
ZEHN.createIconContainer('.MultiUserChat', '.doGxCBJrGimabHm365bOV', ['.zehnBroadcastPreviewWrapper']);

/* NOTIFICATION SETTINGS MOVE INTO TITLEBAR ------------------------------------------------------------------------- */

ZEHN.moveAppend('.LegacyPopup', '.ChatRoomNotificationSettingsDialog > .DialogContent_InnerWidth > form > .DialogHeader', [
  '.ChatRoomNotificationSettingsDialog > .DialogContent_InnerWidth > form > .DialogLabel._DialogLayout' // CHAT ROOM NAME
]);

/* WRAP POPOUT SVG -------------------------------------------------------------------------------------------------- */

ZEHN.createContainer('.msg', '.chatImageURL', ['.zehnEmbedLinkWrapper']);

/* WRAP EMOTICON ADD SVG -------------------------------------------------------------------------------------------- */

ZEHN.createContainer('.msg', '._2FJUPOjT7afeB0125mqdQt', ['.zehnAddEmoticon']);










import REVEAL from './../js/reveal.js';

/* REVEAL CONTEXT --------------------------------------------------------------------------------------------------- */

REVEAL.addRevealClass('.friendsui-container ._2EstNjFIIZm_WUSKm5Wt7n', [
  '._1n7Wloe5jZ6fSuvV18NNWI.contextMenuItem:not(.contextMenuUnselectable, .disabled)' // CONTEXT ENTRY
], [
  'zehnRevealRipple'
]);

REVEAL.addRevealClass('.friendsui-container ._10UNx2XXsFmsHb86RCyofu', [
  '._2Qsf4rHzNzK6Z3UYN7tOFx' // VIDEO
], [
  'zehnRevealRipple'
]);

REVEAL.revealSelf('._2EstNjFIIZm_WUSKm5Wt7n ._1n7Wloe5jZ6fSuvV18NNWI.contextMenuItem.zehnReveal');
REVEAL.revealSelf('._10UNx2XXsFmsHb86RCyofu ._2Qsf4rHzNzK6Z3UYN7tOFx.zehnReveal');

/* REVEAL BROADCAST CONTEXT MENU ------------------------------------------------------------------------------------ */

REVEAL.addRevealClass('.STV_BroadcastSettingsPanel', [
  '._1n7Wloe5jZ6fSuvV18NNWI.contextMenuItem:not(.contextMenuUnselectable, .disabled)' // CONTEXT ENTRY
], [
  'zehnRevealRipple'
]);

REVEAL.revealSelf('.STV_BroadcastSettingsPanel ._1n7Wloe5jZ6fSuvV18NNWI.contextMenuItem.zehnReveal');

/* REVEAL FRIENDS --------------------------------------------------------------------------------------------------- */

REVEAL.addRevealClass('.friendsTabButtonsContainer', [
  '.searchIconButton', // SEARCH
  '.friendRequestButton', // REQUESTS
  '.addFriendButton' // ADD
]);

REVEAL.revealInner('.friendListHeaderContainer');

REVEAL.addRevealClass('.FriendsListContent', [
  '.friendGroup>.groupName', // GAME GROUP
  '.groupHeaderContainer', // FRIEND GROUP
  '.friendsListSectionTitle.chatSectionTitle', // GROUP CHATS TOGGLE
  '.chatRoomListContainer .ChatRoomListGroupItem', // GROUP CHAT
  '.friendCategoryContainer>.friend', // FRIEND
  '.unreadFriend>.friend', // FRIEND
  '.friendsContainer>.friend', // GROUPED FRIEND
  '.chatRoomVoiceChannel' // VOICE CHANNEL
], [
  'zehnRevealBackgroundOnly',
  'zehnRevealRipple'
]);

REVEAL.revealSelf('.FriendsListContent .zehnReveal');

/* REVEAL CHAT TABS ------------------------------------------------------------------------------------------------- */

REVEAL.addRevealClass('.titleBarContainer.ChatTabs', [
  '._3f1rJf0BU79ub9YR2KihaT' // CHAT TAB CONTAINER
], [
  'zehnRevealBackgroundOnly'
]);

REVEAL.revealInner('.ChatTabs');

/* REVEAL CHAT ------------------------------------------------------------------------------------------------------ */

REVEAL.addRevealClass('.chatHeader', [
  '.broadcastInfoContainer .thumbnail', // STREAM
  '.doGxCBJrGimabHm365bOV', // STREAM YULE
  '.chatRoomButton.ManageNotifications', // NOTIFICATION SETTINGS
  '.chatRoomButton.InviteToGroupChat', // INVITE TO GROUP CHAT
  '.chatRoomButton.GroupChatSettings', // GROUP CHAT SETTINGS
  '.MemberListOption.ToggleMemberListView' // TOGGLE MEMBER LIST
]);

REVEAL.revealInner('.chatHeader');


/* REVEAL CHAT CHANNEL NAV ------------------------------------------------------------------------------------------ */

REVEAL.addRevealClass('.chatRoomGroupNavColumn', [
  '.chatRoomGroupNavCollapseExpand' // CHATLIST PIN BUTTON
]);

REVEAL.addRevealClass('.chatRoomGroupNavColumn', [
  '.chatRoomTextChannelsGroup>.chatRoomTextChannel', // TEXT
  '.chatRoomVoiceChannelNameContainer' // VOICE
], [
  'zehnRevealBackgroundOnly',
  'zehnRevealRipple'
]);

REVEAL.revealInner('.chatRoomGroupNavColumn');

/* REVEAL CHAT PANELS ----------------------------------------------------------------------------------------------- */

REVEAL.addRevealClass('.chatWindow', [
  '.chatImageContainer', // IMG EMBED
  '.BBCodeResizableComponent', // VIDEO/YOUTUBE EMBED
  '.ChatMessageInvite', // INVITE EMBED
  '.ChatMessageOpenGraph', // OPENGRAPH EMBED
  '.SteamPublishedFile', // PUBLISH FILE MEBED
  '.CommunityBroadcastWatch', // COMMUNITY WATCH EMBED
  '._2_QSE1Nit6wrabY5ZgDZOz', // STORE EMBED
  '._1JZstfJ6jCBChXx0ZDwfpR', // FAILED STORE EMBED
  '.BroadcastSection', // BROADCAST
  '.BroadcastContainerSection', // ???
  '.BroadcastDetailsSection' // BROADCAST DETAILS
], [
  'zehnRevealBorderOnly'
]);

REVEAL.revealSelf('.chatImageContainer', 300);
REVEAL.revealSelf('.BBCodeResizableComponent', 300);
REVEAL.revealSelf('.ChatMessageInvite', 300);
REVEAL.revealSelf('.ChatMessageOpenGraph', 300);
REVEAL.revealSelf('.SteamPublishedFile', 300);
REVEAL.revealSelf('.CommunityBroadcastWatch', 300);
REVEAL.revealSelf('._2_QSE1Nit6wrabY5ZgDZOz', 300);
REVEAL.revealSelf('._1JZstfJ6jCBChXx0ZDwfpR', 300);
REVEAL.revealSelf('.BroadcastSection', 300);
REVEAL.revealSelf('.BroadcastContainerSection', 300);
REVEAL.revealSelf('.BroadcastDetailsSection', 300);