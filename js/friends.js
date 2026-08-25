import './shared/base.js';
import './shared/spinner.js';
import './shared/context.js';
import { CURRENT_LANG, LOCALIZATION_JSON } from './shared/data.js';
import { FIND, STORE, TOGGLE, CREATE, MOVE } from './lib/util.js';
import LOCALIZATION from './lib/localization.js';
import REVEAL from './lib/reveal.js';

/* STORE HEIGHT OF FRIENDS HEADER ----------------------------------------------------------------------------------- */

STORE.storeTargetHeightAsVariable('.friendsListContainer', '.friendListHeaderContainer', '--friends-header-height');

/* TOGGLE CLASSES BASED ON WHAT HEADER CONTENT IS OPEN -------------------------------------------------------------- */

TOGGLE.toggleClassWithPresence('.chat_main', '.friendsListContainer', '.TabSearchActive', 'zehnSearchOpened');

/* TOGGLE HEADER CONTAINERS ----------------------------------------------------------------------------------------- */

TOGGLE.checkTargetToggle('.friendListHeaderContainer .chatTitleBar', '#zehnToggleFriendsHeader', 'zehnFriendsHeaderClosed');
CREATE.createButton('.friendsListContainer', '.friendListHeaderContainer .chatTitleBar', ['#zehnToggleFriendsHeader', '.zehnButton'], (root, target, button) => {
  TOGGLE.addRootClassOnToggle(root, target, button, 'zehnFriendsHeaderClosed');
}, { shouldAppend: false });

/* TOGGLE CURRENT USER CONTAINER ------------------------------------------------------------------------------------ */

TOGGLE.checkTargetToggle('.friendsTabButtonsContainer', '#zehnToggleUser', 'zehnUserOpened');
CREATE.createButton('.friendsListContainer', '.friendsTabButtonsContainer', ['#zehnToggleUser', '.zehnButton', '.zehnReveal'], (root, target, button) => {
  TOGGLE.addRootClassOnToggle(root, target, button, 'zehnUserOpened');
});

/* MOVE CURRENT USER INTO VOICE CONTROLS WRAPPER -------------------------------------------------------------------- */

MOVE.moveAppend('.friendlist', '.friendListHeaderContainer>div:not([class])', [
  '.currentUserContainer' // CURRENT USER
]);

/* MOVE SORT BY INTO GROUP HEADER ----------------------------------------------------------------------------------- */

MOVE.moveAppend('.chat_main', '.friendGroup.offlineFriends .groupHeaderContainer .groupName', [
  '.friendGroup.offlineFriends .groupHeaderContainer .SortByRecent' // SORT BY BUTTON
]);

/* CREATE FRIENDS TABLIST ------------------------------------------------------------------------------------------- */

CREATE.createAdjacentElement('.friendsListContainer', '.socialTabSearchContainer', ['.zehnFriendsTablist'], { shouldPlaceBefore: false });

FIND.findRootsAndTargets('.friendsListContainer', '.friendlist', (root, target) => {
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

let localFriends = await LOCALIZATION.localize(LOCALIZATION_JSON, CURRENT_LANG, "Label_Friends");
TOGGLE.checkButtonToggle('.friendsListContainer', '.zehnFriendsTabFriends', 'zehnFriendsTablistFriendsOpened');
CREATE.createTextButton('.friendsListContainer', '.zehnFriendsTablist', ['.zehnFriendsTabFriends', '.zehnToggled'], localFriends, toggleList);

let localChats = await LOCALIZATION.localize(LOCALIZATION_JSON, CURRENT_LANG, "Label_Chats");
TOGGLE.checkButtonToggle('.friendsListContainer', '.zehnFriendsTabChats', 'zehnFriendsTablistChatsOpened');
CREATE.createTextButton('.friendsListContainer', '.zehnFriendsTablist', ['.zehnFriendsTabChats'], localChats, toggleList);

/* TOGGLE GROUP CHAT SETTINGS BUTTONS ------------------------------------------------------------------------------- */

TOGGLE.checkButtonToggle('.MultiUserChat', '.zehnToggleSettingsButtons', 'zehnSettingsButtonsOpened');
CREATE.createButton('.MultiUserChat', '.chatRoomOptions', ['.zehnToggleSettingsButtons', '.zehnButton', '.zehnReveal'], (root, target, button) => {
  TOGGLE.addRootClassOnToggle(root, target, button, 'zehnSettingsButtonsOpened');
});

/* TOGGLE GROUP CHAT CHANNEL PAGELIST ------------------------------------------------------------------------------- */

TOGGLE.checkButtonToggle('.MultiUserChat', '.zehnToggleChannelList', 'zehnChannelListOpened');
CREATE.createButton('.MultiUserChat', '.chatRoomOptions', ['.zehnToggleChannelList', '.zehnButton', '.zehnReveal'], (root, target, button) => {
  TOGGLE.addRootClassOnToggle(root, target, button, 'zehnChannelListOpened');
});

/* TOGGLE MEMBER LIST STATUS ---------------------------------------------------------------------------------------- */

MOVE.moveAppend('.MultiUserChat', '.chatRoomOptions', [
  '.MemberListOption.ToggleMemberListView'
]);

/* MOVE GROUP CHAT BROADCAST BUTTON INTO HEADER --------------------------------------------------------------------- */

MOVE.movePrepend('.MultiUserChat', '.chatRoomOptions', [
  '.doGxCBJrGimabHm365bOV' // YULE LOG
]);
CREATE.createIconContainer('.MultiUserChat', '.broadcastInfoContainer .thumbnail', ['.zehnBroadcastPlaceholderWrapper']);
CREATE.createIconContainer('.MultiUserChat', '.doGxCBJrGimabHm365bOV', ['.zehnBroadcastPreviewWrapper']);

/* WRAP POPOUT SVG -------------------------------------------------------------------------------------------------- */

CREATE.createContainer('.msg', '.chatImageURL', ['.zehnEmbedLinkWrapper']);

/* WRAP EMOTICON ADD SVG -------------------------------------------------------------------------------------------- */

CREATE.createContainer('.msg', '._2FJUPOjT7afeB0125mqdQt', ['.zehnAddEmoticon']);

/* COPY BROADCAST VOLUME SLIDER TO VARIABLE ------------------------------------------------------------------------- */

FIND.findRootsAndTargets('.BroadcastVolumeSlider', '.BroadcastVolumeSlider_Thumb', (root, target) => {
  function syncVariable() {
    const VALUE = target.style.left;

    if (VALUE) {
      root.style.setProperty('--value', VALUE);
    } else {
      root.style.removeProperty('--value');
    }
  };

  syncVariable();

  const OBSERVER = new MutationObserver((mutations) => {
    if (mutations.some(mutation => mutation.attributeName === 'style')) {
      syncVariable();
    }
  });

  OBSERVER.observe(target, {
    attributes: true,
    attributeFilter: ['style']
  });
});










/* REVEAL BROADCAST CONTEXT MENU ------------------------------------------------------------------------------------ */

REVEAL.addRevealClass('.STV_BroadcastSettingsPanel', [
  '._1n7Wloe5jZ6fSuvV18NNWI.contextMenuItem:not(.contextMenuUnselectable, .disabled)' // CONTEXT ENTRY
], [
  'zehnRevealRipple'
]);

REVEAL.revealSelf('.STV_BroadcastSettingsPanel ._1n7Wloe5jZ6fSuvV18NNWI.contextMenuItem.zehnReveal');

/* REVEAL BROADCAST SETTINGS MENU ----------------------------------------------------------------------------------- */

REVEAL.addRevealClass('._10UNx2XXsFmsHb86RCyofu', [
  '._2Qsf4rHzNzK6Z3UYN7tOFx' // VIDEO
], [
  'zehnRevealRipple'
]);

REVEAL.revealSelf('._10UNx2XXsFmsHb86RCyofu ._2Qsf4rHzNzK6Z3UYN7tOFx.zehnReveal');

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