import './shared/base.js';
import './shared/spinner.js';
import './shared/context.js';
import { CURRENT_LANG, LOCALIZATION_JSON } from './shared/data.js';
import { FIND, STORE, TOGGLE, CREATE, MOVE } from './lib/util.js';
import LOCALIZATION from './lib/localization.js';
import REVEAL from './lib/reveal.js';

/* STORE HEIGHT OF FRIENDS HEADER ----------------------------------------------------------------------------------- */

STORE.storeTargetHeightAsVariable('.friendsListContainer', '.friendListHeaderContainer', '--friends-header-height');
STORE.storeTargetHeightAsVariable('.friendsListContainer', '.currentUserContainer', '--friends-footer-height');

/* TOGGLE CLASSES BASED ON WHAT HEADER CONTENT IS OPEN -------------------------------------------------------------- */

TOGGLE.toggleClassWithPresence('.chat_main', '.friendsListContainer', '.TabSearchActive', 'zehnSearchOpened');

/* TOGGLE HEADER CONTAINERS ----------------------------------------------------------------------------------------- */

TOGGLE.checkTargetToggle('.chat_main', '.friendListHeaderContainer .chatTitleBar', '#zehnToggleFriendsHeader', 'zehnFriendsHeaderClosed');
CREATE.createButton('.friendsListContainer', '.friendListHeaderContainer .chatTitleBar', ['#zehnToggleFriendsHeader', '.zehnButton'], (root, target, button) => {
  TOGGLE.addRootClassOnToggle(root, target, button, 'zehnFriendsHeaderClosed');
}, { placement: 'prepend', toggleSelector: 'zehnFriendsHeaderClosed' });

/* TOGGLE CURRENT USER CONTAINER ------------------------------------------------------------------------------------ */

let localTooltipProfileCollapse = await LOCALIZATION.localize(LOCALIZATION_JSON, CURRENT_LANG, "Tooltip_Profile_Collapse");
let localTooltipProfileExpand = await LOCALIZATION.localize(LOCALIZATION_JSON, CURRENT_LANG, "Tooltip_Profile_Expand");
TOGGLE.checkTargetToggle('.chat_main', '.friendsTabButtonsContainer', '#zehnToggleUser', 'zehnUserOpened');
CREATE.createTooltipButton('.friendsListContainer', '.friendsTabButtonsContainer', ['#zehnToggleUser', '.zehnButton', '.zehnReveal'], (root, target, button) => {
  TOGGLE.addRootClassOnToggle(root, target, button, 'zehnUserOpened');
}, { toggleSelector: 'zehnUserOpened', activeTooltipText: localTooltipProfileCollapse, inactiveTooltipText: localTooltipProfileExpand });

/* TOGGLE QUICK ACCESS ---------------------------------------------------------------------------------------------- */

let localTooltipQuickAccess = await LOCALIZATION.localize(LOCALIZATION_JSON, CURRENT_LANG, "Tooltip_Quick_Access");
TOGGLE.checkTargetToggle('.chat_main', '.friendsTabButtonsContainer', '#zehnToggleQuickAccess', 'zehnQuickAccessOpened');
CREATE.createTooltipButton('.friendsListContainer', '.friendsTabButtonsContainer', ['#zehnToggleQuickAccess', '.zehnButton', '.zehnReveal'], (root, target, button) => {
  TOGGLE.addRootClassOnToggle(root, target, button, 'zehnQuickAccessOpened');
}, { placement: 'append', toggleSelector: 'zehnQuickAccessOpened', activeTooltipText: localTooltipQuickAccess, inactiveTooltipText: localTooltipQuickAccess });

FIND.findRootsAndTargets('.friendsListContainer', '.zehnFriendsBackdrop', (root, target) => {
  const QA_BTN = document.getElementById('zehnToggleQuickAccess');

  target.addEventListener('click', (e) => {
    root.classList.contains('zehnQuickAccessOpened') && root.classList.remove('zehnQuickAccessOpened');
    QA_BTN.classList.contains('zehnToggled') && QA_BTN.classList.remove('zehnToggled');
  });
});

/* MOVE SORT BY INTO GROUP HEADER ----------------------------------------------------------------------------------- */

MOVE.moveElement('.chat_main', '.friendGroup.offlineFriends .groupHeaderContainer .groupName', [
  '.friendGroup.offlineFriends .groupHeaderContainer .SortByRecent' // SORT BY BUTTON
]);

/* CREATE FRIENDS TABLIST ------------------------------------------------------------------------------------------- */

CREATE.createElement('.friendsListContainer', '.socialTabSearchContainer', ['.zehnFriendsTablist'], { placement: 'after', shouldClearExisting: true });

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
      if (button === BTN_FRIENDS) {
        if (list && (list === FRIENDS)) {
          list.classList.add('zehnDisplayed');
          CONTAINER.id = 'zehnFriendsDisplayed';
        } else if (list) {
          list.classList.remove('zehnDisplayed');
        }
      } else if (button === BTN_CHATS) {
        if (list && (list === CHATS)) {
          list.classList.add('zehnDisplayed');
          CONTAINER.id = 'zehnChatsDisplayed';
        } else if (list) {
          list.classList.remove('zehnDisplayed');
        }
      }
    });

    BUTTONS.forEach((element) => {
      if (element === button) {
        element.classList.add('zehnToggled');
      } else {
        element.classList.remove('zehnToggled');
      }
    });
  }
}

let localLabelFriends = await LOCALIZATION.localize(LOCALIZATION_JSON, CURRENT_LANG, "Label_Friends");
TOGGLE.checkButtonToggle('.friendsListContainer', '.zehnFriendsTabFriends', 'zehnFriendsTablistFriendsOpened');
CREATE.createTextButton('.friendsListContainer', '.zehnFriendsTablist', ['.zehnFriendsTabFriends', '.zehnToggled'], localLabelFriends, toggleList);

let localLabelChats = await LOCALIZATION.localize(LOCALIZATION_JSON, CURRENT_LANG, "Label_Chats");
TOGGLE.checkButtonToggle('.friendsListContainer', '.zehnFriendsTabChats', 'zehnFriendsTablistChatsOpened');
CREATE.createTextButton('.friendsListContainer', '.zehnFriendsTablist', ['.zehnFriendsTabChats'], localLabelChats, toggleList);

/* FRIENDS LIST FLYOUT BACKDROP ------------------------------------------------------------------------------------- */

CREATE.createElement('.friendsListContainer', '.friendListHeaderContainer', ['.zehnFriendsBackdrop'], { placement: 'append', shouldClearExisting: true });

/* CHAT CHANNEL LIST BACKDROP --------------------------------------------------------------------------------------- */

CREATE.createElement('.multiChatDialog', '.ChatRoomGroup_MainAndChatEntry', ['.zehnChatBackdrop'], { placement: 'after', shouldClearExisting: false });

/* TOGGLE GROUP CHAT SETTINGS BUTTONS ------------------------------------------------------------------------------- */

let localTooltipSettingsCollapse = await LOCALIZATION.localize(LOCALIZATION_JSON, CURRENT_LANG, "Tooltip_Settings_Collapse");
let localTooltipSettingsExpand = await LOCALIZATION.localize(LOCALIZATION_JSON, CURRENT_LANG, "Tooltip_Settings_Expand");
TOGGLE.checkButtonToggle('.MultiUserChat', '.zehnToggleSettingsButtons', 'zehnSettingsButtonsOpened');
CREATE.createTooltipButton('.MultiUserChat', '.chatRoomOptions', ['.zehnToggleSettingsButtons', '.zehnButton', '.zehnReveal'], (root, target, button) => {
  TOGGLE.addRootClassOnToggle(root, target, button, 'zehnSettingsButtonsOpened');
}, { activeTooltipText: localTooltipSettingsCollapse, inactiveTooltipText: localTooltipSettingsExpand });

/* TOGGLE GROUP CHAT CHANNEL PAGELIST ------------------------------------------------------------------------------- */

let localTooltipChannelsCollapse = await LOCALIZATION.localize(LOCALIZATION_JSON, CURRENT_LANG, "Tooltip_Channels_Collapse");
let localTooltipChannelsExpand = await LOCALIZATION.localize(LOCALIZATION_JSON, CURRENT_LANG, "Tooltip_Channels_Expand");
TOGGLE.checkButtonToggle('.MultiUserChat', '.zehnToggleChannelList', 'zehnChannelListOpened');
CREATE.createTooltipButton('.MultiUserChat', '.chatRoomOptions', ['.zehnToggleChannelList', '.zehnButton', '.zehnReveal'], (root, target, button) => {
  TOGGLE.addRootClassOnToggle(root, target, button, 'zehnChannelListOpened');
}, { activeTooltipText: localTooltipChannelsCollapse, inactiveTooltipText: localTooltipChannelsExpand });

FIND.findRootsAndTargets('.MultiUserChat', '.zehnChatBackdrop', (root, target) => {
  const CHANNEL_BTN = root.querySelector('.zehnToggleChannelList');

  target.addEventListener('click', (e) => {
    root.classList.contains('zehnChannelListOpened') && root.classList.remove('zehnChannelListOpened');
    CHANNEL_BTN.classList.contains('zehnToggled') && CHANNEL_BTN.classList.remove('zehnToggled');
  });
});

/* TOGGLE MEMBER LIST STATUS ---------------------------------------------------------------------------------------- */

MOVE.moveElement('.MultiUserChat', '.chatRoomOptions', [
  '.MemberListOption.ToggleMemberListView'
]);

/* MOVE GROUP CHAT BROADCAST BUTTON INTO HEADER --------------------------------------------------------------------- */

MOVE.moveElement('.MultiUserChat', '.chatRoomOptions', [
  '.doGxCBJrGimabHm365bOV' // YULE LOG
], { placement: 'prepend' });
CREATE.createIconContainer('.MultiUserChat', '.broadcastInfoContainer .thumbnail', ['.zehnBroadcastPlaceholderWrapper'], ['.zehnIcon']);
CREATE.createIconContainer('.MultiUserChat', '.doGxCBJrGimabHm365bOV', ['.zehnBroadcastPreviewWrapper'], ['.zehnIcon']);

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
  }

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

REVEAL.addRevealClass('.friendListHeaderContainer', [
  '.VoiceControlPanelButton' // VOICE CONTROLS
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